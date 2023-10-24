import https from 'https';

export const handler = async (event) => {
    // Extract the 'session_id' parameter from the query string

if (event.known_customer == "" )

    const createCustomerURL = 'https://yogiskitchen.ca/v1/signup';

    // Set up headers with the authorization token
    const headers = {
        'Authorization': `Bearer ${stripeApiKey}`
    };

    // Define the HTTP GET request options
    const options = {
        method: 'POST',
        headers: headers,
    };

    try {
        // Make the GET request to the Stripe API
        const response = await new Promise((resolve, reject) => {
            const req = https.request(stripeApiUrl, options, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    resolve(data);
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            req.end();
        });

        

        // Create the Lambda response object
        const lambdaResponse = {
            statusCode: 200,
            body: response,
        };

        return lambdaResponse;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error making HTTPS request:', error);

        // Create an error response
        const errorResponse = {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };

        return errorResponse;
    }


}

