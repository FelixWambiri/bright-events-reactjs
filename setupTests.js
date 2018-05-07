import 'jsdom-global/register';
import 'raf/polyfill';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

configure({ adapter: new Adapter() });
global.requestAnimationFrame = function (callback) {
  setTimeout(callback, 0);
};
