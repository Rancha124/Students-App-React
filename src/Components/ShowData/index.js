import React, {useState,useEffect} from "react";
import history from "../../services/history";
import { Table, Button } from "react-bootstrap";
import apiHandler from "../../services/apiHandler";

function ShowData(props) {
 
  const [students,setStudensts] = useState([])
   useEffect(() => {
     apiHandler.get("/").then((result) => {
      setStudensts(result.data);
      console.log(result.data);
    });
  },[])
  useEffect(() => {
    apiHandler.get("/").then((result) => {
      setStudensts(result.data);
      console.log(result.data);
    });
console.log("Students data edited");
 },[students.length])

  const deleteData = async (index) => {
    const id = students[index].id;
    try{
      await  apiHandler.delete(`/${id}`)
      const result = await apiHandler.get("/")
      setStudensts(result.data);
    } catch (e){
      console.log(e)
      alert(e)
    }
    
  };
const showEntireDetails = (index) => {
    const id = students[index].id;
    apiHandler
      .get(`/${id}`)
      .then(history.push(`/full_details/${id}`));
  };
 const editThisData = (index) => {
    const id = students[index].id;
    apiHandler
      .get(`/${id}`)
      .then((res) => setStudensts( res.data ));
      history.push(`/edit_data/${id}`);
  };
  
    return (
      <>
        <div className="container" style={{ backgroundColor: "lightgray" }}>
          <div
            style={{
              height: "auto",
              marginTop: "14px",
              textAlign: "center",
            }}
          >
            <Table
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <thead
                style={{
                  position: "sticky",
                  top: "0px",
                  zIndex: "10",
                }}
              >
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Mobile Number</th>
                  <th>City Name</th>
                  <th>State Name</th>
                  <th>Gpa</th>
                  <th>Full Details</th>
                  <th>Edit data</th>
                  <th>Delete data</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {students.map((obj, index) => {
                  return (
                    <tr key={index}>
                      <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                        {index + 1}
                      </td>
                      <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                        {obj.firstName}
                      </td>
                      <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                        {obj.lastName}
                      </td>
                      <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                        {obj.mobileNumber}
                      </td>
                      <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                        {obj.cityName}
                      </td>
                      <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                        {obj.stateName}
                      </td>
                      <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                        {obj.gpa}
                      </td>
                      <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                        {" "}
                        <Button
                          style={{ borderRadius: "5px", cursor: "pointer" }}
                          onClick={() => showEntireDetails(index)}
                        >
                          Full Details
                        </Button>{" "}
                      </td>
                      <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                        {" "}
                        <i
                          className="fa fa-edit"
                          style={{
                            color: "green",
                            fontSize: "2em",
                            paddingTop: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => editThisData(index)}
                        ></i>{" "}
                      </td>
                      <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                        {" "}
                        <i
                          className="fa fa-trash"
                          style={{
                            color: "red",
                            fontSize: "2em",
                            paddingTop: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => deleteData(index)}
                        ></i>{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Button
              style={{
                margin: "25px",
                borderRadius: "5px",
                height: "2em",
                cursor: "pointer",
                textAlign: "center",
                paddingBottom: "20px",
                paddingTop: "2px",
              }}
              onClick={() => history.push("/")}
            >
              Go Back
            </Button>
          </div>
        </div>
      </>
    );
  
}

export default ShowData;
