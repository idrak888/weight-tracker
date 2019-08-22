const {mongoose} = require('./mongoose');

var subSchema = mongoose.Schema({
    weight: Number, date: String
},{ _id : false });

var Person = mongoose.model('Person', {
    recordings: [subSchema],
    name: String,
    age: Number,
    id: String
});

module.exports = {
	Person
}