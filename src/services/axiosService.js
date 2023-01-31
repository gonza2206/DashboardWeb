import { conditionDate } from '../utils/Utils';
import APIRequest from './axios.config';
//  El nombre APIRequest es un nombre que yo elijo

export function getDateFromApi(date, monthParameter = 0, floor) {
    let start = date.startDate;
    let finish = date.endDate
    let month = monthParameter
    //console.log(date);
    if (start === undefined) {
        start = '2023-1-31-0-0-0';
        finish = '2023-2-1-0-0-0';
    } else {
        start = start + '-0-0-0';
        finish = finish + '-0-0-0';
    }
    start = conditionDate(start);
    finish = conditionDate(finish);
     console.log(`axiosService startdate: ${start}`);
    console.log(`axiosService endtdate: ${finish}`);
    console.log(`axiosService month: ${month}`);
    // console.log(`${floor}`);

    return APIRequest.get('/data', {
        params: { StartDate: start, EndDate: finish , Month: month, Floor: floor },
        validateStatus(status) {
            return status < 500; // resuelve solo si el estatus code es menor a 500
        }

    });
    // APIRequest.post('/login');
}


