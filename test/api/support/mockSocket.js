class MockSocket {
  constructor(id) {
  	this.request = { session: { passport : { user: id} } };

  	defaultUserRoom = `defaultUserRoom${id}`;
  	rooms = {};
    rooms[defaultUserRoom] = defaultUserRoom;
    this.rooms = rooms;
  }

  join(roomName) {
  	return this.rooms[roomName] = roomName;
  }
}

module.exports = MockSocket;
