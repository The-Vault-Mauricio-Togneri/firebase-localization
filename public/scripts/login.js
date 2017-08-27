var uiConfig = {
	signInSuccessUrl: '/overview',
	signInOptions: [
		{
			provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
			requireDisplayName: false
		},
	]
};

var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);