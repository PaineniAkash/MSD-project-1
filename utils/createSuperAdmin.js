const keys = require('../config/keys');
const mailer = require('@sendgrid/mail');
const bcrypt = require('bcryptjs');
if (keys.sendGridKey) {
  mailer.setApiKey(keys.sendGridKey);
}

const User = require('../models/User');

const createSuperAdmin = () => {
  const password = _generatePassword();
  const name = keys.name;
  const email = keys.email;
  const is_admin = 1;

  if (!name || !email) {
    console.log('Super admin details not configured. Skipping auto-create.');
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        const newUser = new User({
          name,
          email,
          password,
          is_admin,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((registered) => {
                if (registered) {
                  if (keys.sendGridKey) {
                    _sendEmail(registered, password)
                    .then((res) =>
                      console.log('Message successfully sent!')
                    )
                    .catch((err) => console.log(err));
                  } else {
                    console.log('SENDGRID_KEY not set. Skipping email notification.');
                  }
                }
              })
              .catch((err) => console.log(err));
          });
        });
      } else {
        console.log('User email already exist');
      }
    })
    .catch((err) => console.log(err));
};

const _generatePassword = () => {
  return Array(30)
    .fill(
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    )
    .map(function (x) {
      return x[Math.floor(Math.random() * x.length)];
    })
    .join('');
};

const _sendEmail = (payload, plainPassword) => {
  const data = {
    from: 'Payroll Admin <no-reply@payroll.admin>',
    to: payload && payload.email ? payload.email : keys.email,
    subject: 'Super Admin Details',
    text: `Hello, Here are your login details\nEmail: ${payload.email}\nPassword: ${plainPassword}`,
  };
  return mailer.send(data);
};

module.exports = Object.assign({}, { createSuperAdmin });
