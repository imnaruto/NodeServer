const {
    SecretsManagerClient,
    GetSecretValueCommand
} = require("@aws-sdk/client-secrets-manager")

const client = new SecretsManagerClient({
    region: "us-east-1"
});

async function getDbSecret() {
    const command = new GetSecretValueCommand({
        SecretId: "prod/mysql/formdb"
    });

    const response = await client.send(command);
    return JSON.parse(response.SecretString);
}

module.exports = getDbSecret;