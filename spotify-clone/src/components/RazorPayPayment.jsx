import React from 'react';

const RazorpayPayment = ({ amount, plan }) => {
  const handlePayment = async () => {
    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
      amount: amount * 100, // Razorpay works with paise, so multiply by 100
      currency: 'INR',
      name: 'Spotify Clone',
      description: `Payment for ${plan} Plan`,
      image: 'https://your-logo-url.com', // Optional: Add your logo URL if needed
      handler: function (response) {
        // Payment successful handler
        console.log('Payment successful!', response);
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: 'Your Name', // Replace with actual user data if available
        email: 'your-email@example.com', // Replace with actual user data if available
        contact: '9999999999', // Replace with actual user contact if available
      },
      theme: {
        color: '#1DB954', // Spotify green color for the theme
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
      console.error('Payment failed', response.error);
      alert('Payment failed. Please try again.');
    });

    rzp1.open();
  };

  return (
    <button onClick={handlePayment} className="button">
      Subscribe Now
    </button>
  );
};

export default RazorpayPayment;
