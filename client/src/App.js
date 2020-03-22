import React, { Component } from 'react';
import './App.css';
// import Login from './components/Login'
import CheckToken from './components/CheckToken'
import store from './store'
import { loadUser } from './actions/authActions';
import { Provider } from 'react-redux'


class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    console.log(loadUser());
    return (
      <Provider store={store} >
        <div className="App">
          <CheckToken />
        </div>
      </Provider>
    );
  }
}

export default App;
