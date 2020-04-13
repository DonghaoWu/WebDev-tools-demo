

<img alt='robots' src={`https://robohash.org/${props.id}?200x200`} />

import React from 'react';
import './Hello.css';

const HelloFunc = ({ greeting }) => {
    return (
        <div className='f1 tc'>
            <h1>Hello</h1>
            <p>{greeting}</p>
        </div>
    )
}

export default HelloFunc;

import React from 'react';
import Card from './Card';

const CardList = ({ robots }) => {
    const cardsArray = robots.map((user, i) => {
        return <Card
            key={i}
            id={robots[i].id}
            name={robots[i].name}
            email={robots[i].email}
        />
    })
    return (
        <div>
            {cardsArray}
        </div>
    )
}