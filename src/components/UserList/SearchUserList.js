import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Col, FormGroup } from 'reactstrap';
import { fetchUserListWithFilter as fetchUserListWithFilterActionCreator } from '../../actions/UserList/action_creators';
import Autocomplete from './Autocomplete';
import './userlist.css';

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

    handleOnReset=(e)=>{
        console.log('inside handleOnReset of SearchUserList');
        e.preventDefault();
        this.props.fetchUserListWithFilter(this.props.dataCopyForSearch, "");
    }

  render() {
     return (
      <div>
        <FormGroup row>
            <Col sm={5}>
            <Input id="searchItem" placeholder="Search Title" aria-label="Search" 
                onChange={this.handleOnChange} value={this.state.searchText} />
            </Col>
            <Button className="btn btn-outline-success my-2 my-sm-0 search-button-custom" onClick={this.handleOnSubmit}>Search</Button>
            <Button className="reset-button-custom" color="primary" onClick={this.handleOnReset}>Reset</Button>           
        </FormGroup>   
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