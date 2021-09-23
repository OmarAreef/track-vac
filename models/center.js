// const mongoose = require('mongoose');
// const Review = require('./review');
// const Day = require('./day');
// const Schema = mongoose.Schema;


// const centersSchema = new Schema({
//     name: String,
//     latitude: Number,
//     longitude: Number,
//     governorate: String,
//     district: String,
//     nameArabic: String,
//     governorateArabic: String,
//     districtArabic: String,
//     image: String,
//     workingHours : [
//         {
//             type: Schema.Types.ObjectId,
//             ref: 'Day'
//         }
//     ],
//     reviews: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: 'Review'
//         }
//     ],
//     questions: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: 'Question'
//         }
//     ]
// });

// centersSchema.post('findOneAndDelete', async function (doc) {
//     if (doc) {
//         await Review.deleteMany({
//             _id: {
//                 $in: doc.reviews
//             }
//         })
//     }
// })
// centersSchema.virtual('CenterRating').get( async function() {
//     let average = 0;
//     let count = 0 ;
//     await this.populate('reviews')
//     for (let review of this.reviews ) {
//         // console.log(review.populate('review'))
//         average  = average + review.averageRating
//         count ++ ;
//     }
//     if (count === 0 ){

//         return 0;
//     }

//     return Math.round(average/count);
// })
// centersSchema.virtual('rating').get(function () {
//     this.CenterRating.then(res => {
//         console.log(res)
//        return res ;
//     })

// })
const mongoose = require('mongoose');
const Review = require('./review');
const Day = require('./day');
const Schema = mongoose.Schema;


const centersSchema = new Schema({
    name: String,
    latitude: Number,
    longitude: Number,
    governorate: String,
    district: String,
    nameArabic: String,
    governorateArabic: String,
    districtArabic: String,
    image: String,
    avgLocation: { type: Number, default: 0 },
    avgService: { type: Number, default: 0 },
    avgSpeed: { type: Number, default: 0 },
    avgClean: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
    workingHours: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Day'
        }
    ],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }
    ]
});

centersSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

centersSchema.pre('save', async function (next) {
    await this.populate("reviews");
    let i = 0;
    let location = 0;
    let clean = 0
    let service =0
    let speed =0
    for (let rev of this.reviews) {
        console.log("STARTING HERE ______A_S___A_S____")
        console.log(rev)
        clean += rev.clean;
        console.log('clean :' + this.avgClean + ' ' + clean);
        speed += rev.speed;
        console.log('speed :' + this.avgSpeed + ' ' + speed);
        location += rev.location;
        console.log('location :' + this.avgLocation + ' ' + location);
        service += rev.service;
        console.log('service :' + this.avgService + ' ' + service);
        i++;
        console.log(i);
    }
    if (i === 0) {
        this.avgClean = 0;
        this.avgLocation = 0;
        this.avgService = 0;
        this.avgSpeed = 0;
    }
    else {
        this.avgClean = clean / i;
        this.avgLocation = location / i;
        this.avgService = service / i;
        this.avgSpeed = speed / i;
        console.log('hellp')
        console.log('clean :' + this.avgClean);
        console.log('speed :' + this.avgSpeed);
        console.log('location :' + this.avgLocation);
        console.log('service :' + this.avgService);
    }
    next();
});

centersSchema.pre('save', async function (next) {
    await this.populate("reviews");
    let ratings = 0;
    let i = 0;
    for (let rev of this.reviews) {
        console.log("STARTING HERE ______A_S___A_S____")
        console.log(rev.averageRating)
        ratings += rev.averageRating;
        i++;
    }
    if (i === 0) {
        this.avgRating = 0;
    }
    else {
        this.avgRating = ratings / i;
    }
    next();
});

module.exports = mongoose.model('Center', centersSchema);