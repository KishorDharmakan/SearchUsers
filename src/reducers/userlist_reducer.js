import { LOADING_USERLIST } from '../actions/UserList/action_types';
import { FETCH_USERLIST } from '../actions/UserList/action_types';
import { ERROR_USERLIST } from '../actions/UserList/action_types';
import { SEARCH_FETCH_USERLIST } from '../actions/UserList/action_types';
import { UPDATE_FETCH_USERLIST } from '../actions/UserList/action_types';


let stateValue={
    loading: false,
    data:{},
    dataCopyForSearch: {},
    error:''
};
export default function (state , action) {
    console.log('state:', state);
    console.log('action:', action);
    if (typeof state === 'undefined') {
        state = stateValue
      }
    switch (action.type) {

        case LOADING_USERLIST:
            return Object.assign({},state, {loading:true});
        case FETCH_USERLIST:
            return Object.assign({},state, {loading:false, data:action.payload, dataCopyForSearch:action.payload});
        case ERROR_USERLIST:
            return Object.assign({},state, {loading:false, data:{}, error:action.payload});
        case UPDATE_FETCH_USERLIST:
            return Object.assign({},state, {loading:false, data:action.payload, dataCopyForSearch:action.payload});
        case SEARCH_FETCH_USERLIST:
            return Object.assign({},state, {loading:false, data:action.payload });
        default:
            return state;
    }
}
