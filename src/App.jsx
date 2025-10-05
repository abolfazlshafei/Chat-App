import React, { useState } from 'react';
import Login from './Components/Login';
import ChatApp from './Components/ChatApp';

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      {user ? <ChatApp username={user} /> : <Login onLogin={setUser} />}
    </>
  );
}

export default App;