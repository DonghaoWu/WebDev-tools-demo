import React from 'react';
import './Hello.css';

const HelloFunc = (props) => {
    const { greeting } = props;
    return (
        <div className='f1 tc'>
            <h1>Hello</h1>
            <p>{greeting}</p>
        </div>
    )
}

export default HelloFunc;