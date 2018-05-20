import { actionTypes } from '../RepoSearchConstants';

const initialState = {
  results: [],
  error: '',
  loading: false,
  morningMinTime: 6,
  morningMaxTime: 8,
  afternoonMinTime: 8,
  afternoonMaxTime: 12,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_RESULTS: {
      return { ...state, results: action.items };
    }
    case actionTypes.REQUEST_COMPLETE: {
      const results = state.results.map(value => Object.assign({}, value));
      return { ...state, error: action.error, loading: false, results };
    }
    case actionTypes.REQUEST_START: {
      return { ...state, loading: true };
    }
    case actionTypes.SLIDER_CHANGE: {
      if (action.name == 'morning') {
          return {
            ...state,
            morningMinTime: action.value[0],
            morningMaxTime: action.value[1],
          };
      } else {
          return {
            ...state,
            afternoonMinTime: action.value[0],
            afternoonMaxTime: action.value[1],
          };
      }
    }
    default:
      return state;
  }
};
