import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { getAccessTokenFromCookie, saveAccessTokenToCookie } from '../components/cookies';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function LoginPage() {

  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse: any) => {
      console.log(codeResponse);
      saveAccessTokenToCookie(codeResponse)
      navigate("/");
    },
    onError: (error) => console.log('Login Failed:', error),
    scope:"https://www.googleapis.com/auth/blogger"
  });




  useEffect(() => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo`, {
      headers: {
        Authorization: `Bearer ${getAccessTokenFromCookie()}`,
        Accept: 'application/json'
      }
    }).then(() => {
      navigate("/")
    }).catch(e => { console.log(e) });
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <button
          onClick={() => login()}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex items-center"
        >
          <img
            className="mr-2"
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            alt="Google Logo"
            width="20"
            height="20"
          />
          Login with Google
        </button>
      </div>
    </div>
  )
}