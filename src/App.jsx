import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AppStyle } from './App.elements';
import LandingLayout from './layouts/landing_layout/LandingLayout';

function App() {
  return (
    <>
      <AppStyle/>
      <Router>
        <Switch>
          <Route exact path="/" component={ LandingLayout }/>
        </Switch>
      </Router>
    </>
  )
}

export default App;
