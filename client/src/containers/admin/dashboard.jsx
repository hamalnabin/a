import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import LogoutButton from './components/Logout';
import NoticesList from './components/NoticeList';

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const [formData, setFormData] = useState({ title: '', selectedFile: null, filePreview: null });
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for fetching messages
  const [noticesRefetch, setNoticesRefetch] = useState(false); 

  // Fetch messages when "Messages" card is clicked
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/v1/api/contact/all`);
      if (Array.isArray(response.data)) {
        setMessages(response.data);
      } else if (response.data && Array.isArray(response.data.contacts)) {
        setMessages(response.data.contacts);
      } else {
        console.error('Unexpected API response structure:', response.data);
        toast.error('Unexpected data structure from API');
        setMessages([]);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Error fetching messages');
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotices = () => {
    setNoticesRefetch((prev) => !prev); // Toggle to trigger refetch
  };

  const openModal = (modalType) => {
    setCurrentModal(modalType);
    if (modalType === 'messages') {
      fetchMessages();
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentModal(null);
    setFormData({ title: '', selectedFile: null, filePreview: null }); // Reset form data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (event) => {
    const image = event.target.files[0];
    if (image) {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (validTypes.includes(image.type)) {
        setFormData((prevData) => ({
          ...prevData,
          selectedFile: image,
          filePreview: URL.createObjectURL(image),
        }));
      } else {
        toast.error('Invalid file type. Please upload a JPEG, PNG, or WEBP image.');
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!formData.selectedFile) {
      toast.error('Please upload a file');
      return;
    }

    const form = new FormData();
    form.append('title', formData.title);
    form.append('image', formData.selectedFile); // Send the file using FormData

    try {
      const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/v1/api/notice/create`,
          form,
          {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          }
      );
      if (response.data._id) { // Check for the presence of the _id
          toast.success('Notice created successfully!');
          fetchNotices();
          closeModal(); // Close modal after success
      } else {
          toast.error(response.data.message || 'Failed to create notice');
      }
  } catch (error) {
      console.error('Error creating notice:', error.response);
      toast.error(error.response?.data?.error || 'Failed to create notice');
  } finally {
      setFormData({ title: '', selectedFile: null, filePreview: null });
  }
  }  
    
  const handleDeleteMessage = async (id) => {
    console.log(`Deleting message with ID: ${id}`);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/v1/api/contact/${id}`);
      setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== id));
      toast.success('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Error deleting message');
    }
  };

  const renderCreateNoticeModal = () => (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create Notice</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
            Upload Image
          </label>
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
          {/* {formData.filePreview && (
            <div className="text-center mt-4">
              <img
                src={formData.filePreview}
                alt="File Preview"
                className="max-h-40 mx-auto"
              />
            </div>
          )} */}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Create Notice
        </button>
      </form>
    </div>
  );

  const renderMessagesModal = () => (
    <div>
    <h2 className="text-xl font-semibold mb-4">Messages</h2>
    {loading ? (
      <p>Loading messages...</p>
    ) : (
      <div className="space-y-4 max-h-60 overflow-y-auto">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg._id} className="border p-4 rounded-md">
              <h3 className="font-bold">{`${msg.firstName} ${msg.lastName}`}</h3>
              <p className="text-sm text-gray-700">{msg.message}</p>
              <p className="text-xs text-gray-500">{msg.email}</p>
              <button
                onClick={() => handleDeleteMessage(msg._id)}
                className="mt-2 bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No messages available</p>
        )}
      </div>
    )}
  </div>
);

  return (
    <div className="min-h-screen lg:mt-12 xs:mt-32 max-w-4xl mx-auto flex flex-col items-center justify-center bg-gray-100 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
        {/* Create Notice Card */}
        <div
          onClick={() => openModal('createNotice')}
          className="cursor-pointer mx-12 bg-white shadow-md rounded-lg p-6 text-center hover:bg-gray-200"
        >
          <h3 className="text-2xl font-semibold">Create Notice</h3>
          <p className="mt-2">Add new notices to your application</p>
        </div>
        {/* View Messages Card */}
        <div
          onClick={() => openModal('messages')}
          className="cursor-pointer mx-12 bg-white shadow-md rounded-lg p-6 text-center hover:bg-gray-200"
        >
          <h3 className="text-2xl font-semibold">Messages</h3>
          <p className="mt-2">View contact form messages</p>
        </div>
      </div>

        {/* Notices List */}
        <NoticesList key={noticesRefetch} />
      <div className="bottom-0 lg:ml-[700px] ml-[600px] xs:mt-12 xs:ml-56 right-4">
        <LogoutButton />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            {currentModal === 'createNotice' && renderCreateNoticeModal()}
            {currentModal === 'messages' && renderMessagesModal()}

            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
   
      <Toaster />
    </div>
  );
};

export default Dashboard;
