const adminAuthRoute = require('./admin/adminAuthRoute');
const roleRoute = require('./admin/roleRoute');
const appModuleRoutes = require('./admin/appModuleRoutes');
const roleModuleRoutes = require('./admin/roleModuleRoutes');
const rolePermissionRoutes = require('./admin/rolePermissionRoutes');
const joinRoutes = require('./joinRoutes')

module.exports = {
      adminAuthRoute,
      roleRoute,
      appModuleRoutes,
      roleModuleRoutes,
      rolePermissionRoutes,
      joinRoutes
}