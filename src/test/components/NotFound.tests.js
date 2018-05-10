import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import NotFound from '../../components/error-pages/not-found/NotFound';
import { Card } from 'material-ui';


describe('Not Found component tester', () => {
  const wrapper = shallow(<NotFound />);
  it('should render without throwing an error', () => {
    expect(wrapper.length).toBe(1);
  });
});
