const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        minlength: 3,
        required: true,
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
})
commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
        delete returnedObject._id
    },
})

module.exports = mongoose.model('Comment', commentSchema)