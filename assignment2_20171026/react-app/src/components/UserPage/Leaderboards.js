import React, { Component } from 'react';

import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

class Genre extends Component {
    constructor() {
            super();
            this.state = {
                data: [],
                ldata:[]
            };
            this.leadHandler = this.leadHandler.bind(this);
            this.state.clicked = 0;
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

    leadHandler(event){
        var id = event.target.id;
        // var id1 = toString(id);
        const request = new Request('http://127.0.0.1:8080/quizfin/' + id,{
            method: 'GET',
    });
        
        event.preventDefault();
        fetch(request)
            .then(response => response.json())
            .then(ldata => {
                console.log(ldata)
                this.setState({
                    ldata: ldata
                })
            });
             this.state.clicked = 1;
    }
    render() {
        return (
        <div>
            <Router>
            <div>
                <h1 align="center">SELECT A GENRE</h1>
                <div>
                {
                    this.state.data.map((item, key) => {
                    return (
                    <div key = {key}>
                        {console.log(item.id)}
                        <div align="center"><button onClick = {this.leadHandler} id = {item.id}>{item.name}</button></div><br/><br/>
                    </div>

                    )
                })}
                </div>
                { this.state.clicked == 1 && this.state.ldata!=null &&
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.ldata.map(function (item, key) {
                        return (
                            <tr key={key}>
                                <td>{item.name}</td>
                                <td>{item.score}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                }
            </div> 
            </Router>
            </div> 
    );
}
}

export default Genre;
