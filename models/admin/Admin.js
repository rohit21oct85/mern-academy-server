const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
        fullname: {
                type: String,
                required: true,
        },
        email: {
                type: String,
                required: true,
                unique: true,
        },
        password: {
                type: String,
                required: true,
                trim: true
        },
        role:{
                type: Number,
                default: 1
        },
        role_name:{
                type: String,
                default: 'Super Admin'
        },
        role_slug:{
                type: String,
                default: 'super-admin'
        },
        status:{
            type: Boolean,
            required: true,
            default: true
        },
        isActive:{
                type: Boolean,
                default: false
        },
        created_at: {
                type: Date,
                default: Date.now
        }
});

AdminSchema.pre('save', function(next) {
    const admin = this;
    if(!admin.isModified || !admin.isNew){
        next();
    }else{
        bcrypt.hash(admin.password, 10, function(err, hash){
            if(err) {
                console.log('Error hashing password for admin', admin.fullname);
                next(err);
            }
            else{
                admin.password = hash;
                next();
            }
        })
    }
});

AdminSchema.pre('findOneAndUpdate', async function(next) {
    try {
        if (this._update.password) {
            const hashed = await bcrypt.hash(this._update.password, 10)
            this._update.password = hashed;
        }
        next();
    } catch (err) {
        return next(err);
    }

});

module.exports = mongoose.model('Admin', AdminSchema);