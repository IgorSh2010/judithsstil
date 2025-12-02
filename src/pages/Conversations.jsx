import { useState, useEffect } from "react";
import { formatDate } from "../utils/formats";
import { Link } from "react-router-dom";
import { getConversations } from "../api/user";

export default function Conversations() {
const [conversations, setConversations] = useState([]);
const [error, setError] = useState(null);

useEffect(() => {
  const loadData = async () => {
    try {
    const data = await getConversations();

    if (!Array.isArray(data)) return;
    console.log(data);
    setConversations(data);
    } catch (msg) {
      setError(msg);
    }
  };

  loadData();
}, []);
    

  if (error) {
    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto mt-40 mb-6 bg-[#0f0f0f] text-gray-200 rounded-2xl border border-gray-800 shadow-lg">
            <Link to="/conversations" className="text-sm text-gray-400 hover:underline">← Back</Link>
            <div className="p-6 max-w-lg mx-auto bg-red-500 border border-gray-700 rounded-2xl text-red-900 font-bold">
                {error}
            </div>
        </div>
    );
  }

    return (
      <div className="p-6 md:p-10 max-w-7xl mx-auto mt-36 mb-6 bg-[#0f0f0f] text-gray-200 rounded-2xl border border-gray-800 shadow-lg">
        <h1 className="text-3xl font-bold text-[#d4af37] mb-3 tracking-wide">Wiadomości</h1>


        <div className="flex flex-col gap-3">
          {conversations.map((c) => (
          <Link
            key={c.id}
            to={`/conversations/${c.id}?order_id=${c.order_id}`}
            className="flex items-center justify-between
                      p-4 rounded-xl border border-gray-800
                      bg-gray-900
                      hover:bg-gray-800 transition-colors"
                      >
            <div>
              <p className="font-semibold text-lg text-gray-200">{c.title}</p>
              <p className="text-gray-400 text-sm line-clamp-2 mt-1">{c.preview}</p>
            </div>

            <div className="text-xs text-gray-500 whitespace-nowrap">{formatDate(c.updated_at)}</div>
          </Link>
          ))}
        </div>
      </div>
    );
}