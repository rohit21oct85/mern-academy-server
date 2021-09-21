const express =  require("express");
const roleModuleController = require('../../controllers/admin/roleModuleController');
const checkAuth =  require("../../middleware/admin-auth");
const adminAuth =  require("../../middleware/admin-auth");
const router = express.Router();

router
.post('/create',checkAuth,adminAuth, roleModuleController.CreateRoleModule)
.patch('/update/:id',checkAuth,adminAuth, roleModuleController.UpdateRoleModule)
.get('/view/:id',checkAuth,adminAuth, roleModuleController.ViewRoleModule)
.get('/view/:role_slug?/:admin_email?',checkAuth, roleModuleController.OtherModules)
.get('/view-all',checkAuth, roleModuleController.ViewAllRoleModule)
.post('/delete/:id', checkAuth,adminAuth, roleModuleController.DeleteRoleModule);

module.exports = router;