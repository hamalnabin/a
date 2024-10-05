import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { L1, L2 } from "../assets";
import toast from 'react-hot-toast';
import Loading from '../components/Loading';
import { format, isValid } from 'date-fns';

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/v1/api/notice/all`);
        if (Array.isArray(response.data)) {
          setNotices(response.data);
        } else if (response.data && Array.isArray(response.data.notices)) {
          setNotices(response.data.notices);
        } else {
          console.error('Unexpected API response structure:', response.data);
          toast.error('Unexpected data structure from API');
          setNotices([]);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch notices. Please try again later.');
        toast.error('Failed to fetch notices');
        setNotices([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotices();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const groupNoticesByDate = (noticesArray) => {
    if (!Array.isArray(noticesArray) || noticesArray.length === 0) {
      return {};
    }

    return noticesArray.reduce((grouped, notice) => {
      const noticeDate = notice.date || notice.createdAt || notice.updatedAt;

      if (!noticeDate) {
        return grouped;
      }

      const date = new Date(noticeDate);
      if (!isValid(date)) {
        return grouped;
      }

      const formattedDate = format(date, 'MMMM do, yyyy');
      if (!grouped[formattedDate]) {
        grouped[formattedDate] = [];
      }
      grouped[formattedDate].push(notice);

      return grouped;
    }, {});
  };

  const getImageUrl = (notice) => {
    return notice?.image?.url || null;
  };

  const groupedNotices = groupNoticesByDate(notices);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <section id="notice" className="mt-32 flex items-center justify-center flex-col gap-12">
      {/* Title */}
      <div className="flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 25 }}
          exit={{ opacity: 0, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center space-x-2"
          style={{ maxWidth: '90%' }}
        >
          <img src={L1} className="w-6 h-auto object-contain" alt="Icon" />
          <p className="text-black font-bold uppercase text-xl font-serif tracking-widest" style={{ whiteSpace: 'nowrap' }}>Notices</p>
          <img src={L2} className="w-6 h-auto object-contain" alt="Icon" />
        </motion.div>
      </div>

      <div className="w-full px-24">
        {Object.entries(groupedNotices).map(([date, noticesOnThisDate]) => (
          <div key={date} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{date}</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {noticesOnThisDate.map((notice) => {
                const imageUrl = getImageUrl(notice);
                return (
                  <div key={notice._id} className="border rounded shadow p-4 relative">
                    <h3 className="text-lg font-semibold">{notice.title}</h3>
                    {imageUrl ? (
                      <div>
                        <img
                          src={imageUrl}
                          className="w-full h-auto cursor-pointer mb-2"
                          onClick={() => handleImageClick(imageUrl)}
                          alt={notice.title}
                         
                        />
                      </div>
                    ) : (
                      <p>No image available</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {modalIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="rounded-lg p-4 relative max-w-lg mx-auto">
            <button
              className="absolute top-2 right-2 bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
              onClick={closeModal}
            >
              Close
            </button>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-full max-h-full object-contain"
              
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Notice;