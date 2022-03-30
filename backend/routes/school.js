const express = require("express");
const router = express.Router();
const multer = require('multer')
const upload = multer()
const School = require('../models/Schools')
const moment = require('moment')
const mongoose = require('mongoose')
const mail = require('../common/mail')
const mailformat = require("../common/email_format")

router.post('/add-school', upload.array(), function (req, res) {
    let newSchool = new School(), body = req.body;
    body.start_date = moment(body.start_date, "YYYY-MM-DD").startOf('day').format("YYYY-MM-DD HH:mm:ss")
    body.end_date = moment(body.end_date, "YYYY-MM-DD").endOf('day').format("YYYY-MM-DD HH:mm:ss")
    newSchool.name = body.name;
    newSchool.address_line_1 = body.address_line_1
    newSchool.address_line_2 = body.address_line_2
    newSchool.city = body.city
    newSchool.state = body.state
    newSchool.zip_code = body.zip_code
    newSchool.contact_name = body.contact_name
    newSchool.contact_email = body.contact_email
    newSchool.start_date = new Date(body.start_date).toISOString()
    newSchool.end_date = new Date(body.end_date).toISOString()
    let code = randomString()
    newSchool.code = code
    newSchool
        .save()
        .then(school => {
            let emailText = mailformat[0].body
            emailText = emailText.replace(/{school_name}/g, body.name)
            emailText = emailText.replace(/{promo_code}/g, code)
            emailText = emailText.replace(/{start}/g, body.start_date)
            emailText = emailText.replace(/{end}/g, body.end_date)
            let mailDetails = {
                to: body.contact_email,
                subject: mailformat[0].subject,
                html: emailText
            }
            mail.mail(mailDetails)
            return res.status(200).json({ success: `School Added Successfully`, data: school });
        })
        .catch(err => {
            return res.status(400).json({ errors: err });
        });
});

router.get('/list', upload.array(), function (req, res) {
    School.find({ status: true }).then(result => {
        return res.status(200).json({ success: `School Fetched Successfully`, data: result });
    }).catch(err => {
        return res.status(400).json({ errors: err });
    })
});
router.post('/delete', upload.array(), function (req, res) {
    let body = req.body;
    if (body.id) {
        let id = body.id.split(",")
        for (let i = 0; i < id.length; i++) {
            School.find({ _id: mongoose.mongo.ObjectID(id[i]) }).then(result => {
                if (result.length > 0) {
                    School.findOneAndUpdate({ _id: mongoose.mongo.ObjectID(id[i]) }, { $set: { status: false } }).then(result => {
                    })
                }
            }).catch(err => {
                return res.status(400).json({ errors: err });
            })
        }
    }
    return res.status(200).json({ success: `School Deleted Successfully` });
})

router.post('/update', upload.array(), function (req, res) {
    let body = req.body;
    School.find({ _id: mongoose.mongo.ObjectID(body._id) }).then(result => {
        if (result.length > 0) {
            School.findOneAndUpdate({ _id: mongoose.mongo.ObjectID(body._id) }, { $set: body }).then(result => {
                return res.status(200).json({ success: `School Updated Successfully` });
            })
        } else return res.status(400).json({ errors: "School Not Found" });
    }).catch(err => {
        return res.status(400).json({ errors: err });
    })
})

module.exports = router;

function randomString() {
    let result = '', length = 10, chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}