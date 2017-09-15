function Database(admin)
{
	this.ref = function(path)
	{
		return admin.database().ref(path)
	}

	this.root = function(callback)
	{
		return this.ref('/').once('value', snap =>
		{
			callback(snap.val())
		})
	}

	this.api         = new (require('./database-api.js'))(this)
	this.language    = new (require('./database-language.js'))(this)
	this.segment     = new (require('./database-segment.js'))(this)
	this.translation = new (require('./database-translation.js'))(this)
}

module.exports = Database