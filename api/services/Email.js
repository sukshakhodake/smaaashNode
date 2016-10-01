var mongoose = require('mongoose');
var base64 = require('base-64');
var SendGrid = require('sendgrid').SendGrid;

var models = {
    sendMail: function (data, callback) {
        var helper = require('sendgrid').mail
        from_email = new helper.Email("no-reply@smaaashindia.com")
        to_email = new helper.Email(data.email)
        subject = "SMAAASH INDIA"
        content = new helper.Content("text/html", "<html><h2 style='color: #2e6c80;'>Some useful features:</h2></html>")
        mail = new helper.Mail(from_email, subject, to_email, content)
        var decodedData = base64.decode('U0cuNkx0bExiTkZSS0tVbkNhcDFRS2R2QS45R3Y0T2Y2Z1NuakV6NkdhQnJjRXE0cVZQTDI1dlN6ZVQ5WDVTd0Vwcm5B');
        var sg = require('sendgrid')(decodedData);
        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
        });

        sg.API(request, function (err, response) {

            console.log(response.statusCode)
            console.log(response.body)
            console.log(response.headers)
            if (err) {
                console.log(err);
                callback(err, null);
            } else if (response) {
                callback(null, response);
            } else {
                callback(null, {});
            }
        })
    },
};

module.exports = _.assign(module.exports, models);