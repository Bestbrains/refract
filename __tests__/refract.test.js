import { shallow } from 'enzyme';
import React from 'react';

import Refract, { Wrap } from '../src/index';
import { TestScreen } from './component.js';

test('Refract calls proper functions and lifecycle hooks of underlying component', () => {
    const props = {
        click: jest.fn(),
        mount: jest.fn()
    };

    let {wrapper, instance} = Refract(TestScreen, props);
    let self = instance();

    expect(wrapper).toBeDefined();
    expect(self).toBeDefined();

    expect(props.mount).not.toHaveBeenCalled();
    self.componentDidMount();
    expect(props.mount).toHaveBeenCalledWith("Registered mount");

    expect(props.click).not.toHaveBeenCalled();
    wrapper.find('Button[title="Click!"]').simulate('press');
    expect(props.click).toHaveBeenCalledWith("Registered click");
});

test('Wrap adds static props as well', () => {
    let { Refracted } = Wrap(TestScreen);

    expect(Refracted).toBeDefined();

    expect(Refracted.staticProperty).toBeDefined();
    expect(Refracted.staticProperty.property).toBe("static");

    expect(Refracted.otherStaticProperty).toBeDefined();
    expect(Refracted.otherStaticProperty.hello).toBe("World");
});

test('Shallow rendering the Refracted component with enzyme manually works as well', () => {
    let { Refracted, instance } = Wrap(TestScreen);

    const props = {
        click: jest.fn(),
        mount: jest.fn()
    };
    let wrapper = shallow(<Refracted {...props} />);

    expect(wrapper).toBeDefined();

    let self = instance();
    expect(self).toBeDefined();

    expect(props.mount).not.toHaveBeenCalled();
    self.componentDidMount();
    expect(props.mount).toHaveBeenCalledWith("Registered mount");

    expect(props.click).not.toHaveBeenCalled();
    wrapper.find('Button[title="Click!"]').simulate('press');
    expect(props.click).toHaveBeenCalledWith("Registered click");
});