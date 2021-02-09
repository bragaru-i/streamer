import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";


import Header from './components/Header/Header';

import './App.css';

// TODO: change socketio endpoint


const App: React.FC = () => {

  const [response, setResponse] = useState();

  useEffect(() => {
    const socket = io('/api/v1/');
    socket.on("FromAPI", (data: React.SetStateAction<any>) => {
      setResponse(data);
    });
  }, []);
  console.log(response)
  return (
    <div className="row">
      <Header />
    </div>
  );
}

export default App;
