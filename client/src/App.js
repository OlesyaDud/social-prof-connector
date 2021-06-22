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
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-component/profile-forms/CreateProfile';
import EditProfile from './components/profile-component/profile-forms/EditProfile';
import AddExperience from './components/profile-component/profile-forms/AddExperience';
import AddEducation from './components/profile-component/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

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
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:id" component={Profile} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute exact path="/add-experience" component={AddExperience} />
            <PrivateRoute exact path="/add-education" component={AddEducation} />
            <PrivateRoute exact path="/posts" component={Posts} />
            <PrivateRoute exact path="/posts/:id" component={Post} />
        </Switch>
      </section>     
    </Fragment>
    </Router>
   </Provider> 
  );
}

export default App;
