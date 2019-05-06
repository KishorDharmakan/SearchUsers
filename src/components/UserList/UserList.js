import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserList as fetchUserListActionCreator } from '../../actions/UserList/action_creators';
import TableView from '../common/TableView';
//import Spinner from '../common/Spinner';
import { Spinner } from 'reactstrap';
import Alert from '../common/Alert';

class UserList extends Component {
  componentDidMount() {
    this.props.fetchUserList();
  }

  render() {
    console.log('inside render of UserList this.props:', this.props);
    return (
      <div>
        {this.props.loading
          ?
          <Spinner color="primary" type="grow"/>
          :
          this.props.error ? <Alert errorMessage={this.props.error} />
            : <TableView tableData={this.props.data} colWidthPercentage={[7, 7, 25, 42]} linkColValue="Edit Title" linkDeleteTitle="Delete UserId"/>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.listUsers.loading,
  data: state.listUsers.data,
  error: state.listUsers.error
})

const mapDispatchToProps = (dispatch) => ({
  fetchUserList: () => dispatch(fetchUserListActionCreator())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList);