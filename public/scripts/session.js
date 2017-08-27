initApp = function () {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			var displayName = user.displayName;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var uid = user.uid;
			var phoneNumber = user.phoneNumber;
			var providerData = user.providerData;
			user.getIdToken().then(function (accessToken) {
				setupApp();
			});
		} else {
			window.location.href='/';
		}
	}, function (error) {
		console.log(error);
	});
};

window.addEventListener('load', function () {
	initApp()
});