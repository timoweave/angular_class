'use strict';

angular.module('confusionApp')
    .factory('promotions', ["$resource", function($resource) {
        return $resource("http://localhost:3000/promotions/:id",
                         {id : "@_id"});
    }])
    .factory('dishes', ["$resource", function($resource) {
        return $resource("http://localhost:3000/dishes/:id",
                         { id:"@_id"});
    }])
    .factory('leadership', ["$resource", function($resource) {
        return $resource("http://localhost:3000/leadership/:id",
                         { id:'@_id' });
    }])
    .factory('feedback', ["$resource", function($resource) {
        return $resource("http://localhost:3000/feedback/:id",
                         { id:'@_id' },
                         { update: { method: 'PUT' }});
    }])
    .service('menuFactory', ["$resource", "dishes", "promotions",
                             function($resource, dishes, promotions) {

                    this.getDishes = function(){
                    return dishes.query();
                };
    
               this.getDish = function (index) {
                   return dishes.get(index);
                };

                // TASK 1
                // implement a function named getPromotion
                // that returns a selected promotion.
                this.getPromotion = function(index) {
                    if (!index) { index = 0; }
                    return promotions.get({id:index});
                }
    }])

    .factory('corporateFactory', ["$resource", "leadership",
                                      function($resource, leadership) {

            // TASK 1
            // Implement two functions, one named getLeaders,
            // the other named getLeader(index)
            // Remember this is a factory not a service
            var corpfac = {
                getLeaders : function () {
                    return leadership.query();
                },
                getLeader : function(index) {
                    return leadership.get({id:index});
                },
                getChef : function(index) {
                    if (!index) { index = 3; } /* "Executive Chef" */
                    return leadership.get({id:index});
                }
            };
            return corpfac;
    }])

;
