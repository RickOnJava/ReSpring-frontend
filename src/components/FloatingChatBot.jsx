// import { useState, useEffect, useRef } from 'react';
// import { MessageCircle, X } from 'lucide-react';
// import axios from 'axios';
// import { server } from '@/config';

// export default function FloatingChatbot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [messages, setMessages] = useState([
//     { sender: 'bot', text: 'Hi! Ask me about any spring, district, or water issue.', typing: false },
//   ]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const [language, setLanguage] = useState('en'); // default English
// const recognitionRef = useRef(null);
// const [isListening, setIsListening] = useState(false);

// // Initialize SpeechRecognition
// useEffect(() => {
//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   if (SpeechRecognition) {
//     recognitionRef.current = new SpeechRecognition();
//     recognitionRef.current.continuous = false;
//     recognitionRef.current.interimResults = false;

//     recognitionRef.current.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setInput(transcript);
//     };

//     recognitionRef.current.onerror = (event) => {
//       console.error('Speech recognition error:', event.error);
//       setIsListening(false);
//     };

//     recognitionRef.current.onend = () => {
//       setIsListening(false);
//     };
//   }
// }, []);


//   // Scroll to bottom of messages when new messages are added
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Handle opening and closing animations
//   const toggleChat = (open) => {
//     setIsAnimating(true);
//     if (open) {
//       setIsOpen(true);
//     } else {
//       setTimeout(() => {
//         setIsOpen(false);
//         setIsAnimating(false);
//       }, 300); // Match this with the CSS transition duration
//     }
//   };

//   // Simulate typing effect for bot messages
//   const addBotResponse = (text) => {
//     // First add an empty message with typing indicator
//     const typingMessage = { sender: 'bot', text: '', typing: true };
//     setMessages(prev => [...prev, typingMessage]);
    
//     // Simulate typing by revealing characters gradually
//     let charIndex = 0;
//     const typingSpeed = 30; // milliseconds per character
    
//     const typingInterval = setInterval(() => {
//       if (charIndex <= text.length) {
//         setMessages(prev => {
//           const updatedMessages = [...prev];
//           const lastIndex = updatedMessages.length - 1;
//           updatedMessages[lastIndex] = {
//             ...updatedMessages[lastIndex],
//             text: text.substring(0, charIndex),
//             typing: charIndex < text.length
//           };
//           return updatedMessages;
//         });
//         charIndex++;
//       } else {
//         clearInterval(typingInterval);
//       }
//     }, typingSpeed);
//   };

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const userMessage = { sender: 'user', text: input };
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setLoading(true);
  
//     try {
//       const res = await axios.post(`${server}/api/v1/chat`, {
//         message: input,
//         language: language,
//       });
//       addBotResponse(res.data.reply);
//     } catch (error) {
//       addBotResponse('❌ Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   // Animation classes
//   const chatContainerClass = `
//     w-[90vw] sm:w-[350px] h-[70vh] flex flex-col bg-white shadow-xl rounded-lg border border-gray-200
//     transition-all duration-300 ease-in-out
//     ${isAnimating && isOpen ? 'scale-100 opacity-100' : isAnimating ? 'scale-90 opacity-0' : ''}
//   `;

//   return (
//     <div className="fixed bottom-6 right-6 z-50">
//       {!isOpen ? (
//         <button
//           className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all hover:scale-110"
//           onClick={() => toggleChat(true)}
//           aria-label="Open chat"
//         >
//           <MessageCircle className="w-6 h-6" />
//         </button>
//       ) : (
//         <div className={chatContainerClass} onAnimationEnd={() => setIsAnimating(false)}>
//           <div className="flex justify-between items-center p-3 border-b">
//             <h2 className="font-semibold text-blue-700">ReSprings Chatbot</h2>
//             <button 
//               onClick={() => toggleChat(false)}
//               className="transition-transform hover:rotate-90"
//               aria-label="Close chat"
//             >
//               <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
//             </button>
//           </div>

//           <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
//             {messages.map((msg, i) => (
//               <div 
//                 key={i} 
//                 className={`text-sm ${msg.sender === 'user' ? 'text-right' : 'text-left'} 
//                   animate-fadeIn transition-all duration-300`}
//               >
//                 <span
//                   className={`inline-block px-3 py-2 rounded-lg max-w-[80%] ${
//                     msg.sender === 'user'
//                       ? 'bg-blue-100 text-blue-800'
//                       : 'bg-green-100 text-green-800'
//                   }`}
//                 >
//                   {msg.text}
//                   {msg.typing && (
//                     <span className="typing-indicator ml-1">
//                       {/* <span className="dot"></span>
//                       <span className="dot"></span>
//                       <span className="dot"></span> */}
//                     </span>
//                   )}
//                 </span>
//               </div>
//             ))}
//             {loading && !messages[messages.length-1]?.typing && (
//               <div className="text-xs text-gray-500 animate-pulse">Thinking...</div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           <div className="flex p-2 border-t">
//             <input
//               className="flex-1 border rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
//               type="text"
//               placeholder="Ask something..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//               disabled={loading}
//             />
//             <button
//               className={`px-4 py-2 rounded-r text-sm transition-colors ${
//                 loading 
//                   ? 'bg-gray-400 text-white cursor-not-allowed' 
//                   : 'bg-blue-600 text-white hover:bg-blue-700'
//               }`}
//               onClick={sendMessage}
//               disabled={loading}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Globe, Mic, MicOff } from 'lucide-react';
import axios from 'axios';
import { server } from '@/config';

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en'); // Default language
  const messagesEndRef = useRef(null);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false); // New state for language menu
  const languageMenuRef = useRef(null); // Ref for language menu for click outside detection

  // Initialize welcome message based on selected language
  useEffect(() => {
    const welcomeMessages = {
      en: "Hi! Ask me about any spring, district, or water issue.",
      hi: "नमस्ते! आप मुझसे किसी भी जल स्रोत, जिला या पानी से संबंधित मुद्दे के बारे में पूछ सकते हैं।",
      ne: "नमस्कार! तपाईं मसँग कुनै पनि स्प्रिंग, जिल्ला, वा पानी सम्बन्धी समस्याको बारेमा सोध्न सक्नुहुन्छ।"
    };
    
    setMessages([{ 
      sender: 'bot', 
      text: welcomeMessages[language] || welcomeMessages.en, 
      typing: false,
      language
    }]);
  }, [language]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      
      // Set language for speech recognition based on selected language
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'ne' ? 'ne-NP' : 'en-US';
      
      recognition.onstart = () => {
        setListening(true);
      };
      
      recognition.onend = () => {
        setListening(false);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setListening(false);
      };
      
      recognitionRef.current = recognition;
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language]); // Re-initialize when language changes

  // Handle click outside language menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setIsLanguageMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle opening and closing animations
  const toggleChat = (open) => {
    setIsAnimating(true);
    if (open) {
      setIsOpen(true);
    } else {
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimating(false);
      }, 300); // Match this with the CSS transition duration
    }
  };

  // Simulate typing effect for bot messages
  const addBotResponse = (text, responseLanguage) => {
    // First add an empty message with typing indicator
    const typingMessage = { sender: 'bot', text: '', typing: true, language: responseLanguage };
    setMessages(prev => [...prev, typingMessage]);
    
    // Simulate typing by revealing characters gradually
    let charIndex = 0;
    const typingSpeed = 30; // milliseconds per character
    
    const typingInterval = setInterval(() => {
      if (charIndex <= text.length) {
        setMessages(prev => {
          const updatedMessages = [...prev];
          const lastIndex = updatedMessages.length - 1;
          updatedMessages[lastIndex] = {
            ...updatedMessages[lastIndex],
            text: text.substring(0, charIndex),
            typing: charIndex < text.length
          };
          return updatedMessages;
        });
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input, language };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post(`${server}/api/v1/chat`, { 
        message: input,
        language // Send the selected language
      });
      
      // Use the language returned from the API or fallback to the selected language
      const responseLanguage = res.data.language || language;
      addBotResponse(res.data.reply, responseLanguage);
    } catch (error) {
      const errorMessages = {
        en: '❌ Something went wrong. Please try again.',
        hi: '❌ कुछ गलत हो गया। कृपया पुनः प्रयास करें।',
        ne: '❌ केही गलत भयो। कृपया फेरि प्रयास गर्नुहोस्।'
      };
      addBotResponse(errorMessages[language] || errorMessages.en, language);
    } finally {
      setLoading(false);
    }
  };

  // Change language handler
  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    setIsLanguageMenuOpen(false); // Close menu after selection
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // Toggle language menu
  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(prev => !prev);
  };

  const chatContainerClass = `
    w-[90vw] sm:w-[350px] h-[70vh] flex flex-col bg-white shadow-xl rounded-lg border border-gray-200
    transition-all duration-300 ease-in-out
    ${isAnimating && isOpen ? 'scale-100 opacity-100' : isAnimating ? 'scale-90 opacity-0' : ''}
  `;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all hover:scale-110"
          onClick={() => toggleChat(true)}
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      ) : (
        <div className={chatContainerClass} onAnimationEnd={() => setIsAnimating(false)}>
          <div className="flex justify-between items-center p-3 border-b bg-gray-100">
            <h2 className="font-semibold text-blue-700">ReSprings Chatbot</h2>
            <div className="flex items-center space-x-2">
              <div className="relative" ref={languageMenuRef}>
                <button 
                  className="p-1 rounded hover:bg-gray-200"
                  onClick={toggleLanguageMenu}
                  aria-label="Change language"
                >
                  <Globe className="w-5 h-5 text-gray-600" />
                </button>
                {isLanguageMenuOpen && (
                  <div className="absolute right-0 mt-1 w-32 bg-white shadow-md rounded-md border border-gray-200 py-1 z-50">
                    {[
                      { code: 'en', label: 'English' },
                      { code: 'hi', label: 'हिंदी (Hindi)' },
                      { code: 'ne', label: 'नेपाली (Nepali)' },
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`block w-full text-left px-3 py-1 text-sm ${
                          language === lang.code
                            ? 'bg-blue-50 text-blue-700'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => toggleChat(false)}
                className="transition-transform hover:rotate-90"
                aria-label="Close chat"
              >
                <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`text-sm ${
                  msg.sender === 'user' ? 'text-right' : 'text-left'
                } animate-fadeIn`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg max-w-[80%] ${
                    msg.sender === 'user'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                  dir={msg.language === 'hi' || msg.language === 'ne' ? 'auto' : 'ltr'}
                >
                  {msg.text}
                  {msg.typing && (
                    <span className="typing-indicator ml-1">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </span>
                  )}
                </span>
              </div>
            ))}
            {loading && !messages[messages.length - 1]?.typing && (
              <div className="text-xs text-gray-500 animate-pulse">Thinking...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex p-2 border-t gap-1">
            <input
              className="flex-1 border rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              type="text"
              placeholder={
                language === 'hi' ? 'कुछ पूछें...' :
                language === 'ne' ? 'केही सोध्नुहोस्...' :
                'Ask something...'
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              disabled={loading}
              dir={language === 'hi' || language === 'ne' ? 'auto' : 'ltr'}
            />
            <button
              onClick={toggleListening}
              className="px-3 py-2 bg-white border-y border-r hover:bg-gray-100 text-gray-600"
              aria-label="Voice input"
            >
              {listening ? <MicOff className="w-4 h-4 text-red-500" /> : <Mic className="w-4 h-4" />}
            </button>
            <button
              className={`px-4 py-2 rounded-r text-sm transition-colors ${
                loading
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              onClick={sendMessage}
              disabled={loading}
            >
              {language === 'hi' ? 'भेजें' : language === 'ne' ? 'पठाउनुहोस्' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}