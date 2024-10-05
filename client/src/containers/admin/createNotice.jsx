import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CreateNotice = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    title: '',
    selectedFile: null,
    filePreview: null, // To preview selected image/file
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      selectedFile: file,
      filePreview: URL.createObjectURL(file), // Store a preview URL
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.selectedFile) {
      toast.error('Please upload a file');
      return;
    }

    const form = new FormData();
    form.append('title', formData.title);
    form.append('file', formData.selectedFile); // Send the file using FormData

    try {
      const response = await axios.post(
        `/api/notices/create`,
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        toast.success('Notice created successfully!');
        closeModal(); // Close modal after success
        setFormData({
          title: '',
          selectedFile: null,
          filePreview: null, // Clear the file and preview
        });
      } else {
        toast.error(response.data.message || 'Failed to create notice');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create notice');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Create Notice</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-bold mb-2" htmlFor="file">
            Upload File
          </label>
          <label className="border border-blue-500 cursor-pointer p-4">
            {formData.selectedFile ? 'Change File' : 'Upload File'}
            <input
              type="file"
              id="file"
              name="file"
              accept=".pdf, image/*"
              onChange={handleFileChange}
              hidden
              required
            />
          </label>
          {formData.filePreview && (
            <div className="text-center mt-4">
              <img
                src={formData.filePreview}
                alt="File Preview"
                className="max-h-40 mx-auto"
              />
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded"
          >
            Create Notice
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNotice;
