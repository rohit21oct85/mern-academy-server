const express =  require("express");
const roleController = require('../../controllers/admin/roleController');
const checkAuth =  require("../../middleware/check-auth.js");

const router = express.Router();

router
    .post('/create',checkAuth, roleController.CreateRole)
    .patch('/update/:id',checkAuth, roleController.UpdateRole)
    .get('/view/:id',checkAuth, roleController.ViewRole)
    .get('/view-all',checkAuth, roleController.ViewAllRole)
    .post('/delete',checkAuth, roleController.DeleteRole);
    
module.exports = router;