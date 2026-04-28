import { useState, useRef, useEffect } from "react";
import API from "../utils/api";

const ChatSection = ({ activeDoc }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMsg = { role: "user", content: input };

  setMessages((prev) => [...prev, userMsg]);

  const question = input; // ✅ define properly
  setInput("");
  setLoading(true);

  try {
    const res = await API.post("/ask", {
      question,
      file_id: activeDoc.id,
    });

    const aiMsg = {
      role: "ai",
      content: res.data.answer, // ✅ correct data
    };

    setMessages((prev) => [...prev, aiMsg]);

  } catch (error) {
    setMessages((prev) => [
      ...prev,
      { role: "ai", content: "Error getting response 😢" },
    ]);
  }

  setLoading(false);
};


  return (
    <div className="flex-1 flex flex-col">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">

        {messages.length === 0 && (
          <div className="text-gray-400 text-center mt-20">
            Ask something about <span className="text-white">{activeDoc.name}</span>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-xl text-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-200"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-gray-400 text-sm">AI is thinking...</div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-800 bg-[#020617] flex gap-2">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 outline-none text-sm"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 px-4 rounded-lg text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatSection;