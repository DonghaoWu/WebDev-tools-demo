import React, {Component} from 'react';
import './Hello.css';

class HelloClass extends Component{
    render(){
        return(
            <div className='f1 tc'>
                <h1>Hello</h1>
                <p>{this.props.greeting}</p>
                <img alt='robots' src={`https://robohash.org/te1st?200x200`} />
            </div>
        )
    }
}

export default HelloClass;