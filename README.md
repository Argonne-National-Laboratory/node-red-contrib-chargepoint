node-red-contrib-chargepoint
========================

[![NPM](https://nodei.co/npm/node-red-contrib-chargepoint.png)](https://nodei.co/npm/node-red-contrib-chargepoint/)

[Node-Red][4] nodes for communicating with the EVSP [ChargePoint][1] allowing monitoring of Chargepoint EVSE and load control.  

Based on the [ChargePoint 4.1 API][2] utilizing the [4.1 WSDL][3].

#Install

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-chargepoint


#Requirements

To access the ChargePoint Web Services API via these nodes, you will require a License Key, Password and a ChargePoint account with one of the service plans described in Section 1.1 of the [ChargePoint API Guide][2].

To find your API License Key and API Password, follow these steps:
1.Log into ChargePoint with either a Network Manager or API user account
2.Click the Organizations tab, and then click the API Info sub-tab
3.Find your API License Key in the table
4.Mouse over your API License Key, and select Generate Password from the pop-up menu
5.Save the API License Key and API Password values for making calls to the ChargePoint Web Services API

A Service Provider Plan is necessary to utilize the Demand Management nodes.

#Author

[Jason D. Harper][5] 


[1]:http://www.chargepoint.com/
[2]:https://na.chargepoint.com/UI/downloads/en/ChargePoint_Web_Services_API_Guide_Ver4.1_Rev4.pdf
[3]:https://webservices.chargepoint.com/cp_api_4.1.wsdl
[4]:http://nodered.org
[5]:https://github.com/jayharper


