import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Homepage extends Component {
render() {
    return (
    <div>
        <div>
            <Router>
            <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                <ul className="nav navbar-nav">
                <li><a href='/Login'>Login</a></li>
                <li><a href='/Register'>Register</a></li>
                </ul>
            </div>
            <h1 align="center">QUIZ APP</h1>
            </nav>
            </Router>
        </div>
    </div>
    );
}
}

export default Homepage;
