import React, {Fragment, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch
 } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';

import { loadUser } from './actions/auth';

// Redux
import {Provider} from 'react-redux';
import store from './store';
import Routes from './components/routing/Routes';


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
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route component={Routes} />
      </Switch>
      
    </Fragment>
    </Router>
   </Provider> 
  );
}

export default App;
