// server/models/mood.js
import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    emotion: {
        type: String,
        required: true
    },
    thoughts: {
        type: String,
        required: false,
    },
    tags: {
        type: [String],
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    },
    colorTheme: {
        type: String,
        default: 'ash-grey-light-green' // for future theme styling (frontend)
    }
});

const Mood = mongoose.model('Mood', moodSchema);
export default Mood;
