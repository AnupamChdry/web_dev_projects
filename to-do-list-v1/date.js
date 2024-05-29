exports.getDate = function (){

    const today = new Date();


    const options = {
        day: "numeric",
        weekday: "long",
        month: "long",
        // year: "numeric"
    }
    
    return today.toLocaleDateString("en-US",options);
}

exports.getDay = function (){

    const today = new Date();


    const options = {
        weekday: "long",
        // year: "numeric"
    }
    
    return today.toLocaleDateString("en-US",options);
}
