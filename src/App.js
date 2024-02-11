import React, { useState, useEffect } from 'react';
import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { run } from './gemini';

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hello, I am GptEngine. I can answer your questions about programming. Ask me anything!",
      isBot: true,
    },
  ]);

  const handleSend = () => {
    if (!input) return;

    // Update messages with the user's input
    setMessages(prevMessages => [
      ...prevMessages,
      { text: input, isBot: false },
    ]);

    setInput(''); // Clear input after sending
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    const handleResponse = async () => {
      // Don't generate a response if the last message is from the bot
      if (messages.length > 0 && messages[messages.length - 1].isBot) return;
  
      try {
        // Get the user input from the last message
        const userInput = messages[messages.length - 1].text;
  
        // Call the run function from gemini.js with user input
        const response = await run(userInput);
  
        // Update messages with gemini's response
        setMessages(prevMessages => [
          ...prevMessages,
          { text: response, isBot: true },
        ]);
      } catch (error) {
        console.error("Error sending message to gemini:", error);
      }
    };
  
    handleResponse(); // Call the handleResponse function when messages change
  }, [messages]); // useEffect will re-run whenever messages change


  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="Logo" className="logo" />
            <span className="brand">
              <b className="brandtext">GptEngine</b>
            </span>
          </div>
          <button className="midBtn">
            <img src={addBtn} alt="new chat" className="addBtn" />New Chat
          </button>
          <div className="upperSideBottom">
            <button className="query"><img src={msgIcon} alt="Query" />What is Programming?</button>
            <button className="query"><img src={msgIcon} alt="Query" />How to use API?</button>
          </div>
        </div>
        <div className="lowerside">
          <div className="listItems">
            <img src={home} alt="Home" className="listitemsImg" />Home
          </div>
          <div className="listItems">
            <img src={saved} alt="Saved" className="listitemsImg" />Saved
          </div>
          <div className="listItems">
            <img src={rocket} alt="Upgrade" className="listitemsImg" />Upgrade to Pro
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message, index) => (
            <div key={index} className={`chat ${message.isBot ? 'bot' : ''}`}>
              <img className="chatImg" src={message.isBot ? gptImgLogo : userIcon} alt="" />
              <p className="txt">{message.text}</p>
            </div>
          ))}
        </div>

        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Message GptEngine..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
          <p>GptEngine can make mistakes. Consider checking important information.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
