function Storage(admin)
{
	this.store = function(path, content, callback)
	{
		var bucket = admin.storage().bucket()

		return bucket.file(path).save(content, error =>
		{
			if (error)
			{
				console.log(error)
			}

			callback()
		})
	}
}

module.exports = Storage