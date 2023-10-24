const { handler } = require('./webhookReceiver.js');
// OR
// import { handler } from './path/to/your/lambda/function';


const mockEvent = {
    queryStringParameters: {
        session_id: '1234'
    }
};


(async () => {
    try {
        const response = await handler(mockEvent);
        console.log('Lambda function response:', response);
    } catch (error) {
        console.error('Error invoking Lambda function:', error);
    }
})();
