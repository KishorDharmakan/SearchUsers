import * as actionTypes from './action_types';
import { createAction } from 'redux-actions';
import { stubUserListData } from './stub';


export const fetchUserList = () => dispatch => {
    dispatch(createAction(actionTypes.LOADING_USERLIST)());
    fetch("http://localhost:3100/userDetails", { mode: 'no-cors' })
        .then((resp) => resp)
        .then(function (data) {
            console.log('inside fetchBlocks stubUserListData.userList:', stubUserListData.userList);
            dispatch(createAction(actionTypes.FETCH_USERLIST)(stubUserListData.userList)); // adapter to get only the required columns

        })
        .catch(function (error) {
            dispatch(createAction(actionTypes.ERROR_USERLIST)(error));
        });
}

export const fetchUserListWithFilter = (data, payload) => dispatch => {

    const filterData = data.filter((record) => {
        return (record.height.includes(payload) || record.hash.includes(payload)
            || record.time.includes(payload));  // Contains search
    })
    dispatch(createAction(actionTypes.SEARCH_FETCH_USERLIST)(filterData));

}