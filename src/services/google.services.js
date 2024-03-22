import {google} from "googleapis";
import {GoogleAuth} from 'google-auth-library'
import {CustomError} from '../errors/errors.main.js'

const getClient = async () => {
    const cred = process.env.GOOGLE_AUTH_JSON_PATH
    const auth = new GoogleAuth({
        keyFile: cred,
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
        return {data:response.data, error:null, warning:null}
    } catch (error) {
        console.error('Error al añadir datos a la hoja de cálculo:', error);
        return {error: error.errors}
    }
}