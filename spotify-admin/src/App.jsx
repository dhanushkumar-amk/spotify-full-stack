import {useState} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddSong from './pages/AddSong/AddSong';
import ListSong from './pages/ListSong/ListSong';
import AddAlbum from './pages/AddAlbum/AddAlbum';
import ListAlbum from './pages/ListAlbum/ListAlbum';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import Welcome from './components/WelcomePage/Welcome';
import LoginForm from './components/Login/Login';

export const url = 'https://spotify-backend-1-igxg.onrender.com';

const App = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem('token'))
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowAuth(false); // Hide login modal on successful login
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  // Show toast if the user is not logged in and tries to access a protected route
  const ProtectedRoute = ({element}) => {
    if (!isLoggedIn) {
      toast.error('Please log in to access this page.');
      return <Navigate to='/' />;
    }
    return element;
  };

  const handleShowAuth = () => {
    setShowAuth(true);
  };
  return (
    <div className='flex items-start min-h-screen'>
      <ToastContainer />
      <Sidebar />
      <div className='flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]'>
        <Navbar
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          setShowAuth={setShowAuth}
        />

        {showAuth && !isLoggedIn && (
          <LoginForm
            setShowAuth={setShowAuth}
            onLogin={handleLogin}
          />
        )}

        <div className='pt-8 pl-5 sm:pt-12 sm:pl-12'>
          <Routes>
            <Route
              path='/'
              element={<Welcome onShowAuth={handleShowAuth} />}
            />
            <Route
              path='/add-song'
              element={<ProtectedRoute element={<AddSong />} />}
            />
            <Route
              path='/list-songs'
              element={<ProtectedRoute element={<ListSong />} />}
            />
            <Route
              path='/add-album'
              element={<ProtectedRoute element={<AddAlbum />} />}
            />
            <Route
              path='/list-albums'
              element={<ProtectedRoute element={<ListAlbum />} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
