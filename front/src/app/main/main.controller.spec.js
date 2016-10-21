var assert = require('assert');
var jsdom = require("jsdom");
//var angular = require("angular");
    describe('Test Controllers', function () {
      beforeEach(function (done) {
        jsdom.env({
          html: '<html ng-app="frontend" ng-strict-di><head><meta charset="utf-8"><title>frontend</title><meta name="description" content=""><meta name="viewport" content="width=device-width"></head><body><div ui-view ></div></body></html>',
          scripts: [

          ],
          features: {
            FetchExternalResources: ["script"],
            ProcessExternalResources: ["script"],
          },
          done: function(errors, window) {
            if(errors != null) console.log('Errors', errors);

            

            var MainController = require('./MainControllerTest');
            
          }
        });
      });
      afterEach(function (done) {
        
      });

        
    });
    // Loads the module we want to test
    var mainController = require('./MainControllerTest');
    var mainController = new mainController();
    console.log(mainController);

    describe('test main controller', function() {
      beforeEach(function (done) {
      })
      it('should return a user', function testPath(done) {
          assert.equal(mainController.deletecheck(), null);
        });
      
    });

