const express = require('express');
const router = express.Router();
const alumController = require('../controllers/alum.controller');


router.get('/get-alums', alumController.getAlums);


module.exports = router;