/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Helper function to process lambda event information.
 */

const getStateInformation = function(event) {
    try {
        let stateInfo;
        const taskArn = event.resources;
        const taskLastStatus = event.detail.lastStatus;
        const container = event.detail.containers[0];
    
        if (container === undefined) {
            if (taskLastStatus == 'PROVISIONING') {
                stateInfo = `Task arn: ${taskArn}\n\nTask state: task in provisioning before launch`;
            } else if (taskLastStatus == 'STOPPED') {
                const stoppedReason = event.detail.stoppedReason;
                stateInfo = `Task arn: ${taskArn}\n\nTask state: container was not found, stoppedReason: ${stoppedReason}`;
            }
        } else if (Object.keys(container).length > 0) {
            const containerLastStatus = container.lastStatus;
            if (containerLastStatus == 'PENDING') {
                stateInfo = `Task arn: ${taskArn}\n\nTask state: task container is pending launch`;
            } else if (containerLastStatus == 'RUNNING') {
                const taskDesiredStatus = event.detail.desiredStatus;
                if (taskDesiredStatus == 'RUNNING') {
                    stateInfo = `Task arn: ${taskArn}\n\nTask state: task start running`;
                } else if (taskDesiredStatus == 'STOPPED') {
                    stateInfo = `Task arn: ${taskArn}\n\nTask state: task desires to stop`;
                }
            } else if (containerLastStatus == 'STOPPED') {
                const exitCode = container.exitCode;
                if (exitCode == 0) {
                    stateInfo = `Task arn: ${taskArn}\n\nTask state: task container successfully exited with 0`;
                } else {
                    const stoppedReason = event.detail.stoppedReason;
                    stateInfo = `Task arn: ${taskArn}\n\nTask state: task container unsuccessfully exited with ${exitCode}, stopped reason: ${stoppedReason}`;
                }
            }
        }
        return stateInfo;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    getStateInformation
}