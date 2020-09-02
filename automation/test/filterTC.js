const loginPage = require("../pages/LoginPage");
const homePage = require("../pages/homePage");
const filterPage = require("../pages/filterPage");
const { assert } = require("chai");
const getTestData = require("../tenant/fetchTenantData");
let testData;
//RR// Change below logic, Tenant info will used from ENVs
//let webPlayerInTest;  //variable to detect current webplayer tenant

describe("Filter Test cases", function () {     //Filter TestCases

    it("Verify the Filter URL and title", function () {   //function to launch filter browser
        browser.url('/signin');  //navigate to Sign In Url
        browser.maximizeWindow();  //method to maximize the video


        //RR// Change below logic, Tenant info will used from ENVs
        
        //webPlayerInTest = (((browser.getUrl()).split("-"))[0]).split("//")[1];  //getting the tenant info from the url 
        //testData = getTestData.getTestData(webPlayerInTest); 
        testData = getTestData.getTestData();
        
        loginPage.doLoginValidations(testData.loginEmail, testData.loginPassword);

        homePage.waitforHomePageToBeDisplayed();
        browser.pause(3000);
        homePage.tapClassFinderBtn();  // click on ClassFinder option on Homepage      
        browser.pause(5000);
        const actualTitle = filterPage.getFilterhTitle()  //get sub title of the search page in a variable
        console.log(" title of filter page is " + " " + actualTitle)  //print sub title of the filter page 
        assert.equal(testData.filterPageTitle, actualTitle, 'Title did not match')  //Assertion to match actual and expeted title
    });

    it("Verify the Filter Functionlity", function () { // Test case to verify the Filter functionality and validate the test result       
        filterPage.clickOnFilterOption();// click on Filter option on class Finder page
        browser.pause(5000);
        let resultData= testData.filterResults;
        
        for (var key in resultData) {
            var expectedCount = resultData[key];// getting the video expected count from filter data file and assigning it to expected Count
            console.log(expectedCount + "===============" + key)
            filterPage.clickOnDurationDropDown(key);// click on drop down button
            browser.pause(5000)
            filterPage.selectDuration(key);// selecting different duration from drop down
            browser.pause(5000)
            var actualCount = filterPage.durationVideoCount() // will get the  duration video count and assign it to actualcount
            var numberOfVideosDisplayed = filterPage.getNumberOfVideos(actualCount);// will count number of videos displayed
            console.log("this is the actual count" + " " + numberOfVideosDisplayed)
            assert.equal(expectedCount, actualCount, 'filter count does not match')
            assert.equal(expectedCount, numberOfVideosDisplayed, "Videos displayed does not match the count")
            filterPage.tapCrossIcon();// clicks on Cross icon for entering new search
        }
    });
})

