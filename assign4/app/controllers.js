'use strict';

angular.module('confusionApp')
    .controller('IncludeController', ['$scope', function($scope) {
        }])

    .controller('MenuController', ['$scope', 'menuFactory', 'dishes', function($scope, menuFactory, dishes) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            $scope.dishes= dishes.query();

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

    .controller('ContactController', ['$scope', 'feedback', function($scope, feedback) {

        var empty_feedback = { name : { first : "", last : "" },
                                contact : { tel_area : null,
                                            tel_number : null,
                                            email : "",
                                            permission : false,
                                            permission_method : null,
                                            permission_choices : ["telephone", "email"],
                                            comment : null
                                          }
                              };
        $scope.feedback = angular.copy(empty_feedback);
            
        var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];


            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;

            $scope.agree = false;
            $scope.feedback_methods = function () {
                return _feedback_method_list;
            };

            $scope.feedback_method_list = $scope.feedback.contact.permission_choices
                .map(function (itm) {
                    return {"value" : itm, "label" : itm };
                });

        $scope.sendFeedback = function() {
                $scope.feedback.date = new Date().toISOString();
                console.log("submit data : " + $scope.feedback);
                // alert(JSON.stringify($scope.feedback));
                feedback.save($scope.feedback);
                $scope.feedback = angular.copy(empty_feedback);
                $scope.feedback_form.$setPristine();                
            };
            
        }])

    .controller('FeedbackController',
                ['$scope', "feedback",
                 function($scope, feedback) {

            var empty_feedback = { name : { first : "", last : "" },
                                   contact : { tel_area : null,
                                                  tel_number : null,
                                                  email : "",
                                                  permission : false,
                                                  permission_method : null,
                                                  permission_choices : ["telephone", "email"],
                                                  comment : null
                                                }
                                    };
            $scope.feedback = angular.copy(empty_feedback);
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

            $scope.channels = channels;
            $scope.invalidChannelSelection = false;

            $scope.agree = false;
            $scope.feedback_methods = function () {
                return _feedback_method_list;
            };

            $scope.feedback_method_list = $scope.feedback.contact.permission_choices
                .map(function (itm) {
                    return {"value" : itm, "label" : itm };
                });

            $scope.sendFeedback = function() {
                $scope.feedback.date = new Date().toISOString();
                feedback.save($scope.feedback);
                $scope.feedback = angular.copy(empty_feedback);
                $scope.feedback_form.$setPristine();
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            var dish= menuFactory.getDish(parseInt($stateParams.id,10));
            
            $scope.dish = dish;
            
        }])

        .controller('DishCommentController', ['$scope', function($scope) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                // console.log($scope.mycomment);
                
                $scope.dish.comments.push($scope.mycomment);
                
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }
        }])

        // TASK 2
        // implement the IndexController and About Controller here
       .controller('IndexController',
                ['$scope', 'menuFactory', 'corporateFactory',
                 function($scope, menuFactory, corporateFactory) {
            $scope.dishes = menuFactory.getDishes();
            $scope.leaders = corporateFactory.getLeaders();
            $scope.chef = corporateFactory.getChef();
            $scope.promotion = menuFactory.getPromotion(0);
        }])

        .controller('AboutController',
                ['$scope', 'menuFactory', 'corporateFactory',
                 function($scope, menuFactory, corporateFactory) {
            $scope.leaders = corporateFactory.getLeaders();
        }])


;
