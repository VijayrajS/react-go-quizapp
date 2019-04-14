
import React, { Component } from 'react';
import '../DeletePerson.css';

class Reg extends Component {
    constructor() {
            super();
            this.state = {
                data:[],
                clicked : 0
            }
            this.dashHandler = this.dashHandler.bind(this);
        }
        componentDidMount() {
            var user_details =  JSON.parse(window.localStorage.getItem('current_user'))
            const request = new Request('http://127.0.0.1:8080/quizf/dash/' + user_details.id);
            console.log(user_details.id)
            fetch(request)
              .then(response => response.json())
            .then(data => {
                console.log(data)   
                this.setState({data: data})
            });
            console.log(this.state.data)
    }
    dashHandler(event) {
        event.preventDefault();
        this.setState({clicked :1});
    }
   
//User card: Name, Print all stats.
render() {
    return (
    <div>
        <div>
            <h1 align="center">Hello user</h1>
            <button onClick={this.dashHandler}>Dashboard</button>
        </div>
        {this.state.clicked==1 && this.state.data!=null &&
                    <table className="table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>{this.state.data.map(function (item, key) {
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
    );
}
}

export default Reg;
