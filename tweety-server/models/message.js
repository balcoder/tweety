const mongoose = require('mongoose');
const User = require('./user'); //need msg to have ref to user who created it

const messageSchema = new mongoose.Schema(
    {
    text : {
        type: String,
        required: true,
        maxLength: 160
        },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        }    
    },
    {
        timestamps: true
    }
);

messageSchema.pre('remove', async function(next) {
    
    try{
        // find user
        let user = await User.findById(this.user);
        // remove id of msg from their msg list 
        user.messages.remove(this.id);
        // save that user
        await user.save();
        // return next
        return next();
    } catch (err){
        return next(err);
    }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;