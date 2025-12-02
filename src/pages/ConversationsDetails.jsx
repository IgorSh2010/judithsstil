import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { formatDate } from "../utils/formats";
import { fetchMessages, sendMessageToConversation, pollMessages } from "../api/user";

export default function ConversationsDetails() {
    const { id } = useParams();
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const lastMessageId = useRef(0);
    const bottomRef = useRef(null);
    
    const search = new URLSearchParams(useLocation().search);
    const order_id = search.get("order_id");

    // --- INITIAL LOAD ---    
    useEffect(() => {
        const loadData = async () => {
            try {                
                const msgs = await fetchMessages(id);

                if (!Array.isArray(msgs) || msgs.length === 0) return;

                setMessages(msgs);
                console.log(msgs);

                if (msgs.length > 0) {
                    lastMessageId.current = msgs[msgs.length - 1].id;
                }

            } catch (msg) {
                setError(msg);
            }
        };      

        loadData();
    }, [id, messages]);

    // --- LONG POLLING ---
    useEffect(() => {
        let abort = false;

        const poll = async () => {
            if (abort) return;

            try {
                const data = await pollMessages(id, lastMessageId.current);
                if (!data || !data.messages || data.messages.length === 0) {
                    setTimeout(poll, 400);
                    return;
                }
                
                setMessages(prev => [...prev, ...data.messages]);
                lastMessageId.current = data.messages[data.messages.length - 1].id;

                setTimeout(poll, 100);
            } catch (err) {
                console.error("polling error:", err);
                setTimeout(poll, 1500);
            }
        };

        poll();
        return () => { abort = true };
    }, [id, lastMessageId]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const msg = await sendMessageToConversation(id, input);
        setMessages(prev => [...prev, msg]);
        lastMessageId.current = msg.messageId; 
        setInput("");       
    };

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
        <div className="p-6 md:p-10 max-w-4xl mx-auto mt-36 mb-6 bg-[#0f0f0f] text-gray-200 rounded-2xl border border-gray-800 shadow-lg">
            <Link to="/conversations" className="text-sm text-gray-400 hover:underline">← Cofnij do rozmów</Link>
            <h1 className="text-3xl font-bold text-[#d4af37] mb-3 tracking-wide">Rozmowa o zamówieniu #{order_id.toString().padStart(5, "0")}</h1>

            <div className="flex flex-col space-y-4  bg-gray-900 border border-gray-700 rounded-2xl p-6">
                {messages.map((m, i) => (
                    <div
                        key={i}
                    className={`flex ${
                        m.participant === "me"
                        ?  "justify-end"
                        : "justify-start"
                    }`}
                    >
                        <div className={`max-w-2xl min-w-[250px] p-3 rounded-xl border text-sm shadow-sm
                                            ${
                                            m.participant === "me"
                                            ? "bg-emerald-500 border-emerald-700 text-white"
                                            : "bg-white border-gray-900 text-gray-900"
                            }`}>
                            <div className="font-semibold text-amber-700 mb-1">{m.participant === "me" ? "Me" : m.participant}</div>
                            <div className=" text-sm line-clamp-2 mt-1">{m.content}</div>                     
                            <div className="text-[11px] text-gray-900 mt-1">{formatDate(m.created_at)}</div>
                        </div>
                    </div>
                ))}
                <div ref={bottomRef}></div>
            </div>

            {/* <ChatInput /> */}
            <div className="mt-6 flex gap-3">
            <input
                //type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl
                focus:outline-none focus:border-[#d4af37]/80 text-gray-100 placeholder-gray-500
                transition-all"
                placeholder="Napisz wiadomość…"
            />
            <button
                onClick={sendMessage}
                className="px-5 py-3 bg-[#d4af37] hover:bg-[#e6c34d] text-black font-medium rounded-xl
                transition-all shadow-md"
            >
                Wyślij
            </button>
            </div>
        </div>
    );
}