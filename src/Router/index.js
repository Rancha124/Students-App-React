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
        <Route
          path="/show-data"
          isPrivate
          component={(props) => <ShowData {...props} />}
        />
        <Route
          path="/"
          exact
          isPrivate
          component={(props) => <AddStudent {...props} />}
        />
        <Route
          path="/full_details/:id"
          component={(props) => <FullDetails {...props} />}
        />
        <Route
          path="/edit_data/:id"
          component={(props) => <EditData {...props} />}
        />
      </Switch>
    );
  }
}
export default Routes;
