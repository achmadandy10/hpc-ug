import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AppStyle } from './App.elements';
import LandingLayout from './layouts/landing_layout/LandingLayout';
import Register from './views/auth/register/Register';

function App() {
  return (
    <>
      <AppStyle/>
      <Router>
        <Switch>
          <Route exact path="/" component={ LandingLayout }/>
          
          <Route path="/masuk" component={ Register }/>
          <Route path="/daftar" component={ Register }/>
        </Switch>
      </Router>
    </>
  )
}

export default App;
