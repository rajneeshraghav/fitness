const loginPage = require("../pages/LoginPage");  //import login Page
const getTestData = require("../tenant/fetchTenantData");
let webPlayerInTest;
let testData; 

describe("Login Test Cases", function () {     //Login TestCases

    console.log(loginPage);

    it("Verify the login URL and title", function () {   //function to launch login browser
        browser.url('/signin');  //navigate to Sign In Url
        browser.maximizeWindow();

        //RR// Change below logic, Tenant info will used from ENVs
        //webPlayerInTest = (((browser.getUrl()).split("-"))[0]).split("//")[1];  //getting the tenant info from the url 
        //testData = getTestData.getTestData(webPlayerInTest); 

         testData = getTestData.getTestData();

        const actualTitle = loginPage.getPageTitle()  //get title of the lagin page in a variable
        console.log("title of login page is " + actualTitle)  //print title of the login page 
        assert.equal(testData.expectedLoginTitle, actualTitle, 'Title did not match')  //Assertion to match actual and expeted title
        const actualSubTitle = loginPage.getPageSubTitle()  //get sub title of the lagin page in a variable
        console.log("Sub title of login page is " + actualSubTitle)  //print sub title of the login page 
        assert.equal(testData.expectedLoginSubTitle, actualSubTitle, 'Title did not match')  //Assertion to match actual and expeted sub title
    });

    it("Verify the validations on email and password field", function () {  //Function to check validation on email and password field
        loginPage.enterEmail(testData.invalidEmail);  //enter invalid email in email text field
        console.log("Email validation on incorrect format is " + loginPage.isEmailValidationMessageDisplayed())  //print the status of email field validation message
        assert.isTrue(loginPage.isEmailValidationMessageDisplayed(), 'Validation message does not occur on entering incorrect email')  //Assertion to match the actual status with expected

        loginPage.doLoginValidations(testData.nonRegisteredEmail, testData.loginPassword)  //Login with invalid email and password
        assert.equal(testData.expectedLoginErrorMessage, loginPage.getErrorMessageText(), 'the error message text did not match on entering non registered email')  //Assertion to match the error message

        loginPage.doLoginValidations(testData.loginEmail, testData.invalidPassword)  //Login with valid email and incorrect password
        assert.equal(testData.expectedLoginErrorMessage, loginPage.getErrorMessageText(), 'the error message text did not match on entering incorrect password')  //Assertion to match the error message

    })

    it("Verify the positive Login Flow", function () {  //Function to check that user gets successfully login
        loginPage.doLoginValidations(testData.loginEmail, testData.loginPassword);
        assert.isFalse(loginPage.isLoginButtonDisplayed(), 'Login button is still displayed on login')  //Assertion to check that login button got removed after successful login         
    })

})