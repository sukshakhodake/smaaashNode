var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var md5 = require('md5');
var schema = new Schema({

  name: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: "",
    unique : true
  },
  password: {
    type: String,
    default: ""
  },
  mobile: {
    type: String,
    default: ""
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    index: true
  },
  cart:[{
    user:String,
    exploresmash:String,
    city:String
  }]

});
schema.plugin(uniqueValidator);

module.exports = mongoose.model('SignUp', schema);
var models = {
  saveData: function(data, callback) {
    if (data.password && data.password !== "") {
        data.password = md5(data.password);
    }
    var signup = this(data);
    if (data._id) {
      this.findOneAndUpdate({
        _id: data._id
      }, data).exec(function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (updated) {
          callback(null, updated);
        } else {
          callback(null, {});
        }
      });
    } else {
      signup.save(function(err, created) {
        if (err) {
          callback(err, null);
        } else if (created) {
          callback(null, created);
        } else {
          callback(null, {});
        }
      });
    }
  },
  deleteData: function(data, callback) {
    this.findOneAndRemove({
      _id: data._id
    }, function(err, deleted) {
      if (err) {
        callback(err, null);
      } else if (deleted) {
        callback(null, deleted);
      } else {
        callback(null, {});
      }
    });
  },
  getAll: function(data, callback) {
    this.find({}).exec(function(err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (found && found.length > 0) {
        callback(null, found);
      } else {
        callback(null, []);
      }
    });
  },
  getOne: function(data, callback) {
    this.findOne({
      "_id": data._id
    }).exec(function(err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else if (found && Object.keys(found).length > 0) {
        callback(null, found);
      } else {
        callback(null, {});
      }
    });
  },
  findLimited: function(data, callback) {
    var newreturns = {};
    newreturns.data = [];
    var check = new RegExp(data.search, "i");
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function(callback) {
          SignUp.count({
            name: {
              '$regex': check
            }
          }).exec(function(err, number) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else if (number && number !== "") {
              newreturns.total = number;
              newreturns.totalpages = Math.ceil(number / data.pagesize);
              callback(null, newreturns);
            } else {
              callback(null, newreturns);
            }
          });
        },
        function(callback) {
          SignUp.find({
            name: {
              '$regex': check
            }
          }).populate('city').skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).exec(function(err, data2) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else if (data2 && data2.length > 0) {
              newreturns.data = data2;
              callback(null, newreturns);
            } else {
              callback(null, newreturns);
            }
          });
        }
      ],
      function(err, data4) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else if (data4) {
          callback(null, newreturns);
        } else {
          callback(null, newreturns);
        }
      });
  },



  login: function(data, callback) {
      data.password = md5(data.password);
      SignUp.findOne({
          email: data.email,
          password: data.password
      }, function(err, data2) {
          if (err) {
              console.log(err);
              callback(err, null);
          } else {
              if (_.isEmpty(data2)) {
                  SignUp.findOne({
                      email: data.email,
                      forgotpassword: data.password
                  }, function(err, data4) {
                      if (err) {
                          console.log(err);
                          callback(err, null);
                      } else {
                          if (_.isEmpty(data4)) {
                              callback(null, {
                                  comment: "User Not Found"
                              });
                          } else {
                              SignUp.findOneAndUpdate({
                                  _id: data4._id
                              }, {
                                  password: data.password,
                                  forgotpassword: ""
                              }, function(err, data5) {
                                  if (err) {
                                      console.log(err);
                                      callback(err, null);
                                  } else {
                                      data5.password = "";
                                      data5.forgotpassword = "";
                                      callback(null, data5);
                                  }
                              });
                          }
                      }
                  });
              } else {
                  SignUp.findOneAndUpdate({
                      _id: data2._id
                  }, {
                      forgotpassword: ""
                  }, function(err, data3) {
                      if (err) {
                          console.log(err);
                          callback(err, null);
                      } else {
                          data3.password = "";
                          data3.forgotpassword = "";
                          callback(null, data3);
                      }
                  });
              }
          }
      });
  },
};

module.exports = _.assign(module.exports, models);
