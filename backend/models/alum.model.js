const mongoose = require('mongoose');

const alumSchema = new mongoose.Schema({
    name: { type: String, required: true },
    csrlCenter: { type: String, required: true },
    batch: { type: String, required: true },
    about: { type: String },
    profilePhotoUrl: { type: String },
    experiences: [
        {
            companyName: { type: String, required: true },
            position: { type: String, required: true },
            startDate: { type: String, required: true },
            endDate: { type: String, default: "present" }
        }
    ]
});

const Alum = mongoose.model('Alum', alumSchema);

module.exports = Alum;