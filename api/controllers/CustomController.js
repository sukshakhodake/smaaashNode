module.exports = {

  save: function (req, res) {
    if (req.body) {
      Custom.saveData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  getOne: function (req, res) {

    if (req.body) {
      Custom.getOne(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  delete: function (req, res) {
    if (req.body) {
      Custom.deleteData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  getAll: function (req, res) {
    function callback(err, data) {
      Global.response(err, data, res);
    }
    if (req.body) {
      Custom.getAll(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  findLimited: function (req, res) {
    if (req.body) {
      if (req.body.pagenumber && req.body.pagenumber !== "" && req.body.pagesize && req.body.pagesize !== "") {
        Custom.findLimited(req.body, res.callback);
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
  // exportCustomExcel: function (req, res) {
  //   Custom
  //     .find({})
  //     .populate('city')
  //     .exec(function (err, response) {
  //       var excelData = [];
  //       var row = {};
  //       _.each(response, function (key) {
  //         console.log(key);
  //         row = {};
  //         row = {
  //           "NAME": key.name,
  //           "EMAIL": key.email,
  //           "TIMESTAMP": key.timestamp,
  //         };
  //         if (key.city) {
  //           row["CITY"] = key.city.name;
  //         }
  //         excelData.push(row);
  //       });
  //       Config.generateExcel("CustomPackages", excelData, res);
  //     });
  // },

};
