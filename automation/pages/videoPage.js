const elementUtil = require('../util/elementUtil')  //import Element utility class

class VideoPage {  //video page class

    get subscriptionOverMessage() { return $("//span[contains(text(), 'Subscription')]") }  //locator for subscription over message
    get upgradePlanMessage() { return $("//span[contains(text(),'You need to upgrade your membership.')]") }  //locator for plan upgrade message   
    get exitButton() { return $("//button/span/p/span[text()='Exit']") }//locator for exit button
    get errorMessage() { return $("//*[contains(text(),'error')]") }  //locator for error message
    get playButton() { return $("//div[@class='vjs-control-bar']//button[contains(@class,'play-control')]") }  //locator for play button
    get videoWrapper() { return $('#video-wrapper') }  //locator for video frame


    isVideoDisplayed() {  //method to wait for video to be displayed
        return elementUtil.doIsDisplayed(this.videoWrapper)
    }

    waitForVideoToBeDisplayed() {  //method to wait for video to be displayed
        browser.waitUntil(function () {  //wait until condition
            return $('#video-wrapper').isDisplayed() === true  //condition to chcek video frame
        }, 15000, "video could not load on detail screen");  //timeout and error message
    }

    clickPlayButton() {  //method to click on play button
        elementUtil.doClick(this.playButton);
    }

    isSubscriptionOverMessageDisplayed(webPlayer) {  //method to check subscription message is displayed
        switch (webPlayer) {  //switch to check the message tenant wise
            case 'gll':
                return elementUtil.doIsDisplayed(this.upgradePlanMessage);
            default:
                return elementUtil.doIsDisplayed(this.subscriptionOverMessage);
        }
    }

    isErrrorDisplayed() {  //method to check if error message is displayed
        return elementUtil.doIsDisplayed(this.errorMessage);
    }
}
module.exports = new VideoPage();  //export the video page class