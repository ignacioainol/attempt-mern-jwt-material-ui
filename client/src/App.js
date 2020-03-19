import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import store from './store'
import { loadUser } from './actions/authActions';
import { Provider } from 'react-redux'

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store} >
        <div className="App">
          <Login />
        </div>
      </Provider>
    );
  }
}

export default App;
