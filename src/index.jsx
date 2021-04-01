/**
 * @typedef { import('./client/client.d').ContextValue } ContextValue
 * @typedef { import('./client/client.d').ListParentsQueryArgs } ListParentsQueryArgs
 * @typedef { import('./client/client.d').State } State
 * @typedef { import('./server/gql-schema-types').Parent } Parent
 */
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { makeClient, CREATE_PARENT, LIST_PARENTS } from "./client";
import { useState, useRef, createContext, useContext } from "react";

const context = createContext(/** @type {ContextValue} */ ({}));
const Provider = context.Provider;
const initialState = /** @type {State} */ ({
  parents: [],
});
const client = makeClient();

function App() {
  const [state, setState] = useState(initialState);
  const { parents } = state;
  const len = parents.length;

  useEffect(() => {
    client
      .query(
        /** @type {ListParentsQueryArgs} */ ({
          query: LIST_PARENTS,
        })
      )
      .then((result) => {
        setState((s) => {
          return {
            ...s,
            parents: result.data.listParents,
          };
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ApolloProvider client={client}>
      <div
        style={{
          maxWidth: "400px",
          padding: "10px",
          margin: "10px auto",
          border: "1px solid #dadada",
          borderRadius: "2px",
          minHeight: "200px",
        }}
      >
        <Provider value={{ state, setState }}>
          <ParentForm />
          {len ? <Parents /> : <div>No parents. Create one!</div>}
        </Provider>
      </div>
    </ApolloProvider>
  );
}

function ParentForm() {
  /**
   *
   * @type {React.MutableRefObject<HTMLInputElement | null>}
   */
  const textInputRef = useRef(null);
  const { setState: dispatch } = useContext(context);
  const [state, setState] = useState({ formText: "", formError: "" });
  const { formText, formError } = state;

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const text = formText.trim();
        if (!text) {
          const error = "text is empty";
          setState((s) => {
            return {
              ...s,
              formError: error,
            };
          });

          if (textInputRef.current) {
            textInputRef.current.focus();
          }
          return;
        }

        const result = await client.mutate({
          mutation: CREATE_PARENT,
          variables: {
            text,
          },
        });

        dispatch((s) => {
          return {
            ...s,
            parents: [result.data.createParent, ...s.parents],
          };
        });

        setState((s) => {
          return {
            ...s,
            formError: "",
            formText: "",
          };
        });
      }}
    >
      <div>
        <input
          style={{
            padding: "7px 10px",
          }}
          placeholder="Parent text"
          ref={textInputRef}
          type="text"
          value={formText}
          onChange={(e) => {
            const { value } = e.currentTarget;
            setState((s) => {
              return {
                ...s,
                formText: value,
              };
            });
          }}
        />
      </div>
      {formError && (
        <div
          style={{
            marginTop: "10px",
            color: "red",
          }}
        >
          {formError}
        </div>
      )}
      <button
        type="submit"
        style={{
          marginTop: "10px",
          padding: "7px",
        }}
      >
        Add parent
      </button>
    </form>
  );
}

function Parents() {
  const {
    state: { parents },
  } = useContext(context);
  const len = parents.length;
  return (
    <div
      style={{
        marginTop: "10px",
      }}
    >
      <div
        style={{
          padding: "5px 15px 5px 10px",
          background: "#232020",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {len} Parent{len === 1 ? "" : "s"}
      </div>
      <ol
        style={{
          paddingInlineStart: "20px",
        }}
      >
        {parents.map((p) => {
          return <Parent key={p.id} parent={p} />;
        })}
      </ol>
    </div>
  );
}

/**
 * @param {Object} props
 * @param {Parent} props.parent
 * @return {JSX.Element}
 */
function Parent({ parent }) {
  const { text } = parent;
  return (
    <li
      style={{
        padding: "5px 5px 10px 5px",
        border: "1px solid #949191",
        marginBottom: "25px",
        borderRadius: "4px",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "5px 5px 15px 5px",
        }}
      >
        <span
          style={{
            flex: 1,
            fontWeight: 900,
          }}
        >
          {text}
        </span>
      </div>
      <ChildForm />
    </li>
  );
}

function ChildForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        type="text"
        value={""}
        style={{ padding: "5px" }}
        placeholder="Child text"
        onChange={(e) => {
          e.preventDefault();
        }}
      />
      <button
        style={{
          padding: "5px 5px",
        }}
        type="submit"
      >
        Add child
      </button>
    </form>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
