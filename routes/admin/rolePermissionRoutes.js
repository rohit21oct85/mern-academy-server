const express =  require("express");
const rolePermissionController = require('../../controllers/admin/rolePermissionController');
const checkAuth =  require("../../middleware/check-auth.js");
const adminAuth =  require("../../middleware/admin-auth.js");
const router = express.Router();

router
.post('/create',checkAuth,adminAuth, rolePermissionController.CreatePermission)
.get('/view/:module_slug/:role_slug/:admin_email?',checkAuth, rolePermissionController.ViewPermission)
.get('/view-all/:role_slug?/:user_email?',checkAuth,adminAuth, rolePermissionController.ViewAllPermission)
.post('/delete',checkAuth,adminAuth, rolePermissionController.DeletePermission)
.post('/delete-all',checkAuth,adminAuth, rolePermissionController.DeleteAllPermission)
.post('/delete-all-module-permission',checkAuth,adminAuth, rolePermissionController.DeleteAllModulePermission)
;
module.exports = router;