import React, { Component } from 'react'
import { Table } from 'reactstrap';
import Pagination from './Pagination';
//import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import './common.css';

var totalNoOfPages = 0;
var arrayOfArrays = [];
var columnHeaders = null;
var pageTableData = [];
var currentPage = 1;

export default class TableView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageTableDataState: [],
    }
    this.getPageData = this.getPageData.bind(this);
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

  onClickEditTitle(rowVal){
    console.log('inside onClickEditTitle rowVal:', rowVal);
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
    const styleObjSlNo = {
      width: "7%"
    };
    const styleObjViewBlock = {
      width: "15%"
    };
    return (
      <div className="table-custom table-responsive">
        <h5>{this.props.tableHeading}</h5>
        <Pagination getPageData={this.getPageData} totalNoOfPages={totalNoOfPages} currentPage={currentPage} />
        <Table bordered>
          <thead>
            <tr>
              <th scope="col" style={styleObjSlNo}>Sl No:</th>
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

                return <tr key={slNoCounter}><td>{slNoCounter}</td>{rowDataArray.map((rowVal) => (<td >{rowVal}</td>))}<td>{linkColumn}</td></tr>;
              })
              : null}

          </tbody>
        </Table>
        <Pagination getPageData={this.getPageData} totalNoOfPages={totalNoOfPages} currentPage={currentPage} />
      </div>
    )
  }
}
