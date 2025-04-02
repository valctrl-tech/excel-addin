from anthropic import Anthropic
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize the Anthropic client
client = Anthropic(
    api_key=os.getenv('ANTHROPIC_API_KEY', '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')
)

def send_message_to_claude(message):
    """
    Send a message to Claude and get the response.
    
    Args:
        message (str): The message to send to Claude
        
    Returns:
        str: Claude's response
    """
    try:
        # Create a message using the Claude API
        response = client.messages.create(
            model="claude-3-5-sonnet-latest",
            max_tokens=1000,
            messages=[
                {
                    "role": "user",
                    "content": message
                }
            ],
            temperature=0.7
        )
        
        # Extract the response text
        return response.content[0].text
        
    except Exception as e:
        print(f"Error calling Claude API: {str(e)}")
        raise 