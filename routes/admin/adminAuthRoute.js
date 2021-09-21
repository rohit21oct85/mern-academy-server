const express =  require("express");
const adminAuthController = require('../../controllers/admin/adminAuthController');
const adminAuth =  require("../../middleware/admin-auth");
const checkAuth =  require("../../middleware/check-auth");

const router = express.Router();

router
    .post('/register', adminAuthController.Register)
    .post('/login', adminAuthController.Login)
    .post('/add-fields', adminAuthController.AddField)
    .get('/view-all',checkAuth,adminAuthController.ViewAllSubAdmin)
    .get('/role-view-all/:role?',checkAuth,adminAuthController.ViewSubAdminByRole)
    .get('/view/:admin_id', checkAuth, adminAuthController.ViewSubAdmin)
    .post('/delete', checkAuth, adminAuthController.DeleteSubAdmin)
    .post('/update', checkAuth, adminAuthController.UpdateSubAdmin)
    .post('/forgot-password', adminAuthController.ForgotPassword)
    .post('/refresh-token', adminAuthController.RefreshToken)
    .post('/logout', adminAuthController.Logout)
    .get('/admin-logout/:email?', adminAuthController.AdminLogout)
;

module.exports = router;