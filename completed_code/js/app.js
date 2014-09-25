(function() {

angular.module('SIApp', [])

.controller('SICtrl', ['$scope','$interval', function ($scope,$interval) { // scope is object that corresponds to the html element
    // This is a test controller
    var num_rows = 5;
    var num_columns = 9;
    var TOTAL_ROWS = 20;
    var TOTAL_COLUMNS = 20;
    $scope.game_ended = false;
    $scope.win_or_lose = false;
    $scope.score = 0;

    function getRightmostPosition(){ // returns column of rightmost invader
        var rightmostInvaderPosition = 0;
        for(var i=0; i<$scope.spaceInvaders.length; i++){
            if ($scope.spaceInvaders[i].show && $scope.spaceInvaders[i].left > rightmostInvaderPosition){
                rightmostInvaderPosition = $scope.spaceInvaders[i].left;
            }
        }
        return rightmostInvaderPosition;
    }
    function getLeftmostPosition(){ // returns column of rightmost invader
        var leftmostInvaderPosition = TOTAL_COLUMNS-1;
        for(var i=0; i<$scope.spaceInvaders.length; i++){
            if ($scope.spaceInvaders[i].show && $scope.spaceInvaders[i].left < leftmostInvaderPosition){
                leftmostInvaderPosition = $scope.spaceInvaders[i].left;
            }
        }
        return leftmostInvaderPosition;
    }
    function getBottommostPosition(){ // returns row of the bottommost invader
        var bottommostInvaderPosition = 0;
        for(var i=0; i<$scope.spaceInvaders.length; i++){
            if ($scope.spaceInvaders[i].show && $scope.spaceInvaders[i].top > bottommostInvaderPosition){
                bottommostInvaderPosition = $scope.spaceInvaders[i].top;
            }
        }
        return bottommostInvaderPosition;
    }
    $scope.spaceInvaders = [];
    $scope.bullets = [];
    $scope.tank = {
        left: Math.floor(TOTAL_COLUMNS/2),
        top: TOTAL_ROWS-1
    };
    $scope.tankAction = function(e){
        //console.log(e);
        if(e.keyCode == 37) {
            console.log('asdf');
            if ($scope.tank.left >0){
                $scope.tank.left--;
            }
        }
        else if(e.keyCode == 39) { 
            if ($scope.tank.left < TOTAL_COLUMNS-1){
                $scope.tank.left++;
            }
        }
        else if (e.keyCode == 32) {
            $scope.bullets.push({top: $scope.tank.top-1, left: $scope.tank.left, show: true});
        }
    };
    for(var row=1;row<num_rows;row++){
        for(var column=1;column<num_columns;column++){
            $scope.spaceInvaders.push({top:row,left:column,show:true});
        }
    }

    var direction = 1;
    var tick = 0;
    $interval(function(){
        var i;
        if (tick % 4 == 0) {
            if (getBottommostPosition() >= TOTAL_ROWS-1){
                $scope.win_or_lose = "You lost!";
                $scope.game_ended = true;
            }
            if (direction == 1 && getRightmostPosition() >= TOTAL_COLUMNS-1){
                for(i=0; i<$scope.spaceInvaders.length; i++){
                    $scope.spaceInvaders[i].top++;
                }
                direction = -1;
            }
            else if (direction == -1 && getLeftmostPosition() <= 0){
                for(i=0; i<$scope.spaceInvaders.length; i++){
                    $scope.spaceInvaders[i].top++;
                }
                direction = 1;
            }
            else {
                for(i=0; i<$scope.spaceInvaders.length; i++){
                    $scope.spaceInvaders[i].left += direction;
                }
            }
        }
        for (i = $scope.bullets.length-1; i >= 0; i--) {
            if ($scope.bullets[i].top < 0) {
                $scope.bullets.splice(i, 1);
            } else {
                $scope.bullets[i].top--;
            }
            for (var j=0; j<$scope.spaceInvaders.length; j++){
                if($scope.bullets[i]){
                    if($scope.spaceInvaders[j].show && $scope.bullets[i].top == $scope.spaceInvaders[j].top && 
                    $scope.bullets[i].left == $scope.spaceInvaders[j].left){ // we hit something with a bullet
                        $scope.bullets[i].show = false;
                        $scope.spaceInvaders[j].show = false;
                        $scope.score++;
                        if ($scope.score == (num_columns-1)*(num_rows-1)){
                            $scope.win_or_lose = "You won!";
                            $scope.game_ended = true;
                        }
                        $scope.bullets.splice(i, 1);
                    }
                }
            }
        }
        tick++;
    }, 100);
}]);

})();