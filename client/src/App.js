import './App.css';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import TextEditor from './components/TextEditor';
import {v4 as uuidv4} from 'uuid'

function App() {
  return (
<Router>
  <Switch>
    <Route path='/' exact >
      <Redirect to={`/document/${uuidv4()}`} />
    </Route>
    <Route path='/document/:id' exact component={TextEditor} />
  </Switch>
</Router>
  );
}

export default App;
