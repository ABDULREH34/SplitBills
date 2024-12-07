import mongoose, { Schema } from "mongoose";
const contactSchema = new Schema({
    fullname: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, "Name must be larger than 2 character"],
        maxlength: [50, "Name must be smaller than 50 character"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
            "Invalid email address"],
    },
    message: {
        type: String,
        required: [true, "Message is requried"],
    },

    date: {
        type: Date,
        default: Date.now(),
    },
});

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema)

export default Contact;