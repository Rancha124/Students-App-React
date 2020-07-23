import React from 'react';
import './App.css';
import { Router} from 'react-router-dom';
import history from '../src/services/history';
import Routes from '../src/Router/index';
class App extends React.Component {
  
  state = {
    dummy: false
  }
 
  render(){
  return (
    
      <Router history={history} className="App">
        <Routes />
      </Router>
    
  );
}
}
export default App;
