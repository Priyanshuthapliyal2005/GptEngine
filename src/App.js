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
      text: "Hello, I am GptEngine. I can answer your questions about anything related upto April 2023. Ask me anything!",
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

  const handleEditMessage = (index) => {
    // Prompt the user to input the edited message
    const editedMessage = window.prompt("Edit your message:", messages[index].text);
    if (editedMessage !== null) {
      // Create a copy of the messages array
      const updatedMessages = [...messages];
      // Update the message at the specified index with the edited message
      updatedMessages[index] = { ...updatedMessages[index], text: editedMessage };
      // Update the state with the modified messages array
      setMessages(updatedMessages);

      // If the edited message was sent by the user (not bot response), regenerate bot response
      if (!updatedMessages[index].isBot) {
        handleResponse(editedMessage);
      }
    }
  };

  const handleResponse = async (userInput) => {
    try {
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

  const handleUpgradeButtonClick = () => {
    // Implement functionality to show a popup window for subscription payment
    alert("Upgrade to Pro: Please subscribe to unlock premium features.");
  };

  const handleSavedButtonClick = () => {
    // Implement functionality to open a section or page for saved messages or commands
    alert("Saved: Displaying saved messages or commands.");
  };

  const handleHomeButtonClick = () => {
    // Implement functionality to refresh the current page or navigate to a new page
    alert("Home: Navigating to the home page.");
    window.location.reload();
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
          <button className="midBtn" onClick={handleUpgradeButtonClick}>
            <img src={addBtn} alt="new chat" className="addBtn" />New Chat
          </button>
          <div className="upperSideBottom">
            <button className="query"><img src={msgIcon} alt="Query" />What is Programming?</button>
            <button className="query"><img src={msgIcon} alt="Query" />How to use API?</button>
          </div>
        </div>
        <div className="lowerside">
          <div className="listItems" onClick={handleHomeButtonClick}>
            <img src={home} alt="Home" className="listitemsImg" />Home
          </div>
          <div className="listItems" onClick={handleSavedButtonClick}>
            <img src={saved} alt="Saved" className="listitemsImg" />Saved
          </div>
          <div className="listItems" onClick={handleUpgradeButtonClick}>
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
              {!message.isBot && (
                <div className="messageActions">
                  <button className="editMessage" onClick={() => handleEditMessage(index)}>Edit</button>
                </div>
              )}
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