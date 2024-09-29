import React from 'react';
import toast from 'react-hot-toast';


const Contact = () => {
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        formData.append('access_key', '1c3cbdab-d1c4-4382-ae9e-ab51a3ed67e6');
    
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
    
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: json,
        }).then((res) => res.json());
    
        if (res.success) {
          toast.success(' ✅  Success', res);
          
        }
      };
    
    
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-transparent px-4 py-8">
      <div className="bg-transparent p-10 rounded-lg shadow-xl w-full max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Get In Touch</h2>

        <form className="space-y-6"  onSubmit={onSubmit} >
          {/* Name */}
          <div>
          <input type="hidden" name="subject" value="New Mail from User's"/>
            
            <label htmlFor="name" className="block text-sm font-semibold text-White-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name='name'
              className="block w-full px-5 py-3 border bg-transparent border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-White-700 mb-1">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name='email'
              className="block w-full px-5 py-3 border bg-transparent border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm "
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block  text-sm font-semibold text-white-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              name='message'
              className="block w-full px-5 py-3 border bg-transparent border-gray-300 rounded-lg shadow-sm  sm:text-sm resize-none"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              
              className="w-full sm:w-auto px-10 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-700-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-lg"
            >
              Send Message
            </button>
          </div>
        </form>
        
        
        
      </div>
    </div>
  );
};

export default Contact;
