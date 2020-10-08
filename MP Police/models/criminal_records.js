const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    cId: String,
    Name: String,
    Location: String,
    Associates: String,
    Vehicles: String,
    Apparel: String,
    criminalImage: String
});
module.exports = mongoose.model('criminal', PostSchema);