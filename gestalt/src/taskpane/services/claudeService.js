const API_URL = 'http://localhost:5000/api/chat';

export const sendMessageToClaude = async (message) => {
  if (!message.trim()) {
    throw new Error('Message cannot be empty');
  }

  try {
    console.log('Sending message to Claude:', message);
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get response from Claude');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}; 