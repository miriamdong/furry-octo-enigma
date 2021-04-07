/* eslint-disable func-style */
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {
      "user_id": req.session.user_id
    }; //"listing": data.rows,
    res.render("messages", templateVars);

    router.post("/send", (req, res) => {
      const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${ req.body.username }</li>
      <li>Email: ${ req.body.email }</li>
    </ul>
    <h3>Message</h3>
    <p>${ req.body.message }</p>
  `;

      let transporter = nodemailer.createTransport({
        host: 'mail.YOURDOMAIN.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'YOUREMAIL', // generated ethereal user
          pass: 'YOURPASSWORD' // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      //   // res.json({hello: "how are you"})
      //   db.query(`SELECT * FROM users;`)
      //   .then(data => {
      //     res.render("messages");
      //     // console.log("Abcdefghij:", data);
      //     // const users = data.rows;
      //     // res.json({ users });
      //   })
      //   .catch(err => {
      //     res.status(500);
      //     console.log("ERROR in messages.js:", err);
      //     //   .json({ error: err.message });
      //   });
      //   console.log("success", db);
    });
  });
  return router;
};
