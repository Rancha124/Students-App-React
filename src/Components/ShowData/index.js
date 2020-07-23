import React from 'react';
import axios from 'axios';
class ShowData extends React.Component {
  
  state = {
    students: [],
    dummy: false
  }
  componentDidMount(){
    axios.get('http://localhost:3001/students').then( (result) => {
      this.setState({students: result.data});
      console.log(this.state.students);
    } )
  }

  deleteData = (index) => {
    const id = this.state.students[index].id;
     axios.delete(`http://localhost:3001/students/${id}`)
    .then(this.setState({dummy: false}) );
  }
  render(){
  return (
    <div>
   {this.state.students.map((obj,index)=> {
    return (<ul key={obj.id}>
    <li>{obj.data.firstName}</li>
    <li>{obj.data.lastName}</li>
    <li>{obj.data.address}</li>
    <li>{obj.data.cityName}</li>
    <li>{obj.data.stateName}</li>
    <button onClick={() => this.deleteData(index)}>delete me</button>
    </ul>);
  })}

   
    </div>
  );
}
}
export default ShowData;
