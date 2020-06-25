import { shallow, mount, render } from 'enzyme';
import React from 'react';
import Mainpage from './Mainpage';
import '../setupTests'

let wrapper;
beforeEach(() => {
    const mockProps = {
        onRequestRobots: jest.fn(),
        robots: [],
        searchField: '',
        isPending: false,
    }
    wrapper = shallow(<Mainpage {...mockProps} />);
})

it('renders Mainpage without crashing', () => {
    expect(wrapper).toMatchSnapshot();
})

it('render h1 tag when isPending is true', () => {
    const mockProps = {
        onRequestRobots: jest.fn(),
        robots: [],
        searchField: '',
        isPending: true,
    }
    wrapper = shallow(<Mainpage {...mockProps} />);
    expect(wrapper.contains(<h1>Loading</h1>)).toBe(true);
})

it('filters robots correctly', () => {
    const mockProps = {
        onRequestRobots: jest.fn(),
        robots: [{
            id: 1,
            name: 'John',
            email: 'john@test.email',
        }],
        searchField: 'john',
        isPending: false,
    }

    wrapper = shallow(<Mainpage {...mockProps} />);
    expect(wrapper.instance().filterRobots()).toEqual(
        [
            {
                id: 1,
                name: 'John',
                email: 'john@test.email',
            }
        ]
    )
})
