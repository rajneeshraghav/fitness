const elementUtil = require('../util/elementUtil')  //import Element utility class

class HomePage {  //home page class

    get loginButton() { return $('=LOG IN') }  //locator for log in option
    get signUpButton() { return $('=SIGN UP') }  //locator for sign up button
    get profileIcon() { return $("//div[@class='loginButtonHolder']//div[contains(@class,'MuiAvatar-root')]//*[local-name()='svg']") }  //locator for profile icon
    get homeText() { return $("=Home") }  //locator for home option
    get videos() { return $$('video') }  //locator for videos
    get viewAll() { return $$("//div[2]/button/span/h4/span[text()='View all']") }
    get home() { return $("//a[@class='secondarycolor-headerLinks-fitness']//child::span[text()='Home']") }  //locator for home page
    get classFinderButton() { return $("//span[contains(text(),'Class finder') ]/ancestor::div[@class='MuiGrid-root MuiGrid-item']") } //Locator for Class Finder button

    clickHome() {  //method to click on home option
        elementUtil.doClick(this.homeText)
    }

    tapProfile() {  //method to tap on profile option
        elementUtil.doClick(this.profileIcon)
    }

    isHomePageDisplayed() {  //method to check if home page is displayed or not
        return elementUtil.doIsDisplayed(this.homeText)
    }


    getNumberOfVideos() {  //method to get total number of videos displayed on home page
        return this.videos.length;
    }

    clickVideo(element) {  //method to click video
        elementUtil.doScrollIntoView(element);
        elementUtil.doClick(element);
    }

    getVideoURL() {  //method to get the video URL
        return elementUtil.doGetUrl();
    }

    waitforHomePageToBeDisplayed() {  //method to wait for home page to be displayed
        browser.waitUntil(function () {
            return elementUtil.doIsDisplayed($("//a[@class='secondarycolor-headerLinks-fitness']//child::span[text()='Home']")) === true
        }, 15000, "home page could not open");
    }

    waitForVideosToBeDisplayed() {  //method to wait for videos to  be displayed
        browser.waitUntil(function () {
            return $$('video').map((elem) => elementUtil.doIsDisplayed(elem)).length > 0;
        }, 15000, "videos on home page could not load");
    }

    clickViewAllButton(element) {  //method to click on view all option
        elementUtil.doScrollIntoView(element);
        elementUtil.doClick(element);
    }
    tapClassFinderBtn() {  //method to click on class finder option
        elementUtil.doClick(this.classFinderButton)
    }
}
module.exports = new HomePage();  //export the home page class