import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

// Components
import {
  AdminDashboard,
  AdminOrder,
  AdminProduct,
  AdminCreateProduct,
  AdminEditProduct,
  AdminUser,
  AdminEditUser,
  ChatContainer,
  Login,
  Register,
  Navbar,
  Landing,
  Footer,
  OrderPage,
  Payment,
  ProductPage,
  Products,
  UserPage,
  PrivateRoute
} from './components';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Clear current profile
    store.dispatch(clearCurrentProfile());

    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <Switch>
              {/* Admin Routes */}
              <PrivateRoute
                exact
                path='/admin/dashboard'
                component={AdminDashboard}
              />
              <PrivateRoute exact path='/admin/orders' component={AdminOrder} />
              <PrivateRoute
                exact
                path='/admin/products'
                component={AdminProduct}
              />
              <PrivateRoute
                exact
                path='/admin/products/create'
                component={AdminCreateProduct}
              />
              <PrivateRoute
                exact
                path='/admin/products/:id'
                component={AdminEditProduct}
              />
              <PrivateRoute exact path='/admin/users' component={AdminUser} />
              <PrivateRoute
                exact
                path='/admin/users/:id'
                component={AdminEditUser}
              />
              {/* Order Routes */}
              <PrivateRoute
                exact
                path='/checkout/order'
                component={OrderPage}
              />
              {/* Payment Routes*/}
              <PrivateRoute
                exact
                path='/checkout/order/payment'
                component={Payment}
              />
              {/* User Routes */}
              <PrivateRoute exact path='/user/profile' component={UserPage} />
            </Switch>
            {/* Product Routes */}
            <Route exact path='/products' component={Products} />
            <Route exact path='/products/:id' component={ProductPage} />
            {/* Auth Routes */}
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <ChatContainer />
            {/* <Footer /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
