var mongoose = require('mongoose');
var base64 = require('base-64');
var SendGrid = require('sendgrid').SendGrid;

var models = {
    sendMail: function (data, emailtemplate, callback) {
        sails.renderView('email/' + emailtemplate, data.toObject(), function (err, view) {
            if (err) {
                callback(err);
            } else {
                var helper = require('sendgrid').mail
                from_email = new helper.Email("no-reply@smaaashindia.com")
                to_email = new helper.Email('smaaashindia@gmail.com')
                subject = "SMAAASH INDIA"
                content = new helper.Content("text/html", view)
                    // content = new helper.Content("text/html", "views/email/index.ejs")
                mail = new helper.Mail(from_email, subject, to_email, content)
                var decodedData = base64.decode('U0cuNkx0bExiTkZSS0tVbkNhcDFRS2R2QS45R3Y0T2Y2Z1NuakV6NkdhQnJjRXE0cVZQTDI1dlN6ZVQ5WDVTd0Vwcm5B');
                var sg = require('sendgrid')(decodedData);
                var request = sg.emptyRequest({
                    method: 'POST',
                    path: '/v3/mail/send',
                    body: mail.toJSON()
                });

                sg.API(request, function (err, response) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                    } else if (response) {
                        callback(null, data);
                    } else {
                        callback(null, {});
                    }
                });
            }

        });



    },

};

module.exports = _.assign(module.exports, models);