function appearance() {
	let previousChoice;
	let prefChoice;

	document.documentElement.dataset.url = document.URL;

	if (document.URL == "about:newtab" || document.URL == "about:home" || document.URL == "about:apps")
		prefChoice = gkEras.getNTPEra();
	else
		prefChoice = gkEras.getBrowserEra();	

	if (!prefChoice)
		prefChoice = 0;
	
	if (document.URL == "about:newtab" || document.URL == "about:home" || document.URL == "about:apps" || document.URL == "about:flags" || document.URL == "about:privatebrowsing" || document.URL == "about:about") {
		if (prefChoice == previousChoice) {
			console.log("TAB PAGE: Choice same as previous choice, ignoring.", prefChoice, previousChoice)
		} else {
			console.log("TAB PAGE: Choice not the same as previous choice, continuing.", prefChoice, previousChoice)
	
			if (document.URL == "about:newtab" || document.URL == "about:home") {
				gkBranding.load();
				gkEras.applyEra();
				createMainLayout();
				retrievePinnedSites();
				retrieveFrequentSites();
				getRecentBookmarks();
				createRecentlyClosed();
				setUpPages();		
				setUpApps();
			} else if (document.URL == "about:apps") {
				gkBranding.load();
				createMainLayout();
				setUpApps();
			} else if (document.URL == "about:flags") {
				setUpExperiments();
			} else if (document.URL == "about:privatebrowsing" || document.URL == "about:about") {
				gkBranding.load();
				createMainLayout();
			}
		}
	}
}
document.addEventListener("DOMContentLoaded", appearance)

/* bruni: Automatically apply appearance and theme
		  attributes when it detecs changes in the pref. */
const appearanceObs = {
	observe: function (subject, topic, data) {
		if (topic == "nsPref:changed") {
			if (document.URL !== "about:apps")
				appearance();	
		}		
	},
};
Services.prefs.addObserver("Geckium.appearance.choice", appearanceObs, false);
Services.prefs.addObserver("Geckium.main.overrideStyle", appearanceObs, false);
Services.prefs.addObserver("Geckium.main.style", appearanceObs, false);
Services.prefs.addObserver("Geckium.newTabHome.overrideStyle", appearanceObs, false);
Services.prefs.addObserver("Geckium.newTabHome.style", appearanceObs, false);
Services.prefs.addObserver("Geckium.branding.choice", appearanceObs, false);