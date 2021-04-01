import { QueryOptions } from "@apollo/client";
import { Dispatch, SetStateAction } from "react";
import { ListParents } from "./client-gen";
import { Parent } from "./server/gql-schema-types";

export type State = {
  parents: Parent[];
};
type DispatchType = Dispatch<SetStateAction<State>>;
export type ContextValue = {
  state: State;
  setState: DispatchType;
};
export type ListParentsQueryArgs = QueryOptions<{}, ListParents>;
