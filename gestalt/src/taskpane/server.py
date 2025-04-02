from flask import Flask, request, jsonify
from flask_cors import CORS
from services.claudeService import send_message_to_claude

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        message = data.get('message')
        
        if not message:
            return jsonify({'error': 'Message cannot be empty'}), 400
            
        response = send_message_to_claude(message)
        return jsonify({'response': response})
        
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True) 