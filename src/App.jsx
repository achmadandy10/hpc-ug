import axios from 'axios';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AppStyle } from './App.elements';
import LoadingPage from './components/loading/Loading';
import AdminPrivateRoute from './routes/admin/AdminPrivate';
import UserPrivateRoute from './routes/user/UserPrivate';
require('dotenv').config()

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post['Content-Type'] = 'appilaction/json';
axios.defaults.headers.post['Accept'] = 'appilaction/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

const LandingLayout = lazy(() => import('./layouts/landing_layout/LandingLayout'))
const Login = lazy(() => import('./views/auth/login/Login'))
const Register = lazy(() => import('./views/auth/register/Register'))


function App() {
  return (
    <>
      <AppStyle/>
      <Router>
        <Suspense fallback={ <LoadingPage/> }>
          <Switch>
              <Route path="/masuk" component={ Login }/>
              <Route path="/daftar" component={ Register }/>

              <UserPrivateRoute path="/user" name="User"/>
              <AdminPrivateRoute path="/admin" name="Admin"/>
              <Route path="/" name="Landing" render={(props) => <LandingLayout {...props} />}/>
          </Switch>
        </Suspense>
      </Router>
    </>
  )
}

export default App;
