const signUpPage = require('../pages/signUpPage')  //import Signup 
const homePage = require('../pages/homePage');  //import home page
const myAccountPage = require('../pages/myAccountPage');  //import account page
const { assert } = require('chai');  //import chai for assertion
const getTestData = require("../tenant/fetchTenantData");
let webPlayerInTest;  //variable to detect current webplayer tenant
let validityDate;  //variable for the tenant validity days
let s;
let testData;

describe("SignUp Test Cases", function () {  //test suite for sign up feature

    it("Verify the sign up URL and title", function () {  //test case to validate the url and title of the sign up page 
        browser.url('/signup');  //method to call sign up url
        browser.maximizeWindow();
        browser.setTimeout({ 'pageLoad': 30000 })

       
        //RR// Change below logic, Tenant info will used from ENVs
        //webPlayerInTest = (((browser.getUrl()).split("-"))[0]).split("//")[1];  //getting the tenant info from the url 
        //testData = getTestData.getTestData(webPlayerInTest); 

        testData = getTestData.getTestData();

        browser.waitUntil(function () {  //wait untill the sign page opens
            return signUpPage.isSignUpPageOpen() === true  //using dispaly method to check of sign up page is open
        }, 30000, "Sign Up page is taking time to load");  //timeout to wait condition

        assert.equal(testData.SIGNUP_HEADER, signUpPage.getPageHeaderText(), "The sign up page header does not match with the expected")  //assertion to check signup page title

        let actualSignUpSubHeader = signUpPage.getPageSubheaderText();  //assigning the actual sub header displayed
        let expectedSignUpSubHeader=testData.SIGNUP_SUBHEADER;  //variable to store the expected header
        assert.equal(expectedSignUpSubHeader, actualSignUpSubHeader, "The sign up sub header does not match with the expected");  //assertion to match the expected header with the actual header

    });

    it("verify the sign up flow", function () {  //test case to verify the sign up positive flow
        s = signUpPage.enterSignUpFields(testData.signUpFirstName, testData.signUpLastName, testData.signUpEmail, testData.freeAccessCode);  //variable to check if the sign up page contains free access code field
        signUpPage.enterPassword(testData.signUpPassword);  //method to enter password
        signUpPage.selectTCcheckbox();  //method to check terms and conditions radio button
        signUpPage.clickSignUpButton();  //method to click on sign up button
        browser.pause(5000);  //wait to load home page
        browser.setTimeout({ 'pageLoad': 20000 })
        assert.isFalse(signUpPage.isSignUpButtonDisplayed(), "User sign up failed");  //assertion to check if sign up page still exists on the tap of sign up button
    })

    it("Verify the trial message on fresh sign up", function () {  // test case to verify the trial message on fresh sign up
        browser.setTimeout({ 'pageLoad': 20000 })//wait to load the page
        assert.isTrue(homePage.isHomePageDisplayed(), "Home Page is not dispayed");  //assertion to check if the home page is dispalyed or not

        homePage.tapProfile();  //method to tap on the profile icon on home page
        browser.pause(5000);  //wait to load the page
        assert.isTrue(myAccountPage.isAccountPageDisplayed(), "My Account page is not displayed");  //assertion to check if the account page is dispalyed or not

        let expectedTrialMessage=testData.TRIAL_MESSAGE;  //variable to get the expected trial message.
        let actualTrialMessage = myAccountPage.getSubscriptionMessage();  //geting the actual trial message that is didpalyed on the screen.
        assert.equal(expectedTrialMessage, actualTrialMessage, "The trial message does not match");  //assertion to chcek if the expected and actual trial message matches
    })

    it("Verify the trial validity period", function () {  //test case to verify the trial validity date
        validityDate=testData.TRIAL_PERIOD;
        myAccountPage.clickCancel();  //method to Click Cancel 
        myAccountPage.clickSubscriptionCancelNoButton();  //method to click no on cancel subscription pop up
        browser.pause(3000);

        myAccountPage.clickCancel();  // method to click cancel
        myAccountPage.clickSubscriptionCancelYesButton();  //method to click yes on cancel subscription pop up

        let subscriptionValidityMessage = myAccountPage.getSubscriptionMessage();  //getting the subscription validity message dispalyed on the account page
        let date = new Date();  //method to get the current date
        date.setDate(date.getDate() + validityDate);  //add the validity trial period to current date
        let day = date.getDate();  //get date from the complete date
        let month = date.toLocaleString('default', { month: 'short' });  //get the month in short form from date
        let year = date.getFullYear();  // get the year from the complete date
        console.log("validity should end on " + { date })  //print the date in the log
        let bvalue = null;  //variable to check the validity date is correct or not
        if (subscriptionValidityMessage.search(day) >= 0) {  //condition to check whether correct date is displayed
            if (subscriptionValidityMessage.search(month) >= 0) {  //condition to check whether correct month is displayed
                if (subscriptionValidityMessage.search(year) >= 0) {  //condition to check whether correct year is displayed
                    bvalue = true;  //assigning the boolean true when the complete date is correct
                }
                else
                    bvalue = false; //assigning the boolean false when year is not correct
            }
            else
                bvalue = false;  //assigning the boolean false when month is not correct
        }
        else
            bvalue = false;  //assigning the boolean false when date is not correct

        assert.isTrue(bvalue, "The subscription validity end date is not correct.")  //assertion to check the validity date is correct or not



    })


});