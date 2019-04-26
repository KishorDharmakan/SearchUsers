import React, { Component } from 'react'
import './common.css';

let prevDisable = null;
let nextDisable = null;
export default class Pagination extends Component {

  render() {
    const renderPageButtons = () => {
      const currentPage = this.props.currentPage;
      const totalNoOfPages = this.props.totalNoOfPages;
      prevDisable = (currentPage === 1 || totalNoOfPages === 0) ? 'disabled' : '';
      nextDisable = (currentPage === totalNoOfPages || totalNoOfPages === 0) ? 'disabled' : '';
      let val = [];
      for (let intIndexI = 1; intIndexI <= this.props.totalNoOfPages; intIndexI++) {
        const cssStyle = intIndexI === currentPage ? 'page-item active' : 'page-item';
        val.push(<li className={cssStyle} key={intIndexI}>
          <button className="page-link pagination-button-custom"
            onClick={() => this.props.getPageData(this.props.tableData, intIndexI, 10)}
          >
            {intIndexI}
          </button>
        </li>);
      }
      return val;
    }
    
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${prevDisable}`}>
            <button className="page-link pagination-button-custom" tabIndex="-1"
              onClick={() => this.props.getPageData(this.props.tableData, this.props.currentPage - 1, 10)}
            >Previous
                </button>
          </li>
          {renderPageButtons()}
          <li className={`page-item ${nextDisable}`}>
            <button className="page-link pagination-button-custom"
              onClick={() => this.props.getPageData(this.props.tableData, this.props.currentPage + 1, 10)}
            >Next</button>
          </li>
        </ul>
      </nav>
    )
  }
}
