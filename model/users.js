import mongoose from "./index.js";

const userModel = new mongoose.Schema({
    firstName: String,  // type String, obligatoire
    lastName: String,  // type String, obligatoire
    email: String,  // type String, obligatoire
    password: String // type String, obligatoire
})

export default mongoose.model('users', userModel);