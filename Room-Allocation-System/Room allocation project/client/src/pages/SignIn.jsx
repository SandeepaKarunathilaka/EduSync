import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import backgroundImage from '/src/images/bg_login.jpg';
import MainHeader from '../components/MainHeader';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      if (data.isAdmin) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      dispatch(signInFailure(err));
    }
  };

  return (
    <div>
      <MainHeader />
      <div
        className="flex items-center justify-center min-h-screen"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="bg-white bg-opacity-30 p-10 rounded-lg shadow-lg w-[700px] max-w-md mx-auto">
          <h1 className="text-center text-4xl font-bold text-blue-900 mb-9">Sign In</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="px-3 text-gray-500">@</span>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="p-4 w-full outline-none bg-transparent"
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="px-3 text-gray-500">🔒</span>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="p-4 w-full outline-none bg-transparent"
                onChange={handleChange}
              />
            </div>

            <button
              disabled={loading}
              className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 rounded-lg uppercase font-bold shadow-md hover:opacity-90"
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>

            <OAuth />
          </form>

          <div className="flex justify-center gap-2 mt-6">
            <p>Don't have an account?</p>
            <Link to="/sign-up" className="text-blue-600 hover:underline font-semibold">
              Sign up
            </Link>
          </div>

          {error && (
            <p className="text-red-600 text-center mt-5 font-semibold">
              {error.message || 'Something went wrong!'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
