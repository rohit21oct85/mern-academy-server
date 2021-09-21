const RoleModule = require('../../models/admin/RoleModule');

const CreateRoleModule = async (req, res) => {
    const body = req.body;
    try {
        const newModule = new RoleModule(body);
        await newModule.save();
        return res.status(200).json({ 
            message: "Module created sucessfully"
        });
    } catch (error) {
        res.status(502).json({
            message : error.message
        })
    }
}
const UpdateRoleModule = async (req, res) =>{
    try {
        await RoleModule.findOneAndUpdate({_id: req.params.id},req.body)
                .then(response => {
                    return res.status(202).json({
                        message: "Module, Updated successfully"
                    })
                })
                .catch(error => {
                    return res.status(500).json({
                        message: "Error Found",
                        errors: error.message
                    })
                });

    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
}
const ViewRoleModule = async (req, res) => {
    try{
        const ModuleData = await RoleModule.findOne({_id: req.params.id},{__v: 0});
        return res.status(200).json({ 
            data: ModuleData
        });    
    } catch(error){
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}
const ViewAllRoleModule = async (req, res) => {
    try{
        const AllModules = await RoleModule.find({},{__v: 0}).sort({module_sequence: 1});
        return res.status(200).json({ 
            data: AllModules 
        });    
    } catch(error){
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}
const DeleteRoleModule = async (req, res) =>{
    const id = req.params.id;
    try {
        await RoleModule.deleteOne({_id: id}).then( response => {
            return res.status(201).json({
                message: "Module, deleted successfully"
              })
        });
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
};
const OtherModules = async (req, res) => {
    try {
        const filter = {role_slug: req?.params?.role_slug, email: req?.params?.admin_email}
        // res.send(filter);
        const AllModules = await RoleModule.find(filter,{__v: 0});
        return res.status(200).json({ 
            data: AllModules 
        });        
    } catch (error) {
        res.status(203).json({
            status: 203,
            message: error.message
        });
    }
}
module.exports = {
    OtherModules,
    CreateRoleModule,
    UpdateRoleModule,
    ViewRoleModule,
    ViewAllRoleModule,
    DeleteRoleModule,
}