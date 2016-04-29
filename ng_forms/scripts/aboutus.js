
var app = angular.module("confusionApp", []);


var contact = app.controller("ContactController", ["$scope", function($scope) {
    $scope.feedback = {
        myChannel : "",
        name : {first : "", last : ""},
        email : "",        
        contact : { agree : "", method : "" },
        tel : { areaCode : "", number : "" },
        comments : "",
    };
    $scope.channels = [];
    $scope.submitFeedback = function () {
        console.log($scope.feedback);
    };
}]);

var feedback = contact.controller("FeedbackController", ["$scope", function($scope) {
    
}]);
