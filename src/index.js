import React,{Component} from 'react';
import {render} from 'react-dom';
import *as Comp from './component';

class App extends Component{
	render(){
		return (
		       <div>
		       <h1>welcom</h1>
		       </div>
		       )
	}
}

let root = document.getElementById('app');
render(<App />,root);