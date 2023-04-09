import { gql } from "@urql/vue";

export const cacheConfig = {
  updates: {
    Mutation: {
      createAction(result, _args, cache, _info) {
        const ActionList = gql`
          {
            actions {
              id
              name
            }
          }
        `;

        cache.updateQuery({ query: ActionList }, (data) => {
          data.actions.push(result.createAction);
          return data;
        });
      },
      // Invalidate cache for actions
      removeAction(_result, args, cache, _info) {
        cache.invalidate({
          __typename: "ActionObject",
          id: args.id,
        });
      },
    },
  },
};
