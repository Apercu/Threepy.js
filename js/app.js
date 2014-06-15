global.THREE = THREE;
global.document = document;

var net = require('net');
var gui = require('nw.gui');
var Game = require('./js/game.js');

var win = gui.Window.get();
win.title = "Zabylon";
win.width = 1640;
win.height = 900;

var client = new net.Socket();
var game;

client.on('data', function (data) {
	var res = data.toString().split('\n');
	for (var i in res) {
		var parse = res[i].split(' ');
		if (parse[0] === 'msz') {
			game.createMap(parse[1], parse[2]);
		}
	}
	console.log(res);
});

//Error caught
process.on('uncaughtException', function (e) {
	console.log(e);
});

angular.module('zabylonApp', [])
	.controller('zabylonCtrl', function ($scope, $timeout) {

		$scope.ui = {
			connected  : false,
			connectHost: '127.0.0.1',
			connectPort: 4040
		};

		$scope.connect = function () {
			client.connect($scope.ui.connectPort, $scope.ui.connectHost, function () {
				client.write('GRAPHIC\n');
			});
			$scope.ui.connected = true;
			$timeout(function () {

				game = new Game();
				game.run();

			});
		};

		$scope.minimize = function () {
			win.minimize();
		};

		$scope.toggleFull = function () {
			win.toggleFullscreen();
		};

		$scope.quit = function () {
			gui.App.quit();
		};

	});
