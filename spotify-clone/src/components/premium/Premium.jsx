import React from 'react';import './Preminum.css'; // Import the CSS file

const Premium = () => {
  return (
    <div className='premium-container'>
      <header className='premium-header'>
        <h1>Upgrade to Spotify Premium</h1>
        <p>Enjoy ad-free music, offline listening, and more!</p>
      </header>
      <section className='premium-plans'>
        <div className='plan-card'>
          <h2>Individual</h2>
          <p className='price'>$9.99/month</p>
          <ul>
            <li>Ad-free music</li>
            <li>Offline listening</li>
            <li>Unlimited skips</li>
            <li>High-quality audio</li>
          </ul>
          <button className='subscribe-button'>Subscribe Now</button>
        </div>
        <div className='plan-card'>
          <h2>Family</h2>
          <p className='price'>$14.99/month</p>
          <ul>
            <li>All Individual benefits</li>
            <li>Up to 6 accounts</li>
            <li>Parental controls</li>
          </ul>
          <button className='subscribe-button'>Subscribe Now</button>
        </div>
        <div className='plan-card'>
          <h2>Student</h2>
          <p className='price'>$4.99/month</p>
          <ul>
            <li>All Individual benefits</li>
            <li>For eligible students</li>
          </ul>
          <button className='subscribe-button'>Subscribe Now</button>
        </div>
      </section>
      <footer className='premium-footer'>
        <p>
          Have any questions? <a href='/support'>Contact Support</a>
        </p>
      </footer>
    </div>
  );
};

export default Premium;
