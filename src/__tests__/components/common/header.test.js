import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Header from '../../../../src/components/common/Header';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

Enzyme.configure({adapter: new Adapter()});

test('Rendering of Header Text', () => {
  const headerWrapper = shallow(<Header />);
  console.log('headerWrapper:', headerWrapper.html());
  expect(headerWrapper.text()).to.equal('User List Application');
  expect(headerWrapper.find('h1')).to.have.lengthOf(1);
  expect(headerWrapper.find('.text-center')).to.have.lengthOf(1);

});