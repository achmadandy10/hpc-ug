import axios from 'axios';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AppStyle } from './App.elements';
import LoadingPage from './components/loading/Loading';
import UserLayout from './layouts/user_layout/UserLayout'
// import UserPrivateRoute from './routes/user/UserPrivat';

axios.defaults.baseURL = "127.0.0.1:8000";
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
              <Route exact path="/" component={ LandingLayout }/>
              <Route path="/masuk" component={ Login }/>
              <Route path="/daftar" component={ Register }/>
              <Route path="/user" name="user" render={(props) => <UserLayout {...props} />}/>
              {/* <UserPrivateRoute path="/user" name="User"/> */}
          </Switch>
        </Suspense>
      </Router>
    </>
  )
}

export default App;
