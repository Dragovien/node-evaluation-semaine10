import mongoose from "./index.js";

const user = new mongoose.Schema({
    sale: Boolean,
    price: Number,
    society: String,
    qty: Number,
    size: {
        h: Number,
        w: Number,
        uom: String
    },
    year: Number
})

export default mongoose.model('users', user);