import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlocksWithFilter as fetchBlocksWithFilterActionCreator } from '../../actions/BlocksList/action_creators';

class SearchBlockItems extends Component {
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
        e.preventDefault();
        this.props.fetchBlocksWithFilter(this.props.dataCopyForSearch, this.state.searchText);
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
    dataCopyForSearch: state.listBlocks.dataCopyForSearch,
  })

const mapDispatchToProps = (dispatch) => ({
    fetchBlocksWithFilter: (data, payload) => dispatch(fetchBlocksWithFilterActionCreator(data, payload))
  })

  export default connect(mapStateToProps, mapDispatchToProps) (SearchBlockItems);