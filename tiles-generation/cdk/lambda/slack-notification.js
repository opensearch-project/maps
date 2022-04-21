/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Lambda function for tiles generation ECS task state change slack notification.
 */

const eventProcess = require("./event-process");
const https = require('https');

const executePostRequest = (event) => {
    
    const eventText = JSON.stringify(event, null, 2);
    
    console.log(`\n${eventText}`);

    let slackHookPath;
    
    try {
        slackHookPath = process.env.slackHookPath;
    } catch (error){
        console.error(error, 'Caught error for slackHookPath');
    }
    
    return new Promise((resolve, reject) => {
        const options = {
            host: 'hooks.slack.com',
            path: slackHookPath,
            method: 'POST'
        };
        const req = https.request(options, (res) => {
            resolve(JSON.stringify(res.statusCode));
        });
        req.on('error', (e) => {
            reject(e.message);
        });
    
        const stateInfo = eventProcess.getStateInformation(event);
        
        const message = {
            "Content": `${stateInfo}\n-------------------------------------`
        };
    
        req.write(JSON.stringify(message));
        
        req.end();
    });
};

exports.handler = async (event) => {
  await executePostRequest(event)
    .then(result => console.log(`Status code: ${result}`))
    .catch(e => console.error(`Error execute the request: ${JSON.stringify(event)} => ${e}`));
};