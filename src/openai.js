// openai.js
import axios from 'axios';

const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/chat/completions';

const sendMsgToOpenAI = async (userMessage) => {
  try {
    // Construct messages array with user's message
    const messages = [
      { role: 'user', content: userMessage },
    ];

    // Make API request
    const response = await axios.post(apiUrl, {
      model: 'davinci-002', // or 'gpt-4' based on your choice
      // model: 'babbage-002', // or 'gpt-4' based on your choice
      messages: messages,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    // Extract and return the assistant's reply
    return response.data.choices[0].message['content'];
  } catch (error) {
    console.error("Error in sendMsgToOpenAI:", error);
    throw error;
  }
};

export { sendMsgToOpenAI };
