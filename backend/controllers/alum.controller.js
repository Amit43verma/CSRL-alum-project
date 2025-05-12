const express = require('express');
const router = express.Router();
const alumModel = require('../models/alum.model');

module.exports.getAlums = async (req, res) => {
    try {
        const alums = await alumModel.find();
        // console.log(alums);
        if (!alums) {
            return res.status(404).json({ message: 'No alums found' });
        }

        const alumniData = alums.map((user) => ({
            id: user._id,
            name: user.name,
            csrlCenter: user.csrlCenter,
            batch: user.batch,
            about: user.about,
            profilePicture: user.profilePhotoUrl || '',
            experiences: user.experiences
        }));

        // console.log(alumniData);
        res.status(200).json(alumniData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
