const {mongoose} = require('./mongoose');

var subSchema = mongoose.Schema({
    weight: Number, date: String
},{ _id : false });

var Person = mongoose.model('Person', {
    recordings: [subSchema],
    name: String,
    age: Number
});

module.exports = {
	Person
}