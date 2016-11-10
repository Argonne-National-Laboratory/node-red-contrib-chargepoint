/**
 * Copyright 2015 Argonne National Laboratory.
 *
 * Licensed under the BSD 3-Clause License (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {        
    var settings = RED.settings;
    var soap     = require('soap');    
    var url = "https://webservices.chargepoint.com/cp_api_4.1.wsdl"; // URL for ChargePoint wsdl     

    function getLoad(n) {
        RED.nodes.createNode(this,n);        
	var node = this;
	this.name = n.name;	
	var chargepoint_username = node.credentials.username;
    var chargepoint_password = node.credentials.password;
    var options = {"hasTimeStamp": false};
	var cpsgID = n.sgID;  //required
	var cpstationID = n.stationID;  //optional
	if (cpstationID){      	 	
          var getLoad_args = { sgID: parseInt(cpsgID), stationID: cpstationID };	
	}
	else{
	  var getLoad_args = { sgID: parseInt(cpsgID) }; 
        } 
	
        node.on("input", function(msg) {
	    var outmsg = {
                topic: msg.topic
            };	
    	    
            soap.createClient(url, function(err, client) {                                
             
                if (client)
                {
		    client.setSecurity(new soap.WSSecurity(chargepoint_username,chargepoint_password,options));
		    node.status({fill:"yellow",shape:"dot",text:"Polling"});		
                    client.chargepointservices.chargepointservicesSOAP.getLoad(getLoad_args, function(err, result, raw, soapHeader)
			{	
			  if(err) {
			  node.status({fill:"red",shape:"dot",text:"Error"});			  
			  node.error('ChargePoint ' + err);			  
			  }
			  else if(result)
			  {			  
			   node.status({fill:"grey",shape:"dot",text:"Finished"});
			   if(result.responseCode != "100"){
			   node.warn(result);
			   }
			   else {
			   outmsg.payload = result;
			   node.send(outmsg);
			   }
			  }			  
			});                    
                }              
            });
        });
    }

    RED.nodes.registerType("getLoad",getLoad,{
        credentials: {
            username: {type:"text"},
            password: {type: "password"}
        }
    });


function shedLoad(n) {
        RED.nodes.createNode(this,n);        
	var node = this;
	this.name = n.name;	
	var chargepoint_username = node.credentials.username;
    var chargepoint_password = node.credentials.password;
    var options = {"hasTimeStamp": false};
	/****sgData****/
	var cpsgID = n.sgID;   //required
	var cpstationID = n.stationID; //optional 
	/****sgLoadData****/
	var cpallowedLoad = n.allowedLoad //optional	
	var cppercentShed = n.percentShed //optional	
	var cptimeInterval = n.timeInterval //optional
	/*********************Input Format*******************************
	{ sgData: { sgID: 'xsd:int', stationID: 'xsd:string' },
     	sgLoadData: { allowedLoad: 'xsd:double', percentShed: 'xsd:int' },
     	timeInterval: 'xsd:int' }
	****************************************************************/

        node.on("input", function(msg) {
	    var outmsg = {
                topic: msg.topic
            	};
			
		if (!cpallowedLoad &&  msg.allowedLoad){ //default to property input but if no input look for passed in allowedLoad
		cpallowedLoad = msg.allowedLoad;		
		}
		if (!cppercentShed && msg.percentShed){ //default to property input but if no input look for passed in percentShed
		cppercentShed = msg.percentShed;		
		}

		var shedLoad_args = {sgData: {sgID: parseInt(cpsgID)}}; 
		  shedLoad_args['sgData']['stationID'] = cpstationID;	
		if (cpallowedLoad){	
		  shedLoad_args['sgLoadData'] = {allowedLoad: parseFloat(cpallowedLoad)};
		}
		else {
		  shedLoad_args['sgLoadData'] = {percentShed: parseFloat(cppercentShed)};
		}
		shedLoad_args['timeInterval'] = parseInt(cptimeInterval);		

            soap.createClient(url, function(err, client) {                                
             
                if (client)
                {
		    client.setSecurity(new soap.WSSecurity(chargepoint_username,chargepoint_password,options));
		    node.status({fill:"yellow",shape:"dot",text:"Polling"});		
                    client.chargepointservices.chargepointservicesSOAP.shedLoad(shedLoad_args, function(err, result, raw, soapHeader)
			{	
			  if(err) {
			  node.status({fill:"red",shape:"dot",text:"Error"});			  
			  node.error('ChargePoint ' + err);			  
			  }
			  else if(result)
			  {			
			   node.status({fill:"grey",shape:"dot",text:"Finished"});
			   if(result.responseCode != "100"){
			   node.warn(result);
			   }
			   else {
			   outmsg.payload = result;
			   node.send(outmsg);			   
			   }
			  }			  
			});                   
                }              
            });
        });
    }

    RED.nodes.registerType("shedLoad",shedLoad,{
        credentials: {
            username: {type:"text"},
            password: {type: "password"}
        }
    });


	function clearShedState(n) {
        RED.nodes.createNode(this,n);        
	var node = this;
	this.name = n.name;	
	var chargepoint_username = node.credentials.username;
    var chargepoint_password = node.credentials.password;
    var options = {"hasTimeStamp": false};
	var cpsgID = n.sgID;  //required
	var cpstationID = n.stationID;  //optional
	if (cpstationID){      	 	
          var clearShedState_args = { sgID: parseInt(cpsgID), stationID: cpstationID };	
	}
	else{
	  var clearShedState_args = { sgID: parseInt(cpsgID) }; 
        } 
	
        node.on("input", function(msg) {
	    var outmsg = {
                topic: msg.topic
            };	
    	    
            soap.createClient(url, function(err, client) {                                
             
                if (client)
                {
		    client.setSecurity(new soap.WSSecurity(chargepoint_username,chargepoint_password,options));
		    node.status({fill:"yellow",shape:"dot",text:"Requesting"});		
                    client.chargepointservices.chargepointservicesSOAP.clearShedState(clearShedState_args, function(err, result, raw, soapHeader)
			{	
			  if(err) {
			  node.status({fill:"red",shape:"dot",text:"Error"});			  
			  node.error('ChargePoint ' + err);			  
			  }
			  else if(result)
			  {		  
			   node.status({fill:"grey",shape:"dot",text:"Finished"});
			   if(result.responseCode != "100"){
			   node.warn(result);
			   }
			   else {
			   outmsg.payload = result;
			   node.send(outmsg);
			   }
			  }			  
			});                    
                }              
            });
        });
    }

    RED.nodes.registerType("clearShedState",clearShedState,{
        credentials: {
            username: {type:"text"},
            password: {type: "password"}
        }
    });

	function getStations(n) {
        RED.nodes.createNode(this,n);        
	var node = this;
	this.name = n.name;	
	var chargepoint_username = node.credentials.username;
    var chargepoint_password = node.credentials.password;
    var options = {"hasTimeStamp": false};	
	var cpstationID = n.stationID;  //optional
	var getStations_args = {};
	if (cpstationID){	    	 	
          getStations_args['searchQuery'] = { stationID: cpstationID };
	}	
	
	
        node.on("input", function(msg) {
	    var outmsg = {
                topic: msg.topic
            };	
    	    
            soap.createClient(url, function(err, client) {                                
             
                if (client)
                {
		    client.setSecurity(new soap.WSSecurity(chargepoint_username,chargepoint_password,options));
		    node.status({fill:"yellow",shape:"dot",text:"Requesting"});
                    client.chargepointservices.chargepointservicesSOAP.getStations(getStations_args, function(err, result, raw, soapHeader)
			{	
			  if(err) {
			  node.status({fill:"red",shape:"dot",text:"Error"});
			  node.error('ChargePoint ' + err);			  
			  }
			  else if(result)
			  {			  
			   node.status({fill:"grey",shape:"dot",text:"Finished"});
			   if(result.responseCode != "100"){
			   node.warn(result);
			   }
			   else {
			   outmsg.payload = result;
			   node.send(outmsg);
			   }
			  }			  
			});               
                }              
            });
        });
    }

    RED.nodes.registerType("getStations",getStations,{
        credentials: {
            username: {type:"text"},
            password: {type: "password"}
        }
    });

}
