const express =  require("express");
const appModuleController = require('../../controllers/admin/appModuleController');
const checkAuth =  require("../../middleware/admin-auth");
const adminAuth =  require("../../middleware/admin-auth");
const router = express.Router();

router
.post('/create',checkAuth,adminAuth, appModuleController.CreateAppModule)
.patch('/update/:id',checkAuth,adminAuth, appModuleController.UpdateAppModule)
.get('/view/:id',checkAuth,adminAuth, appModuleController.ViewAppModule)
.get('/view-all',checkAuth, appModuleController.ViewAllAppModule)
.post('/delete/:id', checkAuth,adminAuth, appModuleController.DeleteAppModule);

module.exports = router;