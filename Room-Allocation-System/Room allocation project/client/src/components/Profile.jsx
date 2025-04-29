import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import AdminMainHeader from '../components/Header';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from '../redux/user/userSlice';
import { Link } from 'react-router-dom';
import bgImage from '../images/img1.jpg';

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (image) handleFileUpload(image);
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      () => setImageError(true),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) return dispatch(updateUserFailure(data));
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (err) {
      dispatch(updateUserFailure(err));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success === false) return dispatch(deleteUserFailure(data));
      dispatch(deleteUserSuccess(data));
    } catch (err) {
      dispatch(deleteUserFailure(err));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AdminMainHeader />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="max-w-2xl w-full p-8 bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Profile Management</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

            <img
              src={formData.profilePicture || currentUser.profilePicture}
              alt="profile"
              onClick={() => fileRef.current.click()}
              className="w-36 h-36 rounded-full object-cover border-4 border-white mx-auto shadow-md cursor-pointer"
            />

            {imageError && <p className="text-center text-red-500">❌ Upload failed (max 2MB)</p>}
            {imagePercent > 0 && imagePercent < 100 && (
              <p className="text-center text-yellow-500">Uploading: {imagePercent}%</p>
            )}
            {imagePercent === 100 && (
              <p className="text-center text-green-500">✅ Upload complete</p>
            )}

            <input
              defaultValue={currentUser.username}
              id="username"
              placeholder="Username"
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              defaultValue={currentUser.email}
              id="email"
              placeholder="Email"
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              id="password"
              placeholder="New Password"
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>

            {currentUser.isAdmin && (
              <Link to='/dashboard'>
                <button
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-md"
                >
                  Back to Admin Dashboard
                </button>
              </Link>
            )}
          </form>

          <div className="flex justify-between mt-6">
            <button onClick={handleDeleteAccount} className="text-red-500 hover:underline">
              🗑 Delete Account
            </button>
            <button onClick={handleSignOut} className="text-red-500 hover:underline">
              🚪 Sign Out
            </button>
          </div>

          {error && <p className="text-center text-red-500 mt-4">⚠ Something went wrong</p>}
          {updateSuccess && <p className="text-center text-green-500 mt-4">✅ Profile updated successfully</p>}
        </div>
      </div>
    </div>
  );
}
