import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { tokens, makeStyles, Button, Field, Textarea, Spinner, Select, Option } from "@fluentui/react-components";
import { ArrowRightRegular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  chatHistory: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    justifyContent: "flex-end",
  },
  messagesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    minHeight: "100%",
  },
  messageContainer: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#2d5a27",
    color: "#ffffff",
    padding: "8px 12px",
    borderRadius: "12px 12px 0 12px",
  },
  gestaltMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#2d2d2d",
    color: "#ffffff",
    padding: "8px 12px",
    borderRadius: "12px 12px 12px 0",
  },
  messageText: {
    fontSize: tokens.fontSizeBase300,
    margin: 0,
  },
  timestamp: {
    fontSize: tokens.fontSizeBase200,
    color: "#a0a0a0",
    marginTop: "4px",
    alignSelf: "flex-end",
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 12px",
    backgroundColor: "#2d2d2d",
    borderRadius: "12px 12px 12px 0",
    alignSelf: "flex-start",
  },
  bottomContainer: {
    backgroundColor: "#2d2d2d",
    borderTop: "1px solid #404040",
    padding: "10px",
  },
  sheetSelector: {
    marginBottom: "10px",
    "& select": {
      backgroundColor: "#1a1a1a !important",
      color: "#ffffff !important",
      border: "1px solid #404040 !important",
      borderRadius: "20px",
      "&:focus": {
        borderColor: "#2d5a27 !important",
      },
    },
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: "8px",
  },
  textAreaField: {
    flex: 1,
    "& textarea": {
      backgroundColor: "#1a1a1a !important",
      color: "#ffffff !important",
      border: "1px solid #404040",
      borderRadius: "20px",
      padding: "8px 16px",
      minHeight: "40px",
      maxHeight: "120px",
      resize: "none",
      "&:focus": {
        borderColor: "#2d5a27",
        outline: "none",
      },
      "&::placeholder": {
        color: "#a0a0a0",
      },
    },
    "& div": {
      backgroundColor: "transparent !important",
    },
  },
  sendButton: {
    minWidth: "40px",
    height: "40px",
    padding: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2d5a27",
    borderRadius: "20px",
    "&:hover": {
      backgroundColor: "#3a6b33",
    },
    "&:disabled": {
      backgroundColor: "#404040",
    },
  },
  icon: {
    fontSize: "20px",
    color: "#ffffff",
  },
});

const ChatInterface = (props) => {
  const { messages, isLoading, onSendMessage, selectedSheet, onSheetChange, sheetNames } = props;
  const [text, setText] = useState("");
  const styles = useStyles();
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTimestamp = (date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleSendMessage = async () => {
    if (text.trim() && !isLoading) {
      await onSendMessage(text.trim());
      setText("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div className={styles.chatHistory}>
        <div className={styles.messagesContainer}>
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`${styles.messageContainer} ${
                message.type === 'user' ? styles.userMessage : styles.gestaltMessage
              }`}
            >
              <p className={styles.messageText}>{message.text}</p>
              <span className={styles.timestamp}>{formatTimestamp(message.timestamp)}</span>
            </div>
          ))}
          {isLoading && (
            <div className={styles.loadingContainer}>
              <Spinner size="small" />
              <span className={styles.messageText}>Gestalt is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.sheetSelector}>
          <Select 
            value={selectedSheet} 
            onChange={onSheetChange}
            placeholder="Select Sheet"
          >
            {sheetNames.map((sheet) => (
              <Option key={sheet} value={sheet}>
                {sheet}
              </Option>
            ))}
          </Select>
        </div>
        <div className={styles.inputContainer}>
          <Field className={styles.textAreaField}>
            <Textarea
              placeholder="Type your message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              rows={1}
            />
          </Field>
          <Button 
            appearance="primary" 
            disabled={!text.trim() || isLoading} 
            onClick={handleSendMessage}
            className={styles.sendButton}
            title="Send message"
          >
            <ArrowRightRegular className={styles.icon} />
          </Button>
        </div>
      </div>
    </>
  );
};

ChatInterface.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['user', 'claude']).isRequired,
      timestamp: PropTypes.number.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  selectedSheet: PropTypes.string.isRequired,
  onSheetChange: PropTypes.func.isRequired,
  sheetNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ChatInterface;
