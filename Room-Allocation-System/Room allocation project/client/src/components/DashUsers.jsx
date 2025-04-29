import React, { useEffect, useRef, useState } from 'react';
import { Modal, Table, Button } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
import AdminMainHeader from '../components/Header';

export default function DashUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentUser } = useSelector((state) => state.user);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: 'Users Report',
    onAfterPrint: () => alert('Report Successfully Downloaded!'),
  });

  return (
    <div className='p-4'>
      <AdminMainHeader />
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <div ref={ComponentsRef} className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 shadow-md">
              <thead className="text-xs uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">Date Created</th>
                  <th scope="col" className="px-6 py-3">User Image</th>
                  <th scope="col" className="px-6 py-3">Username</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Admin</th>
                  <th scope="col" className="px-6 py-3">Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={user.profilePicture}
                          alt={user.username}
                          className='w-12 h-12 rounded-full object-cover'
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      {user.isAdmin ? (
                        <FaCheck className='text-green-500' />
                      ) : (
                        <FaTimes className='text-red-500' />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setUserIdToDelete(user._id);
                        }}
                        className='text-red-600 cursor-pointer hover:underline'
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showMore && (
            <button
              onClick={handleShowMore}
              className='bg-blue-600 hover:bg-blue-700 text-white uppercase w-full py-3 mt-4 rounded-md'
            >
              Show More
            </button>
          )}

          <button
            onClick={handlePrint}
            className='bg-green-600 hover:bg-green-700 text-white uppercase w-full py-3 mt-4 rounded-md'
          >
            Download Report
          </button>
        </>
      ) : (
        <p className='text-center text-gray-500 mt-10'>You have no users yet!</p>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 text-gray-400 w-12 h-12' />
            <h3 className='mb-5 text-lg text-gray-500'>Are you sure you want to delete this user?</h3>
            <div className='flex justify-center gap-4'>
              <button
                onClick={handleDeleteUser}
                className='bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md'
              >
                Yes, I'm sure
              </button>
              <button
                onClick={() => setShowModal(false)}
                className='bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-md'
              >
                No, cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}