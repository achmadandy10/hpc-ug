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
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

const LandingLayout = lazy(() => import('./layouts/landing_layout/LandingLayout'))
const Login = lazy(() => import('./views/auth/login/Login'))
const Register = lazy(() => import('./views/auth/register/Register'))
const Error403 = lazy(() => import('./views/error/error_403/Error403'))
const Error404 = lazy(() => import('./views/error/error_404/Error404'))
const Error500 = lazy(() => import('./views/error/error_500/Error500'))


function App() {
  return (
    <>
      <AppStyle/>
      <Router>
        <Suspense fallback={ <LoadingPage/> }>
          <Switch>
              <Route path="/masuk" component={ Login }/>
              <Route path="/daftar" component={ Register }/>
              <Route path="/403" component={ Error403 }/>
              <Route path="/404" component={ Error404 }/>
              <Route path="/500" component={ Error500 }/>

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
