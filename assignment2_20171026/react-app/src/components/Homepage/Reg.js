import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class Reg extends Component {
    constructor() {
            super();
            this.state = {
                formData: {
                    name: "",
                    password: "",
                },
                submitted: false,
                already_exists: false
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
        event.preventDefault();
        fetch('http://localhost:8080/users', {
            method: 'POST',
            body: JSON.stringify(this.state.formData),
        })
        .then(response => {
            if (response.status >= 200 && response.status < 300)
            this.setState({
                submitted: true,
                already_exists: false
                    });
                else
                    this.setState({
                       already_exists: true
                    });
                    
            });
    }

render() {
    return (
    <div>
        <Router>
        <div>
            <h1 align="center">Register</h1>
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.handleFChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="Password" className="form-control" value={this.state.password} onChange={this.handleLChange}/>
            </div>
                <button type="submit" className="btn btn-default">Register</button>
         </form>
         
         {this.state.submitted &&

          <div>
            <h2>
              New person successfully added.
            </h2>
          </div>
        }
        {this.state.already_exists &&
          <div>
            <h2>
                Username already exists
            </h2>
          </div>
        }
        </div>
        </Router>
    </div>
    );
}
}

export default Reg;
