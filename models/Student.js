const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rollno: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    extraField: {
        type: mongoose.Schema.Types.Mixed, // Use Mixed type for flexible data
        required: false,
    },
});

module.exports = mongoose.model("Student", studentSchema);
