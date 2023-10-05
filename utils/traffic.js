var https = require('https')

const makeAPIRequest = (options, postData, userLogInfo = {}) => {

    return new Promise((resolve, reject) => {
        // let apiName = userLogInfo.apiName ? userLogInfo.apiName : "test"
        let request = options
        request['data'] = postData ? postData : ''

        let startTime = Date.now()
        var req = https.request(options, function (res) {

            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function (chunk) {
                const jsonString = chunks.join('');
                try {
                    const results = JSON.parse(jsonString) || {};
                    let duration = Date.now() - startTime

                    console.log({ flow: "TrafficRequest", status: true, request: JSON.stringify(request), response: JSON.stringify(results), timestamp: Date.now(), duration, ...userLogInfo })
                    resolve(results);
                } catch (e) {
                    resolve(new Error(`Error parsing response at PINPOINT: ${jsonString} Error Details: ${e.message}`));
                }

            });

            res.on("error", function (error) {
                let duration = Date.now() - startTime
                console.log({ flow: "TrafficRequest", status: false, request: JSON.stringify(request), response: error.message, timestamp: Date.now(), duration, ...userLogInfo })
                resolve(error);
            });
        });

        if (postData) {
            if (typeof postData != 'string') {
                var postJson = JSON.stringify(postData);
                req.write(postJson);
            } else {
                req.write(postData);
            }
        }

        req.on('error', () => {
            let duration = Date.now() - startTime
            console.log({ flow: "TrafficRequest", status: false, request, response: { message: "req error" }, timestamp: Date.now(), duration, ...userLogInfo })

            resolve(new Error('Request Error'))
        });

        req.on('timeout', () => {
            let duration = Date.now() - startTime
            console.log({ flow: "TrafficRequest", status: false, request, response: { message: "req timeout" }, timestamp: Date.now(), duration, ...userLogInfo })

            resolve(new Error('Request Timeout'))
        });

        req.end();

    })

}


module.exports = {
    makeAPIRequest
}