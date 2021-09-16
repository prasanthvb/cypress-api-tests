// This function will return the random value with 7 character
export function randomStringValue(){
    const randomvalue = Math.random().toString(36).substring(7);
    return randomvalue;
}