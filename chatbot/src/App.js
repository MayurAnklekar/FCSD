import { useEffect, useState } from 'react';
import './App.css';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import axios from 'axios'

function App() {
  const [state, setState] = useState(0);
  useEffect(() => {
    addResponseMessage('Welcome to this awesome chat!');
  }, []);
  const handleNewUserMessage = async(newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    const res = await axios.post('http://localhost:5000/chatbot/send', { message: newMessage, state: state });
    setState(res.data.state);
    addResponseMessage(res.data.msg);
  };
  return (
    <div className="App">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
      />
    </div>
  );
}

export default App;
