import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import './Preminum.css';

const Premium = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const handleSubscribe = (plan) => {
    setSelectedPlan(plan);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className='container'>
      <button className='back-button' onClick={() => navigate('/')}>
        Back
      </button>
      <header className='header'>
        <h1 className='title'>Get Admin Access And Enjoy The Spotify</h1>
        <p className='subtitle'>Enjoy ad-free music, offline listening, and more!</p>
      </header>
      <section className='plans'>
        {['Individual', 'Family', 'Student'].map((plan) => (
          <div className='plan-card' key={plan}>
            <h2 className='plan-title'>{plan}</h2>
            <p className='price'>${plan === 'Individual' ? '9.99' : plan === 'Family' ? '14.99' : '4.99'}/month</p>
            <ul className='features'>
              {plan === 'Individual' && <>
                <li>Ad-free music</li>
                <li>Offline listening</li>
                <li>Unlimited skips</li>
                <li>High-quality audio</li>
              </>}
              {plan === 'Family' && <>
                <li>All Individual benefits</li>
                <li>Up to 6 accounts</li>
                <li>Parental controls</li>
              </>}
              {plan === 'Student' && <>
                <li>All Individual benefits</li>
                <li>For eligible students</li>
              </>}
            </ul>
            <button onClick={() => handleSubscribe(plan)} className='subscribe-button'>Subscribe</button>
          </div>
        ))}
      </section>

      {/* Popup for Email Subscription */}
      {showPopup && (
        <div className='popup-overlay'>
          <div className='popup-content'>
            <button className='close-button' onClick={handleClosePopup}>✖</button>
            <h2>Subscribe to {selectedPlan} Plan</h2>
            <p>You'll receive an email with details about the {selectedPlan} plan.</p>
            <input type='email' placeholder='Enter your email' className='email-input' />
            <button onClick={handleClosePopup} className='confirm-button'>Got it!</button>
            <p>Subscribe to our waiting list, and you'll soon receive an email from us!</p>
          </div>
        </div>
      )}

      <footer className='footer'>
        <p>
          Have any questions?{' '}
          <a href='/support' className='link'>Contact Support</a>
        </p>
      </footer>
    </div>
  );
};

export default Premium;
