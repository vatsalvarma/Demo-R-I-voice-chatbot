import React from 'react';

export const Message = ({ msg }) => {
  const isUser = msg.type === 'user';
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm
          ${isUser 
            ? 'bg-brand-dark text-white rounded-tr-sm' 
            : 'bg-white text-slate-800 rounded-tl-sm border border-slate-100'
          }`}
      >
        {msg.message}
      </div>
    </div>
  );
};
