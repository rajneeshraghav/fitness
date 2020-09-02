// const gllData = require('./gllData')  //import gll test data
// const sphcData = require('./sphcData')  //import gll test data
// const wexerDemoData = require('./wexerDemoData')  //import gll test data


class FetchTenantData {  //home page class 

    getTestData() {
        let tenantData = require(`../tenant/${process.env.ENV}/${process.env.TENANT_NAME}.json`);
        return tenantData;
    }



    // getTestData(webPlayerInTest) {  //method to click on home option
    //     let testData;

    //     switch (webPlayerInTest) {  //switch case to get the expected header as per the tenant
    //         case 'gll':  //switch case if tenant is gll
    //             testData = gllData;
    //             return testData;

    //         case 'sphc':  //switch case if tenant is sphc
    //             testData = sphcData;
    //             return testData;

    //         case 'wexer':  //switch case if tenant is wexer
    //             testData = wexerDemoData;
    //             return testData;

    //         default:  //switch case when correct tenant is not found
    //             testData = null;
    //             return testData;
    //     }
    // }
}

module.exports = new FetchTenantData();  //export the home page class