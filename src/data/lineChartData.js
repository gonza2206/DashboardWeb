import { tokens } from "../theme";
import { getDateFromApi } from "../services/axiosService";
import { useState, useContext } from "react";


let data = [];
    getDateFromApi()
        .then(
            (response) => {
                if (response.status === 200) {

                    let tempResponse = response.data;
                    tempResponse.forEach(element => {
                        //console.log(`Date: ${element.date}, meassure: ${element.meassure}`);    
                        const DataObj = {
                            x: element.date,
                            y: parseFrame(element.meassure)
                        }
                        data.push(DataObj);
                    });
                    return(data);
                }
            }
        ).catch(
            (error => alert(`An error has ocurred ${error}`))
        );


const parseFrame = (frame) => {
    let frameArray = frame.split(',');
    let tension = frameArray[1];
    return (tension);
}
// export const sendData = () => {
//     let LineData;
//     return (
//         LineData = [
//             {
//                 id: "Current",
//                 color: tokens("dark").greenAccent[500],
//                 data: getData()
//                 // data: [
//                 //     {
//                 //         x: '3',
//                 //         y: '2',
//                 //     },
//                 // ]
//             }
//         ]
//     )
// }
// export const LineData = [
//     {
//         id: "Current",
//         color: tokens("dark").greenAccent[500],
//         data: getData()
//         // data: [
//         //     {
//         //         x: '3',
//         //         y: '2',
//         //     },
//         // ]
//     }
// ]
