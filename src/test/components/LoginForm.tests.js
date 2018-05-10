import { mount, shallow } from 'enzyme';
import expect from 'expect';
import LoginForm from '../../components/auth/LoginForm';
import React from 'react';
import enzymify from 'expect-enzyme';
import Enzyme from 'enzyme/build/index';
import Adapter from 'enzyme-adapter-react-16/build/index';


expect.extend(enzymify());
Enzyme.configure({ adapter: new Adapter() });

function setup(loading = false, loggedIn = false) {
  const props = {
    classes: {},
    loading,
    history: { push: date => console.log('redirecting to ', date) },
    error: {},
    isLoggedIn: () => loggedIn,
  };
  return shallow(<LoginForm {...props} />);
}

describe('Test Login Form works', () => {
  it('it should have a container div with correct classNames ', () => {
    const wrapper = setup(false, false);
    expect(wrapper.find('.col-md-4.offset-md-4.col-sm-12.col-xs-12').length).toBe(1);
    expect(wrapper.find('.ui.centered.header').text()).toEqual('Login');
    expect(wrapper.find('form').length).toBe(1);
  });
});

