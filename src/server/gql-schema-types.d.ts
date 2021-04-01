import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Child = {
  id: Scalars['ID'];
  text: Scalars['String'];
};

export type ChildConnection = {
  edges: Array<Maybe<ChildEdge>>;
};

export type ChildEdge = {
  node: Child;
};

export type CreateChildInput = {
  text: Scalars['String'];
};

export type Mutation = {
  createParent?: Maybe<Parent>;
  updateParent?: Maybe<UpdateParentReturn>;
};


export type MutationCreateParentArgs = {
  text: Scalars['String'];
};


export type MutationUpdateParentArgs = {
  input: UpdateParentInput;
};

export type Parent = {
  id: Scalars['ID'];
  text: Scalars['String'];
  children?: Maybe<ChildConnection>;
};

export type Query = {
  listParents: Array<Maybe<Parent>>;
};

export type UpdateParentInput = {
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
  children?: Maybe<Array<CreateChildInput>>;
};

export type UpdateParentReturn = {
  children?: Maybe<Array<Maybe<Child>>>;
  parent: Parent;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Child: ResolverTypeWrapper<Child>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ChildConnection: ResolverTypeWrapper<ChildConnection>;
  ChildEdge: ResolverTypeWrapper<ChildEdge>;
  CreateChildInput: CreateChildInput;
  Mutation: ResolverTypeWrapper<{}>;
  Parent: ResolverTypeWrapper<Parent>;
  Query: ResolverTypeWrapper<{}>;
  UpdateParentInput: UpdateParentInput;
  UpdateParentReturn: ResolverTypeWrapper<UpdateParentReturn>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Child: Child;
  ID: Scalars['ID'];
  String: Scalars['String'];
  ChildConnection: ChildConnection;
  ChildEdge: ChildEdge;
  CreateChildInput: CreateChildInput;
  Mutation: {};
  Parent: Parent;
  Query: {};
  UpdateParentInput: UpdateParentInput;
  UpdateParentReturn: UpdateParentReturn;
  Boolean: Scalars['Boolean'];
};

export type ChildResolvers<ContextType = any, ParentType extends ResolversParentTypes['Child'] = ResolversParentTypes['Child']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChildConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChildConnection'] = ResolversParentTypes['ChildConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['ChildEdge']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChildEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChildEdge'] = ResolversParentTypes['ChildEdge']> = {
  node?: Resolver<ResolversTypes['Child'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createParent?: Resolver<Maybe<ResolversTypes['Parent']>, ParentType, ContextType, RequireFields<MutationCreateParentArgs, 'text'>>;
  updateParent?: Resolver<Maybe<ResolversTypes['UpdateParentReturn']>, ParentType, ContextType, RequireFields<MutationUpdateParentArgs, 'input'>>;
};

export type ParentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Parent'] = ResolversParentTypes['Parent']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  children?: Resolver<Maybe<ResolversTypes['ChildConnection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  listParents?: Resolver<Array<Maybe<ResolversTypes['Parent']>>, ParentType, ContextType>;
};

export type UpdateParentReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateParentReturn'] = ResolversParentTypes['UpdateParentReturn']> = {
  children?: Resolver<Maybe<Array<Maybe<ResolversTypes['Child']>>>, ParentType, ContextType>;
  parent?: Resolver<ResolversTypes['Parent'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Child?: ChildResolvers<ContextType>;
  ChildConnection?: ChildConnectionResolvers<ContextType>;
  ChildEdge?: ChildEdgeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Parent?: ParentResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UpdateParentReturn?: UpdateParentReturnResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
