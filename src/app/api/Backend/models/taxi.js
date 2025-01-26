import mongoose from "mongoose";


const DataSchema = new mongoose.Schema({}, { strict: false });
const Taxi = mongoose.models.Taxi|| mongoose.model('Taxi', DataSchema);

export default Taxi