import * as React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import ChatInterface from "./HeroList";
import { makeStyles, tokens } from "@fluentui/react-components";
import { Select, Option } from "@fluentui/react-components";
import { sendMessageToClaude } from "../services/claudeService";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    overflow: "hidden",
    borderRadius: "8px",
  },
  chatContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1a1a1a",
  },
});

const App = (props) => {
  const { title } = props;
  const styles = useStyles();
  const [selectedSheet, setSelectedSheet] = React.useState("Sheet1");
  const [messages, setMessages] = React.useState([
    {
      text: "Hello! I'm Gestalt, your Excel assistant. How can I help you today?",
      type: "claude",
      timestamp: Date.now(),
    },
  ]);
  const [isLoading, setIsLoading] = React.useState(false);

  // This will be replaced with actual sheet names from Excel
  const sheetNames = ["Sheet1", "Sheet2", "Sheet3"];

  const handleSheetChange = (event) => {
    setSelectedSheet(event.target.value);
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      text: text.trim(),
      type: "user",
      timestamp: Date.now(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get response from Claude
      const claudeResponse = await sendMessageToClaude(text.trim());
      
      // Add Claude's response
      const claudeMessage = {
        text: claudeResponse,
        type: "claude",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, claudeMessage]);
    } catch (error) {
      console.error('Error getting Claude response:', error);
      const errorMessage = {
        text: `Error: ${error.message || "Sorry, I encountered an error. Please try again."}`,
        type: "claude",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.root}>
      <Header logo="assets/logo-filled.png" title="ValCtrl Excel Add-in" message="Gestalt Excel Assistant" />
      
      <div className={styles.chatContainer}>
        <ChatInterface 
          messages={messages} 
          isLoading={isLoading} 
          onSendMessage={handleSendMessage}
          selectedSheet={selectedSheet}
          onSheetChange={handleSheetChange}
          sheetNames={sheetNames}
        />
      </div>
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string,
};

export default App;
