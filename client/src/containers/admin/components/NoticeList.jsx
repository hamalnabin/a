import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from '../../../components/Loading';

const NoticesList = ({ noticesRefetch }) => {
    const [notices, setNotices] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        fetchNotices();
    }, [noticesRefetch]);

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedImage(null);
    };

    const handleDeleteNotice = async (id, publicId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/v1/api/notice/${id}`, {
                data: { publicId }  
            });
            setNotices(notices.filter((notice) => notice._id !== id));
            toast.success('Notice and associated image deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error('Error deleting notice. Please try again.');
        }
    };

    const getImageUrl = (notice) => {
        return notice?.image?.url || null;
    };

    if (loading) return <Loading />;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="w-full p-2">
            <h2 className="text-2xl font-bold mb-4">Notices</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notices.length > 0 ? (
                    notices.map((notice) => {
                        const imageUrl = getImageUrl(notice);
                        return (
                            <div key={notice._id} className="border rounded shadow p-4 relative">
                                <h3 className="text-lg font-semibold">{notice.title}</h3>

                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        className="w-full h-auto cursor-pointer mb-2"
                                        onClick={() => handleImageClick(imageUrl)}
                                        alt={notice.title}
                                    />
                                ) : (
                                    <p className="text-gray-500">No image available</p>
                                )}

                                <button
                                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    onClick={() => handleDeleteNotice(notice._id, notice.image?.public_id)}
                                >
                                    Delete
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <p className="col-span-3 text-center text-gray-500">No notices available</p>
                )}
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
        </div>
    );
};

export default NoticesList;