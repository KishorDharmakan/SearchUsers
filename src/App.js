import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from '../src/components/UserList/UserList';
import SearchUserList from '../src/components/UserList/SearchUserList';

function App() {
  return (
    <div className="App">
      <SearchUserList />
      <UserList />    
    </div>
  );
}

export default App;
