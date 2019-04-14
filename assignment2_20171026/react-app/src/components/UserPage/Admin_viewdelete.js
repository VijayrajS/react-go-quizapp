import React, { Component } from 'react';
import '../DeletePerson.css';

class Admin_viewdelete extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      value: 0
    }
    this.Click = this.Click.bind(this);
    this.Submit = this.Submit.bind(this);
  }

  Click(event){
    console.log(event.target.value);
    this.setState({value:event.target.value});
  }

  Submit (event) {
    event.preventDefault();
    fetch('http://127.0.0.1:8080/users/'+this.state.value, {
     method: 'delete',
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
        window.location.reload();
      });
  }
  componentDidMount() {
    fetch('http://127.0.0.1:8080/users/',{
      method:'get'
    })
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Users</h1>
        </header>
        <form onSubmit={this.Submit}>
          <table className="table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Password</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map((item, key)=>{
                 return (
                    <tr key = {key}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.password}</td>
                        <td><input type="radio" value={item.name} name="radio" onClick={this.Click}/></td>
                    </tr>
                  )
               })}
            </tbody>
          </table>
          <button type="submit" className="btn btn-default">Delete Users</button>
        </form>
      </div>
    );
  }
}

export default Admin_viewdelete;