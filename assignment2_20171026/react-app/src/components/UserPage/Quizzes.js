
import React, { Component } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

class Quizzes extends Component {
    constructor(props) {
        console.log("COnstructor");
            super(props);
            this.state = {
                data: [],
                id : props.match.params,
                genre: []
            }
        }
        
        
        componentDidMount() {
            const request = new Request('http://127.0.0.1:8080/quizzes/' + this.props.match.params.id);
            fetch(request)
              .then(response => response.json())
            .then(data => {
                console.log(data)   
                this.setState({data: data})
            });
            console.log(this.state.data)
    }


      render() {
          console.log("entered");
        return (
        <div>
            <Router>
            <div>
                <h1 align="center">QUIZZES</h1>
                <div>{
                    this.state.data.map(function(item, key) {
                    return (
                    <div key = {key} align="center">
                        <a href={"/quizq/"+item.id} ><button type="submit">{item.name}</button></a><br/><br/>
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


export default Quizzes;
