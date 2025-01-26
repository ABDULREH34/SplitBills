import mongoose from "mongoose";


const DataSchema = new mongoose.Schema({}, { strict: false });
const tdemo = mongoose.models.tdemo|| mongoose.model('tdemo', DataSchema);

export default tdemo;