import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class Login extends Component {
    constructor() {
            super();
            this.state = {
                formData: {
                    name: "",
                    password: "",
                },
                wrong_login: false
            }
            this.handleFChange = this.handleFChange.bind(this);
            this.handleLChange = this.handleLChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
    
    handleFChange(event) {
        this.state.formData.name = event.target.value;
    }
    handleLChange(event) {
        this.state.formData.password = event.target.value;
    }
    handleSubmit(event) {
        var user_data = {
            uname: this.state.formData.name,
            id: 0,
            isadmin: 0,
        }
         this.setState({
             wrong_login: false
         });
        event.preventDefault();
        fetch('http://localhost:8080/users/' + this.state.formData.name)
            .then(response => {
                response.json()
                .then(data => {
                    // console.log(data);
                    if (response.status >= 200 && response.status < 300 && data.password == this.state.formData.password) {
                        if(data.isadmin) 
                            user_data.isadmin = 1;
                        user_data.id = data.id;
                        console.log(response)
                        localStorage.setItem('current_user', JSON.stringify(user_data));
                        console.log(localStorage.getItem('current_user'))
                        window.location.assign("/home")
                    } else
                        this.setState({
                            wrong_login: true
                        })

                })
            });
    }

render() {
    return (
    <div>
        <div>
            <h1 align="center">Login</h1>
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.handleFChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="Password" className="form-control" value={this.state.password} onChange={this.handleLChange}/>
            </div>
                <button type="submit" className="btn btn-default">Login</button>
         </form>
        </div>
        {this.state.wrong_login &&
          <div>
            <h2>
                Invalid login credentials 
            </h2>
          </div>
        }
    </div>
    );
}
}

export default Login;
