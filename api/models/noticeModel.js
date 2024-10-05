import mongoose from 'mongoose';

const NoticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        public_id: { type: String },  
        url: { type: String },       
        contentType: { type: String }
    }
}, { timestamps: true });

const Notice = mongoose.model('Notice', NoticeSchema);

export default Notice;