import searchService from '../../../services/search/searchService';
import { actionTypes } from '../RepoSearchConstants';

export const fetchRepos = () => async (dispatch) => {
  let error = '';
  dispatch({
    type: actionTypes.REQUEST_START,
  });
  try {
    const { results } = await searchService.repoSearch();
    dispatch({
      type: actionTypes.UPDATE_RESULTS,
      items:results,
    });
  }
  catch ({ message }) {
    error = message;
  }
  dispatch({
    type: actionTypes.REQUEST_COMPLETE,
    error,
  });
};
