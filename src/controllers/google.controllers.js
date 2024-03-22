import {googleService} from '../services/main.services.js'
import {responses} from '../network/main.network.js'

export const registerAttendance = async (req, res, next) => {
    const { spreadsheetId, range, data } = req.body;
    try {
        const response = await googleService.saveRegister(spreadsheetId, range, data)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.unauthorized(req, res, response.error)}
    } catch (e) {
        console.log(e)
        next(e)
    }
}