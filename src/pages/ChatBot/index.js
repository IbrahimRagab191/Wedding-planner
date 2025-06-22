import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./ChatBot.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi, I'm here to help you." },
    { type: "bot", text: "Is there anything I can help you with?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const endRef = useRef(null);
  const userId = "guest-user-001";
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Add user's message
    setMessages((prev) => [...prev, { type: "user", text: trimmedInput }]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("https://planner-bot.vercel.app/ask_ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          user_input: trimmedInput,
        }),
      });

      const data = await response.json();
      console.log("API response:", data);

      // Append bot's reply
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: data.response || "Sorry, I didn’t get that." },
      ]);
    } catch (error) {
      console.error("API error:", error);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "❌ Server error. Please try again later." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };
return (
    <div className="page-layout">
      <Header customClass="header-light" />
      <main className="chatbot-page">
      <div className="container chatbot-page">
            <div className="chat-container">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.type}`}>
                  {msg.type === "bot" && (
                    <img src="/images/bot.png" className="avatar" />
                  )}
                  <div className="bubble">{msg.text}</div>
                  {msg.type === "user" && (
                    <img src="/images/user.png" className="avatar" />
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="chat-message bot">
                  <img src="/images/bot.png" className="avatar" />
                  <div className="bubble">...</div>
                </div>
              )}

              <div ref={endRef}></div>

              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Type here"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button onClick={handleSend} disabled={!input.trim() || isTyping}>
                  Send
                </button>
              </div>
            </div>
          </div>
      </main>
  <Footer />
</div>

  );
};

export default ChatBot;