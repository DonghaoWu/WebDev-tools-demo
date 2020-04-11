import React from 'react';
import './Hello.css';

const HelloFunc = (props)=>{
    return(
        <div className='f1 tc'>
            <h1>Hello</h1>
            <p>{props.greeting}</p>
        </div>
    )
}

export default HelloFunc;