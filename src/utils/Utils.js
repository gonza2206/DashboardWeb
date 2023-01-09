/**
 * Return a conditioned Date, removing ceros from the left of the numbers
 */

export const conditionDate = (date) => {
    let array = date.split('-');
    let StringDate;
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        array[index] = Math.trunc(element)
        if (index === 1 && array[index] === 0) { //Si el mes estar representado con un 0 trae problemas, por esto se le suma 1. 
            array[index] = array[index] + 1
        }
    }
    StringDate = array.join('-');//join array elements with '-' in a String 
    return (StringDate)
}

export const parseFrame = (frame) => {
    let frameArray = frame.split(',');
    let tension = frameArray[1];
    return (tension);
  }