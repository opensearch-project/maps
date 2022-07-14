/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 *
 * Lambda function for tiles generation ECS task state change email notification.
 */

const aws = require('aws-sdk');
const sns = new aws.SNS();
const eventProcess = require('./event-process');

exports.handler = function (event, context, callback) {
    try {
        const eventText = JSON.stringify(event, null, 2);

        console.log(`\n${eventText}`);

        let topicArn;

        topicArn = process.env.topicArn;

        const message = eventProcess.getStateInformation(event);

        const params = {
            Subject: 'ECS task state change notification',
            Message: message,
            TopicArn: topicArn,
        };

        const publishMessagePromise = sns.publish(params).promise();

        publishMessagePromise
            .then((data) => {
                console.log(
                    `Message\n ${params.Message}\nsent to the topic ${params.TopicArn}`
                );
                callback(null, data);
            })
            .catch((err) => {
                console.log(err);
                callback(err);
            });

        console.log(publishMessagePromise);
    } catch (err) {
        console.log(err);
    }
};
