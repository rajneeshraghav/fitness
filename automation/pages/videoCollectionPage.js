const elementUtil = require('../util/elementUtil')  //import Element utility class

class VideoPage {  //video page class

    get videos() { return $$('video') }  //locator for videos
    get homeText() { return $("=Home") }  //locator for home option

    getNumberOfVideos() {  //method to get total number of videos displayed on home page
        return this.videos.length;
    }

    clickVideo(element) {  //method to click video
        elementUtil.doScrollIntoView(element);
        elementUtil.doClick(element);
    }

    clickHome() {  //method to click video
        elementUtil.doClick(this.homeText);
    }

    waitForVideosToBeDisplayed() {  //method to wait for videos to be dispalyed
        browser.waitUntil(function () {  //wait until condition 
            return $$('video').map((elem) => elementUtil.doIsDisplayed(elem)).length > 0;  //condition to check if the videos count is greater than 0
        }, 15000, "videos on collection page could not load");  //timeout and error message
    }

}
module.exports = new VideoPage();  //export the video page class