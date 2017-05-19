var request = require('request');
module.exports = {

  save: function (req, res) {
    if (req.body) {
      User.saveData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  getOne: function (req, res) {
    if (req.body) {
      User.getOne(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  getByUrl: function (req, res) {

    if (req.body) {
      User.getByUrl(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
  delete: function (req, res) {
    if (req.body) {
      User.deleteData(req.body, res.callback);
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
      User.getAll(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  register: function (req, res) {
    var callback = function (err, data) {
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

  checkOtp: function (req, res) {
    if (req.body) {
      if (req.body.mobile && req.body.otp) {
        User.checkOtp(req.body, function (err, data) {
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

  loginFacebook: function (req, res) {
    var callback = function (err, data) {
      if (err || _.isEmpty(data)) {
        res.json({
          error: err,
          value: false
        });
      } else {
        if (data._id) {
          req.session.user = data;
          req.session.save(function (err) {
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

  profile: function (req, res) {
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
  loginTwitter: function (req, res) {
    var callback = function (err, data) {
      if (err || _.isEmpty(data)) {
        res.json({
          error: err,
          value: false
        });
      } else {
        req.session.user = data;
        // console.log(req.session);
        req.session.save(function (err) {
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

  findLimited: function (req, res) {
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


  // EXTERNAL API'S

  checkWithParams1: function (req, res) {

    // var api = {
    //   "APIKey": "afa35e6d32a54d64962a78ccf28c140017636054922421850805185"
    // };
    var api = sails.api;
    api = _.assign(api, req.body);
    console.log(api);
    request({
      url: "http://apismaaash.itspl.net/SMAAASHAPI.svc/" + req.body.name,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(api)
    }, function (err, httpResponse, body) {
      console.log(err);
      console.log("err");
      console.log(body);
      if (body !== "") {
        console.log("In body");
        res.json(JSON.parse(JSON.parse(body)));
      } else {
        console.log("In else");
        res.json({
          value: false
        })
      }
      // res.json(JSON.parse(JSON.parse(body)));
    });
  },


  checkWithParams2: function (req, res) {
    var api = {
      "APIkey": "afa35e6d32a54d64962a78ccf28c140017636054922421850805185"
    };
    api = _.assign(api, req.body);
    console.log(api);
    request({
      url: "http://apismaaash.itspl.net/SMAAASHAPI.svc/" + req.body.name,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(api)
    }, function (err, httpResponse, body) {
      console.log(err);
      console.log("err");
      console.log(body);
      if (body !== "") {
        console.log("In body");
        res.json(JSON.parse(JSON.parse(body)));
      } else {
        console.log("In else");
        res.json({
          value: false
        })
      }
      // res.json(JSON.parse(JSON.parse(body)));
    });
  },


  //API WITHOUT params
  checkWithoutParams: function (req, res) {
    var api = {
      "APIKey": "afa35e6d32a54d64962a78ccf28c140017636054922421850805185"
    };
    request({
      url: "http://apismaaash.itspl.net/SMAAASHAPI.svc/" + req.body.name,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(api)
    }, function (err, httpResponse, body) {
      res.json(JSON.parse(JSON.parse(body)));
    });
  },
  updateAllType: function (req, res) {
    Type.find({}).exec(function (err, data) {
      if (err) {
        res.callback(err);
      } else {
        async.each(data, function (n, callback) {
          n.myslug = _.kebabCase(n.name);
          n.save(callback);
        }, function (err, data) {
          res.callback(err, data);
        });
      }
    });
  },
  updateAllBlog: function (req, res) {
    Blog.find({}).exec(function (err, data) {
      if (err) {
        res.callback(err);
      } else {
        async.each(data, function (n, callback) {
          n.myslug = _.kebabCase(n.name);
          n.save(callback);
        }, function (err, data) {
          res.callback(err, data);
        });
      }
    });
  },
  updateAllCity: function (req, res) {
    City.find({}).exec(function (err, data) {
      if (err) {
        res.callback(err);
      } else {
        async.each(data, function (n, callback) {
          n.myslug = _.kebabCase(n.name);
          n.save(callback);
        }, function (err, data) {
          res.callback(err, data);
        });
      }
    });
  },
  updateAllContact: function (req, res) {
    Contact.find({}).exec(function (err, data) {
      if (err) {
        res.callback(err);
      } else {
        async.each(data, function (n, callback) {
          n.myslug = _.kebabCase(n.name);
          n.save(callback);
        }, function (err, data) {
          res.callback(err, data);
        });
      }
    });
  },

  updateAllExploreSmash: function (req, res) {
    ExploreSmash.find({}).exec(function (err, data) {
      if (err) {
        res.callback(err);
      } else {
        async.each(data, function (n, callback) {
          n.myslug = _.kebabCase(n.hometext);
          n.save(callback);
        }, function (err, data) {
          res.callback(err, data);
        });
      }
    });
  },
  updateAllEnquiry: function (req, res) {
    Enquiry.find({}).exec(function (err, data) {
      if (err) {
        res.callback(err);
      } else {
        async.each(data, function (n, callback) {
          n.myslug = _.kebabCase(n.name);
          n.save(callback);
        }, function (err, data) {
          res.callback(err, data);
        });
      }
    });
  },
  updateAllHostType: function (req, res) {
    HostType.find({}).exec(function (err, data) {
      if (err) {
        res.callback(err);
      } else {
        async.each(data, function (n, callback) {
          n.myslug = _.kebabCase(n.name);
          n.save(callback);
        }, function (err, data) {
          res.callback(err, data);
        });
      }
    });
  },
  updateAllLeader: function (req, res) {
    Leader.find({}).exec(function (err, data) {
      if (err) {
        res.callback(err);
      } else {
        async.each(data, function (n, callback) {
          n.myslug = _.kebabCase(n.name);
          n.save(callback);
        }, function (err, data) {
          res.callback(err, data);
        });
      }
    });
  },
  updateAllMediaGallery: function (req, res) {
    MediaGallery.find({}).exec(function (err, data) {
      if (err) {
        res.callback(err);
      } else {
        async.each(data, function (n, callback) {
          n.myslug = _.kebabCase(n.name);
          n.save(callback);
        }, function (err, data) {
          res.callback(err, data);
        });
      }
    });
  },

  updateAllSponsor: function (req, res) {
    Sponsor.find({}).exec(function (err, data) {
      if (err) {
        res.callback(err);
      } else {
        async.each(data, function (n, callback) {
          n.myslug = _.kebabCase(n.name);
          n.save(callback);
        }, function (err, data) {
          res.callback(err, data);
        });
      }
    });
  },
  updateAllUser: function (req, res) {
    User.find({}).exec(function (err, data) {
      if (err) {
        res.callback(err);
      } else {
        async.each(data, function (n, callback) {
          n.myslug = _.kebabCase(n.name);
          n.save(callback);
        }, function (err, data) {
          res.callback(err, data);
        });
      }
    });
  },
  backupDatabase: function (req, res) {
    var request = require('request');
    var mongoose = require('mongoose');
    var fs = require('fs');
    var exec = require('child_process').exec;
    res.connection.setTimeout(200000000);
    req.connection.setTimeout(200000000);
    var q = req.host.search("127.0.0.1");
    var database = "dharma";
    if (true) {
      var jagz = _.map(mongoose.models, function (Model, key) {
        var name = Model.collection.collectionName;
        return {
          key: key,
          name: name
        };
      });
      jagz.push({
        "key": "fs.chunks",
        "name": "fs.chunks"
      }, {
        "key": "fs.files",
        "name": "fs.files"
      });
      var isBackup = fs.existsSync("./backup");
      if (!isBackup) {
        fs.mkdirSync("./backup");
      }
      var mom = moment();
      var folderName = "./backup/" + mom.format("ddd-Do-MMM-YYYY-HH-mm-SSSSS");
      var retVal = [];
      fs.mkdirSync(folderName);
      async.eachSeries(jagz, function (obj, callback) {
        exec("mongoexport --db " + database + " --collection " + obj.name + " --out " + folderName + "/" + obj.name + ".json", function (data1, data2, data3) {
          retVal.push(data3 + " VALUES OF " + obj.name + " MODEL NAME " + obj.key);
          callback();
        });
      }, function () {
        res.json(retVal);
      });
    } else {
      res.callback("Access Denied for Database Backup");
    }
  },
  generateSitemap: function (req, res) {
    var sm = require('sitemap'),
      fs = require('fs');

    var siteMapArr = [];

    function addUrl(route) {
      siteMapArr.push({
        url: route,
        changefreq: 'weekly',
        priority: 1
      });
    }


    function generate() {
      var sitemap = sm.createSitemap({
        hostname: 'https://smaaash.in',
        cacheTime: 600000, //600 sec (10 min) cache purge period 
        urls: siteMapArr
      });
      fs.writeFileSync("./.tmp/public/sitemap.xml", sitemap.toString());
      res.json({
        value: true,
        description: "Sitemap Generated"
      });
    }


    // addUrl("/home");
    // addUrl("/wedding");
    // addUrl("/attractions");
      addUrl("/"+"/security");
       addUrl("/"+"/policy");
        addUrl("/"+"/terms");
 addUrl("/");


    City.find().lean().exec(function (err, cities) {
      // getting all cities
      _.each(cities, function (city) {
        addUrl("/" + city.name + "/leader");
         addUrl("/" + city.name + "/media");
          addUrl("/" + city.name + "/sponsor");
           addUrl("/" + city.name + "/about");
            addUrl("/" + city.name + "/gallery");
              addUrl("/" + city.name + "/benefit"); 
              addUrl("/" + city.name + "/career");
              addUrl("/" + city.name + "/contact");
              addUrl("/" + city.name + "/customizepackage");
      });

      if (err) {
        res.callback(err);
      } else {
        if (_.isEmpty(cities)) {
          res.callback();
        } else {
          Type.find().lean().exec(function (err, types) {
            if (err) {
              res.callback(err);
            } else {
              if (_.isEmpty(types)) {
                res.callback();
              } else {

                async.each(types, function (type, callback) {
                    //getting all types
                    _.each(cities, function (city) {
                      addUrl("/" + city.name + "/" + type.myslug);
                    });





                    ExploreSmash.find({
                      type: type._id
                    }).populate("city").lean().exec(function (err, explores) {
                      if (err) {
                        callback(err);
                      } else {
                        if (_.isEmpty(types)) {
                          callback();
                        } else {
                          // getting all explores as per types in Type
                          _.each(explores, function (explore) {
                            console.log(explore.city);
                            _.each(explore.city, function (city2) {
                              addUrl("/" + city2.name + "/" + type.myslug + "/" + explore.myslug);
                            });
                          });
                          callback(null, explores);
                        }

                      }
                    });
                  },
                  function (err, data) {
                    if (err) {
                      res.callback(err, data);
                    } else {
                      generate();
                    }


                  });

              }
            }
          });
        }
      }
    });



  }
};
