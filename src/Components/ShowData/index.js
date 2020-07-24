import React from 'react';
import axios from 'axios';
import history from '../../services/history';
class ShowData extends React.Component {
  
  state = {
    students: [],
    dummy: false
  }
  componentDidMount(){
    axios.get('http://localhost:3001/students').then( (result) => {
      this.setState({students: result.data});
    } )
  }

  deleteData = (index) => {
    const id = this.state.students[index].id;
     axios.delete(`http://localhost:3001/students/${id}`)
    .then(this.setState({dummy: false}) );
    axios.get('http://localhost:3001/students').then( (result) => {
      this.setState({students: result.data});
    } )
  }
  showEntireDetails = (index) => {
    const id = this.state.students[index].id;
    axios.get(`http://localhost:3001/students/${id}`)
  .then(
  history.push(`/full_details/${id}`)
 )
  }
  render(){
  return (
    <div>

    {this.state.students.map((obj,index)=> {
    return (<ul key={obj.id}>
    <li>{obj.firstName}</li>
    <button onClick={() => this.showEntireDetails(index)}>Full Details</button>
    <button onClick={() => this.deleteData(index)}>Delete this Data</button>
    </ul>);
  })} 

   
    </div>
  );
}
}
export default ShowData;
