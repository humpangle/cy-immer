import {
  Parent,
  MutationCreateParentArgs,
  MutationUpdateParentArgs,
  UpdateParentReturn,
} from "./gql-schema-types";

export declare const schema: string;
export declare const resolvers: Resolvers;
export type Resolvers = {
  createParent?: (input: MutationCreateParentArgs) => Promise<Parent>;
  updateParent?: (
    input: MutationUpdateParentArgs
  ) => Promise<UpdateParentReturn>;
  listParents?: () => PromiseLike<Parent[]>;
};
