import * as actionTypes from './action_types';
import { createAction } from 'redux-actions';
import adapter from './adapter';
import { stubUserListData } from './stub';


export const fetchUserList = () => dispatch => {
    dispatch(createAction(actionTypes.LOADING_USERLIST)());
    return fetch("http://localhost:3100/userDetails")
        .then((resp) => {
            console.log('resp:', resp);
            return resp.json();
        })
        .then((data => {
                console.log('inside fetchUserList data:', data);
                // To show the spinner, adding extra 3 seconds delay
                setTimeout(()=>{
                    dispatch(createAction(actionTypes.FETCH_USERLIST)(data)); // adapter to get only the required columns
                },3000);
                //dispatch(createAction(actionTypes.FETCH_USERLIST)(data)); // adapter to get only the required columns
    
            
        }))
        .catch(function (error) {
            dispatch(createAction(actionTypes.ERROR_USERLIST)(error));
        });
}

export const updateUserListWithTitle = (rowData, title) => dispatch => {
    console.log('inside updateUserListWithTitle rowData:', rowData);
    console.log('inside updateUserListWithTitle title:', title);
    const updatedData = adapter(rowData, title);
    console.log('inside updateUserListWithTitle updatedData:', updatedData);
    dispatch(createAction(actionTypes.UPDATE_FETCH_USERLIST)(updatedData));

}

export const fetchUserListWithFilter = (data, payload) => dispatch => {
    console.log('inside fetchUserListWithFilter of Action Creator data:', data);
    console.log('inside fetchUserListWithFilter of Action Creator payload:', payload);
    const filterData = data.filter((record) => {
        return (record.title.includes(payload));  // Contains search
    })
    dispatch(createAction(actionTypes.SEARCH_FETCH_USERLIST)(filterData));

}