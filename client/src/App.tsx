import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';


import Header from './components/Header/Header';

import './App.css';
import { Route, Switch } from 'react-router-dom';
import Broadcast from './pages/Broadcast/Broadcast';
import Homepage from './pages/HomePage/Homepage';

// TODO: change socketio endpoint


const App: React.FC = () => {




  return (
    <div className="row">
      <Header />
      <Switch>

        <Route path="/"  exact component={Homepage} />
        <Route path="/broadcasts" exact  component={Broadcast} />
      </Switch>
    </div>
  );
}

export default App;
