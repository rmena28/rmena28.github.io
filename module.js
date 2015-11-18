var app = angular.module('sharkModule', []);

var userController = app.controller('userController', function ($scope, $http) {
    $scope.members = JSON.parse(localStorage.getItem('members'));
    restoreCurrentGame();
    $scope.createMember = {};
    $scope.selectedPlayer = {};
    $scope.isTimer = false;

    if ($scope.equipoA === undefined || $scope.equipoA === null) {
        $scope.equipoA = [];
    }

    if ($scope.equipoB === undefined || $scope.equipoB === null) {
        $scope.equipoB = [];
    }

    if ($scope.members === undefined || $scope.members === null) {
        $scope.members = [
            {number: 1, name: 'Jonas', lastname: 'Estepan'},
            {number: 2, name: 'Ramon', lastname: 'Mena'},
            {number: 3, name: 'Omar', lastname: 'Guzman'},
            {number: 6, name: 'Leonal', lastname: 'Hernandez'},
            {number: 7, name: 'Stharling', lastname: 'Subi'},
            {number: 8, name: 'Luis', lastname: 'Florentino'},
            {number: 10, name: 'Jean', lastname: 'Jimenez'},
            {number: 12, name: 'Rafael', lastname: 'Perez'},
            {number: 13, name: 'Carlos', lastname: 'Garcia'},
            {number: 15, name: 'Kenneth', lastname: 'Aponte'},
            {number: 18, name: 'Marcos', lastname: 'Vasquez'},
            {number: 18, name: 'Jose', lastname: 'Moya'},
            {number: 20, name: 'Gabriel', lastname: 'Ferrarese'},
            {number: 21, name: 'Emanuel', lastname: 'Medrano'},
            {number: 23, name: 'Snailin', lastname: 'Inoa'},
            {number: 24, name: 'Hamlet', lastname: 'Maldonado'},
            {number: 26, name: 'Aneudy', lastname: 'Mota'},
            {number: 27, name: 'Andres', lastname: 'Tejada'},
            {number: 28, name: 'Luis', lastname: 'Santana'},
            {number: 30, name: 'Alison', lastname: 'Perez'},
            {number: 32, name: 'Eudys', lastname: 'Bautista'},
            {number: 33, name: 'Juan', lastname: 'Cordero'},
            {number: 35, name: 'Reynold', lastname: 'Duran'},
            {number: 41, name: 'Benjamin', lastname: 'Lizardo'},
            {number: 45, name: 'Jose', lastname: 'Mercado'},
            {number: 77, name: 'Rhonniel', lastname: 'Mercado'},
            {number: 82, name: 'Alberto', lastname: 'Bautista'},
            {number: 84, name: 'Charles', lastname: 'Antigua'},
            {number: 87, name: 'Rudy', lastname: 'Matos'}
        ];
    }

    $scope.addNew = function () {
        $scope.createMember = {};
        $scope.members.push($scope.createMember);
        $('#form').show();
    };
    $scope.saveList = function () {
        localStorage.setItem('members', JSON.stringify($scope.members));
        $('#form').hide();
    };

    $scope.selectCurrent = function (member) {
        $scope.createMember = member;
        $('#form').show();
    };

    $scope.addUserTeamA = function (member) {
        var player = {};
        player.member = member;
        player.points = 0;
        player.fouls = 0;
        for (i = 0; i < $scope.equipoB.length; i++) {
            var jugador = $scope.equipoB[i];
            if (jugador.member.number === member.number) {
                alert(member.name + ' ya existe en equipo B');
                return;
            }
        }
        for (i = 0; i < $scope.equipoA.length; i++) {
            var jugador = $scope.equipoA[i];
            if (jugador.member.number === member.number) {
                alert(member.name + ' ya existe en equipo A');
                return;
            }
        }
        if ($scope.equipoA.length < 5) {
            $scope.equipoA.push(player);
        } else {
            alert('Ya hay 5 jugadores en el equipo A');
        }
        saveCurrentGame();
    };

    $scope.removePlayerFromTeam = function (player) {
        var index = $scope.equipoA.indexOf(player);
        if (index > -1) {
//            var array = $scope.equipoA;
//            $scope.equipoA = [];
//            array.slice(index, 1);
//            console.log(array);
//            $scope.equipoA = $scope.equipoA.concat(array);
//            console.log($scope.equipoA);
            $scope.equipoA.splice(index, 1);
        } else {
            index = $scope.equipoB.indexOf(player);
            if (index > -1) {
//                var array = $scope.equipoB;
//                $scope.equipoB = [];
//                array.slice(index, 1);
//                $scope.equipoB = $scope.equipoB.concat(array);
                $scope.equipoB.splice(index, 1);
            }
        }
        saveCurrentGame();
    };
    $scope.reset = function () {
        var reiniciar = confirm("Seguro que desea reiniciar?");
        if (reiniciar) {
            localStorage.removeItem('teamA');
            localStorage.removeItem('teamB');
            localStorage.removeItem('pointsA');
            localStorage.removeItem('pointsB');
            localStorage.removeItem('foulsA');
            localStorage.removeItem('foulsB');

            $scope.equipoA = [];
            $scope.equipoB = [];
            $scope.pointsA = 0;
            $scope.pointsB = 0;
            $scope.foulsB = 0;
            $scope.foulsA = 0;

            $scope.min = 12;
            $scope.sec = 0;
            $scope.isTimer = false;

            $('.hideable').show();
        }
    };

    $scope.saveCurrentGame = function () {
        saveCurrentGame();
        console.log($scope.equipoA);
        console.log($scope.equipoB);
    }
    function saveCurrentGame() {
        localStorage.setItem('teamA', JSON.stringify($scope.equipoA));
        localStorage.setItem('teamB', JSON.stringify($scope.equipoB));
        localStorage.setItem('pointsA', $scope.pointsA);
        localStorage.setItem('pointsB', $scope.pointsB);
        localStorage.setItem('foulsA', $scope.foulsA);
        localStorage.setItem('foulsB', $scope.foulsB);
        localStorage.setItem('min', $scope.min);
        localStorage.setItem('sec', $scope.sec);
    }

    function restoreCurrentGame() {
        $scope.equipoA = JSON.parse(localStorage.getItem('teamA'));
        $scope.equipoB = JSON.parse(localStorage.getItem('teamB'));

        $scope.pointsA = parseInt(localStorage.getItem('pointsA'));
        console.log($scope.pointsA);
        if ($scope.pointsA === undefined || $scope.pointsA === null || isNaN($scope.pointsA)) {
            $scope.pointsA = 0;
        }
        $scope.pointsB = parseInt(localStorage.getItem('pointsB'));
        if ($scope.pointsB === undefined || $scope.pointsB === null || isNaN($scope.pointsB)) {
            $scope.pointsB = 0;
        }
        $scope.foulsB = parseInt(localStorage.getItem('foulsB'));
        if ($scope.foulsB === undefined || $scope.foulsB === null || isNaN($scope.foulsB)) {
            $scope.foulsB = 0;
        }
        $scope.foulsA = parseInt(localStorage.getItem('foulsA'));
        if ($scope.foulsA === undefined || $scope.foulsA === null || isNaN($scope.foulsA)) {
            $scope.foulsA = 0;
        }
        $scope.min = parseInt(localStorage.getItem('min'));
        if ($scope.min === undefined || $scope.min === null || isNaN($scope.min)) {
            $scope.min = 10;
        }
        $scope.sec = parseInt(localStorage.getItem('sec'));
        if ($scope.sec === undefined || $scope.sec === null || isNaN($scope.sec)) {
            $scope.sec = 0;
        }
        if($scope.intervalId){
            clearInterval($scope.intervalId);
        }
    }



    $scope.start = function () {
        if (!$scope.isTimer) {
            document.getElementById('start-stop-button').innerHTML = "Pause";
            $scope.intervalId = setInterval(function () {
                console.log($scope.sec + " " + $scope.min);
                
                if ($scope.sec === 0 && $scope.min === 0) {
                    alert('Juego Terminado');
                    document.getElementById('start-stop-button').innerHTML = "Start";
                    stop();
                    return;
                }
                if ($scope.sec > 0) {
                    $scope.sec--;
                }else if ($scope.sec === 0) {
                    $scope.sec = 59;
                    $scope.min--;
                }

                document.getElementById("timer").innerHTML = $scope.min + "m" + $scope.sec + "s";
                saveCurrentGame();
            }, 1000);
            $scope.isTimer = true;
        } else {
            document.getElementById('start-stop-button').innerHTML = "Resume";
            stop();
        }
    };

    $scope.setTimer = function (mins) {
        if (mins === 0) {
            mins = parseInt(prompt("Cantidad de Minutos?"));
        }
        var confirmation = confirm("Esta seguro que desea establecer el timer a " + mins);
        if (confirmation) {
            $scope.sec = 0;
            $scope.min = mins;
            if ($scope.isTimer) {
                $scope.isTimer = false;
                clearInterval($scope.intervalId);
            }
        }
    }

    function format(value) {
        if (value < 10) {
            return "0" + value;
        }
    }


    function stop() {
        $scope.isTimer = false;

        clearInterval($scope.intervalId);
        document.getElementById("timer").innerHTML = min + "m " + sec + "s";
    }
    ;



    $scope.addUserTeamB = function (member) {
        var player = {};
        player.member = member;
        player.points = 0;
        player.fouls = 0;
        for (i = 0; i < $scope.equipoB.length; i++) {
            var jugador = $scope.equipoB[i];
            if (jugador.member.number === member.number) {
                alert(member.name + ' ya existe en equipo B');
                return;
            }
        }
        for (i = 0; i < $scope.equipoA.length; i++) {
            var jugador = $scope.equipoA[i];
            if (jugador.member.number === member.number) {
                alert(member.name + ' ya existe en equipo A');
                return;
            }
        }
        if ($scope.equipoB.length < 5) {
            $scope.equipoB.push(player);
        } else {
            alert('Ya hay 5 jugadores en el equipo B');
        }
        saveCurrentGame();
    };

    $scope.addPoints = function (team, player, point) {
        player.points += point;
        if (team === 'A') {
            $scope.pointsA += point;
        } else if (team === 'B') {
            $scope.pointsB += point;
        }
        saveCurrentGame();
    };

    $scope.addFoul = function (team, player, foul) {
        player.fouls += foul;
        if (team === 'A') {
            $scope.foulsA += foul;
        } else if (team === 'B') {
            $scope.foulsB += foul;
        }
        saveCurrentGame();
    };

    $scope.removePoints = function (team, player, point) {
        player.points -= point;
        if (team === 'A') {
            $scope.pointsA -= point;
        } else if (team === 'B') {
            $scope.pointsB -= point;
        }
        saveCurrentGame();
    };

    $scope.removeFoul = function (team, player, foul) {
        player.fouls -= foul;
        if (team === 'A') {
            $scope.foulsA -= foul;
        } else if (team === 'B') {
            $scope.foulsB -= foul;
        }
        saveCurrentGame();
    };

    $scope.removeItem = function (member) {
        var index = $scope.members.indexOf(member);
        if (index > -1) {
            $scope.members.splice(index, 1);
        }
    };

    $scope.removeFromGame = function (member) {
        var index = $scope.members.indexOf(member);
        if (index > -1) {
            $scope.members.splice(index, 1);
        }
        saveCurrentGame();
    };
});
