const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const {SENDGRID_KEY} = process.env
sgMail.setApiKey(SENDGRID_KEY)



    const sendEmail = async(data) => {
        const email = {...data, from: 'tanchou74@gmail.com' }
        await sgMail.send(email)
    }

    module.exports = sendEmail


// sgMail.send(email)
//     .then(()=>console.log('Email success send'))
//     .catch(error => console.log((error.message)))