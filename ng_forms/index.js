
var app = angular.module("formApp", []);

app.value("sodas", [{ "value" : "coke", "label" : "Coca Cola"},
                    { "value" : "pepsi", "label" : "Pepsi"},
                    { "value" : "mtn_dew", "label" : "Mountain Dew"},
                    { "value" : "sprite", "label" : "Sprite"},
                    { "value" : "7ups", "label" : "7 ups"},
                    { "value" : "dr_peppers", "label" : "Dr Peppers"},
                    { "value" : "fanta", "label" : "Fanta"}]);

app.controller("formCtrl", ["sodas", "$scope", function(sodas, $scope) {
    $scope.soda = {
        list : sodas,
        picked : "",
        count : 0,
        check : function() {
            var msg = "hey you picked : " + $scope.soda.picked;
            alert(msg);
        }
    };
    
}]);
