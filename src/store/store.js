import { Action, createStore } from 'react-sweet-state';

const initialState = {
  data: {
    id: null,
    isNew: true,
  },
};

const actions = {
  getId:
    (id, isNew) =>
    ({ getState, setState }) => {
      setState({
        data: {
          id,
          isNew,
        },
      });
    },
};

const Store = createStore({ initialState, actions });

export default Store;
