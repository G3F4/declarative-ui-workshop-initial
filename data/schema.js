import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  getCategory,
  getCategories,
  getEvent,
} from './database';

/**
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve a node object to its GraphQL type.
 */
const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    if (type === 'Category') {
      return getCategory(id);
    } else if (type === 'Event') {
      return getEvent(id);
    } else {
      return null;
    }
  },
  (obj) => {
    return obj.events ? categoryType : eventType;
  }
);

/**
 * Event type.
 *
 *   type event : Node {
 *     id: String!
 *     name: String
 *   }
 */
const eventType = new GraphQLObjectType({
  name: 'Event',
  description: 'Event',
  fields: () => ({
    id: globalIdField('Event'),
    description: { type: GraphQLString, description: 'Event description' },
    name: { type: GraphQLString, description: 'Event name' }
  }),
  interfaces: [nodeInterface]
});

/**
 * Connection between a category and assigned events.
 *
 *   type ShipConnection {
 *     edges: [EventEdge]
 *     pageInfo: PageInfo!
 *   }
 *
 *   type EventEdge {
 *     cursor: String!
 *     node: event
 *   }
 */
const { connectionType: eventConnection } = connectionDefinitions({ name: 'Event', nodeType: eventType });

/**
 * Category type
 *
 *   type Category : Node {
 *     id: String!
 *     name: String
 *     events: ShipConnection
 *   }
 */
const categoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'Category',
  fields: () => ({
    id: globalIdField('Category'),
    categoryID: {
      type: GraphQLString,
      description: 'Category id',
      resolve: ({ id }) => id
    },
    name: { type: GraphQLString, description: 'Category name' },
    description: { type: GraphQLString, description: 'Category description' },
    events: {
      type: eventConnection,
      description: 'Category events',
      args: connectionArgs,
      resolve: ({ events }, args) => connectionFromArray(events.map((id) => getEvent(id)), args)
    }
  }),
  interfaces: [nodeInterface]
});
/**
 * App type
 *
 *   type App : Node {
 *     id: String!
 *     name: String
 *     categories: [Category]
 *   }
 */
const appType = new GraphQLObjectType({
  name: 'App',
  description: 'App',
  fields: () => ({
    id: globalIdField('App'),
    name: {
      type: GraphQLString,
      description: 'App name',
      resolve: () => 'App name'
    },
    categories: {
      type: new GraphQLList(categoryType),
      args: {
        names: { type: new GraphQLList(GraphQLString) }
      },
      resolve: (root, { names }) => getCategories(names)
    }
  }),
  interfaces: [nodeInterface]
});

/**
 * Query root type
 */
const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    app: {
      type: appType,
      resolve: () => true
    },
    categories: {
      type: new GraphQLList(categoryType),
      args: {
        names: { type: new GraphQLList(GraphQLString) }
      },
      resolve: (root, { names }) => getCategories(names)
    },
    node: nodeField
  })
});

/**
 * Schema type
 */
export const schema = new GraphQLSchema({ query });
