const RolePermission = require('../../models/admin/RolePermission');
const RoleModule = require('../../models/admin/RoleModule');


const CreatePermission = async (req, res) => {
    try {
        const methodData = req?.body?.method;
        const moduleData = req?.body?.module;
        
        var options = { upsert: true, new: true, setDefaultsOnInsert: true };  
        await methodData.map( data => {
            RolePermission.findOneAndUpdate({
                role_id: data?.role_id,
                module_slug: data?.module_slug,
                method_name: data?.method_name,
                email: data?.email
            },{$set: {
                role_id: data?.role_id,
                role_slug: data?.role_slug,
                role_name: data?.role_name,
                email: data?.email,
                module_id: data?.module_id,
                module_name: data?.module_name,
                module_slug: data?.module_slug,
                module_icon: data?.module_icon,
                method_name: data?.method_name,
            }}, options, async (err, result) => {
                if(err){
                    return res.status(409).json({
                        message: "Error occured",
                        error: err.message
                    }); 
                }
            });
        });

        await moduleData.map( data => {
            RoleModule.findOneAndUpdate({
                role_id: data?.role_id,
                module_slug: data?.module_slug,
                email: data?.email
            },{$set: {
                role_id: data?.role_id,
                role_slug: data?.role_slug,
                role_name: data?.role_name,
                email: data?.email,
                module_id: data?.module_id,
                module_name: data?.module_name,
                module_slug: data?.module_slug,
                module_icon: data?.module_icon,
            }}, options, async (err, result) => {
                if(err){
                    return res.status(409).json({
                        message: "Error occured",
                        error: err.message
                    }); 
                }
            });
        })


        res.status(200).json({ 
            message: "Permission created sucessfully"
        });
    } catch (error) {
        console.log(error);
        res.status(502).json({
            message : error.message
        })
    }
}

const ViewPermission = async (req, res) => {
    try{
        const PermissionData = await RolePermission.find({
            module_slug: req.params.module_slug,
            role_slug: req.params.role_slug,
            email: req.params.admin_email,
        },{method_name: 1, _id: 0},{__v: 0});
        return res.status(200).json({ 
            data: PermissionData
        });    
    } catch(error){
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}
const ViewAllPermission = async (req, res) => {
    try{
        let filter = {}
        if(req?.params?.role_slug && req?.params?.user_email){
            filter = {
                role_slug: req?.params?.role_slug,
                email: req?.params?.user_email,
            }
        }
        const AllPermissions = await RolePermission.find(filter,{__v: 0});
        return res.status(200).json({ 
            data: AllPermissions 
        });    
    } catch(error){
        res.status(203).json({
            status: 203,
            message: "Error occured",
            errors: error.message
        });
    }
}
const DeletePermission = async (req, res) =>{
    const id = req.body.permission_id;
    try {
        await RolePermission.findByIdAndDelete({_id: id}).then( response => {
            return res.status(201).json({
                message: "Permission, deleted successfully"
              })
        });
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
};
const DeleteAllPermission = async (req, res) =>{

    const module_id = req.body.module_id;
    const email = req.body.email;
    const module_slug = req.body.module_slug;
    try {
        await RoleModule.findByIdAndDelete({_id: module_id});
        await RolePermission.deleteMany({email: email, module_slug: module_slug});
        res.status(201).json({
            message: "Permission, deleted successfully"
        })
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
};
const DeleteAllModulePermission = async (req, res) =>{
    const email = req.body.email;
    try {
        await RoleModule.deleteMany({email: email});
        await RolePermission.deleteMany({email: email});
        res.status(201).json({
            message: "Permission, deleted successfully"
        })
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
};



module.exports = {
    CreatePermission,
    ViewPermission,
    ViewAllPermission,
    DeletePermission,
    DeleteAllPermission,
    DeleteAllModulePermission
}