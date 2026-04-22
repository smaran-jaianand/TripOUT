import React, { useState, useRef, useEffect } from "react";

function Icon({ name, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your TripOUT Event Assistant. As we build out my LangChain backend, I'll be able to help you plan events, find vendors, and more. How can I help today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/agent/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error("Backend response error");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Hmm, I couldn't reach the backend. Are you sure the FastAPI server is running on localhost:8000?" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 w-80 sm:w-96 h-[500px] mb-4 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-primary px-4 py-3 flex items-center justify-between text-white shadow-sm">
            <div className="flex items-center gap-2">
              <Icon name="smart_toy" className="text-xl" />
              <div className="font-label font-bold text-sm">TripOUT Agent</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:opacity-75 transition-opacity"
            >
              <Icon name="close" className="text-xl" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-800/20">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 font-body text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-white rounded-br-sm"
                      : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-bounce delay-200"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-bounce delay-300"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your event..."
                className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full py-2.5 pl-4 pr-10 text-sm font-body focus:ring-1 focus:ring-primary outline-none dark:text-white dark:placeholder:text-gray-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                <Icon name="arrow_upward" className="text-sm" />
              </button>
            </div>
          </form>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95"
        >
          <Icon name="chat" className="text-2xl" />
        </button>
      )}
    </div>
  );
}
