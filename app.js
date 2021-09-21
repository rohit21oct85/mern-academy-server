const express = require('express');
const cors = require('cors');

const config = require('./config/db.config')
const mongoose = require('mongoose')
const Routes = require("./routes/index");
const app = express();

app.use(cors());
app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({ extended: true, limit: '500mb' }));


app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      );
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
      next();
});

/* connect mongo db */
mongoose.connect(config.mongo.url, config.mongo.options)
.then(result => { 
      console.info(`mongodb connected`)
})
.catch(error => {
      console.error(`connectionn error ${error.message}, ${error}`)
})

/** RoutesList */

app.get('/', (req, res) => {
      res.send({
            message: "Server Runnings"
      })
})
app.get('/api/test', (req, res) => {
      res.send({
            message: `OK Testing Server Runnings PID ${process.pid} and PORT ${process.env.SERVER_PORT}`
      })
})

app.use("/api/role", Routes.roleRoute);
app.use("/api/admin", Routes.adminAuthRoute);
app.use("/api/app-module", Routes.appModuleRoutes);
app.use("/api/role-module", Routes.roleModuleRoutes);
app.use("/api/role-permission", Routes.rolePermissionRoutes);

module.exports = app