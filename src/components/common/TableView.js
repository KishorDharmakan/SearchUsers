import React, { Component } from 'react'
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import Pagination from './Pagination';
//import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label,  FormGroup } from 'reactstrap';
import './common.css';
import { updateUserListWithTitle as updateUserListWithTitleActionCreator } from '../../actions/UserList/action_creators';

var totalNoOfPages = 0;
var arrayOfArrays = [];
var columnHeaders = null;
var pageTableData = [];
var currentPage = 1;

export class TableView extends Component {

  constructor(props) {    
    super(props);
    console.log('inside constructor this.props:', this.props);
    this.state = {
      pageTableDataState: [],
      modal: false,
      modalRowValues:[],
      modalTitleVal:"",
      //unmountOnClose: true      
    }
    this.getPageData = this.getPageData.bind(this);
    this.toggle = this.toggle.bind(this);
    //this.changeUnmountOnClose = this.changeUnmountOnClose.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
  }

  getColumnNames = (rowVal) => {
    let colNames = [];
    for (var key in rowVal) {
      colNames.push(key);
    }
    return colNames;
  }


  getPageData(tableData, pageNum, itemsPerPage) {

    pageTableData = arrayOfArrays[pageNum - 1];
    currentPage = pageNum;
    this.setState({
      pageTableDataState: arrayOfArrays[pageNum - 1],
    })
  }

  toggle(values) {
    this.setState(prevState => ({
        modal: !prevState.modal,
        modalRowValues: values,
        modalTitleVal:values[2],
    }));
  }

  // changeUnmountOnClose(e) {
  //     let value = e.target.value;
  //     console.log('inside changeUnmountOnClose value:', value);
  //     //this.setState({ unmountOnClose: JSON.parse(value) });
  // }

  onChangeTitle(e){
    console.log('inside onChangeTitle e.name:', e.target.name);
    console.log('inside onChangeTitle e.value:', e.target.value);
    this.setState({
      modalTitleVal:e.target.value
    })
  }


  onClickEditTitle(rowVal){
    console.log('inside onClickEditTitle rowVal:', rowVal);
    this.toggle(rowVal);
  }

  onClickSave(){
    console.log('inside onClickSave this.state.modalRowValues:', this.state.modalRowValues);
    console.log('inside onClickSave this.state.modalTitleVal:', this.state.modalTitleVal);
    this.setState(prevState => ({
      modal: !prevState.modal,
  }));
    this.props.updateUserListWithTitle(this.state.modalRowValues,this.state.modalTitleVal);
  }

  formArrayOfArraysForPageSplit() {
    const colNames = this.getColumnNames(this.props.tableData[0]);
    const { tableData } = this.props;
    const colWidthPercentage = this.props.colWidthPercentage;
    let intForColWidth = -1;
    columnHeaders = colNames.map((colName) => {
      intForColWidth++;
      const styleObj = {
        width: colWidthPercentage[intForColWidth] + "%"
      };
      return <th key={colName} scope="col" style={styleObj}>{colName.toUpperCase()}</th>
    }
    )

    arrayOfArrays = [];
    pageTableData = [];
    if (tableData.length !== undefined) {
      tableData.forEach((item) => {
        if (!arrayOfArrays.length || arrayOfArrays[arrayOfArrays.length - 1].length === 10)
          arrayOfArrays.push([]);

        arrayOfArrays[arrayOfArrays.length - 1].push(item);
      });
    }


    totalNoOfPages = arrayOfArrays.length;
    currentPage = currentPage <= totalNoOfPages ? currentPage : 1;
    pageTableData = arrayOfArrays[currentPage - 1];

  }
  render() {

    this.formArrayOfArraysForPageSplit();
    let slNoCounter = 0;
    const styleObjViewBlock = {
      width: "19%"
    };
    return (
      <div className="table-custom table-responsive">
        <Pagination getPageData={this.getPageData} totalNoOfPages={totalNoOfPages} currentPage={currentPage} />
        <Table bordered>
          <thead>
            <tr>
              {columnHeaders}
              <th scope="col" style={styleObjViewBlock}>{this.props.linkColValue}</th>
            </tr>
          </thead>
          <tbody>
            {pageTableData !== undefined && pageTableData.length !== undefined
              ? pageTableData.map((rowData) => {
                let rowDataArray = [];
                slNoCounter++;
                let linkColumn = null;
                for (let i = 0; i < Object.keys(rowData).length; i++) {
                  const col = Object.keys(rowData)[i];
                  rowDataArray.push(rowData[col])
                }
                console.log('inside render of TableView rowDataArray:', rowDataArray);
                //linkColumn = <Link to={`/block/${rowData["height"]}`} >{this.props.linkColValue} </Link>;
                linkColumn = <Button color="link" onClick={()=>this.onClickEditTitle(rowDataArray)} >{this.props.linkColValue}</Button> ;

                return <tr key={slNoCounter}>{rowDataArray.map((rowVal) => (<td >{rowVal}</td>))}<td>{linkColumn}</td></tr>;
              })
              : null}

          </tbody>
        </Table>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className='modalstyle'>
            <ModalHeader toggle={this.toggle}>Edit Title</ModalHeader>
            <ModalBody>
              <FormGroup><Label for="id">Id</Label>: <Label>{this.state.modalRowValues[1]}</Label> </FormGroup>
              <FormGroup><Label for="title">Title</Label>: <Input
                name="title"
                id="title"
                placeholder="please enter title"
                value={this.state.modalTitleVal}
                onChange={this.onChangeTitle}
              />
               </FormGroup>
               <FormGroup><Label for="body">Body</Label>: <Label>{this.state.modalRowValues[3]}</Label></FormGroup>
              
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => this.onClickSave()}>Save</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
        <Pagination getPageData={this.getPageData} totalNoOfPages={totalNoOfPages} currentPage={currentPage} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateUserListWithTitle: (data, payload)  => dispatch(updateUserListWithTitleActionCreator(data, payload))
})

export default connect(null, mapDispatchToProps)(TableView);