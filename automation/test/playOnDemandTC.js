const homePage = require('../pages/homePage');  //import home page
const loginPage = require("../pages/loginPage");  //import login Page
const videoPage = require("../pages/videoPage");  //import video Data 
const videoCollectionPage = require("../pages/videoCollectionPage");  //import video collection page
const { assert } = require('chai');  //import chai assertion


const getTestData = require("../tenant/fetchTenantData");
let testData;
 
 //RR// Change below logic, Tenant info will used from ENVs
 let webPlayerInTest = process.env.TENANT_NAME;  //variable to  get the tenant in test
describe("Play on Demand Class Test Cases", function () {  //test suite for play on demand videos

    it("Check the url of all the videos displayed on home page", function () {  //test case to check all the urls of video on home page
        browser.url('/signin');  //open the sign in page
        browser.maximizeWindow();  //method to maximize the video
        browser.setTimeout({ 'pageLoad': 30000 })

        //RR// Change below logic, Tenant info will used from ENVs
        //webPlayerInTest = (((browser.getUrl()).split("-"))[0]).split("//")[1];  //getting the tenant info from the url 
        //testData = getTestData.getTestData(webPlayerInTest); 

        testData = getTestData.getTestData();

        loginPage.doLoginValidations(testData.loginEmail, testData.loginPassword);
        browser.setTimeout({ 'pageLoad': 20000 })
        homePage.waitforHomePageToBeDisplayed();  //method to wait for home page to be displayed
        //homePage.waitForVideosToBeDisplayed();  //method to wait for videos to be displayed
        browser.pause(6000);  //method to pause the browser for 5 seconds

        let numberOfVideos = homePage.getNumberOfVideos();  //method to get total number of videos displayed on home page
        console.log("Total number of videos on Home Page is " + numberOfVideos);  //print nnumber of videos on console
        // const videos = homePage.videos.map(element => element)  
        var videoCode = new Array();  //initializing array to store video codes
        let subscriptionRequired = 0;  //initializing count for videos which need subscription
        let numberOfBrokenVideo = 0;  //intializing count for broken videos
        var brokenVideoCodeArray = new Array();  //initializing array to store broken video codes
        //let demo=0;
        homePage.videos.forEach(video => {  // for each loop
            if (subscriptionRequired === 0) {  //check for subscription 
                browser.setTimeout({ 'pageLoad': 20000 })
                homePage.waitForVideosToBeDisplayed();  //wait for videos to be displayed on home page
                homePage.clickVideo(video);  //method to click on video
                videoCode.push(browser.getUrl().split('classes/')[1])  //adding the code of the video checked
                let bvalue = videoPage.isVideoDisplayed(); //variable to check if video is displayed or not
                console.log("========is video displayed=========" + bvalue);  //console print of video displayed variable
                if (bvalue) {  // if video is displayed
                   // demo++;
                    browser.pause(2000);  //explicit pause to ensure that video gets load
                    videoPage.clickPlayButton();  //method to click on play button
                    browser.pause(1000);  //explicit wait to check if video is playing or not
                    try {  //try catch to handle if some error message gets displayed on the video
                        assert.isFalse(videoPage.isErrrorDisplayed(), "Error message came while playing this video having id " + browser.getUrl().split('classes/')[1]);  //assertion to check if some error is dispalyed 
                    } catch (error) {  //catch method to handle the assertion fail
                        numberOfBrokenVideo++;  //increasing the count of broken video
                        brokenVideoCodeArray.push(browser.getUrl().split('classes/')[1])  //storing the broken video code in an array
                    }
                }
                else {  //condition if video is not displayed
                    subscriptionRequired++; //increasing the counter if video requires subscription
                    assert.isTrue(videoPage.isSubscriptionOverMessageDisplayed(webPlayerInTest), "No Subscription Message nor video is diplayed")  //assertion to check if subscription message is displayed
                }
                homePage.clickHome();  // method to click home option
                homePage.waitforHomePageToBeDisplayed();  //method to wait for home page to be dispalyed
                //browser.pause(3000);  //explicit pause to wait for page to be load
            }
        })
        assert.isFalse(subscriptionRequired > 0, "Subscription of user expired. Hence could not check url");  //assertion to check if subscription is required
        assert.isFalse(numberOfBrokenVideo > 0, "There are some broken video links. Their ids are " + brokenVideoCodeArray);  //assertion to check broken videos count
    })

    it("Check the url of all the videos displayed on click of view all", function () {  //test case to check url of all the videos
        let viewAllClickedCounter = 0;  //counter to chcek how many view button have been clicked
        let videosCheckedCounter = 0;  //counter to track the number of videos checked
        let subscriptionRequired = 0;  //variable to check if subscription is required
        let numberOfBrokenVideo = 0;  //counter to check number of broken videos
        var brokenVideoCodeArray = new Array();  //array to store the broken video code
        browser.setTimeout({ 'pageLoad': 20000 })
        browser.pause(5000);  //explicit wait to load all the sections of home page
        homePage.viewAll.forEach(view => {  //for each method to perform action on all view all button
            if (subscriptionRequired === 0) {  //condition if subscripton required is false
                browser.setTimeout({ 'pageLoad': 10000 })
                browser.pause(5000);   //explicit wait to load the view all button 
                homePage.clickViewAllButton(view);  //method to click the view all button
                videoCollectionPage.waitForVideosToBeDisplayed();  //method to wait for all videos to be dispalyed
                var videoCode = new Array(); //array to store the video code
                homePage.videos.forEach(video => {  //for each method to perform action on all videos
                    if (subscriptionRequired === 0) {  //condition if subscripton required is false
                        videoCollectionPage.clickVideo(video);  //method to click video
                        videoCode.push(browser.getUrl().split('classes/')[1])  //adding the code of the video checked
                        let bvalue = videoPage.isVideoDisplayed();//variable to check if video is displayed or not
                        console.log("========Is video displayed=========" + bvalue);  //console print of video displayed variable
                        if (bvalue) {  // if video is displayed
                            browser.pause(2000);  //explicit pause to ensure that video gets load
                            videoPage.clickPlayButton();  //method to click on play button
                            browser.pause(2000);  //explicit wait to check if video is playing or not
                            try {  //try catch to handle if some error message gets displayed on the video
                                assert.isFalse(videoPage.isErrrorDisplayed(), "Error message came while playing this video having id " + browser.getUrl().split('classes/')[1]);  //assertion to check if some error is dispalyed 
                            } catch (error) {  //catch method to handle the assertion fail
                                numberOfBrokenVideo++;  //increasing the count of broken video
                                brokenVideoCodeArray.push(browser.getUrl().split('classes/')[1])  //storing the broken video code in an array
                            }
                        }
                        else {  //condition if video is not displayed
                            subscriptionRequired++;  //increasing the counter if video requires subscription
                            assert.isTrue(videoPage.isSubscriptionOverMessageDisplayed(webPlayerInTest), "No Subscription Message nor video is diplayed")  //assertion to check if subscription message is displayed
                        }
                        browser.back();  //method to navigate back on browser
                        videoCollectionPage.waitForVideosToBeDisplayed();  //method to wait for videos to be displayed
                        videosCheckedCounter++;  //increasing the counter for videos checked
                    }
                })
                videoCollectionPage.clickHome();  //method to click home
                homePage.waitforHomePageToBeDisplayed();  //method to wait for home page to be displayed
                viewAllClickedCounter++;  //increasing the counter for view all option clicked
            }
        })
        console.log("number of view all clicked=============" + viewAllClickedCounter);  //console print for number of view all clicked
        console.log("number of videos checked=================" + videosCheckedCounter);  //console print for all the videos checked
        assert.isFalse(subscriptionRequired > 0, "Subscription of user expired. Hence could not check url");  //assertion to check if subscription is required
        assert.isFalse(numberOfBrokenVideo > 0, "There are some broken video links. Their ids are " + brokenVideoCodeArray);  //assertion to check broken videos count
    })
})
