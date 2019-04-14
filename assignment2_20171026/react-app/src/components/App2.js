import React, { Component } from 'react';

import Homepage  from "./Homepage/Homepage";
import Login from './Homepage/Login';
import Reg from './Homepage/Reg';
import UserPage from "./UserPage/UserPage";

import Home from './UserPage/Home';
import Genre from './UserPage/Genre';
import Quizzes from './UserPage/Quizzes';
import QuizQ from './UserPage/QuizQ';
import Leaderboards from './UserPage/Leaderboards';
import Admin_quiz from './UserPage/Admin_quiz';
import Admin_quizedit from './UserPage/Admin_quizedit';
import Admin_viewdelete from './UserPage/Admin_viewdelete';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App2 extends Component {
render() {
    var info = JSON.parse(window.localStorage.getItem('current_user'))
    if(info == null)
        return (
        <div>
            <Router>
            <div>
                <Homepage/>
            <Switch>
                <Route exact path={'/Login'} component={Login} />
                <Route exact path={'/Register'} component={Reg} />
            </Switch>
            </div>
            </Router>
        </div>
        );
    else
        return (
        <div>
            <Router>
            <div>
                <UserPage/>
                <Switch>
                <Route exact path='/home' component={Home} />
                <Route exact path='/genre' component={Genre} />
                <Route exact path='/quizzes/:id' component = {Quizzes}/>
                <Route exact path='/quizq/:id' exact component = {QuizQ}/>
                <Route exact path='/leaderboards' component = {Leaderboards}/>

                { /* Conditional rendering */ }    
                <Route exact path = '/Admin/Users' component={Admin_viewdelete} />
                <Route exact path = '/Admin/Quiz' component={Admin_quiz} />
                <Route exact path = '/Admin/quizedit/:id' component={Admin_quizedit}/>
                </Switch>
            </div>
            </Router>
        </div>
        );
}
}

export default App2;