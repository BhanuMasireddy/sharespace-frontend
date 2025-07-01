import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (err) {
      setMsg(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#4b1d3f] to-[#d72638] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-extrabold mb-6 text-[#4b1d3f]">
          Welcome to <span className="text-[#d72638] italic">ShareSpace</span>
        </h2>



        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d72638]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d72638]"
          />
          <button
            type="submit"
            className="w-full bg-[#4b1d3f] hover:bg-[#3a162f] text-white font-semibold py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <div className="my-4 text-gray-500">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-[#d72638] hover:bg-[#c41f2f] text-white font-semibold py-2 rounded-lg transition"
        >
          Login with Google
        </button>

        <p className="mt-6 text-sm text-gray-600">
          Don’t have an account?{' '}
          <span
            className="text-[#d72638] font-medium cursor-pointer hover:underline"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </p>

        {msg && <p className="mt-4 text-red-500 text-sm">{msg}</p>}
      </div>
    </div>
  );
};

export default Login;
