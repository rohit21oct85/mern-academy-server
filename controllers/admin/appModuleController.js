const AppModule = require('../../models/admin/AppModule');

const CreateAppModule = async (req, res) => {
    const body = req.body;
    try {
        const newModule = new AppModule(body);
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
const UpdateAppModule = async (req, res) =>{
    try {
        await AppModule.findOneAndUpdate({_id: req.params.id},req.body)
                .then(response => {
                    return res.status(202).json({
                        message: "AppModule, Updated successfully"
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
const ViewAppModule = async (req, res) => {
    try{
        const AppModuleData = await AppModule.findOne({_id: req.params.id},{__v: 0});
        return res.status(200).json({ 
            data: AppModuleData
        });    
    } catch(error){
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}
const ViewAllAppModule = async (req, res) => {
    try{
        const AllAppModule = await AppModule.find({},{__v: 0}).sort({module_sequence: 1});
        return res.status(200).json({ 
            data: AllAppModule 
        });    
    } catch(error){
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}
const DeleteAppModule = async (req, res) =>{
    const id = req.params.id;
    try {
        await AppModule.deleteOne({_id: id}).then( response => {
            return res.status(201).json({
                message: "AppModule, deleted successfully"
              })
        });
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
};

module.exports = {
    CreateAppModule,
    UpdateAppModule,
    ViewAppModule,
    ViewAllAppModule,
    DeleteAppModule,
}