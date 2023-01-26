import { conditionDate } from '../utils/Utils';
import APIRequest from './axios.config';
//  El nombre APIRequest es un nombre que yo elijo

export function getDateFromApi(date, monthParameter = 0) {
    console.log(monthParameter);
    let start = date.startDate;
    let finish = date.endDate
    let month = monthParameter
    //console.log(date);
    if (start === undefined) {
        start = '2023-1-3-16-24-25';
        finish = '2023-1-3-16-32-33';
    } else {
        start = start + '-0-0-0';
        finish = finish + '-0-0-0';
    }
    start = conditionDate(start);
    finish = conditionDate(finish);
    // console.log(`axiosService startdate: ${start}`);
    // console.log(`axiosService endtdate: ${finish}`);
    // console.log(`axiosService month: ${month}`);

    return APIRequest.get('/data', {
        params: { StartDate: start, EndDate: finish , Month: month },
        validateStatus(status) {
            return status < 500; // resuelve solo si el estatus code es menor a 500
        }

    });
    // APIRequest.post('/login');
}

/**
 * Quita los 0 a la izquierda de los numeros para que sean 
 * reconocibles en la base de datos 
 */


