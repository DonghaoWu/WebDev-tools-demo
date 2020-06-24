import { shallow, mount, render } from 'enzyme';
import React from 'react';
import CardList from './CardList';
import '../setupTests'

it('expect to render CardList component', () => {
    const mockRobots = [
        {
            id: 1,
            name: 'John Snow',
            username: "JohnJohn",
            email: 'john@test.com'
        },
        {
            id: 2,
            name: 'Simon King',
            username: "Sisi",
            email: 'si@test.com'
        }
    ];

    expect(shallow(<CardList robots={mockRobots} />)).toMatchSnapshot();
})
