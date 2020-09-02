const elementUtil = require('../util/elementUtil')  //import Element utility class

class SignUpPage {
    get firstNameTextField() { return $("//input[@name='firstName' and @type='text']")}  //locator for first name
    get latNameTextField() { return $("//input[@name='lastName' and @type='text']")}   //locator for last name
    get emailTextField() { return $("//input[@name='email' and @type='text']")}   //locator for email
    get freeAccessTextField() { return $("//input[@name='freeAccessCode' and @type='text']")}   //locator for free access code
    get passwordField() { return $("//input[@name='password' and @type='Password']")}   //locator for password
    get pageHeader() { return $("h1.MuiTypography-root")}   //locator for page header 
    get pageSubheader() { return $("h6.MuiTypography-root")}   //locator for page sub header
    get signUpButton() { return $("//button[@type='submit']")}   //locator for sign up button
    get tcCheckbox() { return $("span.MuiButtonBase-root")}   //locator for terms and conditions check box
    get listofTextFields() { return $$("//input[@type='text']") }   //locator for text fields
  

    getPageHeaderText(){  //method to get the text of page header
        return elementUtil.doGetText(this.pageHeader);  
    }

    isSignUpPageOpen(){  //method to chcek if the sign up page is open or not
        return elementUtil.doIsDisplayed(this.pageHeader);
    }

    getPageSubheaderText(){  //method to get the subheader text
        return elementUtil.doGetText(this.pageSubheader);
    }

    enterFirstName(firstName){  //method to enter the first name
        elementUtil.doSetValue(this.firstNameTextField, firstName)
    }

    enterLastName(lastName){  //method to enter the last name
        elementUtil.doSetValue(this.latNameTextField, lastName)
    }

    enterEmail(email){  //method to enter email
        elementUtil.doSetValue(this.emailTextField, email)
    }

    enterPassword(password){  //method to enter password
        elementUtil.doSetValue(this.passwordField, password)
    }

    enterFreeAccessCode(freeAccessCode){  //method to enter access code
        elementUtil.doSetValue(this.freeAccessTextField, freeAccessCode)
    }

    clickSignUpButton(){  //method to click the sign up button
        elementUtil.doClick(this.signUpButton)
    }

    selectTCcheckbox(){  //method to select the terms and conditions check box
        elementUtil.doClick(this.tcCheckbox)
    }

    isSignUpButtonDisplayed(){  //method to check if sign up button is displayed or not
        return elementUtil.doIsDisplayed(this.signUpButton);
    }

    enterSignUpFields(firstName, lastName, email, freeAccessCode){  //method to enter all the sign up fields
        let i=0;
         this.listofTextFields.filter(element => {
            let nameOfTextField=element.getAttribute('name');
            switch (nameOfTextField) {
                case 'firstName':
                    this.enterFirstName(firstName)
                    break;
                case 'lastName':
                    this.enterLastName(lastName)
                    break;
                case 'email':
                        this.enterEmail(email)
                        break;
                case 'freeAccessCode':
                        this.enterFreeAccessCode(freeAccessCode)
                        i++;
                        break;
                default:
                    break;
            } 

            })
            return i;
        }

}

module.exports= new SignUpPage();  //export the sign up class