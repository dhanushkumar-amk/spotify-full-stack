import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Close the current accordion if it's open
    } else {
      setActiveIndex(index); // Open the clicked accordion
    }
  };

  const faqs = [
    {
      question: 'What is this Spotify clone?',
      answer:
        'This is a custom-built music streaming platform that mimics some of the core features of Spotify, providing an intuitive user experience for discovering, streaming, and managing music.',
    },
    {
      question: 'How do I create an account?',
      answer:
        'You can easily create an account by navigating to the registration page and filling out your details. Once registered, you will have access to all the features of the platform.',
    },
    {
      question: 'Is there a premium subscription?',
      answer:
        'Our platform offers both free and premium versions. The premium subscription provides an ad-free experience, offline downloads, and enhanced sound quality settings.',
    },
    {
      question: 'Can I customize the sound settings?',
      answer:
        'Yes! Our Spotify clone offers customizable sound presets, including options for boosting bass, enhancing treble, and adjusting equalizer settings to suit your listening preferences.',
    },
    {
      question: 'What devices are supported?',
      answer:
        'Our Spotify clone works across all major devices including desktop, mobile, and tablets, ensuring you can enjoy your music anywhere, anytime.'
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-12 text-green-600">Frequently Asked Questions</h1>
      
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-300 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
            <div
              className="flex justify-between items-center p-4 cursor-pointer bg-green-50 hover:bg-green-100"
              onClick={() => toggleAccordion(index)}
            >
              <h3 className="text-lg font-semibold text-green-700">{faq.question}</h3>
              {activeIndex === index ? (
                <FaChevronUp className="text-green-500" />
              ) : (
                <FaChevronDown className="text-green-500" />
              )}
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === index ? 'max-h-screen p-4' : 'max-h-0'
              }`}
            >
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
