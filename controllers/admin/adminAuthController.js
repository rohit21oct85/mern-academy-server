const Admin = require('../../models/admin/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let refreshTokens = [];

const Register = async (req, res) => {
    const body = req.body;
    try {
        const newAdmin = new Admin(body);
        await newAdmin.save();
        return res.status(200).json({ 
            message: "Registered Sucessfully"
        });
    } catch (error) {
        res.status(502).json({
            message : error.message
        })
    }
}

const Login = async (req, res) => {
    try {
         
        await Admin.findOne({email: req.body.email},{__v: 0}).then(  admin => {
            if(admin){
                bcrypt.compare(req.body.password, admin.password, async function(err,response){
                    if(err){
                        res.status(203).json({ 
                            message: "Password does not match"
                        });
                    }
                    else{
                        if(response){
                            if(admin.isActive === false){
                                await Admin.findByIdAndUpdate({
                                    _id: admin?._id
                                },{
                                    isActive: true
                                });
                                let adminData = await Admin.findOne({
                                    _id: admin?._id
                                },{
                                      _id: 1,
                                      fullname: 1,
                                      email:1,
                                      role:1,
                                      role_name: 1,
                                      role_slug:1,
                                      status:1,
                                      isActive: 1
                                })
                                const accessToken = generateAccessToken(adminData);
                                const refreshToken = generateRefreshToken(adminData);
                                refreshTokens.push(refreshToken);
                                
                                res.status(200).json({ 
                                    accessToken, 
                                    refreshToken,
                                    admin: adminData
                                });
                            }else{
                                res.status(203).json({ 
                                    message: "your account is already loggedIn !!!"
                                });
                            }
                        } else {
                            res.status(203).json({ 
                                status: 203,
                                message: "Password does not match"
                            });
                        }                      
                    }
                });
            }else{
                res.status(203).json({ 
                    status: 203,
                    message: "Email or Password doesnot matched"
                })
            }
        }).catch(error => {
            res.status(203).json({
                status: 203,
                message: "Email Does not exists in our database",
                errors: error.message
            });     
        })
        
    } catch (error) {
        res.status(203).json({
            message: error.message
        });  
    }
}
const generateAccessToken = (user) => {
    return jwt.sign({ 
        id: user._id,  
        role: user.role 
    }, process.env.JWT_ACCESS_TOKEN, {expiresIn: '30d'})
}
const generateRefreshToken = (user) => {
    return jwt.sign({
        id: user._id,   
        role: user.role
    },process.env.JWT_REFRESH_TOKEN);
}

const RefreshToken = async (req,res) => {
    const refreshToken = req.body.token;
    if(refreshToken === null) return res.status(401).json({message: 'Invalid refresh token'});
    if(!refreshTokens.includes(refreshToken)) return res.status(401).json({message: 'Invalid refresh token'});
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
        if(err) return res.status(err).json({message: "Error found"});
        const accessToken = generateAccessToken({email: user.email,role: user.role });
        return res.status(200).json({ 
            accessToken
        });
    })
}

const Logout = async (req, res) => {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader){
        const accessToken = req.headers.authorization.split(' ')[1];  
        const decode = await jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN);
        const UserData = {id: decode.id, role: decode.role};
        await Admin.findByIdAndUpdate({_id: decode.id},{isActive: false});
        let newAccessToken = await jwt.sign(UserData, 'sasdasd', {expiresIn: '0s'});
        return res.status(201).json({
            message: "successfully loggedout",
            accessToken: newAccessToken
        });    
    }
}

const ForgotPassword = async (req, res) => {
    try {
        const email = req.body.email;
        const data = await User.findOne({email: email});
        if(data){
            console.log(data);
            return res.status(201).json(data)
        }else{
            return res.status(402).json({message: "Email does not belongs to our Database"})    
        }
    } catch (error) {
        return res.status(502).json({message: "Somethign went wrong!"})
    }
}
const ViewSubAdminByRole = async (req, res) => {
    try{
        const AllSubAdmin = await Admin.find({role: req.params.role},{__v: 0});
        res.status(200).json({ 
            data: AllSubAdmin 
        });    
    } catch(error){
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}
const ViewAllSubAdmin = async (req, res) => {
    try{
        const AllSubAdmin = await Admin.find({role: {$gt: 1}},{__v: 0});
        res.status(200).json({ 
            data: AllSubAdmin 
        });    
    } catch(error){
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

const ViewSubAdmin = async (req, res) => {
    try{
        const admin = await Admin.findOne({_id: req.params?.admin_id},{__v: 0});
        res.status(200).json({ 
            data: admin 
        });    
    } catch(error){
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}
const UpdateSubAdmin = async (req, res) => {
    try{
        const admin = await Admin.findOneAndUpdate({_id: req.body?.admin_id},{$set: {
            first_name: req?.body?.first_name,
            last_name: req?.body?.last_name,
            role_name: req?.body?.role_name,
            role: req?.body?.role
        }},{__v: 0});
        res.status(200).json({ 
            data: admin 
        });    
    } catch(error){
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}
const DeleteSubAdmin = async (req, res) => {
    try{
        const admin = await Admin.findByIdAndDelete({_id: req.body?.admin_id},{__v: 0});
        res.status(200).json({ 
            data: admin 
        });    
    } catch(error){
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}
const AddField = async (req, res) => {
    try {
        let data = req.body;
        await Admin.updateMany({},{$set: data});
        res.status(201).json({message: "Updated"})
    } catch (error) {
        res.status(502).json({message: "Somethign went wrong!"})
    }
}
const AdminLogout = async (req, res) => {
    try {
        await Admin.findOneAndUpdate({email:  req?.params?.email},{$set: {
            isActive: false
        }});
        return res.status(201).json({message: "Logout Successfully"})
    } catch (error) {
        return res.status(502).json({message: "Somethign went wrong!"})
    }
}

module.exports = {
    AddField,
    UpdateSubAdmin,
    ViewSubAdminByRole,
    ViewSubAdmin,
    ViewAllSubAdmin,
    DeleteSubAdmin,
    Register,
    Login,
    Logout,
    AdminLogout,
    RefreshToken,
    ForgotPassword,
}