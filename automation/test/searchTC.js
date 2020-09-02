const loginPage = require("../pages/LoginPage");
const homePage = require("../pages/homePage");
const searchPage = require("../pages/searchPage");
const { assert } = require("chai");
const getTestData = require("../tenant/fetchTenantData");
let testData;
//let webPlayerInTest;  //variable to detect current webplayer tenant

describe("Search Test cases", function () {     //search TestCases

    it("Verify the Search URL and title", function () {   //function to launch search browser
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
        const actualTitle = searchPage.getSearchTitle()  //get sub title of the search page in a variable
        console.log(" title of search page is " + " " + actualTitle)  //print sub title of the login page 
        assert.equal(testData.expectedSearchTitle, actualTitle, 'Title did not match')  //Assertion to match actual and expeted title
    })

    it("Verify the Search Functionlity", function () { // Test case to verify the search functionality and validate the test result       
        searchPage.tapOnSearchOPtion();// click on Search option on class Finder page
        browser.pause(5000); 
        let resultData=testData.searchResult;
        // webPlayerInTest = (((browser.getUrl()).split("-"))[0]).split("//")[1];  //getting the tenant info from the url
        // switch(webPlayerInTest){  //switch case to get the expected header as per the tenant
        //     case 'gll':  //switch case if tenant is gll
        //         resultData=searchData.gllSearch;
        //        break;

        //     case 'sphc':  //switch case if tenant is sphc
        //     resultData=searchData.sphcSearch;
        //     break;

        //     case 'wexer':  //switch case if tenant is wexer
        //     resultData=searchData.wexerSearch;
        //         break;

        //     default:  //switch case when correct tenant is not found
        //          resultData= null;  //assigning the expected subheader to null
        //          assert.isTrue(false,"Tenant information not specified")
        //         break;
        // }  

        for (var key in resultData) {
            var expectedCount = resultData[key];
            console.log(expectedCount+"==============="+key)
            searchPage.enterSearchText(key)
            searchPage.tapOnSearchBtn() // click on search button
            browser.pause(5000)
            var actualCount = searchPage.getVideoCount() // will get the video count and assign it to actualcount
            var numberOfVideosDisplayed=searchPage.getNumberOfVideos(actualCount);
            console.log("this is the actual count" + " " + numberOfVideosDisplayed)
            assert.equal(expectedCount, actualCount, 'Search count does not match')
            assert.equal(expectedCount,numberOfVideosDisplayed,"Videos displayed does not match the count")
            searchPage.tapCrossIcon();// clicks on Cross icon for entering new search
        }
    })
})

