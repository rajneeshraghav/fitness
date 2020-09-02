const elementUtil = require('../util/elementUtil')  //import Element utility class
class filterPage {

    get filterDropDown() { return $("//div[ contains(text(),'Select Duration') and @class='placeholder']") }// locator for drop down arrow of duration
    get filteroption() { return $("//span[ contains(text(),'Filter') ]") }// locator for filter option
    get videoCountTitle() { return $("// h6 [@class='MuiTypography-root MuiTypography-subtitle2']") } // locator for video count title
    get videosCount() { return $$("//video") } // locator for elements with video tag
    get filterTitle() { return $("//div[@class='MuiGrid-root MuiGrid-item']/h1") }// locator for Class finder text
    get crossIcon() { return $("//img [@src='/static/media/clear-wexer.43aaf7a9.svg']") } // locator for cross icon
    get options() { return $$("//div[@class='option']") } //locator for elements with option class
    get privacyPolicy() { return $("//span[contains(text(),'Privacy Policy & Terms of Use')]") } // locator for privacy policy


    isFilterPageDisplayed() {  //method to check if Filter page is displayed or not
        return elementUtil.doIsDisplayed(this.filterTitle);
    }
    clickOnFilterOption() { // method to click on the filter option
        elementUtil.doClick(this.filteroption);
    }

    clickOnDurationDropDown() { // method to click on the duration drop down arrow
        elementUtil.doClick(this.filterDropDown);


    }
    selectDuration(Duration) { // method to slect the duration from the drop down
        var dura
        dura = Duration;
        let list = this.options; // get the number of elements with option class locator
        for (let i = 0; i < list.length; i++) { // ierate over option elements
            const element = list[i];
            console.log("the value at first option is" + " " + element);
            if (element.getAttribute('data-value') == dura) { // compare with the value present at the data-value attribute of option elements
                element.click();
                break;
            }
        };
    }

    durationVideoCount() { // method to get the count of videos from the title of videos above videos
        return elementUtil.doGetText(this.videoCountTitle).split(" ")[0];

    }

    getNumberOfVideos(count) {  //method to get total number of videos displayed on Filter page by scroll the view
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
        return vcount; // retuns the total videos count that is displyed after  duration flter
    }
    
    tapCrossIcon() { // method to click on cross icon for applying new duration filter
        elementUtil.doScrollIntoView(this.crossIcon)
        elementUtil.doClick(this.crossIcon);
    }

    getFilterhTitle() { // method to get the title of the filter screen

        return elementUtil.doGetText(this.filterTitle);
    }
}
module.exports = new filterPage(); 