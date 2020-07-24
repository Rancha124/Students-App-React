import React from "react";
import { Switch, Route } from "react-router-dom";
import ShowData from "../Components/ShowData/index";
import AddStudent from "../Components/AddStudent";
import FullDetails from "../Components/FullDetails";
import EditData from "../Components/EditData";
class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/show-data" isPrivate component={ShowData} />
        <Route path="/" exact isPrivate component={AddStudent} />
        <Route path="/full_details/:id" component={FullDetails} />
        <Route path="/edit_data/:id" component={EditData} />
      </Switch>
    );
  }
}
export default Routes;
