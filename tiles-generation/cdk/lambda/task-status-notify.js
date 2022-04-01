/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Lambda function code for tiles generation ECS task change notification.
 */

const AWS = require("aws-sdk");

exports.handler = function(event, context, callback) {
    const sns = new AWS.SNS();
    
    const eventText = JSON.stringify(event, null, 2);
    console.log(eventText);

    let topicArn;
    try {
        topicArn = process.env.topicArn;
    } catch (error){
        console.error(error, 'Caught error for topicArn');
    }

    let container;
    try {
        container = event.detail.containers[0];
    } catch (error){
        console.error(error, "Caught error for container");
    }
    
    let subject;
    
    if (container === undefined) {
        const stoppedReason = event.detail.stoppedReason;
        subject = `Error: Tile generation container was not found: ${stoppedReason}`;
        console.log(`Error: Tile generation container was not found: ${stoppedReason}`);
    } else if (Object.keys(container).length > 0) {
        if (container.lastStatus == 'RUNNING') {
            subject = "Tile generation container start running";
            console.log("Tile generation container start running");
        } else if (container.lastStatus == 'STOPPED') {
            const exitCode = container.exitCode;
            if (exitCode == 0) {
                subject = "Tile generation container successfully exited with 0";
                console.log("Tile generation container successfully exited with 0");
            } else {
                subject = `Error: Tile generation container unsuccessfully exited with ${exitCode}`;
                console.log(`Error: Tile generation container unsuccessfully exited with ${exitCode}`);
            }
        } else {
            //Ignore container other short term status which will finally became STOPPED
            return;
        }
    }
    
    const params = {
        Subject: subject,
        Message: eventText,
        TopicArn: topicArn
    };
    
    sns.publish(params, () => {
        callback(null, 'successfully sent')
    }).on('error', (e) => {
        callback(Error(e))
    })
};