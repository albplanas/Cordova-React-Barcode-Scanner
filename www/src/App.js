import React, { Component } from "react";
import ReactDOM from "react-dom";

import Home from "./Home/Home"

import { createStore,combineReducers } from 'redux';
import { Provider } from 'react-redux';

import globalStateReducer   from '../src/store/reducers/globalState';
import localStateReducer    from '../src/store/reducers/localState';
import dataReducer          from '../src/store/reducers/DataCenter';
import dataBaseReducer      from '../src/store/reducers/DataBase';

const rootReducers = combineReducers({
  globalState  : globalStateReducer,
  dataState    : dataReducer,
  dataBase     :dataBaseReducer ,
  localState   : localStateReducer      

}) 

const store = createStore(rootReducers);



class App extends Component {

  render() {
    
    return (
              <Home/>
    );
  }
}

export default App;

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<Provider store={store}><App /></Provider>, wrapper) : false;