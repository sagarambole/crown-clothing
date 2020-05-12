import React from 'react';
import './App.css';
import Homepage from './pages/homepage/homepage.components';
import ShopPage from './pages/shop/shop.components';
import { Switch, Route } from 'react-router-dom';
  

function App() {
  return (
    <div>
      <Switch>
        <Route exact={true} path="/" component={Homepage} />
        <Route path="/shop" component={ShopPage}/>
      </Switch>
    </div>
  );
}

export default App;
