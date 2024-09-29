import React from 'react';

const Blog = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Blog Post Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-green-500 mb-4">Enhancing Your Music Experience with Our Spotify Clone</h1>
        <p className="text-lg text-white-600">
          Learn how our Spotify clone can revolutionize the way you listen to music with advanced features and seamless streaming.
        </p>
      </div>

      {/* Blog Image */}
      <div className="mb-10">
        <img 
          src="https://audiohype.io/wp-content/uploads/2020/09/The-Best-Spotify-Playlists.png" 
          alt="Spotify Clone" 
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Blog Content */}
      <div className="text-lg text-white leading-relaxed space-y-6">
        <p>
          Music is an integral part of our daily lives, and streaming services like Spotify have transformed the way we access and enjoy music. Our Spotify clone is designed to offer you the same seamless experience with even more features that cater to your music preferences.
        </p>

        <p>
          Whether you're an audiophile or a casual listener, the customizable audio settings allow you to tweak your listening experience, from boosting bass to enhancing treble. Plus, with features like real-time collaboration on playlists and AI-driven music recommendations, you’ll always have fresh tunes at your fingertips.
        </p>

        <p>
          What sets our Spotify clone apart is its user-friendly interface, no intrusive ads, and a highly intuitive dashboard that lets you control everything with ease. Whether you're discovering new music or revisiting old favorites, our platform ensures that you have full control over your music journey.
        </p>

        <p>
          Try out the ad-free experience and enjoy seamless downloads with just one click. Whether you're at home, at work, or on the go, our platform ensures you never miss a beat. Start your music adventure today with our next-gen Spotify clone!
        </p>
      </div>
    </div>
  );
};

export default Blog;
