import { Switch, Route, Link } from 'react-router-dom';
import styles from './app.module.css';
import Login from './components/login/login';
import Board from './components/board/board';

function App({ authProvider, database }) {
  return (
    <div className='App'>
      <Switch>
        <Route path={['/', '/login']} exact>
          <Login authProvider={authProvider} />
        </Route>
        <Route path='/board'>
          <Board authProvider={authProvider} database={database} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
