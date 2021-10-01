const express =  require("express");
const joinController = require('../controllers/joinController');

const router = express.Router();

router
    .post('/post-waitlist', joinController.postWaitList)
    .get('/get-waitlist', joinController.getWaitList)
;

module.exports = router;