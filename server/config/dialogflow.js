const dialogflow = require('@google-cloud/dialogflow');

const PROJECTID = "meeth-from-greenmonk-gj99";

const configuration = {
    credentials: {
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCn8zBNa2bcblbW\nd9ksvg1GYzpQXWENEGNYgzP0T1ORFUzGBltZ4QxnPu+j4BD3ZGY3DjiVzLl+9ONn\n0QGgqUG4FV7StDvh6xllca5co10jAsNGxL5IzUNnaxZYyTMVF42tw2YwUWnhZGUV\nPUb5qE8XBKVesMPqyApefMT7NEW5MED49B+CaTHbZOqr1aJyi5unqqe0DQWgWhlT\nNzRCXvS5TY0pm4TrViiK3iusAYW+MFuNGVtt7bmyJGDZIhejUFUhMQGj73hF5Yd5\ntC7TyxbOJ2b1g+p/sfVA4bF4Gu0Bfivts/lxxfArQg+3j1YQ8vV1DPl5ubKx25YZ\nR9WTjoJZAgMBAAECggEAAKwK+Aw4ig2L44MHp/Z6k5NjStc5Kx0LiNdGrdl+JYQk\nx/NWXsGL2LI9lzqCNMD7ys/xsHoOsEkTvH3PbYLsV+BaqYYbPMuQofF4E4FG3zZD\nwgYNcZt4uGCnX2Cubx/mc6NKny0JSCOsPY0zX9YP7/TPrY/UNINDxgEXcKnrUS5M\nxFB6O3taui1TKDCvjwcNx9DRvHtvB+auFs30RRrnYYkuz4+ABetlokvn8Amw0uUV\nmYezetJVXvzHnVkVL29IdE6ULYwUEn2Pz1ILRJb7Ekq/igdPl5F8m4w4lo69h3AE\n8+NJ7mhBf2UgoRdFGlgSBCrCgJKD97rdmJlwQWm44QKBgQDjg47lhGGlSsvsGkk7\ngqWO0v34cWqy05XJYXHzUDEZ3Nz8/2M8LNSm863IQvqI0ZIL8BLM06h+oDQCgkNt\nBlvQVVYAfaYbRlCmJqYaSWOZ21XW2GHa/Rc4Tn3rV+kv5YuLVWgAWfAV+c5VFs6y\nU7387qncxvk3s2N8u0qA8A/8IQKBgQC8+nGFDjPnx5gZ7FoJLApFQvkqKucwnWbx\nyuVUsvzLDLLzV1/CidOE3IZCOzqeCPP944yWbt5VgkT/M2IiGdwvsYByzbR95jTB\nOZY+s8dr23VTm01IdJ+4V0F++qf9NNnVlFmdhukEUQq8USIR5unlpvTjVqKGHCA5\nh5ZwzIt/OQKBgQDRxyAfKK0QR6M3lBUqNhCJXKqoRYtoUAewo5T6EFr1ydxJuwG5\nHm0Fc3ItUPTI6tOLBlWPXynhd739AjdBc7d8pPKjiTd7tp3uVXyaiEi6OK8xZlr0\nHKEoXddlBK4SZ8j/NESs7kCdQrSpaFo1u1lWuokM9LoeTd3RyK+tq6xRgQKBgDQc\ne6FNQVLw3yiG3G0bD9n5levi2M23GeQjJwosMTlszwv7VBS5HPLOPNeWrZtWrLGe\nRe5VtEmwGoalDLKKnwUn1VvTDaqKCJIf5yZzPNKpOblMYgtQ3ZpftVfmltxj7o3O\n0sd1pFvkXSmA1fxJyMXjPDRUd4yzxM8YbIu+W9lBAoGAJoMrWOdtiAoBIVgEfEnS\ncizZRfCRM0o6QHCv0hoyzjLpOuN2j0xGNKYu08n8/l5PHQ37w/jsob7nm1e/bZXS\nkscKzYmL0PeN2VtXcdkTC/zVbUDPoqZjs48za9DQQ4c1kvrmoYnabms3BCpNSFQE\nG+GluZJuw2D6E8Z+2avjTsQ=\n-----END PRIVATE KEY-----\n",
        client_email: "fruitbillingsystem@meeth-from-greenmonk-gj99.iam.gserviceaccount.com"
    }
}

const sessionClient = new dialogflow.SessionsClient(configuration);

const detectIntent = async (languageCode, queryText, sessionId) => {

    const sessionPath = sessionClient.projectAgentSessionPath(PROJECTID, sessionId);
    const request = {
        session: sessionPath,
        queryInput: {
            text: { 
                text: queryText,
                languageCode: languageCode,
            },
        },
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    return {
        response: result.fulfillmentText,
    }
}

detectIntent('en', 'What are you?', '123456789').then((result) => {
    console.log(result);
});
