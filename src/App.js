import React, { Component } from 'react';
import './App.css';
import Homepage from './pages/homepage/homepage.components';
import ShopPage from './pages/shop/shop.components';
import Header from './components/header/header.components';
import SignInAndSignOutPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up'
import { Switch, Route } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'; 

class App extends Component {

  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
          console.log(this.state);
        });
      }
      this.setState({currentUser: userAuth});
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact={true} path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage}/>
          <Route path="/signin" component={SignInAndSignOutPage} />
        </Switch>
      </div>
    );
  };
}

export default App;
