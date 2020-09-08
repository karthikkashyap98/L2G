const mongoose = require('mongoose')

const solutionSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
        trim: true
    },
    questionTitle: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true
    }
})

const Solution = mongoose.model('Solution', solutionSchema)

module.exports = Solution