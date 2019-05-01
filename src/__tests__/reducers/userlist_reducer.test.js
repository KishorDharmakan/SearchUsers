import { expect } from 'chai';
import * as actionTypes from '../../actions/UserList/action_types';
import reducer from '../../reducers/userlist_reducer';

const initialState = reducer (undefined, {});

describe ('UserList Reducer', ()=>{

    describe('initial state', ()=>{
        it('sets loading as false', ()=>{
            expect(initialState.loading).to.equal(false);
        });
        it('sets data as empty object', ()=>{
            expect(initialState.data).to.eql({});
        });
        it('sets dataCopyForSearch as empty object', ()=>{
            expect(initialState.dataCopyForSearch).to.eql({});
        });
        it('sets error as null', ()=>{
            expect(initialState.error).to.equal("");
        });
    });

    describe('while fetching is in-progress - LOADING_USERLIST', ()=>{
        it('sets loading as true', ()=>{
            const action = {type:actionTypes.LOADING_USERLIST};
            const state =  reducer(initialState, action);
            expect(state.loading).to.equal(true);
        });
    });

    describe('while fetching is complete - FETCH_USERLIST', ()=>{
        let action;
        beforeEach(()=>{
            action = {
                type:actionTypes.FETCH_USERLIST,
                payload:[
                    {
                      "userId": 1,
                      "id": 1,
                      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                    },
                    {
                      "userId": 1,
                      "id": 2,
                      "title": "qui est esse",
                      "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
                    },
                    {
                      "userId": 1,
                      "id": 3,
                      "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
                      "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
                    },
                    {
                      "userId": 1,
                      "id": 4,
                      "title": "eum et est occaecati",
                      "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
                    },
                    {
                      "userId": 1,
                      "id": 5,
                      "title": "nesciunt quas odio",
                      "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
                    }]
            }
        });

        it('sets loading as false', ()=>{
            const tempState =  Object.assign({},initialState, {loading:true}) // Dummy set loading as true to check if the value is updated
            console.log('tempState:', tempState);
            const state =  reducer(tempState, action);            
            expect(state.loading).to.equal(false);
        });
        it('sets data with valid response', ()=>{
            const expectedResponse =  [
                {
                  "userId": 1,
                  "id": 1,
                  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                },
                {
                  "userId": 1,
                  "id": 2,
                  "title": "qui est esse",
                  "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
                },
                {
                  "userId": 1,
                  "id": 3,
                  "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
                  "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
                },
                {
                  "userId": 1,
                  "id": 4,
                  "title": "eum et est occaecati",
                  "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
                },
                {
                  "userId": 1,
                  "id": 5,
                  "title": "nesciunt quas odio",
                  "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
                }]
            const state =  reducer(initialState, action);            
            expect(state.data).to.eql(expectedResponse);
        });

        it('no errors', ()=>{
            const state =  reducer(initialState, action);            
            expect(state.error).to.equal("");
        });
    });

    describe('while fetching returns error - ERROR_USERLIST', ()=>{
        let action;
        beforeEach(()=>{
            action = {
                type:actionTypes.ERROR_USERLIST,
                payload:{error: {status:400}}
            }
        });

        it('sets loading as false', ()=>{
            const tempState =  Object.assign({},initialState, {loading:true}) // Dummy set loading as true to check if the value is updated
            const state =  reducer(tempState, action);            
            expect(state.loading).to.equal(false);
        });
        it('sets data with blank response', ()=>{
           
            const state =  reducer(initialState, action);            
            expect(state.data).to.eql({});
        });

        it('sets error with the error response', ()=>{
            const expectedResponse =  {error: {status:400}}
            const state =  reducer(initialState, action);            
            expect(state.error).to.eql(expectedResponse);
        });
    });

    // There are 2 more scenarios UPDATE_FETCH_USERLIST and SEARCH_FETCH_USERLIST
});