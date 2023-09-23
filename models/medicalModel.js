const mongoose = require("mongoose")
const medicalModel = new mongoose.Schema({
    tabletname:String,
    tablettype:String,
    cost:String,
    description:String,
})

const tabletslist = mongoose.model("tabletslist", medicalModel)
module.exports = tabletslist;
