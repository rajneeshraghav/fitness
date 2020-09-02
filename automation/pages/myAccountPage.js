const elementUtil = require('../util/elementUtil')  //import Element utility class

class MyAccountPage{

    //page locators
    get subscriptionMessage() { return $("//div[contains(@class,'subText')]//h3") }
    get myAccountHeader() { return $("h1.MuiTypography-root")}
    get cancelButton() { return $("//span[contains(text(),'Cancel')]")}
    get subscriptionCancelPopUpNoButton() { return $("//button[@type='button']//child::h6//child::span[text()='No']")}
    get subscriptionCancelPopUpYesButton() { return $("//button[@type='button']//child::h6//child::span[text()='Yes']")}
    get subscriptionCancelAlert() { return $("//span[contains(text(),'Cancel Subscription')]")}
   //span[contains(text(),'Cancel subscription')]

    getSubscriptionMessage(){
        return elementUtil.doGetText(this.subscriptionMessage)
    }

    isAccountPageDisplayed(){
         return elementUtil.doIsDisplayed(this.myAccountHeader)
    }

    clickCancel(){
        elementUtil.doClick(this.cancelButton)
        browser.pause(3000);
    }

    clickSubscriptionCancelNoButton(){
        elementUtil.doClick(this.subscriptionCancelPopUpNoButton)
    }
    
    clickSubscriptionCancelYesButton(){
        elementUtil.doClick(this.subscriptionCancelPopUpYesButton)
        browser.pause(3000);
    }

    isSubscriptionAlertDisplayed(){
        return elementUtil.doIsDisplayed(this.subscriptionCancelAlert)
    }

    
}
module.exports= new MyAccountPage();