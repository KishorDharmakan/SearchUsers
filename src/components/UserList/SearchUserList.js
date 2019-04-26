import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserListWithFilter as fetchUserListWithFilterActionCreator } from '../../actions/UserList/action_creators';

class SearchUserList extends Component {
    constructor(props){
        super(props);
        this.state={
            searchText:""
        }
    }

    handleOnChange= (event) => {
        this.setState({
            searchText:event.target.value
        })
    }

    handleOnSubmit=(e)=>{
        console.log('inside handleOnSubmit of SearchUserList');
        e.preventDefault();
        this.props.fetchUserListWithFilter(this.props.dataCopyForSearch, this.state.searchText);
    }

  render() {
     return (
      <div>
        <form className="form-inline my-2 my-lg-0">
            <input id="searchItem" className="form-control mr-sm-2" placeholder="Search" aria-label="Search" 
                onChange={this.handleOnChange} value={this.state.searchText} />
            <button className="btn btn-outline-success my-2 my-sm-0 search-button-custom" onClick={this.handleOnSubmit}>Search</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    //dataCopyForSearch: state.listUsers.dataCopyForSearch,
    dataCopyForSearch: state.listUsers.dataCopyForSearch,
  })

const mapDispatchToProps = (dispatch) => ({
    fetchUserListWithFilter: (data, payload) => dispatch(fetchUserListWithFilterActionCreator(data, payload))
  })

  export default connect(mapStateToProps, mapDispatchToProps) (SearchUserList);