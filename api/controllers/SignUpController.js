module.exports = {

  save: function(req, res) {
    if (req.body) {
      SignUp.saveData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  getOne: function(req, res) {

    if (req.body) {
      SignUp.getOne(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  delete: function(req, res) {
    if (req.body) {
      SignUp.deleteData(req.body, res.callback);
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
      SignUp.getAll(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  findLimited: function(req, res) {
    if (req.body) {
      if (req.body.pagenumber && req.body.pagenumber !== "" && req.body.pagesize && req.body.pagesize !== "") {
        SignUp.findLimited(req.body, res.callback);
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


  login: function(req, res) {
      var callback = function(err, data) {
          if (err || _.isEmpty(data)) {
              res.json({
                  error: err,
                  value: false
              });
          } else {
              if (data._id) {
                req.session.user = data;
                  res.json({
                      data: data,
                      value: true
                  });
              } else {
                  req.session.user = {};
                  res.json({
                      data: {},
                      value: false
                  });
              }
          }
      };
      if (req.body) {
          if (req.body.email && req.body.email !== "" && req.body.password && req.body.password !== "") {
              SignUp.login(req.body, callback);
          } else {
              res.json({
                  data: "Please provide params",
                  value: true
              });
          }
      } else {
          res.json({
              data: "Invalid Call",
              value: true
          });
      }
  },
};
