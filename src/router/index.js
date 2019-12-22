import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Index from '@/pages/Index/Index'
import Login from '@/pages/Login/Login'
import EmailLogin from '@/pages/Login/EmailLogin'
import Register from '@/pages/Login/Register'
import FindUpwd from '@/pages/Login/FindUpwd'
import UserList from '@/pages/User/UserList'
import UserDetail from '@/pages/User/UserDetail'
import Details from '@/pages/User/Details';

const MyRouter = () => (
  <div>
    <Router>
      <Route exact path='/' component={Index} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/email-login' component={EmailLogin} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/find-upwd' component={FindUpwd} />
      <Route exact path='/user/:tab' component={UserList} />
      <Route exact path='/user/detail/:id' component={UserDetail} />
      <Route exact path='/user/details/:id/:type' component={Details} />
    </Router>
  </div>
);

export default MyRouter;