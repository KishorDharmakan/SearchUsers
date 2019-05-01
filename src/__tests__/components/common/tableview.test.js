import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { TableView } from '../../../components/common/TableView';
import Pagination from '../../../components/common/Pagination';
import { Table } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label,  FormGroup } from 'reactstrap';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';


Enzyme.configure({adapter: new Adapter()});


describe('Displaying Table data', () => {
  const initialProps = {
    colWidthPercentage: [7,7,25,42],
    tableData: [
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
        }], 
    linkColValue: "Edit Title"
  }
  let tableViewWrapper;
  beforeEach(()=>{
    tableViewWrapper =  shallow(<TableView {...initialProps} />);    
  })
  
  //console.log('tableViewWrapper:', tableViewWrapper.html());
    it('should contain initial state values',() => {
    expect(tableViewWrapper.state('pageTableDataState')).to.eql([]); // Deeply equal to be checked for array
    expect(tableViewWrapper.state('modal')).to.eql(false); // Deeply equal to be checked for boolean
    expect(tableViewWrapper.state('modalRowValues')).to.eql([]); // Deeply equal to be checked for array
    expect(tableViewWrapper.state('modalTitleVal')).to.equal("");
    });

    
    it('should contain required props',() => {
      expect(tableViewWrapper.instance().props.colWidthPercentage).to.exist;
      expect(tableViewWrapper.instance().props.tableData).to.exist;
      expect(tableViewWrapper.instance().props.linkColValue).to.exist;
    });

    it('should contain 2 Pagination(s) Components',() => {
     // console.log('tableViewWrapper:', tableViewWrapper.html());
      expect(tableViewWrapper.find(Pagination)).to.have.lengthOf(2);
    });

    it('should contain one Table',() => {
      expect(tableViewWrapper.find(Table)).to.have.lengthOf(1);
    });

    it('should contain valid 5 Table Column headers',() => {
      const tableViewWrapperTableColumns = tableViewWrapper.find(Table).html();
      console.log('tableViewWrapperTableColumns:', tableViewWrapperTableColumns);
      expect(tableViewWrapperTableColumns).to.contain('USERID');
      expect(tableViewWrapperTableColumns).to.contain('ID');
      expect(tableViewWrapperTableColumns).to.contain('TITLE');
      expect(tableViewWrapperTableColumns).to.contain('BODY');
      expect(tableViewWrapperTableColumns).to.contain('Edit Title');
    });

    it('should contain valid 5 + 1 Table rows <tr> (5 - data, 1 header)',() => {
      expect(tableViewWrapper.find('tr')).to.have.lengthOf(6)
    });

    it('should contain Modal state value as false',() => {
      expect(tableViewWrapper.find(Modal)).to.have.lengthOf(1);
      expect(tableViewWrapper.state('modal')).to.eql(false);      
    });

    it('should contain total of one page with current page listed at one',() => {
       const tableViewWrapperPagination = tableViewWrapper.find(Pagination).first();
      //  console.log('tableViewWrapperPagination:', tableViewWrapperPagination);
      //  console.log('tableViewWrapperPagination.instance().props.totalNoOfPages:', tableViewWrapperPagination.props().totalNoOfPages);
      //  expect(tableViewWrapperPagination).to.contain('Previous');
      //  expect(tableViewWrapperPagination).to.contain('1');
      //  expect(tableViewWrapperPagination).to.not.contain('2'); // No page number 2
      //  expect(tableViewWrapperPagination).to.contain('Next');
        expect(tableViewWrapperPagination.props().totalNoOfPages).to.equal(1);
        expect(tableViewWrapperPagination.props().currentPage).to.equal(1);
        expect(tableViewWrapperPagination.props().getPageData).to.exist;
     });

   
});

describe('Edit Title button click', ()=>{
  const initialProps = {
    colWidthPercentage: [7,7,25,42],
    tableData: [
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
        }], 
    linkColValue: "Edit Title"
  }
  const tableViewWrapper =  shallow(<TableView {...initialProps} />);  

  beforeEach(() => {
    const tableViewWrapperButton = tableViewWrapper.find(Button).filter({color:"link"}).at(0); // Fetch the first button with color="link"
    console.log('tableViewWrapperButton:', tableViewWrapperButton);
    tableViewWrapperButton.simulate('click');
   });
   
   it('should contain Modal state value as true',()=>{
      console.log('state(modalTitleVal):', tableViewWrapper.state('modalTitleVal'));
      expect(tableViewWrapper.state('modal')).to.eql(true);
      expect(tableViewWrapper.state('modalRowValues')).to.eql([1, 1,"sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
       "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        ]);
      expect(tableViewWrapper.state('modalTitleVal')).to.equal("sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
   })
})
