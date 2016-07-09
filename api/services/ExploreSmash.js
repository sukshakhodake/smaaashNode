var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

  video: {
    type: String,
    default: ""
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    index: true
  },
  order: {
    type: String,
    default: ""
  },
  text: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  },
  sublink: {
    type: String,
    default: ""
  },
  timing: [{
    type: {
      type: String,
      default: ""
    },
    weekendPrice: {
      type: String,
      default: ""
    },
    weekdayPrice: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    }
  }],
  technology: {
    type: String,
    default: ""
  },
  deal: {
    type: String,
    default: ""
  },
  promotion: {
    type: String,
    default: ""
  },
  currentEvent: {
    type: String,
    default: ""
  },
  pdf: {
    type: String,
    default: ""
  },
  images: [{
      image: String
    }

  ],
});

module.exports = mongoose.model('ExploreSmash', schema);
var models = {
  saveData: function(data, callback) {
    var exploresmash = this(data);
    exploresmash.timestamp = new Date();
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
      exploresmash.save(function(err, created) {
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

  //side menu

  getTiming: function(data, callback) {
         var newreturns = {};
         newreturns.data = [];
         var check = new RegExp(data.search, "i");
         data.pagenumber = parseInt(data.pagenumber);
         data.pagesize = parseInt(data.pagesize);
         var skip = parseInt(data.pagesize * (data.pagenumber - 1));
         async.parallel([
                 function(callback) {
                     User.aggregate([{
                         $match: {
                             _id: objectid(data._id)
                         }
                     }, {
                         $unwind: "$cart"
                     }, {
                         $match: {
                             "cart.size": {
                                 '$regex': check
                             }
                         }
                     }, {
                         $group: {
                             _id: null,
                             count: {
                                 $sum: 1
                             }
                         }
                     }, {
                         $project: {
                             count: 1
                         }
                     }]).exec(function(err, result) {
                         console.log(result);
                         if (result && result[0]) {
                             newreturns.total = result[0].count;
                             newreturns.totalpages = Math.ceil(result[0].count / data.pagesize);
                             callback(null, newreturns);
                         } else if (err) {
                             console.log(err);
                             callback(err, null);
                         } else {
                             callback({
                                 message: "Count of null"
                             }, null);
                         }
                     });
                 },
                 function(callback) {
                     User.aggregate([{
                         $match: {
                             _id: objectid(data._id)
                         }
                     }, {
                         $unwind: "$cart"
                     }, {
                         $match: {
                             "cart.size": {
                                 $regex: check
                             }
                         }
                     }, {
                         $group: {
                             _id: "_id",
                             cart: {
                                 $addToSet: "$cart"
                             }
                         }
                     }, {
                         $project: {
                             _id: 0,
                             cart: { $slice: ["$cart", skip, data.pagesize] }
                         }
                     }]).exec(function(err, found) {
                         console.log(found);
                         if (found && found.length > 0) {
                             newreturns.data = found[0].cart;
                             callback(null, newreturns);
                         } else if (err) {
                             console.log(err);
                             callback(err, null);
                         } else {
                             callback({
                                 message: "Count of null"
                             }, null);
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
    data.pagenumber = parseInt(data.pagenumber);
    data.pagesize = parseInt(data.pagesize);
    async.parallel([
        function(callback) {
          ExploreSmash.count().exec(function(err, number) {
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
          ExploreSmash.find().skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).populate("city", "_id  name", null, {}).lean().exec(function(err, data2) {
            console.log(data2);
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
  }
};

module.exports = _.assign(module.exports, models);
