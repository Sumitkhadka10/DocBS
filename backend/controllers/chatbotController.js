import { Groq } from 'groq-sdk';
import chatHistoryModel from '../models/chatHistoryModel.js';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const askQuestion = async (req, res) => {
  try {
    const { userId, message, history = [] } = req.body;
    console.log('Received chat request:', { userId, message, historyLength: history.length });

    if (!userId || !message) {
      console.log('Missing userId or message');
      return res.status(400).json({ success: false, message: 'User ID and message are required' });
    }

    // Check for simple greetings
    const greetingRegex = /^(hi|hello|hey|howdy|greetings)$/i;
    let response;
    if (greetingRegex.test(message.trim())) {
      console.log('Detected greeting, responding with short message');
      response = 'Hi there! How can I assist you today?';
      
      // Save to chat history
      let chatHistory = await chatHistoryModel.findOne({ userId });
      if (!chatHistory) {
        chatHistory = new chatHistoryModel({ userId, messages: [] });
      }
      chatHistory.messages.push(
        { role: 'user', content: message, timestamp: new Date() },
        { role: 'assistant', content: response, timestamp: new Date() }
      );
      await chatHistory.save();

      // Emit via Socket.IO
      const io = req.app.get('io');
      console.log('Emitting chatResponse to user:', userId);
      io.to(userId).emit('chatResponse', {
        question: message,
        answer: response,
        timestamp: new Date(),
      });

      return res.json({ success: true, response });
    }

    // Fetch or create chat history
    let chatHistory = await chatHistoryModel.findOne({ userId });
    if (!chatHistory) {
      chatHistory = new chatHistoryModel({ userId, messages: [] });
    }

    // Format conversation history
    const formattedHistory = history.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // System prompt
    const messages = [
      {
        role: 'system',
        content:
          'You are a helpful healthcare assistant that provides accurate medical information, first aid advice, and health tips. Be empathetic, clear, and concise in your responses, keeping answers under 50 words unless more detail is explicitly requested. For serious medical concerns, advise users to consult with healthcare professionals. Do not provide diagnosis or prescribe medications.',
      },
      ...formattedHistory,
      { role: 'user', content: message },
    ];

    // Call Groq API
    console.log('Calling Groq API with messages:', messages);
    const completion = await groq.chat.completions.create({
      model: 'mistral-saba-24b',
      messages,
      temperature: 0.7,
      max_tokens: 100,
      top_p: 0.95,
      stream: false,
    });

    response = completion.choices[0].message.content;
    console.log('Groq API response:', response);

    // Save to chat history
    chatHistory.messages.push(
      { role: 'user', content: message, timestamp: new Date() },
      { role: 'assistant', content: response, timestamp: new Date() }
    );
    await chatHistory.save();

    // Emit via Socket.IO
    const io = req.app.get('io');
    console.log('Emitting chatResponse to user:', userId);
    io.to(userId).emit('chatResponse', {
      question: message,
      answer: response,
      timestamp: new Date(),
    });

    res.json({ success: true, response });
  } catch (error) {
    console.error('Error processing chat request:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { askQuestion };