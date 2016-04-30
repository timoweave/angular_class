var app = angular.module('confusionApp',[]);

app.controller('dishDetailController', function($scope) {
    var rawgit = "https://rawgit.com/timoweave/angular_class/master/conFusion"

    var dish={
        name:'Uthapizza',
        image: rawgit + "/app/" + 'images/uthapizza.png',
        category: 'mains',
        label:'Hot',
        price:'4.99',
        description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
        comments: [
            {
                rating:5,
                comment:"Imagine all the eatables, living in conFusion!",
                author:"John Lemon",
                date:"2012-10-16T17:57:28.556094Z"
            },
            {
                rating:4,
                comment:"Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                author:"Paul McVites",
                date:"2014-09-05T17:57:28.556094Z"
            },
            {
                rating:3,
                comment:"Eat it, just eat it!",
                author:"Michael Jaikishan",
                date:"2015-02-13T17:57:28.556094Z"
            },
            {
                rating:4,
                comment:"Ultimate, Reaching for the stars!",
                author:"Ringo Starry",
                date:"2013-12-02T17:57:28.556094Z"
            },
            {
                rating:2,
                comment:"It's your birthday, we're gonna party!",
                author:"25 Cent",
                date:"2011-12-02T17:57:28.556094Z"
            }

        ]
    };

    $scope.dish = dish;
    $scope.dishSortCriteria = "";
    $scope.dishRawGit = rawgit;

    $scope.get_comments = function() { return dish.comments; };
    $scope.feedback_buffer = reset_feedback();

    $scope.submit_feedback = function() {
        var timestamp = new Date().toISOString();        
        var feedback = $scope.feedback_buffer;
        feedback.date = timestamp;
        console.log(feedback);
        console.log(dish.comments.length);
        dish.comments.push(feedback);
        console.log(dish.comments.length);

        $scope.feedback_buffer = reset_feedback();
        $scope.feedback_form.$setPristine();

        if ($scope.debug) {
            for (i in dish.comments) {
                console.log(dish.comments[i]);
            }
        }
    };

    
    function reset_feedback(feedback) {
        return { rating : 5, comment : "", author : "", date : null};
    };

});

