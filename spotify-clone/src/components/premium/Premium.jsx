import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './Preminum.css';
import toast from 'react-hot-toast';


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
      handleClosePopup(true)
    }
  };

  return (
    <div className='container'>
      <button
        className='back-button'
        onClick={() => navigate('/')}>
        Back
      </button>
      <header className='header'>
        <h1 className='title'>Get Admin Access And Enjoy The Spotify</h1>
        <p className='subtitle'>
          Enjoy ad-free music, offline listening, and more!
        </p>
      </header>
      <section className='plans'>
        {['Normal', 'Intermediate', 'Pro'].map((plan) => (
          <div
            className='plan-card'
            key={plan}>
            <h2 className='plan-title'>{plan}</h2>
            <p className='price'>
              $
              {plan === 'Normal'
                ? '49.99'
                : plan === 'Intermediate'
                ? '70.99'
                : '99.99'}
              /month
            </p>
            <ul className='features'>
              {plan === 'Normal' && (
                <>
                  <li>Add Song</li>
                  <li>Delete song</li>
                  <li>Add Album</li>
                  <li>Delete Album</li>
                </>
              )}
              {plan === 'Intermediate' && (
                <>
                  <li>Manage Song</li>
                  <li>Manage Album</li>
                  <li>Manage Ui</li>
                  <li>Manage User FeedBack</li>
                </>
              )}
              {plan === 'Pro' && (
                <>
                  <li>All Individual benefits</li>
                  <li>Discount Available</li>
                  <li>Manager User Info</li>
                  <li>Direct Access to Admin</li>
                </>
              )}
            </ul>
            <button
              onClick={() => handleSubscribe(plan)}
              className='subscribe-button'>
              Subscribe
            </button>
          </div>
        ))}
      </section>

      {/* Popup for Email Subscription */}
      {showPopup && (
        <div className='popup-overlay'>
          <div className='popup-content'>
            <button
              className='close-button'
              onClick={handleClosePopup}>
              ✖
            </button>
            <h2>Subscribe to {selectedPlan} Plan</h2>
            <p>
              You'll receive an email with details about the {selectedPlan}{' '}
              plan.
            </p>
            <form onSubmit={onSubmit}>
            <input type="hidden" name="subject" value="New Mail from Spotify Premium"/>
            <input type="text" hidden value={selectedPlan} name='plan ' />
            <input type="text" hidden value="they are added to the waiting list" name='normal information' />
            
              <input
                type='email'
                placeholder='Enter your email'
                className='email-input'
                name="email"
              />

              <button
              type='submit'
                // onClick={handleClosePopup}
                className='confirm-button'>
                Got it!
              </button>
            </form>

            <p>
              Subscribe to our waiting list, and you'll soon receive an email
              from us!
            </p>
          </div>
        </div>
      )}

      <footer className='footer'>
        <p>
          Have any questions?{' '}
          <a
            onClick={() => navigate('/contact')}
            className='link'>
            Contact Support
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Premium;
