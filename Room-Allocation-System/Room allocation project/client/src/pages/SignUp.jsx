import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import backgroundImage from '/src/images/LOGIN.jpg';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/sign-in');
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="bg-white bg-opacity-30 p-10 rounded-lg shadow-lg w-[700px] max-w-md mx-auto">
        <h1 className="text-center text-4xl font-bold text-blue-900 mb-7">Sign Up</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="bg-slate-100 p-3 rounded-lg outline-none"
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="bg-slate-100 p-3 rounded-lg outline-none"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="bg-slate-100 p-3 rounded-lg outline-none"
            onChange={handleChange}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg uppercase font-bold shadow-md"
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          <OAuth />
        </form>

        <div className="flex gap-2 mt-5 justify-center">
          <p>Have an account?</p>
          <Link to="/sign-in" className="text-blue-600 hover:underline font-semibold">
            Sign in
          </Link>
        </div>

        {error && (
          <p className="text-red-600 text-center mt-5 font-semibold">
            Something went wrong!
          </p>
        )}
      </div>
    </div>
  );
}
