import React, { useState, useRef, useEffect } from 'react';
import { Send, Menu, X, Info, Loader2, Fish } from 'lucide-react';
import { MessageBubble } from './components/MessageBubble';
import { InfoSidebar } from './components/InfoSidebar';
import { sendMessageToGemini, initializeChat } from './services/geminiService';
import { Message, Sender } from './types';

// Placeholder image for mobile header background
const HEADER_BG = "https://picsum.photos/id/16/800/300"; 

const SUGGESTED_QUESTIONS = [
  "Apa saja paket wisata yang tersedia?",
  "Berapa harga snorkeling di Sukarame?",
  "Rekomendasi homestay dekat pantai?",
  "Bagaimana cara menuju lokasi?"
];

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      text: "Halo! Selamat datang di **Desa Wisata Sukarame**. 👋\n\nSaya **Si Karame**, siap membantu Anda menjelajahi keindahan ekowisata bahari kami. Ada yang bisa saya bantu hari ini? 🌊🐠",
      sender: Sender.Bot,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini Chat on mount
  useEffect(() => {
    initializeChat();
  }, []);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: Sender.User,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Call Gemini API
    const responseText = await sendMessageToGemini(text);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      sender: Sender.Bot,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">
      
      {/* Sidebar (Desktop) */}
      <InfoSidebar />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Mobile Sidebar Drawer */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex justify-between items-center border-b border-gray-100">
          <h2 className="font-bold text-teal-800">Menu Informasi</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
           <div className="space-y-4">
              <div className="p-3 bg-teal-50 rounded-lg">
                <h3 className="font-semibold text-teal-800 text-sm">Lokasi</h3>
                <p className="text-xs text-gray-600 mt-1">Carita, Pandeglang, Banten</p>
              </div>
              <div className="p-3 bg-teal-50 rounded-lg">
                <h3 className="font-semibold text-teal-800 text-sm">Fokus Utama</h3>
                <p className="text-xs text-gray-600 mt-1">Konservasi Terumbu Karang & Wisata Edukasi</p>
              </div>
           </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full w-full relative">
        
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <Menu size={24} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-gray-800">Sukarame AI</h1>
              <span className="text-xs text-teal-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Online
              </span>
            </div>
          </div>
          <div className="flex items-center">
             <button className="p-2 text-gray-400 hover:text-teal-600 transition-colors" title="Tentang Bot">
                <Info size={20} />
             </button>
          </div>
        </header>

        {/* Chat Messages */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          <div className="max-w-3xl mx-auto">
            
            {/* Intro Card (Only show if few messages) */}
            {messages.length === 1 && (
              <div className="mb-8 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-2">Jelajahi Sukarame! 🌴</h2>
                  <p className="opacity-90 mb-4 text-sm md:text-base max-w-lg">
                    Temukan surga tersembunyi di Carita. Tanyakan tentang spot snorkeling terbaik, homestay, atau cara berpartisipasi dalam transplantasi karang.
                  </p>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
                  <Fish size={150} />
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            
            {isLoading && (
              <div className="flex justify-start w-full mb-6">
                 <div className="flex items-center bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                    <Loader2 className="w-4 h-4 text-teal-600 animate-spin mr-2" />
                    <span className="text-gray-500 text-sm">Si Karame sedang mengetik...</span>
                 </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4 sticky bottom-0 z-20">
          <div className="max-w-3xl mx-auto w-full">
            
            {/* Quick Suggestions (Horizontal Scroll) */}
            {messages.length < 3 && !isLoading && (
              <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-1">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(q)}
                    className="whitespace-nowrap px-3 py-1.5 bg-gray-50 hover:bg-teal-50 text-teal-700 hover:text-teal-800 border border-gray-200 hover:border-teal-200 rounded-full text-xs transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="relative flex items-end gap-2 bg-gray-50 p-2 rounded-3xl border border-gray-200 focus-within:border-teal-400 focus-within:ring-4 focus-within:ring-teal-100 transition-all shadow-sm">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Tanya tentang Desa Wisata Sukarame..."
                className="w-full bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 px-3 py-2.5 max-h-32 resize-none"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={!inputText.trim() || isLoading}
                className="p-2.5 bg-teal-600 text-white rounded-full hover:bg-teal-700 disabled:opacity-50 disabled:hover:bg-teal-600 transition-all shadow-md flex-shrink-0 mb-0.5 mr-0.5"
              >
                <Send size={18} className={isLoading ? 'opacity-0' : 'opacity-100'} />
                {isLoading && <Loader2 size={18} className="absolute animate-spin" />}
              </button>
            </form>
            <p className="text-[10px] text-center text-gray-400 mt-2">
              Informasi yang diberikan AI mungkin perlu diverifikasi dengan pengelola desa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;