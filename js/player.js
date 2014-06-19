module.exports = function Player(team, player) {

	var self = this;

	this.nb = player.nb;
	this.level = player.level;
	this.coords = {
		x: player.x,
		y: player.y,
		o: player.o
	};
	this.team = team;
	this.mesh = null;

	this.center = team.game.map.getRealCenter(player.x, player.y);

	team.game.players.push(self);

	this.setOrientation = function () {
		self.mesh.rotation.y = (self.coords.o === 4) ? 0.7 : self.mesh.rotation.y;
		self.mesh.rotation.y = (self.coords.o === 3) ? 1.7 : self.mesh.rotation.y;
		self.mesh.rotation.y = (self.coords.o === 2) ? -2.4 : self.mesh.rotation.y;
		self.mesh.rotation.y = (self.coords.o === 1) ? -0.7 : self.mesh.rotation.y;
	};

	var loader = new THREE.OBJMTLLoader();
	loader.load('obj/textures/sonic.obj', 'obj/textures/sonic'+ team.game.teams.indexOf(self.team) % 9 +'.mtl', function (object) {
		object.scale.x = 0.010;
		object.scale.y = 0.010;
		object.scale.z = 0.010;
		object.rotation.x = 1.5;
		object.position.z = 0.5;
		object.position.x = self.center.x;
		object.position.y = self.center.y;
		self.mesh = object;
		self.setOrientation();

		team.game.scene.add(object);
	});

	this.moveTo = function (x, y, o) {
		self.coords.x = x;
		self.coords.y = y;
		self.coords.o = o;
		self.center = team.game.map.getRealCenter(self.coords.x, self.coords.y);

		self.mesh.position.x = self.center.x;
		self.mesh.position.y = self.center.y;
		self.setOrientation();
	};

	this.setLevel = function (level) {
		self.mesh.scale.x += 0.005;
		self.mesh.scale.y += 0.005;
		self.mesh.scale.z += 0.005;
		self.level = level;
	};

	this.kill = function () {
		for (var i = 0; i < 100; i++) {
			setTimeout(function () {
				self.mesh.position.z -= 0.05;
			}, 1);
		}
		team.game.scene.remove(self.mesh);
		team.game.players.splice(team.game.players.map(function (e) {
			return e.nb;
		}).indexOf(self.nb), 1);
	};

};