const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    // DEFINE THE PROPERTIES YOU WANT IN YOUR TABLE
    name: {
    type: String,
    required: true
    },
    age: {
        type: String,
        required: false
    },
},
{ timestamps: true}
);

module.exports = mongoose.model('User', userSchema) // FOR SCHEMA WE DON'T EXPORT AS A CONST, 
                                                    // WE EXPORT IT AS A DATABASE MODEL