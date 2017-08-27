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
				//document.getElementById('account-details').textContent = JSON.stringify({
				//	email: email
				//}, null, '  ');
			});
		} else {
			//document.getElementById('account-details').textContent = 'null';
		}
	}, function (error) {
		console.log(error);
	});
};

window.addEventListener('load', function () {
	initApp()
	setupDialogs()
});

function firebaseLogout()
{
	firebase.auth().signOut().then(function() {
		window.location.href='/';
	}, function(error) {
		// handle error
	});
}

var logoutDialog;

function setupDialogs()
{
	logoutDialog = new mdc.dialog.MDCDialog(document.querySelector('#logut-dialog'));
	
	logoutDialog.listen('MDCDialog:accept', function() {
		firebaseLogout()
	})

	logoutDialog.listen('MDCDialog:cancel', function() {
		// nothing
	})
}