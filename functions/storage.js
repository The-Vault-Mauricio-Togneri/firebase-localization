function Storage(admin)
{
	this.store = function(path, content)
	{
		var bucket = admin.storage().bucket()

		return bucket.file(path).save(content, function(error)
		{
			if (error)
			{
				console.log(error)
			}
		})
	}
}

module.exports = Storage