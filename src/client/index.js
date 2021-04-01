import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client/core";
import { PORT } from "../commons/envs";

export function makeClient(uri = `http://localhost:${PORT}/graphql`) {
  const cache = new InMemoryCache();
  let link = createHttpLink({
    uri,
  });
  const client = new ApolloClient({
    cache,
    link,
    queryDeduplication: false,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });
  return client;
}

const ChildFragment = gql`
  fragment ChildFragment on Child {
    id
    text
  }
`;
const ParentFragment = gql`
  fragment ParentFragment on Parent {
    id
    text
    children {
      edges {
        node {
          ...ChildFragment
        }
      }
    }
  }
  ${ChildFragment}
`;
export const LIST_PARENTS = gql`
  query ListParents {
    listParents {
      ...ParentFragment
    }
  }
  ${ParentFragment}
`;
export const CREATE_PARENT = gql`
  mutation CreateParent($text: String!) {
    createParent(text: $text) {
      ...ParentFragment
    }
  }
  ${ParentFragment}
`;
export const UPDATE_PARENT = gql`
  mutation UpdateParent($input: UpdateParentInput!) {
    updateParent(input: $input) {
      parent {
        ...ParentFragment
      }
      children {
        ...ChildFragment
      }
    }
  }
  ${ParentFragment}
  ${ChildFragment}
`;
