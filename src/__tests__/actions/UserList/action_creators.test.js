import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../../actions/UserList/action_creators';
import * as types from '../../../actions/UserList/action_types'
import fetchMock from 'fetch-mock'
import { expect } from 'chai';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore();

const mockResult = { data: [
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
  }]};

describe('fetch User List Action', () => {
  beforeEach(()=>{
    store.clearActions();
  })
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore()
  })

  it('creates FETCH_USERLIST when fetching is complete', () => {
    fetchMock.getOnce('http://localhost:3100/userDetails',mockResult );

 
    const expectedActions = [
      { type: types.LOADING_USERLIST },
      { type: types.FETCH_USERLIST, body: { data: [
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
        } ]
        } }
    ]

    
    store.dispatch(actions.fetchUserList()).then(() => {
      // return of async actions
      console.log('store.getActions:', store.getActions());
      expect(store.getActions()).to.eql(expectedActions)
    })
  })
})

describe('updateUserListWithTitle', () => {
  beforeEach(()=>{
    store.clearActions(); // always clear else previous type will be appended in the response
  })
  it('Dispatches the correct action and payload', () => {
    const expectedActions = [
      { type: types.UPDATE_FETCH_USERLIST, payload:[1,1,"Updated Title", "Content of the User"] }
    ]

    store.dispatch(actions.updateUserListWithTitle([1,1,"Existing Title", "Content of the User"],"Updated Title"));
    console.log('store.getActions():', store.getActions());
    expect(store.getActions()).to.eql(expectedActions);
  });
});


describe('fetchUserListWithFilter', () => {
  beforeEach(()=>{
    store.clearActions(); // always clear else previous type will be appended in the response
  })
  it('Dispatches the correct action and payload', () => {
    const expectedActions = [
      { type: types.SEARCH_FETCH_USERLIST, payload: [{
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitaesequi sint nihil reprehenderit dolor beatae ea dolores nequefugiat blanditiis voluptate porro vel nihil molestiae ut reiciendisqui aperiam non debitis possimus qui neque nisi nulla"
      }] }
    ]

    const inputData= [
      {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipitsuscipit recusandae consequuntur expedita et cumreprehenderit molestiae ut ut quas totamnostrum rerum est autem sunt rem eveniet architecto"
      },
      {
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitaesequi sint nihil reprehenderit dolor beatae ea dolores nequefugiat blanditiis voluptate porro vel nihil molestiae ut reiciendisqui aperiam non debitis possimus qui neque nisi nulla"
      }];

    const searchData="qui est esse";
    store.dispatch(actions.fetchUserListWithFilter(inputData, searchData));
    console.log('store.getActions():', store.getActions());
    console.log('store.getActions():', store.getActions()[0].payload);
    console.log('expectedActions:', expectedActions);
    console.log('expectedActions:', expectedActions[0].payload);
    expect(store.getActions()).to.eql(expectedActions);
  });
});