const elementUtil = require('../util/elementUtil')  //import Element utility class

class LoginPage{  //LoginPage Class start

    get emailTextField(){ return $("//input[@name='email' and @type='text']")}  //EmailFieldLocator
    get passwordTextField() { return $("//input[@name='password' and @type='Password']") }  //PasswordField Locator
    get loginButton() { return $("//button[@type='submit']") }  //Login Button Locator
    get loginTitle(){ return $('h1.MuiTypography-root')}  //Login Title Locator
    get loginSubTitle(){ return $('h6.MuiTypography-root')}  //Login SubTitle Locator
    get errorMessage(){ return $('span.errorMessage')}  //Validation Error Message
    get emailValidationMessage(){ return $('span.MuiTypography-root')} //Email Validation text

  

    getPageTitle(){  //function to get title of the login page
        return elementUtil.doGetText(this.loginTitle) //returns text of the title
    }

    getPageSubTitle(){  //function to get sub title of the login page
        return elementUtil.doGetText(this.loginSubTitle) //returns text of the sub title
    }

    enterEmail(email)
    {
        elementUtil.doSetValue(this.emailTextField, email)
    }

    enterPassword(password){
        elementUtil.doSetValue(this.passwordTextField, password)
    }

      
    doLoginValidations(email, password){
        this.enterEmail(email) 
        this.enterPassword(password)
        elementUtil.doClick(this.loginButton)
    }

    getErrorMessageText(){
      return  elementUtil.doGetText(this.errorMessage) 
    }

    isEmailValidationMessageDisplayed()
    {
        return elementUtil.doIsDisplayed(this.emailValidationMessage)
    }

    isLoginButtonDisplayed()
    {
        return elementUtil.doIsDisplayed(this.loginButton)
    }
    

    
}
module.exports= new LoginPage();