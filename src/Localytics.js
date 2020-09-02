import React from "react";
import { connect } from "react-redux";
import mapFancyNames from "./utils/ClassCategoryFancyNamesMapping";
import { SubscriberStatusConstants } from './utils/constants';
const config = require("./assets/config.json");


class Localytics extends React.Component {
    constructor(props) {
        super(props);
        this.state = { SessionActive: true };
    }
    customDimensions(position, dimension) {
        window.ll("setCustomDimension", position, dimension);
    }

    componentDidUpdate(prevProps) {

        if (
            (this.props.userDetail != null) &&
            (prevProps.userDetail != this.props.userDetail)
        ) {
            const userData = this.props.userDetail.applicationProfile;

            window.ll(
                "setCustomerEmail",
                `${userData.emailAddress}`
            );
            window.ll("setProfileAttribute", "First Name", `${userData.firstName}`, "app");
            window.ll("setProfileAttribute", "Last Name", `${userData.lastName}`, "app");

        }

        if ((prevProps.isAuthenticated !== this.props.isAuthenticated) && (this.props.isAuthenticated != null)) {
            //Setting Autheticated Custom Dimension to Localytics
            if (this.props.isAuthenticated) {

                window.ll("setCustomerId", localStorage.getItem("userId"));
                console.log("setting Authenticated status 1 ==>>" + new Date());
                window.ll('setCustomDimension', 1, '1');
                window.ll("setProfileAttribute", "Authenticated", "True", "app");

            } else {
                console.log("setting Authenticated status 0 ==>>" + new Date());
                window.ll('setCustomDimension', 1, '0');
                console.log("setting subscription status ==>> UNKNOWN" + new Date());
                window.ll('setCustomDimension', 2, 'UNKNOWN');
                window.ll("setProfileAttribute", "Authenticated", "False", "app");
                window.ll("setProfileAttribute", "Subscriber Status", "UNKNOWN", "app")
                //Deleting localytics customer id from Localstorage
                localStorage.setItem("_loc_ids", null);
                /**
                 * Nikhil Gupta 07th July 2020
                 * modify the local storage custom dimension value to initial for logout
                 * Reason: value stored in storage shd not be sent to localytics
                 */
                var customDimensionObj = JSON.parse(localStorage.getItem("_loc_cd"))
                localStorage.setItem("_loc_cd", (JSON.stringify([customDimensionObj[0], 0, 'UNKNOWN', 'UNKNOWN', new Date("0001").toDateString(),
                new Date("0001").toDateString(), 'UNKNOWN', 0, 'UNKNOWN'])))
            }
        }

        if (prevProps.PlayDuration !== this.props.PlayDuration) {
            if (this.props.ClassDetails !== null && (this.props.ClassDetails && this.props.ClassDetails.id)) {
                if (this.props.clubConnectClicked) {
                    window.ll("tagEvent", "Live Connect Class Performed", {
                        "Class ID": this.props.ClassDetails.id,
                        "Class Name": this.props.ClassDetails.title,
                        "Class Duration": this.ClassDurationTimeBand(
                            this.props.ClassDetails.duration
                        ),
                        "Play Duration": this.aroundTimeBand(this.props.PlayDuration),
                    });
                }
                else if (this.props.ClassDetails.id) {
                    window.ll("tagEvent", "On Demand Class Performed", {
                        "Class ID": this.props.ClassDetails.id,
                        "Class Name": this.props.ClassDetails.title,
                        "Class Duration": this.ClassDurationTimeBand(
                            this.props.ClassDetails.duration
                        ),
                        "Play Duration": this.aroundTimeBand(this.props.PlayDuration),
                        "Class Category": mapFancyNames(
                            this.props.ClassDetails.category != undefined ?
                                this.props.ClassDetails.category[0] :
                                this.props.ClassDetails.classCategory[0]
                        ),
                        "Provider ID": this.props.ClassDetails.newProviderId,
                        "Provider Name": this.props.ClassDetails.provider_id
                    });
                }

            }
        }

        if (prevProps.isClassStarted !== this.props.isClassStarted && (this.props.isClassStarted == true)) {
            if (this.props.ClassDetails !== null && (this.props.ClassDetails && this.props.ClassDetails.id)
            ) {
                if (this.props.clubConnectClicked) {
                    window.ll("tagEvent", "Live Connect Class Started", {
                        "Class ID": this.props.ClassDetails.id,
                        "Class Name": this.props.ClassDetails.title,
                        "Class Duration": this.ClassDurationTimeBand(
                            this.props.ClassDetails.duration
                        )
                    });
                }
                else if (this.props.ClassDetails.id) {
                    window.ll("tagEvent", "On Demand Class Started", {
                        "Class ID": this.props.ClassDetails.id,
                        "Class Name": this.props.ClassDetails.title,
                        "Class Duration": this.ClassDurationTimeBand(
                            this.props.ClassDetails.duration
                        ),
                        "Class Category": mapFancyNames(
                            this.props.ClassDetails.category != undefined ?
                                this.props.ClassDetails.category[0] :
                                this.props.ClassDetails.classCategory[0]
                        ),
                        "Provider ID": this.props.ClassDetails.newProviderId,
                        "Provider Name": this.props.ClassDetails.provider_id
                    });
                }

            }
        }
        /**
        * Nikhil Gupta
        * 29th June 2020
        * CF-8154
        * Capture Subscription related details 
        */
        if (prevProps.userSubscription !== this.props.userSubscription && (this.props.userSubscription !== null)) {
            if (prevProps.userSubscription == null ||
                prevProps.userSubscription.status !== this.props.userSubscription.status) {
                if (config.isThirdPartyEnabled) {
                    console.log("Subscription Type", "SSO");
                    window.ll("setProfileAttribute", "Subscription Type", "SSO", "app")
                    window.ll('setCustomDimension', 3, "SSO");

                    console.log("Subscription Start Date", new Date("0001"))
                    window.ll("setProfileAttribute", "Subscription Start Date", new Date("0001"), "app")
                    window.ll('setCustomDimension', 4, new Date("0001").toDateString());

                    console.log("Subscription End Date", new Date("0001"))
                    window.ll('setCustomDimension', 5, new Date("0001"));
                    window.ll("setProfileAttribute", "Subscription End Date", new Date("0001").toDateString(), "app")

                    console.log("Subscription Interval", "UNKNOWN")
                    window.ll("setProfileAttribute", "Subscription Interval", "UNKNOWN", "app")
                    window.ll('setCustomDimension', 6, "UNKNOWN");

                    console.log("Subscription Interval Count", 0)
                    window.ll("setProfileAttribute", "Subscription Interval Count", 0, "app")
                    window.ll('setCustomDimension', 7, 0);

                    console.log('Capture FreeAccessCode ==>>' + "UNKNOWN");
                    window.ll('setCustomDimension', 8, "UNKNOWN");
                    window.ll("setProfileAttribute", "Access Code", "UNKNOWN", "app")

                } else {
                    if (config.AccessCodeMandatory) {
                        console.log("Subscription Type", "FAC")
                        window.ll("setProfileAttribute", "Subscription Type", "FAC", "app")
                        window.ll('setCustomDimension', 3, "FAC");
                        if (this.props.userSubscription.discountCode) {
                            console.log('Capture FreeAccessCode ==>>' + this.props.userSubscription.discountCode);
                            window.ll('setCustomDimension', 8, this.props.userSubscription.discountCode);
                            window.ll("setProfileAttribute", "Access Code", this.props.userSubscription.discountCode, "app")

                        }
                        this.sendSubscriptionDataToLocalytics(this.props.userSubscription.status)
                    }
                    else if (this.props.userSubscription.status === "trialing" || this.props.userSubscription.trialPeriodStart) {
                        console.log("Subscription Type", "Trial")
                        window.ll("setProfileAttribute", "Subscription Type", "Trial", "app")
                        window.ll('setCustomDimension', 3, "Trial");

                        console.log('Capture FreeAccessCode ==>>' + "UNKNOWN");
                        window.ll('setCustomDimension', 8, "UNKNOWN");
                        window.ll("setProfileAttribute", "Access Code", "UNKNOWN", "app")

                        this.sendSubscriptionDataToLocalytics(this.props.userSubscription.status)
                    }
                    else {

                        console.log("Subscription Type", "Paid")
                        window.ll("setProfileAttribute", "Subscription Type", "Paid", "app")
                        window.ll('setCustomDimension', 3, "Paid");

                        console.log('Capture FreeAccessCode ==>>' + "UNKNOWN");
                        window.ll('setCustomDimension', 8, "UNKNOWN");
                        window.ll("setProfileAttribute", "Access Code", "UNKNOWN", "app")

                        this.sendSubscriptionDataToLocalytics(this.props.userSubscription.status)
                    }
                }
            }
        }
        if (this.props.subscriptionStatus != null && (prevProps.subscriptionStatus !== this.props.subscriptionStatus)) {

            /** 
             * SubscriberStatusConstants 
             *   INACTIVE: 0
             *   ACTIVE: 1
             *   UNKNOWN: 2
             */
            if (this.props.subscriptionStatus == SubscriberStatusConstants.INACTIVE) {
                console.log("setting subscription status INACTIVE ==>>" + new Date());
                window.ll('setCustomDimension', 2, 'INACTIVE');
                window.ll("setProfileAttribute", "Subscriber Status", "INACTIVE", "app")
            } else if (this.props.subscriptionStatus == SubscriberStatusConstants.ACTIVE) {

                console.log("setting subscription status ACTIVE ==>>" + new Date());
                window.ll('setCustomDimension', 2, 'ACTIVE');
                window.ll("setProfileAttribute", "Subscriber Status", "ACTIVE", "app")
            } else {
                console.log("setting subscription status ==>> UNKNOWN" + new Date());
                window.ll('setCustomDimension', 2, 'UNKNOWN');
                window.ll("setProfileAttribute", "Subscriber Status", "UNKNOWN", "app")
            }
            //Sending User Login Event to Localytics
            console.log('Sending login event with delay ==>>' + new Date());
            var userId = localStorage.getItem("userId");
            var token = localStorage.getItem("token");
            if (prevProps.subscriptionStatus == null && (userId !== null && token !== null)) {

                window.ll("tagEvent", "User Login", {
                    "Client ID": localStorage.getItem("clientId"),
                    "User ID": userId
                });


            }
        }
    }

    sendSubscriptionDataToLocalytics = (userSubscriptionStatus) => {

        console.log("Subscription Start Date", new Date(this.props.userSubscription.currentPeriodStart))
        if (this.props.userSubscription.currentPeriodStart) {
            window.ll("setProfileAttribute", "Subscription Start Date", new Date(this.props.userSubscription.currentPeriodStart), "app")
            window.ll('setCustomDimension', 4, this.props.userSubscription.currentPeriodStart);

        }

        if (userSubscriptionStatus === "canceled") {
            console.log("Subscription End Date", new Date(this.props.userSubscription.subscriptionEndDate))
            if (this.props.userSubscription.subscriptionEndDate) {
                window.ll('setCustomDimension', 5, this.props.userSubscription.subscriptionEndDate);
                window.ll("setProfileAttribute", "Subscription End Date", new Date(this.props.userSubscription.subscriptionEndDate), "app")
            }
        } else {
            if (config.AccessCodeMandatory) {
                if (this.props.userSubscription.facCodeEndDate) {
                    console.log("Subscription End Date", new Date(this.props.userSubscription.facCodeEndDate))
                    window.ll('setCustomDimension', 5, this.props.userSubscription.facCodeEndDate);
                    window.ll("setProfileAttribute", "Subscription End Date", new Date(this.props.userSubscription.facCodeEndDate), "app")
                }
                else {
                    console.log("Subscription End Date", new Date("2200"))
                    window.ll('setCustomDimension', 5, new Date("2200").toDateString());
                    window.ll("setProfileAttribute", "Subscription End Date", new Date("2200"), "app")
                }
            } else {
                console.log("Subscription End Date", new Date(this.props.userSubscription.currentPeriodEnd))
                if (this.props.userSubscription.currentPeriodEnd) {
                    window.ll('setCustomDimension', 5, this.props.userSubscription.currentPeriodEnd);
                    window.ll("setProfileAttribute", "Subscription End Date", new Date(this.props.userSubscription.currentPeriodEnd), "app")
                }
            }
        }

        //signUp
        if (this.props.subscriptionProduct.length > 0) {
            var planObj = this.props.subscriptionProduct[0].plans.find(
                (plan) => this.props.userSubscription.planTag === plan.tag)
            console.log("Subscription Interval", planObj.interval)
            if (planObj.interval) {
                window.ll("setProfileAttribute", "Subscription Interval", planObj.interval, "app")
                window.ll('setCustomDimension', 6, planObj.interval);
            }

            console.log("Subscription Interval Count", planObj.intervalCount)
            if (planObj.intervalCount) {
                window.ll("setProfileAttribute", "Subscription Interval Count", planObj.intervalCount, "app")
                window.ll('setCustomDimension', 7, planObj.intervalCount);
            }

        }
        //login
        else {
            console.log("Subscription Interval", this.props.userSubscription.interval)
            if (this.props.userSubscription.interval) {
                window.ll("setProfileAttribute", "Subscription Interval", this.props.userSubscription.interval, "app")
                window.ll('setCustomDimension', 6, this.props.userSubscription.interval);
            }
            console.log("Subscription Interval Count", this.props.userSubscription.intervalCount)
            if (this.props.userSubscription.intervalCount) {
                window.ll("setProfileAttribute", "Subscription Interval Count", this.props.userSubscription.intervalCount, "app")
                window.ll('setCustomDimension', 7, this.props.userSubscription.intervalCount);
            }

        }
    }
    ClassDurationTimeBand = min => {
        if (min <= 60) {
            //let min = sec / 60;
            if (min === 0) {
                return "0-1"
            }
            let nearestInt = Math.ceil(min / 10);

            let maxValue = nearestInt * 10;

            return `${maxValue === 10 ? 0 : maxValue - 9}-${maxValue}`;
        } else if (min > 60) {
            return "61+";
        }
    };
    aroundTimeBand = sec => {
        if (sec <= 60) {
            return "0-1";
        } else if (sec > 60 && sec <= 300) {
            return "1-5";
        } else if (sec > 300 && sec <= 600) {
            return "6-10";
        } else if (sec > 600 && sec <= 3660) {
            let min = sec / 60;
            let nearestInt = Math.ceil(min / 10);

            let maxValue = nearestInt * 10;

            return `${maxValue - 9}-${maxValue}`;
        } else if (sec > 3660) {
            return "61+";
        }
    };
    componentWillUnmount() {
        this.setState({ SessionActive: false });
    }
    componentDidMount() {
        // document.cookie = 'jwt=; domain=.localytics.com; Path=/;expires=' + new Date(0).toUTCString();
        // document.cookie = '_biz_sid=; domain=.localytics.com; Path=/;';
        // document.cookie = 'ei_client_id=; domain=.localytics.com; Path=/;';

        let localyticsInitSet;
        if (localStorage.getItem("userId") !== null &&
            localStorage.getItem("token") !== null) {
            //If user is logged in se customer id in init method else only CDs
            localyticsInitSet = {
                customDimensions: [localStorage.getItem("clientId")],
                customerId: localStorage.getItem("userId"),
            }
        } else {
            localyticsInitSet = {
                customDimensions: [localStorage.getItem("clientId"), '0', 'UNKNOWN'],
                customerId: '',

            }
            localStorage.setItem("_loc_ids", null);
        }
        //--------------------------------------------------Localytics INIt--------------------

        + function (l, y, t, i, c, s) {
            l['LocalyticsGlobal'] = i;
            l[i] = function () {
                (l[i].q = l[i].q || []).push(arguments)
            };
            l[i].t = +new Date;
            (s = y.createElement(t)).type = 'text/javascript';
            s.src = '//web.localytics.com/v3/localytics.min.js';
            (c = y.getElementsByTagName(t)[0]).parentNode.insertBefore(s, c);
            window.ll('init', process.env.REACT_APP_LOCALYTICS_APP_ID, {
                ...localyticsInitSet,
                sessionTimeout: parseInt(process.env.REACT_APP_LOCALYTICS_TIMEOUT)
            });
        }(window, document, 'script', 'll');

    }
    render() {
        return <React.Fragment > {this.props.children} </React.Fragment>;
    }
}
const mapStateToProps = state => {
    return {
        userSubscription: state.subscription.userSubscripton,
        subscriptionProduct: state.subscription.subscriptionProduct,
        isAuthenticated: state.auth.isAuthenticated,
        userDetail: state.auth.userDetail,
        ClassDetails: state.workout.ClassDetails,
        PlayDuration: state.onDemand.PlayDuration,
        subscriptionStatus: state.subscription.subscriptionStatus,
        isClassStarted: state.onDemand.isClassStarted,
        clubConnectClicked: state.workout.clubConnectClicked
    };
};
export default connect(
    mapStateToProps,
    null
)(Localytics);

