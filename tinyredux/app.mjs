import { createStore, actionCreator } from './redux-middleware.mjs';

const INIT = 'init';
const INC = 'inc';
const RESET = 'reset';
const GET_RESPONSE = 'get-response';

function reducer(state = {}, { type, payload }) {
  switch (type) {
    case INIT:
      return {
        ...state,
        count: payload.count,
      };
    case INC:
      return {
        ...state,
        count: state.count + 1,
      };
    case RESET:
      return {
        ...state,
        count: 0,
      };
    case GET_RESPONSE:
      return {
        ...state,
        payload,
      };
    default:
      return { ...state };
  }
}

const middleware = (store) => (dispatch) => (action) => {
  console.log(':: STORE DISPATCH ::');

  if (action.type === GET_RESPONSE) {
    setTimeout(() => {
      console.log('monitor: ', action.type);
      dispatch(action);
    }, 2000);
  } else {
    dispatch(action);
  }
};

const store = createStore(reducer, [middleware]);

store.subscribe(() => {
  console.log('STATE :: ', store.getState());
});

const Init = () => store.dispatch(actionCreator(INIT, { count: 1 }));
const Reset = () => store.dispatch(actionCreator(RESET));
const Increment = () => store.dispatch(actionCreator(INC));
const GetResponse = () => store.dispatch(actionCreator(GET_RESPONSE));

Init();
Increment();
Reset();
Increment();
GetResponse();
