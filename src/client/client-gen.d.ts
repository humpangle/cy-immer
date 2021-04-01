/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListParents
// ====================================================

export interface ListParents_listParents_children_edges_node {
  __typename: "Child";
  id: string;
  text: string;
}

export interface ListParents_listParents_children_edges {
  __typename: "ChildEdge";
  node: ListParents_listParents_children_edges_node;
}

export interface ListParents_listParents_children {
  __typename: "ChildConnection";
  edges: (ListParents_listParents_children_edges | null)[];
}

export interface ListParents_listParents {
  __typename: "Parent";
  id: string;
  text: string;
  children: ListParents_listParents_children | null;
}

export interface ListParents {
  listParents: (ListParents_listParents | null)[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateParent
// ====================================================

export interface CreateParent_createParent_children_edges_node {
  __typename: "Child";
  id: string;
  text: string;
}

export interface CreateParent_createParent_children_edges {
  __typename: "ChildEdge";
  node: CreateParent_createParent_children_edges_node;
}

export interface CreateParent_createParent_children {
  __typename: "ChildConnection";
  edges: (CreateParent_createParent_children_edges | null)[];
}

export interface CreateParent_createParent {
  __typename: "Parent";
  id: string;
  text: string;
  children: CreateParent_createParent_children | null;
}

export interface CreateParent {
  createParent: CreateParent_createParent | null;
}

export interface CreateParentVariables {
  text: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateParent
// ====================================================

export interface UpdateParent_updateParent_parent_children_edges_node {
  __typename: "Child";
  id: string;
  text: string;
}

export interface UpdateParent_updateParent_parent_children_edges {
  __typename: "ChildEdge";
  node: UpdateParent_updateParent_parent_children_edges_node;
}

export interface UpdateParent_updateParent_parent_children {
  __typename: "ChildConnection";
  edges: (UpdateParent_updateParent_parent_children_edges | null)[];
}

export interface UpdateParent_updateParent_parent {
  __typename: "Parent";
  id: string;
  text: string;
  children: UpdateParent_updateParent_parent_children | null;
}

export interface UpdateParent_updateParent_children {
  __typename: "Child";
  id: string;
  text: string;
}

export interface UpdateParent_updateParent {
  __typename: "UpdateParentReturn";
  parent: UpdateParent_updateParent_parent;
  children: (UpdateParent_updateParent_children | null)[] | null;
}

export interface UpdateParent {
  updateParent: UpdateParent_updateParent | null;
}

export interface UpdateParentVariables {
  input: UpdateParentInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChildFragment
// ====================================================

export interface ChildFragment {
  __typename: "Child";
  id: string;
  text: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ParentFragment
// ====================================================

export interface ParentFragment_children_edges_node {
  __typename: "Child";
  id: string;
  text: string;
}

export interface ParentFragment_children_edges {
  __typename: "ChildEdge";
  node: ParentFragment_children_edges_node;
}

export interface ParentFragment_children {
  __typename: "ChildConnection";
  edges: (ParentFragment_children_edges | null)[];
}

export interface ParentFragment {
  __typename: "Parent";
  id: string;
  text: string;
  children: ParentFragment_children | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateChildInput {
  text: string;
}

export interface UpdateParentInput {
  id: string;
  text?: string | null;
  children?: CreateChildInput[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
