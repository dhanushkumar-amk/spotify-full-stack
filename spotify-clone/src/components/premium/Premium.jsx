import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Preminum.css'; 

const Premium = () => {
  const navigate = useNavigate();

  return (
    <div className='container'>
      <button
        className='back-button'
        onClick={() => navigate('/')}
      >
        Back
      </button>
      <header className='header'>
        <h1 className='title'>Get Admin Access And Enjoy The Spotify</h1>
        <p className='subtitle'>
          Enjoy ad-free music, offline listening, and more!
        </p>
      </header>
      <section className='plans'>
        <div className='plan-card'>
          <h2 className='plan-title'>Individual</h2>
          <p className='price'>$9.99/month</p>
          <ul className='features'>
            <li>Ad-free music</li>
            <li>Offline listening</li>
            <li>Unlimited skips</li>
            <li>High-quality audio</li>
          </ul>
          <button className='button'>Subscribe Now</button>
        </div>
        <div className='plan-card'>
          <h2 className='plan-title'>Family</h2>
          <p className='price'>$14.99/month</p>
          <ul className='features'>
            <li>All Individual benefits</li>
            <li>Up to 6 accounts</li>
            <li>Parental controls</li>
          </ul>
          <button className='button'>Subscribe Now</button>
        </div>
        <div className='plan-card'>
          <h2 className='plan-title'>Student</h2>
          <p className='price'>$4.99/month</p>
          <ul className='features'>
            <li>All Individual benefits</li>
            <li>For eligible students</li>
          </ul>
          <button className='button'>Subscribe Now</button>
        </div>
      </section>
      <footer className='footer'>
        <p>
          Have any questions?{' '}
          <a href='/support' className='link'>
            Contact Support
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Premium;
