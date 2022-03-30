const express = require("express");
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const User = require('../models/Users')
const UserImages = require("../models/UserImages")
const School = require("../models/Schools")
const mongoose = require('mongoose')
const voucher_codes = require('voucher-code-generator');
const moment = require("moment")
const mail = require('../common/mail')
const mailformat = require("../common/email_format")
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_ID,
    region: 'us-east-1'
});
const s3 = new aws.S3()
const uploads3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'photo-launch',
        key: function (req, file, cb) {
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});

router.get("/get-token", async function (req, res) {
    let token = await createToken()
    res.json({ token })
})

router.post('/register', uploads3.fields([{ name: "images" }]), async function (req, res, done) {
    let body = req.body;
    let files = req.files;
    if (!req.body.promo_code) {
        User.find({ email: body.email }).then(async check_email => {
            if (check_email.length > 0) {
                return res.status(400).json({ errors: "User Already Exists" });
            } else {
                let charge_res = await createCharge(body.token_id, Number(body.amount))
                if (charge_res && charge_res.id) {
                    let newUser = new User()
                    newUser.first_name = body.first_name
                    newUser.last_name = body.last_name
                    newUser.email = body.email
                    newUser.address_line_1 = body.address_line_1
                    newUser.address_line_2 = body.address_line_2
                    newUser.city = body.city
                    newUser.state = body.state
                    newUser.zip_code = body.zip_code
                    newUser.transaction_id = charge_res.id
                    newUser.payment_status = charge_res.status
                    newUser.payable_amount = Number(body.amount)
                    newUser.save().then(async result => {
                        let user_id = await result._id
                        if (req.files && req.files.images && req.files.images.length > 0) {
                            for (let i = 0; i < files.images.length; i++) {
                                let newImages = new UserImages()
                                newImages.image = files.images[i].location
                                newImages.user_id = user_id;
                                newImages.save().then(imgres => { })
                            }
                            return res.status(200).json({ success: `User Registered Successfully` });
                        } else {
                            return res.status(200).json({ success: `User Registered Successfully` });
                        }

                    }).catch(err => {
                        console.log("errerr", err)
                        return res.status(400).json({ errors: err });
                    })
                } else {
                    return res.status(400).json({ errors: "There is some error while processing payment. Please try again later !" });
                }
            }
        }).catch(err => {
            console.log("errerr11", err)
            return res.status(400).json({ errors: err });
        });
    } else {
        User.find({ promocode: body.promo_code }).then(promores => {
            if (promores.length > 0) {
                if (promores[0].is_promocode_used) {
                    return res.status(400).json({ errors: "Promocode is already been used once." });
                } else {
                    let updated_body = {
                        first_name: body.first_name,
                        last_name: body.last_name,
                        address_line_1: body.address_line_1,
                        address_line_2: body.address_line_2,
                        state: body.state,
                        city: body.city,
                        zipcode: body.zip_code,
                        is_promocode_used: true
                    }
                    User.findOneAndUpdate({ email: body.email }, { $set: updated_body }).then(async result => {
                        let user_id = await promores._id
                        if (req.files && req.files.images.length > 0) {
                            for (let i = 0; i < files.images.length; i++) {
                                let newImages = new UserImages()
                                newImages.image = files.images[i].location
                                newImages.user_id = user_id;
                                newImages.save().then(imgres => { })
                            }
                            return res.status(200).json({ success: `User Registered Successfully` });
                        }
                    }).catch(err => {
                        return res.status(400).json({ errors: err });
                    })
                }
            } else {
                // User Not Found
                return res.status(400).json({ errors: "User Not Found" });
            }
        })
    }
});

router.get('/all-uploaded-images', uploads3.array(), function (req, res) {
    let offset = (req.query.page - 1) * Number(process.env.PAGE_LIMIT)
    UserImages.find({ status: 0 }).populate("user_id").then(result => {
        UserImages.find({ status: 0 }).limit(Number(process.env.PAGE_LIMIT)).skip(offset).populate("user_id").then(user => {
            return res.status(200).json({ success: `Images Fetched Successfully`, data: user, total_count: result.length });
        })
    }).catch(err => {
        return res.status(400).json({ errors: err });
    })
});

router.post('/approved-reject-image', uploads3.array(), function (req, res) {
    let approved_id = req.body.approved_id
    let rejected_id = req.body.rejected_id
    if (approved_id) {
        approved_id = approved_id.split(",")
        approved_id.map(id => {
            UserImages.findOneAndUpdate({ _id: mongoose.mongo.ObjectID(id) }, { $set: { status: 1 } }).then(result => {
                User.find({ _id: mongoose.mongo.ObjectID(result.user_id) }).then(response => {
                    let emailText = mailformat[3].body
                    let mailDetails = {
                        to: response[0].email,
                        subject: mailformat[3].subject,
                        html: emailText
                    }
                    mail.mail(mailDetails)
                });
            })
        })
    }
    if (rejected_id) {
        rejected_id = rejected_id.split(",")
        rejected_id.map(id => {
            UserImages.findOneAndUpdate({ _id: mongoose.mongo.ObjectID(id) }, { $set: { status: 2 } }).then(result => {
                User.find({ _id: mongoose.mongo.ObjectID(result.user_id) }).then(response => {
                    let emailText = mailformat[2].body
                    let mailDetails = {
                        to: response[0].email,
                        subject: mailformat[2].subject,
                        html: emailText
                    }
                    mail.mail(mailDetails)
                });
            })
        })
    }
    return res.status(200).json({ success: `Success` });
})

router.post("/login-via-code", uploads3.array(), function (req, res) {
    let body = req.body;
    User.find({ email: body.email }).then(check_email => {
        if (check_email.length > 0) {
            return res.status(400).json({ errors: "User Already Exists" });
        } else {
            School.find({ code: body.code }).then(async school => {
                if (school.length > 0) {
                    let startDate = moment(school[0].start_date).format()
                    let endDate = moment(school[0].end_date).format()
                    let current_date = moment().format()
                    if (moment(current_date).isBefore(endDate)
                        && moment(current_date).isAfter(startDate)
                        || (moment(current_date).isSame(startDate) || moment(current_date).isSame(endDate))
                    ) {
                        let promocode = await voucher_codes.generate({
                            pattern: "########-####-####-######"
                        });
                        let newUser = new User()
                        newUser.email = body.email;
                        newUser.promocode = promocode[0];
                        newUser.school_id = school._id
                        newUser.save().then(result => {
                            let emailText = mailformat[1].body
                            emailText = emailText.replace(/{promo_code}/g, promocode[0])
                            let mailDetails = {
                                to: body.email,
                                subject: mailformat[1].subject,
                                html: emailText
                            }
                            mail.mail(mailDetails)
                            return res.status(200).json({ success: `Promocode Created Successfully`, data: result });
                        }).catch(err => {
                            return res.status(400).json({ errors: err });
                        })
                    } else {
                        return res.status(400).json({ errors: "Code is Valid from " + moment(startDate).format("YYYY-MM-DD HH:mm:ss") + " to " + moment(endDate).format("YYYY-MM-DD HH:mm:ss") });
                    }
                } else {
                    return res.status(400).json({ errors: "Code Not Found" });
                }
            }).catch(err => {
                return res.status(400).json({ errors: err });
            })

        }
    }).catch(err => {
        return res.status(400).json({ errors: err });
    })
})

module.exports = router;

async function createCharge(token, amount) {
    const charge = await stripe.charges.create({
        amount: amount * 100,
        currency: 'usd',
        source: token,
    });
    return charge
}

async function createToken() {
    const token = await stripe.tokens.create({
        card: {
            number: '4242424242424242',
            exp_month: 3,
            exp_year: 2023,
            cvc: '314',
        },
    });
    return token
}