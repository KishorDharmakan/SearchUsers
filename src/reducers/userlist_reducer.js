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
            const updatedData = updateTitleInJSONData(state, action.payload);
            console.log('updatedData:', updatedData);
            return Object.assign({},state, {loading:false, data:updatedData});
        case SEARCH_FETCH_USERLIST:
            return Object.assign({},state, {loading:false, data:action.payload });
        default:
            return state;
    }
}

function updateTitleInJSONData(existingJSON, payload){
    console.log('inside updateTitleInJSONData existingJSON:', existingJSON);
    console.log('inside updateTitleInJSONData payload:', payload);
    const existingJSONData=existingJSON.data;
    const objIndex = existingJSONData.findIndex((val => val.id === payload[1]));
    console.log('objIndex:', objIndex);
    existingJSONData[objIndex].title = payload[2];
    // const finalVal= Object.assign({},stateVal, 
    //                                 {userId: 1, id: 2, title: "34", 
    //                                         body: "est rerum tempore vitae↵sequi sint nihil reprehend…aperiam non debitis possimus qui neque nisi nulla"});
    console.log('finalVal:', existingJSONData);
    return existingJSONData;
    }