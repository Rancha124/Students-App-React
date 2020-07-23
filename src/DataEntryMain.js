import React from "react";
import AddStudent from '../src/Components/AddStudent';

class DataEntryMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    students : [{
      firstName: "",
          lastName: "",
          address: "",
          gpa: "",
          mobileNumber: "",
          cityName: "",
          stateName: "",  
    }]
          
                
    };
}
addStudentData = (object) => {
    const newStudents = this.state.students.concat({object});
    this.setState({students: newStudents});
}

render(){
    return(
        <div>
        {this.state.students.map( (student,index)=> {
            return <li key={index}>{student.firstName}</li>
        })}
         <AddStudent addStudentData ={this.addStudentData()} />
        </div>
       
    );
}
}
export default DataEntryMain;