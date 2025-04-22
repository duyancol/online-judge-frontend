import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GoogleLoginSection() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSuccess = async (credentialResponse) => {
    setIsLoading(true);
    try {
      const decode = jwtDecode(credentialResponse.credential);
      localStorage.setItem('1234567', JSON.stringify(decode));
      localStorage.setItem('6543217', JSON.stringify(credentialResponse.credential));
      localStorage.setItem('token', credentialResponse.credential);

      const response = await axios.post(
        `https://shop-shoe-production-5fc8.up.railway.app/api/v1/auth/google/${credentialResponse.credential}`
      );

      localStorage.setItem('nameuser', response.data.firstname);
      localStorage.setItem('id', response.data.id);
      localStorage.setItem('email_tk', response.data.email);
      localStorage.setItem('roles', JSON.stringify(response.data.authorities));

      const roles = JSON.parse(localStorage.getItem('roles'));
      if (roles && roles.length > 0 && roles[0].authority === 'USER') {
        window.dispatchEvent(new Event("login-success"));
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Online Judge 👋</h1>
          <p className="text-gray-500 mb-6">Sign in with Google to get started</p>

          <GoogleOAuthProvider clientId="272854032499-uvoh7etrb27k4sp664qd3baj900l703l.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => {
                console.log('Login Failed');
                alert("Google login failed.");
              }}
            />
          </GoogleOAuthProvider>

          <p className="text-xs text-gray-400 mt-6">
            By signing in, you agree to our{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default GoogleLoginSection;
