// ==UserScript==
// @name        Geckium - Bookmarks Bar
// @author      AngelBruni
// @loadorder   3
// ==/UserScript==

function applyBookmarkAttr() {
	const bookmarkBarPref = gkPrefUtils.tryGet("browser.toolbars.bookmarks.visibility").string;
	document.documentElement.setAttribute("personalbar", bookmarkBarPref);

	const navigatorToolbox = document.getElementById("navigator-toolbox");
	
	const personalToolbar = document.getElementById("PersonalToolbar");

	waitForElm("#navigator-toolbox > vbox.global-notificationbox").then(() => {
		const notificationBoxStack = document.querySelector("#navigator-toolbox > vbox.global-notificationbox");
		notificationBoxStack.removeAttribute("prepend-notifications");

		if (bookmarkBarPref == "newtab") {
			gkInsertElm.before(notificationBoxStack, personalToolbar);
		} else {
			navigatorToolbox.appendChild(notificationBoxStack);
		}
	});
}

const bookmarkBarPrefObserver = {
	observe: function (subject, topic, data) {
		if (topic == "nsPref:changed") {
			applyBookmarkAttr();
		}
	}
};
Services.prefs.addObserver("browser.toolbars.bookmarks.visibility", bookmarkBarPrefObserver, false)
window.addEventListener("load", applyBookmarkAttr);

_ucUtils.windowIsReady(window).then(() => {
	const personalToolbarBackground = document.createElement("div");
	personalToolbarBackground.id = "personal-toolbar-bg";

	const personalToolbarFloatingBackground = document.createElement("div");
	personalToolbarFloatingBackground.id = "personal-toolbar-floating-bg";

	document.getElementById("PersonalToolbar").prepend(personalToolbarFloatingBackground);
	document.getElementById("PersonalToolbar").prepend(personalToolbarBackground);
});