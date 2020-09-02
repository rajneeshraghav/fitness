const elementUtil = require('../util/elementUtil')  //import Element utility class

class searchPage {

    get searchOptionButton() { return $("//span[contains(text(),'Search') ]/ancestor::span[@class='MuiTab-wrapper']") }//Locator for Search option Button
    get searchButton() { return $("//button/span/span/span[text()='Search']") } // locator for Search Button
    get serachBox() { return $("//input[contains(@placeholder,'Search') and @type='text']") } //locator for search box to type text
    get searchTitle() { return $("//div[@class='MuiGrid-root MuiGrid-item']/h1") }// locator for Class finder text
    get videoCountTitle() { return $("// h6 [@class='MuiTypography-root MuiTypography-subtitle2']") } // locator for video count title
    get crossIcon() { return $("//div[contains(@class,'Search')]//div//img") } // locator for cross icon
    get videosCount() { return $$("//video") }//locator to find number of videos displayed after the search
    get scrollText() { return $("//p[contains(text(),'Connected Fitness Labs Ltd')]") }
    get videoDivCount() { return $$(".MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-4") }
    get privacyPolicy() { return $("//span[contains(text(),'Privacy Policy & Terms of Use')]")}

    isSearchPageDisplayed() {  //method to check if Search page is displayed or not
        return elementUtil.doIsDisplayed(this.searchTitle);
    }

    tapOnSearchOPtion() { //method to click on Search option button
        elementUtil.doClick(this.searchOptionButton)
    }

    enterSearchText(className1) { //method to Search class in search box by entering class name
        elementUtil.doSetValue(this.serachBox, className1)
    }

    tapOnSearchBtn() { //method to click on search button

        elementUtil.doClick(this.searchButton)
    }

    getVideoCount() {
        return elementUtil.doGetText(this.videoCountTitle).split(" ")[0];
    }
    tapCrossIcon() {
        elementUtil.doScrollIntoView(this.crossIcon)
        elementUtil.doClick(this.crossIcon);
    }
    getSearchTitle() {

        return elementUtil.doGetText(this.searchTitle);
    }
    getNumberOfVideos(count) {  //method to get total number of videos displayed on home page
        let result;
        result = count;
        var MaxInstance = 15;// loop will run max 15 times
        let vcount = 0;
        for (let i = 0; i < MaxInstance; i++) {// loop to scroll the page to get the videos count displayed
            elementUtil.doScrollIntoView(this.privacyPolicy);
            vcount = this.videosCount.length;
            browser.pause(500);
            if (vcount == result) {
                console.log("scroll and video count done")
                break;
            }
        }
        return vcount; 
    }
}
module.exports = new searchPage();  