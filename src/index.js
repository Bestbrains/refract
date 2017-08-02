import React from 'react';
import { shallow } from 'enzyme';

export function Wrap(ComponentUnderTest) {
    let renderedInstance;

    const setInstance = (instance) => renderedInstance = instance;
    const getInstance = () => renderedInstance;

    let Refracted = RefractFactory(setInstance, ComponentUnderTest);
    return { Refracted, instance: getInstance };
}

export default function Refract(ComponentUnderTest, props) {
    let { Refracted, instance } = Wrap(ComponentUnderTest);
    let wrapper = shallow(<Refracted {...props} />);

    return { wrapper, instance }
}

function RefractFactory(setInstance, ComponentUnderTest) {
    class RefractedComponent extends ComponentUnderTest {
        render() {
            setInstance(this);
            return super.render(...arguments);
        }
    }
    for(let key in ComponentUnderTest) {
        // Add static properties over as well.
        RefractedComponent[key] = ComponentUnderTest[key];
    }

    return RefractedComponent;
}