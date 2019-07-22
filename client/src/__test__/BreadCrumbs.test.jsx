import React from 'react';
import BreadCrumbs from '../components/BreadCrumbs.jsx'

const product = {
  type: 'Chair',
  productName: 'Tracy Chair'
}

describe('<BreadCrumbs /> rendering', () => {
  it('should render one <ul>', () => {
    let wrapper = shallow(<BreadCrumbs product={product} />);
    expect(wrapper.children('ul')).toHaveLength(1);
  });

  it('should have a child of <li>', () => {
    let wrapper = shallow(<BreadCrumbs product={product} />);
    expect(wrapper.find('ul').children('li')).toHaveLength(4);
  });
});