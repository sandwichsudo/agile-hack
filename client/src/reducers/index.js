 import { combineReducers } from 'redux';
 import repoSearch from '../containers/RepoSearchPage/reducer/RepoSearchReducer';

 const rootReducer = combineReducers({
   repoSearch,
 });

 export default rootReducer;
