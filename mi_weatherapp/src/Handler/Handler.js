import moment from "moment";

export const formatTimeStamp = (dateTimeString, type) => {
    const date = moment(dateTimeString).subtract(2, 'days').format("Do MMMM YYYY"); // in format 7th May 2023

    const time = moment(dateTimeString).format("h:mm A");

    switch(type){
        case 'date':
            return date
        case 'time':
            return time;
        default:
            return date + ' - ' + time;
    }
  };

