var request = require('request');
module.exports = {

    save: function(req, res) {
        if (req.body) {
            User.saveData(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    getOne: function(req, res) {
        if (req.body) {
            User.getOne(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    delete: function(req, res) {
        if (req.body) {
            User.deleteData(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    getAll: function(req, res) {
        function callback(err, data) {
            Global.response(err, data, res);
        }
        if (req.body) {
            User.getAll(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    register: function(req, res) {
        var callback = function(err, data) {
            if (err) {
                res.json({
                    error: err,
                    value: false
                });
            } else if (_.isEmpty(data)) {
                res.json({
                    error: "User not Registered",
                    value: false
                });

            } else {
                req.session.user = data;
                res.json({
                    data: "User Registered",
                    value: true
                });
            }
        };
        if (req.body) {
            if (req.body.email && req.body.email !== "" && req.body.password && req.body.password !== "") {
                User.register(req.body, callback);
            } else {
                res.json({
                    value: false,
                    data: "Invalid params"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid call"
            });
        }
    },

    checkOtp: function(req, res) {
        if (req.body) {
            if (req.body.mobile && req.body.otp) {
                User.checkOtp(req.body, function(err, data) {
                    if (err) {
                        res.json({
                            value: false,
                            data: err
                        });
                    } else {
                        res.json({
                            value: true,
                            data: data
                        });
                    }
                });
            } else {
                res.json({
                    value: false,
                    data: "Please provide parameters"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    loginFacebook: function(req, res) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
                res.json({
                    error: err,
                    value: false
                });
            } else {
                if (data._id) {
                    req.session.user = data;
                    req.session.save(function(err) {
                        if (err) {
                            res.json(err);
                        } else {
                            res.redirect(redirect);
                        }
                    });
                } else {
                    res.json({
                        data: "User not found",
                        value: false
                    });
                }
            }
        };
        passport.authenticate('facebook', {
            scope: ['public_profile', 'user_friends', 'email']
        }, callback)(req, res);
    },

    profile: function(req, res) {
        var user = req.session.user;
        if (user) {
            res.json({
                data: user,
                value: true
            });
        } else {
            res.json({
                data: "User not logged in",
                value: false
            });
        }
    },
    loginTwitter: function(req, res) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
                res.json({
                    error: err,
                    value: false
                });
            } else {
                req.session.user = data;
                // console.log(req.session);
                req.session.save(function(err) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(
                            res.redirect(redirect)
                        );
                    }
                });
            }
        };
        passport.authenticate('twitter', {}, callback)(req, res);
    },

    findLimited: function(req, res) {
        if (req.body) {
            if (req.body.pagenumber && req.body.pagenumber !== "" && req.body.pagesize && req.body.pagesize !== "") {
                User.findLimited(req.body, res.callback);
            } else {
                res.json({
                    value: false,
                    data: "Please provide parameters"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
};
