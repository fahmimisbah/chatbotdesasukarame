import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, Sender } from '../types';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.sender === Sender.Bot;

  return (
    <div className={`flex w-full mb-6 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mt-1 
          ${isBot ? 'bg-teal-600 text-white mr-3' : 'bg-gray-200 text-gray-600 ml-3'}`}>
          {isBot ? <Bot size={18} /> : <User size={18} />}
        </div>

        {/* Message Content */}
        <div className={`p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed
          ${isBot 
            ? 'bg-white text-gray-800 rounded-tl-none border border-gray-100' 
            : 'bg-teal-600 text-white rounded-tr-none'
          }`}>
          <div className="prose prose-sm max-w-none break-words">
            {isBot ? (
              <ReactMarkdown 
                components={{
                  a: ({node, ...props}) => <a {...props} className="text-teal-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer" />,
                  ul: ({node, ...props}) => <ul {...props} className="list-disc pl-4 my-2" />,
                  ol: ({node, ...props}) => <ol {...props} className="list-decimal pl-4 my-2" />,
                  strong: ({node, ...props}) => <strong {...props} className="font-bold text-teal-800" />,
                  p: ({node, ...props}) => <p {...props} className="mb-2 last:mb-0" />
                }}
              >
                {message.text}
              </ReactMarkdown>
            ) : (
              message.text
            )}
          </div>
          <span className={`text-[10px] mt-2 block opacity-70 ${isBot ? 'text-gray-500' : 'text-teal-100'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};