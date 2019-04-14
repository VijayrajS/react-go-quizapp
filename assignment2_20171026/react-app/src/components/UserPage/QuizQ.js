
import React, { Component } from 'react';

import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

class QuizQ extends Component {
    constructor(props) {
            super(props);
            this.state = {
                id :this.props.match.params.id,
                quizfin: {
                        user: 0,
                        quiz: 0,
                        marks: 0
                    },
                    data: [],
                    submitted: false,
                }

                this.handleSubmit = this.handleSubmit.bind(this);
            }
        
                
        componentDidMount() {
            const request = new Request('http://127.0.0.1:8080/questions/' +  this.props.match.params.id);
            fetch(request)
            .then(response => response.json())
            .then(data => {
                console.log(this.state.id)
                this.state.quizfin.quiz = parseInt(this.state.id);   
                this.setState({data: data})
            });}

    

    handleSubmit(event){
         var user_data = JSON.parse(window.localStorage.getItem('current_user'));
         this.state.quizfin.user = user_data.id;
         event.preventDefault();
         console.log(user_data)
         console.log(this.state.data.length)
         for (let index = 0; index < this.state.data.length; index++) {
             let quest_key = this.state.data[index];
             console.log(quest_key)
             let id1 = quest_key.quid + "a",
                 id2 = quest_key.quid + "b",
                 id3 = quest_key.quid + "c",
                 id4 = quest_key.quid + "d";
                 
             let ans1 = quest_key.opt1c,
                 ans2 = quest_key.opt2c,
                 ans3 = quest_key.opt3c,
                 ans4 = quest_key.opt4c;
             
            let choice1 = document.getElementById(id1).checked,
                choice2 = document.getElementById(id2).checked,
                choice3 = document.getElementById(id3).checked,
                choice4 = document.getElementById(id4).checked;

            if (ans1 == choice1 && 
                ans2 == choice2 &&
                ans3 == choice3 &&
                ans4 == choice4)
                this.state.quizfin.marks += 1;
         }

        console.log(this.state.quizfin)

        fetch('http://localhost:8080/quizfin/', {
            method: 'POST',
            body: JSON.stringify(this.state.quizfin),
        })

        alert("You scored "+this.state.quizfin.marks);
        window.location.assign("/home")
    }
    
      render() {
        return (
        <div>
            <div>
                <h1 align="center"></h1>
                <h2>QUIZ TIME!!!</h2>
                <div>{
                    this.state.data.map(function(item, key) {
                    return (
                        <ul key = {key}>
                            <li>{item.ques}</li>
                            <input type = "checkbox"  id={item.quid+"a"}/>{item.opt1}<br/>
                            <input type = "checkbox"  id={item.quid+"b"}/>{item.opt2}<br/>
                            <input type = "checkbox"  id={item.quid+"c"}/>{item.opt3}<br/>
                            <input type = "checkbox"  id={item.quid+"d"}/>{item.opt4}<br/>
                        </ul>
                    )
                })}
                
                </div>
                <button type="submit" onClick = {this.handleSubmit } className="btn btn-default">Submit</button>              
 
            </div>
        </div>
    );
}
}


export default QuizQ;
