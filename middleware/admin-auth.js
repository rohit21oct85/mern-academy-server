const jwt = require("jsonwebtoken");
const Role = require('../models/admin/Role');

async function checkRole(arr, el){
    try {
        return await Array.from(arr)?.some(e => e.role_id === el);
    } catch (error) {
        console.log(error);
    }
}

module.exports = (req, res, next) => {
    const token = req.headers.authorization?req.headers.authorization.split(" ")[1]:null;
    if (!token) {
        res.status(401).json({
            message: 'you are not authorised!'
        });
    } else {
        jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {

        if (err) {
            res.status(403).json({
                message: 'Authorization failed'
            });
        } else {
            let Roles = Role.find({});
            if(checkRole(Roles, decoded.role)){
                req.body.user_id = decoded.id;
                req.body.user_role = decoded.role;
                next()
            }else{
                res.status(403).json({
                    message: 'Not Authorized to access this Resource'
                }); 
            }
        }
        })
    }
}