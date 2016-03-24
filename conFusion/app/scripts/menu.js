
var app = angular.module("menuApp", []);

app.filter("capitalCase", function() {
    return capital_case;

    function capital_case(x) {
        var y = x[0].toUpperCase();
        var z = x.slice(1);
        // console.log(y + z);
        return y + z;
    }
});

app.filter("filterCategory", ['filterFilter', function(filterFilter) {
    return filter_category;
    function filter_category(dishes, selected_category) {
        var any_dishes = ((selected_category === undefined) || ( selected_category.length == 0));
        if (any_dishes) {
            return dishes;
        }

        var some_dishes = [];
        for (var i=0; i< dishes.length; i++) {
            var dish = dishes[i];
            if (dish.category == selected_category) {
                some_dishes.push(dish);
            }
        }
        return some_dishes;
    }
}]);

app.value('all_dishes', [
    /*'pizza' : */
    { 'name' : 'Uthapizza',
      'image' : 'images/uthapizza.png',
      'category' : 'mains',
      'label' : 'Hot',
      'price' : '4.99',
      'description' : 'Ac ut consequat semper viverra nam libero justo, laoreet sit amet cursus sit amet, dictum sit amet justo donec enim diam, vulputate ut pharetra sit? Cursus metus aliquam eleifend mi in! Eu lobortis elementum, nibh tellus molestie nunc, non blandit massa enim nec dui nunc mattis enim ut tellus elementum sagittis vitae et leo duis!',
      'comment' : ''
    },
    /* var zucchi = */
    { 'name' : 'Zucchipakoda',
      'image' : 'images/zucchipakoda.png',
      'category' : 'appetizers',
      'label' : 'veggie',
      'price' : '11.99',
      'description' : 'Sem et tortor consequat id porta nibh venenatis cras sed felis eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer! Nulla facilisi cras fermentum, odio eu feugiat pretium, nibh ipsum consequat nisl, vel pretium lectus quam id leo in vitae turpis massa?',
      'comment' : ''
    },
    
    /* var cake = */
    { 'name' : 'Cheese Cake',
      'image' : 'images/elaicheesecake.png',
      'category' : 'desserts',
      'label' : 'Sweet',
      'price' : '4.49',
      'description' : 'Fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum? Pellentesque dignissim enim, sit amet venenatis urna cursus eget nunc scelerisque viverra mauris, in aliquam. Amet tellus cras adipiscing enim eu turpis egestas pretium aenean pharetra, magna ac placerat vestibulum, lectus mauris ultrices eros, in cursus turpis massa tincidunt dui!',
      'comment' : ''
    },

    /* var donut = */
    { 'name' : 'donut',
      'image' : 'images/vadonut.png',
      'category' : 'desserts',
      'label' : "new",
      'price' : '2.99',
      'description' : 'Lectus quam id leo in vitae turpis massa sed elementum tempus egestas sed sed risus pretium quam vulputate dignissim suspendisse. Laoreet id donec ultrices tincidunt arcu, non sodales neque sodales!',
      'comment' : ''
    }
    /*
    // var lassa = 
    { 'name' : 'lassa',
      'image' : 'images/',
      'category' : 'beverages',
      'label' : null,
      'price' : '3.99',
      'description' : 'Massa, eget egestas purus viverra accumsan in nisl. Venenatis a, condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas sed tempus, urna et pharetra pharetra, massa massa ultricies mi? Eget aliquet nibh praesent tristique magna sit amet purus.',
      'comment' : ''
    };
    */
]);

app.controller("menuCtrl", ["$scope", "all_dishes", function($scope, all_dishes) {

    $scope.all_dishes = all_dishes;
    $scope.all_categories = extract_categories(all_dishes);
    $scope.selected_category = "";

    $scope.is_category_selected = function (name) {
        return $scope.selected_category == name;
    }
    
    $scope.select_category = function (name) {
        $scope.selected_category = name;
    }
    
    function extract_categories(dishes) {
        var items = [];
        var uniq_items = {};
        for (var i = 0; i < dishes.length; i++) {
            var cat = dishes[i].category;
            if (uniq_items[cat] === undefined) {
                uniq_items[cat] = true;
                items.push(cat);
            }
        }
        // console.log(items);
        return items;
    }
}]);

