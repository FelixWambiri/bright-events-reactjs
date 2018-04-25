import 'jsdom-global/register';
import 'raf/polyfill';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { mount, shallow } from 'enzyme';
import enzymify from 'expect-enzyme';

expect.extend(enzymify());
Enzyme.configure({ adapter: new Adapter() });

global.requestAnimationFrame = function (callback) {
  setTimeout(callback, 0);
};
global.React = React;
global.Router = Router;
global.expect = expect;
global.Adapter = Adapter;
global.Enzyme = Enzyme;
global.mount = mount;
global.shallow = shallow;
