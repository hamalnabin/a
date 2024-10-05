import cloudinary from '../config/cloudinary.js';
import Notice from '../models/noticeModel.js';
import multer from 'multer';

// Use memory storage for multer
const upload = multer({ storage: multer.memoryStorage() });


// Create a new notice with file upload
export const createNotice = async (req, res) => {
    try {
        const { title } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Log file details
        console.log('File details:', file);

        // Upload image to Cloudinary using upload_stream
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'notices', resource_type: 'auto' },
            async (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return res.status(500).json({ message: 'Failed to upload image' });
                }

                // Create a new notice
                const newNotice = new Notice({
                    title,
                    image: {
                        public_id: result.public_id,
                        url: result.secure_url,
                        contentType: file.mimetype,
                    },
                });

                // Save the notice in the database
                const savedNotice = await newNotice.save();

                res.status(201).json(savedNotice);
            }
        );

        uploadStream.end(file.buffer); // Send the file buffer
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create notice' });
    }
};


// Get all notices
export const getNotices = async (req, res) => {
    try {
        const notices = await Notice.find();
        res.status(200).json(notices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get notice by ID
export const getNoticeById = async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);
        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }
        res.status(200).json(notice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a notice
export const updateNotice = async (req, res) => {
    try {
        const { title } = req.body;
        const noticeId = req.params.id;
        const file = req.file;

        // Find the notice by ID
        const notice = await Notice.findById(noticeId);
        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }

        // Update title if provided
        if (title) {
            notice.title = title;
        }

        // If a new file is uploaded, update the image
        if (file) {
            // Delete old image from Cloudinary if it exists
            if (notice.image && notice.image.public_id) {
                await cloudinary.uploader.destroy(notice.image.public_id);
            }

            // Upload new image to Cloudinary
            const result = await cloudinary.uploader.upload(file.buffer.toString('base64'), {
                resource_type: 'auto'
            });

            notice.image = {
                public_id: result.public_id,
                url: result.secure_url,
                contentType: file.mimetype,
            };
        }

        // Save the updated notice
        const updatedNotice = await notice.save();
        res.status(200).json(updatedNotice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update notice' });
    }
};

// Delete a notice
export const deleteNotice = async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);
        
        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }

        // Delete the image from Cloudinary if it exists
        if (notice.image && notice.image.public_id) {
            await cloudinary.uploader.destroy(notice.image.public_id);
        }

        // Delete the notice from the database
        await Notice.findByIdAndDelete(req.params.id);

        res.json({ message: 'Notice and associated image deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
