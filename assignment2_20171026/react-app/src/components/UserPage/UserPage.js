import React, { Component } from 'react';

import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

class UserPage extends Component {
    constructor() {
            super();
            this.state = {
                userdata : JSON.parse(window.localStorage.getItem('current_user'))
                }
                this.signOut = this.signOut.bind(this)
            }

            signOut(event)
            {
                event.preventDefault();
                window.localStorage.clear();
                window.location.assign("/Login");
            }
render() {
    return (
    <div>
            <h1 align="center">{this.state.userdata.uname}</h1>
        <Router>
        <div>
            <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                <a className="navbar-brand" href={'/'}>React App</a>
                </div>
                <ul className="nav navbar-nav">
                <li><a href={'/home'}>Home</a></li>
                <li><a href={'/genre'}>Genre</a></li>
                <li><a href={'/leaderboards'}>Leaderboards</a></li>
                { this.state.userdata.isadmin &&
                        <li><a href={'/Admin/Users'}>Users</a></li>
                }
                { this.state.userdata.isadmin &&
                    <li><a href={'/Admin/Quiz'}>Quizzes</a></li>
                }
                <li><button onClick = {this.signOut}>Sign Out</button></li>
            
            </ul>
            </div>
            </nav>
        </div>
        </Router>
    </div> 
    );
}
}

export default UserPage;