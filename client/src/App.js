import React, {Fragment, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch
 } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { loadUser } from './actions/auth';

// Redux
import {Provider} from 'react-redux';
import store from './store';

const App=()=> {
  
  // [] in the end will main it only run 1 time, not in a loop
  // if there are properties, will be set inside [], will update only when properties update
  useEffect(()=> {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
    <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">
      <Alert />
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </Switch>
      </section>     
    </Fragment>
    </Router>
   </Provider> 
  );
}

export default App;
