import React, { Component } from 'react';
import '../ViewPeople.css';

class Admin_quizedit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      quizid : this.props.match.params.id,
      value :0,
      formData: {
          ques: "",
          opt1: "",
          opt2: "",
          opt3: "",
          opt4: "",
          opt1c: false,
          opt2c: false,
          opt3c: false,
          opt4c: false,
          qid: parseInt(this.props.match.params.id)
      },
    }
    this.delClick = this.delClick.bind(this);
    this.delSubmit = this.delSubmit.bind(this);
    this.addSubmit = this.addSubmit.bind(this);
    this.handleQChange = this.handleQChange.bind(this);
    this.handleOAChange = this.handleOAChange.bind(this);
    this.handleOBChange = this.handleOBChange.bind(this);
    this.handleOCChange = this.handleOCChange.bind(this);
    this.handleODChange = this.handleODChange.bind(this);
}
        handleQChange(event) {
            this.state.formData.ques = event.target.value;
        }
        handleOAChange(event) {
            this.state.formData.opt1 = event.target.value;
        }
        handleOBChange(event) {
            this.state.formData.opt2 = event.target.value;
        }
        handleOCChange(event) {
            this.state.formData.opt3 = event.target.value;
        }
        handleODChange(event) {
            this.state.formData.opt4 = event.target.value;
        }

  delClick(event){
    console.log(event.target.value);
    this.setState({value:event.target.value});
  }

  delSubmit (event) {

      this.setState({submitted: false});
      console.log(this.state.value)
      event.preventDefault();
      fetch('http://127.0.0.1:8080/quest/' + this.state.value, {
              method: 'DELETE',
          })
          .then(response => {
              if (response.status >= 200 && response.status < 300)
                console.log("Success");
              window.location.reload();
          });
  }
  addSubmit(event){
      console.log("YO!");
      var id1 = "a", id2 = "b", id3 = "c", id4 = "d";
      this.state.formData.opt1c = document.getElementById(id1).checked,
      this.state.formData.opt2c = document.getElementById(id2).checked,
      this.state.formData.opt3c = document.getElementById(id3).checked,
      this.state.formData.opt4c = document.getElementById(id4).checked;
      event.preventDefault();
    console.log(JSON.stringify(this.state.formData));
      fetch('http://localhost:8080/questions', {
        method: 'POST',
        body: JSON.stringify(this.state.formData),
    })
  }
   componentDidMount() {
        console.log("this works");
            const request = new Request('http://127.0.0.1:8080/questions/' + this.state.quizid);
            fetch(request)
              .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({data: data})
            });
            console.log(this.state.data)
        }

    render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Users</h1>
        </header>
        <form onSubmit={this.delSubmit}>
          <table className="table-hover">
            <thead>
              <tr>
                <th>Question ID</th>
                <th>Question</th>
                <th>Option 1</th>
                <th>Option 2</th>
                <th>Option 3</th>
                <th>Option 4</th>
                <th>Option 1</th>
                <th>Option 2</th>
                <th>Option 3</th>
                <th>Option 4</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map((item, key)=>{
                 return (
                    <tr key = {key}>
                        <td>{item.quid}</td>
                        <td>{item.ques}</td>
                        <td>{item.opt1}</td>
                        <td>{item.opt2}</td>
                        <td>{item.opt3}</td>
                        <td>{item.opt4}</td>
                        <td>{item.opt1c}</td>
                        <td>{item.opt2c}</td>
                        <td>{item.opt3c}</td>
                        <td>{item.opt4c}</td>
                        <td><input type="radio" value={item.quid} name="radio" onClick={this.delClick}/></td>
                    </tr>
                  )
               })}
            </tbody>
          </table>
          <button type="submit" className="btn btn-default">Delete Question</button>
        </form>
        <form onSubmit={this.addSubmit}>
                <h1>ADD QUESTION</h1><br/>
                <label>Question</label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.handleQChange}/>
                <label>Option A</label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.handleOAChange}/>
                <label>Option B</label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.handleOBChange}/>
                <label>Option C</label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.handleOCChange}/>
                <label>Option D</label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.handleODChange}/>
                <label>Correct options</label><br/>
                <input type = "checkbox"  id="a"/>A<br/>
                <input type = "checkbox"  id="b"/>B<br/>
                <input type = "checkbox"  id="c"/>C<br/>
                <input type = "checkbox"  id="d"/>D<br/>
          <button type="submit" className="btn btn-default">Submit Question</button>
        </form>
      </div>
    );
  }
}

export default Admin_quizedit;
