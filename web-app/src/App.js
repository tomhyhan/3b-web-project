import logo from './logo.svg';
import { Switch, Route, Link } from 'react-router-dom';
import styles from './app.module.css';
import Login from './components/login/login';
import Board from './components/board/board';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path={['/', '/login']} exact>
          <Login />
        </Route>
        <Route path='/board'>
          <Board />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
