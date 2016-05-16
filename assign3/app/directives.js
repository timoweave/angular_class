'use strict';

angular.module('confusionApp')
    .directive("confusionHeader", function() {
        return { restrict : "E", templateUrl :"app/views/header.html" }
    })
    .directive("confusionFooter", function() {
        return {
            restrict : "E", templateUrl :"app/views/footer.html" }
    })
    .directive("confusionJumbo", function() {
        return { restrict : "E", templateUrl :"app/views/jumbo.html" }
    })
    .directive('confusionDishFeedback', function () {
        return { restrict : 'E', templateUrl : 'app/views/dish_feedback.html' };
    })
    .directive('confusionDishDetail', function() {
        return { restrict : 'E', templateUrl : 'app/views/dish_detail.html', scope : {dish: "=dish"}};
    })
    .directive('confusionDishPromotion', function() {
        return { restrict : 'E', templateUrl : 'app/views/dish_promotion.html', scope : {promo: "=promo"}};
    })
    .directive('confusionDishComment', function () {
        return { restrict: 'E', templateUrl : 'app/views/dish_comment.html' };
    })
    .directive('confusionLeaders', function () {
        return { restrict: 'E', templateUrl : 'app/views/leaders.html' };
    })
    .directive('confusionChef', function () {
        return { restrict: 'E', templateUrl : 'app/views/chef.html', scope : {chef: "=chef"} };
    })
;
