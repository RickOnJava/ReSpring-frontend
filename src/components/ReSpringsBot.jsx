import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';



const stepsEN = [
    {
      id: '1',
      message: 'Welcome to ReSprings! How can I help you today?',
      trigger: 'main-options',
    },
    {
      id: 'main-options',
      options: [
        { value: 'report', label: 'Report an issue', trigger: 'report-help' },
        { value: 'map', label: 'Using the Map', trigger: 'map-help' },
        { value: 'filter', label: 'How to filter springs?', trigger: 'filter-help' },
        { value: 'register', label: 'Register/Login Help', trigger: 'auth-help' },
        { value: 'admin', label: 'Admin Panel Help', trigger: 'admin-help' },
        { value: 'contact', label: 'Contact Support', trigger: 'contact' },
      ],
    },
    {
      id: 'report-help',
      message:
        'Go to the map, click on a spring marker, and tap "Report Issue". Fill in details and upload an image.',
      trigger: 'main-options',
    },
    {
      id: 'map-help',
      message:
        'Our map uses markers with colors to indicate spring status. Click a marker for details or to report.',
      trigger: 'main-options',
    },
    {
      id: 'filter-help',
      message:
        'Use the filter panel (by district or usage) or search bar to quickly find a spring.',
      trigger: 'main-options',
    },
    {
      id: 'auth-help',
      message:
        'Citizens can sign up freely. Admin access requires special credentials provided by the department.',
      trigger: 'main-options',
    },
    {
      id: 'admin-help',
      message:
        'Admins can manage springs, view analytics, and see all user reports. Navigate using the Admin Panel.',
      trigger: 'main-options',
    },
    {
      id: 'contact',
      message: 'Reach us at rickghosh824@gmail.com or visit the help center in the footer.',
      trigger: 'main-options',
    },
];

const stepsHI = [
    {
      id: '1',
      message: 'ReSprings में आपका स्वागत है! मैं आज आपकी कैसे मदद कर सकता हूँ?',
      trigger: 'main-options',
    },
    {
      id: 'main-options',
      options: [
        { value: 'report', label: 'समस्या की रिपोर्ट करें', trigger: 'report-help' },
        { value: 'map', label: 'मानचित्र का उपयोग करना', trigger: 'map-help' },
        { value: 'filter', label: 'स्प्रिंग्स को कैसे फ़िल्टर करें?', trigger: 'filter-help' },
        { value: 'register', label: 'रजिस्टर/लॉगिन सहायता', trigger: 'auth-help' },
        { value: 'admin', label: 'एडमिन पैनल सहायता', trigger: 'admin-help' },
        { value: 'contact', label: 'संपर्क सहायता', trigger: 'contact' },
      ],
    },
    {
      id: 'report-help',
      message:
        'मानचित्र पर जाएं, एक स्प्रिंग मार्कर पर क्लिक करें, और "समस्या की रिपोर्ट करें" पर टैप करें। विवरण भरें और एक छवि अपलोड करें।',
      trigger: 'main-options',
    },
    {
      id: 'map-help',
      message:
        'हमारा मानचित्र स्प्रिंग स्थिति को दर्शाने के लिए रंगीन मार्करों का उपयोग करता है। विवरण या रिपोर्ट के लिए एक मार्कर पर क्लिक करें।',
      trigger: 'main-options',
    },
    {
      id: 'filter-help',
      message:
        'जल्दी से स्प्रिंग खोजने के लिए फ़िल्टर पैनल (जिले या उपयोग के अनुसार) या खोज बार का उपयोग करें।',
      trigger: 'main-options',
    },
    {
      id: 'auth-help',
      message:
        'नागरिक स्वतंत्र रूप से साइन अप कर सकते हैं। एडमिन एक्सेस के लिए विभाग द्वारा प्रदान की गई विशेष क्रेडेंशियल्स की आवश्यकता होती है।',
      trigger: 'main-options',
    },
    {
      id: 'admin-help',
      message:
        'एडमिन स्प्रिंग्स का प्रबंधन कर सकते हैं, विश्लेषण देख सकते हैं, और सभी उपयोगकर्ता रिपोर्ट देख सकते हैं। एडमिन पैनल का उपयोग करके नेविगेट करें।',
      trigger: 'main-options',
    },
    {
      id: 'contact',
      message: 'हमसे rickghosh824@gmail.com पर संपर्क करें या फुटर में सहायता केंद्र पर जाएं।',
      trigger: 'main-options',
    },
];
  
  

// Customize theme (optional)
const theme = {
  background: '#f0fdf4',
  fontFamily: 'Arial',
  headerBgColor: '#22c55e',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#22c55e',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#333',
};

export default function ReSpringsBot() {

    const [language, setLanguage] = useState('en');
    const [showBot, setShowBot] = useState(false);

    const toggleLanguage = () => setLanguage(language === 'en' ? 'hi' : 'en');
  
    const steps = language === 'en' ? stepsEN : stepsHI;

  return (
    <div className="fixed bottom-5 right-5 z-50 w-72">
    {showBot && (
      <ThemeProvider theme={theme}>
        <ChatBot
          steps={steps}
          floating={false}
          headerTitle={`ReSprings Assistant (${language.toUpperCase()})`}
        />
      </ThemeProvider>
    )}

    <div className="flex flex-col items-end gap-2">
      <button
        onClick={toggleLanguage}
        className="text-sm bg-white px-2 py-1 rounded shadow hover:bg-gray-100"
      >
        {language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
      </button>
      <button
        onClick={() => setShowBot(!showBot)}
        className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  </div>
  );
}
