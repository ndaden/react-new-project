import initialState from './initialState';
import * as types from '../actions/actionTypes';


function actionEndsInSuccess(str) {
    return str.substring(str.length - 8) == '_SUCCESS';
}


export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action){
    if(action.type == types.BEGIN_AJAX_CALL){
        return state + 1;
    }else if (action.type == types.AJAX_CALL_ERROR || actionEndsInSuccess(action.type)){
        return state - 1;
    }

    return state;
}