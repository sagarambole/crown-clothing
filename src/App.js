import React from 'react';
import './App.css';
import Homepage from './pages/homepage/Homepage.components'
import { Switch, Route } from 'react-router-dom';

const HatsPage = (props) => {
  console.log(props);
  return (
  <div>
    <h1>Hats Page</h1>
  </div>
); 
}   

function App() {
  return (
    <div>
      <Switch>
        <Route exact={true} path="/" component={Homepage} />
        <Route path="/hats" component={HatsPage}/>
      </Switch>
    </div>
  );
}

export default App;
