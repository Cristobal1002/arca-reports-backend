import { google } from "googleapis";
import { GoogleAuth } from 'google-auth-library';
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import AWS from 'aws-sdk';
import { CustomError } from '../errors/errors.main.js';

export const retrieveSecret = async () => {
    const secretName = "googleApiSecret";
    try {
        // Crear una instancia del cliente de Secrets Manager con las credenciales proporcionadas
        const client = new AWS.SecretsManager({
            region: "us-east-1",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY
            }
        });

        const data = await client.getSecretValue({ SecretId: secretName }).promise();

        // Devolver los datos de respuesta
        return { data: JSON.parse(data.SecretString) };
    } catch (error) {
        console.error('Error al recuperar el secreto:', error);
        throw error;
    }
};

async function getClient() {
    const secret = await retrieveSecret();
    console.log('Secret:',secret)
    const auth = new GoogleAuth({
        credentials: {
            type: secret.data.type,
            project_id: secret.data.project_id,
            private_key_id: secret.data.private_key_id,
            private_key:secret.data.private_key,
            client_email:secret.data.client_email,
            client_id: secret.data.client_id,
            client_secret: secret.data.client_secret,
            redirect_uris: secret.data.redirect_uris,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    return auth.getClient();
}

export const saveRegister = async (spreadsheetId, range, data) => {
    try {
        const client = await getClient();
        const sheets = google.sheets({ version: 'v4', auth: client });
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: data,
            },
        });
        return { data: response.data, error: null, warning: null };
    } catch (error) {
        console.error('Error adding data to spreadsheet:', error);
        return { error: error.errors };
    }
};
