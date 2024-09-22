import React, { useContext, useState, useEffect } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';
// import { toast } from 'react-toastify';

const Profile = () => {
  const { user, setToken } = useContext(PlayerContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserData, setEditUserData] = useState({
    name: '',
    email: '',
    profilePic: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData')) || {};
    setEditUserData({
      name: storedUserData.name || user?.name || '',
      email: storedUserData.email || user?.email || '',
      profilePic: storedUserData.profilePic || user?.profilePic || '',
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUserData({
      ...editUserData,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    localStorage.setItem('userData', JSON.stringify(editUserData));
    toast.success("profile saved")
    setIsEditing(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditUserData({
          ...editUserData,
          profilePic: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePic = () => {
    setEditUserData({
      ...editUserData,
      profilePic: '',
    });
    localStorage.setItem(
      'userData',
      JSON.stringify({
        ...editUserData,
        profilePic: '',
      })
    );
  };

  const handleClose = () => {
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    toast('Logout Successfully!', {
      icon: '⭕',
    });
    navigate('/');
  };

  const isCustomProfilePic = editUserData.profilePic !== '';

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md'>
      <div className='profile-page w-full max-w-3xl p-8 bg-[#121212] text-white rounded-lg shadow-lg text-center relative'>
        <button
          onClick={handleClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-white'
        >
          <FaTimes size={20} />
        </button>
        <h2 className='text-4xl font-bold mb-6'>User Profile</h2>

        {/* Profile Picture */}
        <div className='profile-pic mb-6 relative'>
          {isCustomProfilePic ? (
            <img
              src={editUserData.profilePic}
              alt='Profile'
              className='w-32 h-32 rounded-full object-cover mx-auto mb-4'
              style={{
                position: 'relative',
                objectPosition: 'center center',
              }}
            />
          ) : (
            <div className='w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-black'>
              <FiUser className='text-black text-3xl' />
            </div>
          )}
          {isEditing && (
            <>
              <input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className='hidden' // Hide the default file input
                id='fileInput'
              />
              {!isCustomProfilePic && (
                <label
                  htmlFor='fileInput'
                  className='cursor-pointer bg-blue-500 px-6 py-2 rounded-full text-white'
                >
                  Upload Image
                </label>
              )}
              {isCustomProfilePic && (
                <button
                  onClick={handleRemoveProfilePic}
                  className='bg-red-600 px-4 py-1 rounded-full text-white text-sm mt-2'
                >
                  Remove Picture
                </button>
              )}
            </>
          )}
        </div>

        {/* User Info */}
        <div className='user-info mb-6'>
          <p className='mb-4'>
            <strong>Name:</strong>{' '}
            {isEditing ? (
              <input
                type='text'
                name='name'
                value={editUserData.name}
                onChange={handleInputChange}
                className='ml-3 bg-gray-800 text-white p-2 rounded w-1/2 mx-auto'
              />
            ) : (
              editUserData.name || 'Not provided'
            )}
          </p>

          <p className='mb-4'>
            <strong>Email:</strong>{' '}
            {isEditing ? (
              <input
                type='email'
                name='email'
                value={editUserData.email}
                onChange={handleInputChange}
                className='ml-3 bg-gray-800 text-white p-2 rounded w-1/2 mx-auto'
              />
            ) : (
              editUserData.email || 'Not provided'
            )}
          </p>
        </div>

        {/* Edit & Save Buttons */}
        <div className='buttons flex justify-center'>
          {isEditing ? (
            <>
              <button
                onClick={handleSaveChanges}
                className='bg-green-500 px-6 py-2 rounded-full text-white mr-4'
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className='bg-gray-500 px-6 py-2 rounded-full text-white'
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className='bg-green-500 px-6 py-2 rounded-full text-white'
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Logout Button */}
        <div className='mt-6'>
          <button
            onClick={handleLogout}
            className='bg-red-600 px-6 py-2 rounded-full text-white'
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
