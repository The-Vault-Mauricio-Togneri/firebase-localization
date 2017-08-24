var dynamicTabBar = window.dynamicTabBar = new mdc.tabs.MDCTabBar(document.querySelector('#dynamic-tab-bar'));
dynamicTabBar.preventDefaultOnClick = true;

var panels = document.querySelector('.panels');

function updatePanel(index) {
	var activePanel = panels.querySelector('.panel.active');
	if (activePanel)
	{
		activePanel.classList.remove('active');
	}

	panels.querySelector('.panel:nth-child(1)').style.display = 'none';
	panels.querySelector('.panel:nth-child(2)').style.display = 'none';

	var newActivePanel = panels.querySelector('.panel:nth-child(' + (index + 1) + ')');
	if (newActivePanel)
	{
		newActivePanel.style.display='block';
	}
}

dynamicTabBar.listen('MDCTabBar:change', function (t) {
	var dynamicTabBar = t.detail;
	var nthChildIndex = dynamicTabBar.activeTabIndex;

	updatePanel(nthChildIndex);
});