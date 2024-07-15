const {Schema,model} = require('mongoose');

const commentSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    commentbody:{
        type:String,
        require:true
    },
    likes:{
        clickCount:[{
            type:Schema.Types.ObjectId,
            ref:'users'
        }]
    },
    reply:{
        type: Schema.Types.ObjectId,
        ref:'comments'
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    blogId:{
        type:Schema.Types.ObjectId,
        ref:'blogs'
    }
},{timestamps:true});

const comments = model('comment',commentSchema);

exports.module = comments;