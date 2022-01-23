const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment-timezone');
const egypt = moment.tz(Date.now(), "africa/egypt");
const reporterSchema = new mongoose.Schema({
    name: {

        type: String,
        required: true,
        trim: true
    },
    email: {

        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error('emil is not valid')
            }

        }
    },
    age: {

        type: Number,
        default: 20,
        validate(val) {
            if (val < 18) {
                throw new Error(' is not age')
            }
        }

    },
    password: {

        type: String,
        required: true,
        minlenght: 6


    },
    phonenumber: {
        type: String,
        required: true,
        minlength: 11,


        validate(val) {
            if (!validator.isMobilePhone(val.toString(), 'ar-EG')) {
                throw new Error(' is not a number')
            }
        }

    },
    time: {
        created_by: String,
        created_date: { type: Date, default: egypt },
    },


    tokens: [
        {
            type: String,
            required: true
        }],





},



{timestamps:true}
)

reporterSchema.pre('save', async function (next) {
    const reporter = this
    console.log(reporter)
    if (reporter.isModified('password')) { reporter.password = await bcrypt.hash(reporter.password, 8) }
})


reporterSchema.statics.findByCredentails = async (email, password) => {
    const reporter = await reporterSchema.findOne({ email })
    console.log(reporter)
    if (!reporter) {
        throw new Error('unable to login..e ')
    }
    const isMatch = await bcrypt.compare(password, reporter.password)
    if (!isMatch) {
        throw new Error('unable to login..p ')
    }
    return reporter
}

reporterSchema.methods.generatetoken = async function () {

    //this--->document
    const reporter = this
    const token = jwt.sign({ _id: reporter._id.toString() }, 'nodecourse')
    reporter.tokens = reporter.tokens.concat(token)
    await reporter.save()
    return token
}


const Reporter = mongoose.model('Reporter', reporterSchema)






module.exports = Reporter