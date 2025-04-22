import React, { useEffect, useRef, useState } from 'react';
import logo from "../assets/logo.png";
import AvatarDropdown from './AvatarDropdown ';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const avatarRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const checkLogin = () => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('1234567');

    if (token && userInfo) {
      try {
        const decoded = JSON.parse(userInfo);
        setIsLoggedIn(true);
        setAvatar(decoded.picture);
        setName(decoded.name);
      } catch (error) {
        console.error("Failed to parse user info:", error);
        setIsLoggedIn(false);
        setAvatar('');
        setName('');
      }
    } else {
      setIsLoggedIn(false);
      setAvatar('');
      setName('');
    }
  };

  useEffect(() => {
    checkLogin();

    const handleStorageChange = () => checkLogin();
    const handleLoginSuccess = () => checkLogin();

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('login-success', handleLoginSuccess);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('login-success', handleLoginSuccess);
    };
  }, []);

  useEffect(() => {
    checkLogin();
  }, [window.location.pathname]);

  return (
    <header className="flex items-center justify-between px-6 py-3 shadow">
      <div className="flex items-center space-x-6">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        <nav className="flex space-x-4 text-sm text-gray-700">
          <a href="#" className="font-semibold border-b-2 border-black">Problems</a>
          <a href="#">Interview ▾</a>
          <a href="#" className="text-green-500">Store ▾</a>
        </nav>
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-700 relative">
        {isLoggedIn ? (
          <div className="relative" ref={avatarRef}>
            <img
              src={avatar}
              alt="User Avatar"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-xl z-20 w-64 p-4">
                <AvatarDropdown avatar={avatar} nameuser={name} onLogout={checkLogin} />
              </div>
            )}
          </div>
        ) : (
          <a href="/login" className="hover:underline">Sign in</a>
        )}
        <button className="bg-green-100 text-green-500 px-3 py-1 rounded-lg font-medium">
          Premium
        </button>
      </div>
    </header>
  );
};

export default Header;
