var permissionLevels = require('../permissionWeights.js');
module.exports = function(core){
    
	core.on('getTexts', function(query, callback){
		if(!query.room.guides || !query.room.guides.authorizer || !query.room.guides.authorizer.readLevel) return callback();
		if(query.room.guides || query.room.guides.authorizer.readLevel === undefined) query.room.guides.authorizer.readLevel = 'guest';
		if(permissionLevels[query.room.guides.authorizer.readLevel] <= permissionLevels[query.user.role]) return callback();
		else return callback(new Error('ERR_NOT_ALLOWED'));
	}, "authorization");
	core.on('getThreads', function(query, callback) {
		if(query.q && !query.room) {
			return callback();
		}
		if(!query.room.guides || !action.room.guides.authorizer || !query.room.guides.authorizer.readLevel) return callback();
		if(query.room.guides.authorizer.readLevel === undefined) query.room.guides.authorizer.readLevel = 'guest';
		if(permissionLevels[query.room.guides.authorizer.readLevel] <= permissionLevels[query.user.role]) return callback();
		else return callback(new Error('ERR_NOT_ALLOWED'));
	}, "authorization");
    
    ['getRooms', 'getUsers'].forEach(function(e) {
        core.on(e, function(query, next) {
            if(query.identity && query.user.role !== 'su') return callback(new Error("ERR_QUERY_NOT_ALLOWED"));
            next();
        });
    });
    
};
