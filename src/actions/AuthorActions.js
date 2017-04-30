import * as types from './actionTypes';
import AuthorsApi from '../api/mockAuthorApi';
import {beginAjaxCall} from './ajaxStatusAction';

//ACTION CREATORS
export function loadAuthorsSuccess(authors){
    return {type : types.LOAD_AUTHORS_SUCCESS, authors};
}



//THUNKS : handle asynchronous calls and dispatch actions when promises are resolved
export function loadAuthors(){
    return function (dispatch){
        dispatch(beginAjaxCall());
        return AuthorsApi.getAllAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {throw(error);});
    };
}