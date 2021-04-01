/**
 * @typedef { import('./gql-schema-types').Parent } Parent
 * @typedef { import('./gql-schema-types').Child } Child
 * @typedef { import('./gql-schema-types').ChildConnection } ChildConnection
 * @typedef { import('./schema.d').Resolvers } Resolvers
 */
import fs from "fs";
import { DATA_FILE } from "../commons/envs";

export const schema = fs.readFileSync(`${__dirname}/schema.graphql`, {
  encoding: "utf8",
});

// ====================================================
// RESOLVERS
// ====================================================

/**
 *
 * @type {Resolvers}
 */
export const resolvers = {
  listParents: () => {
    return getParents().then((p) => p.reverse());
  },
  createParent: async ({ text }) => {
    const parents = await getParents();
    const id = "" + new Date().getTime();
    const parent = {
      id,
      text,
    };
    parents.push(parent);
    return new Promise((res, rej) => {
      fs.writeFile(DATA_FILE, JSON.stringify(parents), () => {
        res(parent);
      });
    });
  },
  updateParent: async ({ input }) => {
    const { id, text, children } = input;
    const parents = await getParents();
    const parent = parents.find((p) => p.id === id);

    return new Promise((resolve, reject) => {
      if (parent) {
        if (text) {
          parent.text = text;
        }
        const p = {
          ...parent,
        };

        /**
         *
         * @type {Child[]}
         */
        const newChildren = [];

        if (children) {
          delete p.children;
          const newChildEdges = children.map(({ text }) => {
            const childId = "" + new Date().getTime();
            /**
             *
             * @type {Child}
             */
            const child = {
              text,
              id: childId,
            };
            newChildren.push(child);
            const edge = {
              node: child,
            };
            return edge;
          });

          const allChildren =
            parent.children ||
            /** @type {ChildConnection} */ ({
              edges: [],
            });
          parent.children = allChildren;
          allChildren.edges.push(...newChildEdges);
        }

        fs.writeFile(DATA_FILE, JSON.stringify(parents), () => {
          const response = {
            parent: p,
            children: children ? newChildren : undefined,
          };

          resolve(response);
        });

        return;
      }
      reject(`parent ID: ${id} not found`);
    });
  },
};

/**
 * @returns {Promise<Parent[]>}
 */
function getParents() {
  return new Promise((resolve, reject) => {
    fs.readFile(DATA_FILE, { encoding: "utf8" }, (err, data) => {
      if (err) {
        resolve([]);
        return;
      }
      /**
       *
       * @type {Parent[]}
       */
      const parents = JSON.parse(data || "[]");
      resolve(parents);
    });
  });
}
