# Refract

A module designed to make it a bit easier to access the instance of the component you're rendering for tests.

We're currently developing in React Native 0.46.x and they have a dependency on React 16 in alpha (or beta).
We like to test our components using Enzyme (airbnb/enzyme), but they currently don't support React 16 as it's not in a stable release yet.

It works for the most part, but we've faced a problem accessing the underlying instance of the component when doing shallow rendering. (instance is undefined)

This package provides a workaround, by wrapping the component you want to test, and exposing the instance to you.

To use:

    import Refract from 'react-refract';

    import { Component } from './component.js'; // Component under test

    test('Component', () => {
        // Define the props for your <Component />
        const props = { ... };

        let {wrapper, instance} = Refract(Component, props); // This is instead of doing shallow(<Component ...props/>
        let self = instance(); // Access the instance after shallow rendering, like in Enzyme

        expect(wrapper).toBeDefined();
        expect(self).toBeDefined();

        self.componentDidMount();
        expect(...).toBe(...); // Test on whatever goes on in componentDidMount...

        wrapper.find('Button[title="Click!"]').simulate('press'); // Simulate works as usual
    });

You can also use the underlying Wrap function and just use shallow from enzyme if you prefer to mount your props the old fashioned way:

    import { Wrap } from 'react-refract';
    import { shallow } from 'enzyme';

    import { Component } from './component.js'; // Component under test

    test('Shallow rendering the Refracted component with enzyme manually works as well', () => {
        let { Refracted, instance } = Wrap(TestScreen);

        const props = { ... };
        let wrapper = shallow(<Refracted {...props} />); // Usual rendering of the component

        expect(wrapper).toBeDefined();

        let self = instance(); // Call this after rendering (the instance is not assigned before render is called on the component)
        expect(self).toBeDefined();

        self.componentDidMount();
        expect(...).toBe(...); // Test on whatever goes on in componentDidMount...

        wrapper.find('Button[title="Click!"]').simulate('press'); // use the enzyme wrapper as usual...
    });


Enjoy!

# Thanks
Thanks to the guys at airbnb/enzyme. We can't wait for further support for the react-native workflow.