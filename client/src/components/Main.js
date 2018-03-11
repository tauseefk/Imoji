import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './Homepage';

var name = '';
var images = [];
var avatar = '';

ReactDOM.render(<Homepage name={name} images={images} avatar={avatar} />, document.getElementById('app'));
