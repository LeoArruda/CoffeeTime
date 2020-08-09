const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a store name.'
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    tags: [String]
});

storeSchema.pre('save', function(next) {
    if (!this.isModified('name')){
        next(); //skip it
        return; //stop this function to continue running
    }
    this.slug = slug(this.name);
    next();
    // TODO make more resiliant. So slugs are unique-1..2..3..4..
})

module.exports = mongoose.model('Store', storeSchema);