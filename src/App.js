// App.js
import { useState } from 'react';
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
import { sendMsgToOpenAI } from './openai';

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hello, I am GptEngine. I can answer your questions about programming. Ask me anything!",
      isBot: true,
    },
  ]);

  const handleSend = async () => {
    try {
      // Send user message to OpenAI
      const response = await sendMsgToOpenAI(input);

      // Update messages with user message and OpenAI's response
      setMessages(prevMessages => [
        ...prevMessages,
        { text: input, isBot: false },
        { text: response, isBot: true },
      ]);

      // Clear input field
      setInput("");
    } catch (error) {
      console.error("Error sending message to OpenAI:", error);
    }
  };

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
            <button className="query"><img src={msgIcon} alt="Query" />What is Programing?</button>
            <button className="query"><img src={msgIcon} alt="Query" />how to use api?</button>
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
      {/* Main Section */}
      <div className="main">
        {/* Chats Section */}
        <div className="chats">
          {messages.map((message, index) => (
            <div key={index} className={`chat ${message.isBot ? 'bot' : ''}`}>
              <img className="chatImg" src={message.isBot ? gptImgLogo : userIcon} alt="" />
              <p className="txt">{message.text}</p>
            </div>
          ))}
        </div>

        {/* Chat Footer */}
        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Message GptEngine..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
