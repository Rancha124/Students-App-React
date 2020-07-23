import React from "react";
import { Switch , Route} from "react-router-dom";
import ShowData from '../Components/ShowData/index';
import AddStudent from "../Components/AddStudent";

class Routes extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Switch>
        <Route path="/show-data" isPrivate component={ShowData}  />

        <Route path="/" exact isPrivate component={AddStudent}  />
      </Switch>
    );
  }
}
export default Routes;