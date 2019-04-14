
import React, { Component } from 'react';

import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

class Genre extends Component {
    constructor() {
            super();
            this.state = {
                data: []
            }
        }
        
        componentDidMount() {
            const request = new Request('http://127.0.0.1:8080/genre/');
            fetch(request)
            .then(response => response.json())
            .then(data => {
                console.log(data)   
                this.setState({data: data})
            });
            console.log(this.state.data);
    }
        dmumy(){window.location.reload()}

    
    render() {
        return (
        <div>
            <Router>
            <div>
                <h1 align="center">SELECT A GENRE</h1>
                <div>{
                    this.state.data.map(function(item, key) {
                    return (
                    <div key = {key} align="Center">
                        <a href={"/quizzes/"+item.id} ><button>{item.name}</button></a><br/><br/>
                    </div>

                    )
                })}
                </div> 
            </div>
            </Router>
        </div>
    );
}
}

export default Genre;
