var config = {
	apiKey: 'AIzaSyD97ohSqPCr_8O0byCUMdqpPB9rTf-Qgtk',
	authDomain: 'app-localization-2f645.firebaseapp.com',
	databaseURL: 'https://app-localization-2f645.firebaseio.com',
	projectId: 'app-localization-2f645',
	storageBucket: 'app-localization-2f645.appspot.com',
	messagingSenderId: '503219174247'
}
firebase.initializeApp(config)

function firebaseLogout()
{
	firebase.auth().signOut().then(function()
	{
		window.location.href = '/'
	}, function(error)
	{
		// handle error
	})
}