export function createStore(reducer, middlewares = []) {
  let state;
  const listeners = [];

  console.log('ye');

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(({ subscriber, context }) => {
      subscriber.call(context);
    });
  };

  const subscribe = (subscriber, context = null) => {
    listeners.push({
      subscriber,
      context,
    });
  };

  const getState = () => ({ ...state });
  const store = {
    dispatch,
    getState,
    subscribe,
  };

  middlewares = Array.from(middlewares).reverse();
  let lastDispatch = store.dispatch;

  middlewares.forEach((middleware) => {
    lastDispatch = middleware(store)(lastDispatch);
  });

  // dispatch 대신에 lastDispatch가 들어감
  return { ...store, dispatch: lastDispatch };
}

export const actionCreator = (type, payload = {}) => ({
  type,
  payload: { ...payload },
});
