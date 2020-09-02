class ElementUtil{  //Class for genearal element utilities

    doClick(element)  //function to click on an element
    {
        element.waitForDisplayed()  //waiting for an element to get displayed
        element.click()  //click action on the passed element
    }

    doSetValue(element, value){  //function to set value in the passed element
        element.waitForDisplayed()  //waiting for an element to get displayed
       element.click();  //click action on the passed element
        while(!(element.getValue()==''))  //loop to check if the passed element has no text
        {
            console.log('field is not empty')  //to print the status of the element
            element.keys('Backspace')  //pressing backspace key to delete element
            element.keys('Delete')  //deleting the text present on the element
        }
        element.setValue(value)  //setting value in the passed element after clearing the old value
    }

    doGetText(element)  //function to get text of the passed element
    {
        element.waitForDisplayed()  //waiting for an element to get displayed
        return element.getText()  //get text of the passed element
    }

    doGetPageTitle(){  //function to get title of the current page
        return browser.getTitle()  //syntax to get title of the current page
    }

    doIsDisplayed(element){  //function to check whether the passed element is displayed or not.
        try {  //Try catch to handle the scenario if the dispalyed function throws false
            element.waitForDisplayed({ timeout:30000});  //syntax to wait for the passed element to be dispalyed
            element.isDisplayed();  //syntax to check if the passed element is dispalyed or not
            return true;  //return true if displayed method does not throw any error
        } catch (error) {  //catch method for the exception thrown by dipalyed function
            return false;  //return false if the dispayed method throws a error when they can't find the passed elemet on the page
        }
    }

    doGetAttribute(element, attributeName){ //function to get attribute of the element
        element.waitForDisplayed();
        return element.getAttribute(attributeName);
    }

    doGetUrl(){  //function to get url of the current
        return browser.getUrl();
    }

    doScrollIntoView(element){
        element.waitForDisplayed();
        element.scrollIntoView();
    }
}

module.exports = new ElementUtil()  //Object creation to export the above class