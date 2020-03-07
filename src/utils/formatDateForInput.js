export const formatDateForInput = date => {
    console.log("date in formatDate: ", date);

    // TestGraph date for time input comes in as 2020-3-01
    // needs to come back as 2020-03-01 (YYYY-MM-DD)

    // take in Date object

    let stringDate = date.toLocaleDateString().replace(/\//g, "-"); // 3-7-2020 format

    console.log("stringDate in format: ", stringDate);

    // to handle different options for single digit months and days
    if (stringDate[1] === "-" && stringDate[3] === "-") {
        // if 7 days from current day is formatted like 3-1-2020 (M-D-YYYY)
        // want to add a 0 before the day num @ stringDate[2] and shift everything from index 2 over 1
        stringDate = `${stringDate.slice(0, 2)}0${stringDate.slice(
            2,
            stringDate.length
        )}`;
    } else if (stringDate[2] === "-" && stringDate[4] === "-") {
        // if 7 days from current day is formatted like 12-1-2020 (MM-D-YYYY)
        // want to add a 0 before the day num @ stringDate[3] and shift everything from index 3 over 1
        stringDate = `${stringDate.slice(0, 3)}0${stringDate.slice(
            3,
            stringDate.length
        )}`;
    }

    // if month is only a single digit, add a zero in front
    if (stringDate[1] === "-") {
        stringDate = `0${stringDate}`;
    }

    console.log("stringDat: ", stringDate);

    // convert to YYYY-MM-DD format
    stringDate = `${stringDate.slice(6, stringDate.length)}-${stringDate.slice(
        0,
        5
    )}`;

    console.log("stringDate reformatted: ", stringDate);

    // const timeZoneAdjusted = `${date}T00:00-0800`;
    // console.log("timeZoneAdjusted: ", timeZoneAdjusted);

    // const d = new Date(timeZoneAdjusted);
    // console.log("d: ", d);
    // let month = `${d.getMonth() + 1}`;
    // let day = `${d.getDate()}`;
    // const year = d.getFullYear();

    // if (month.length < 2) month = `0${month}`;
    // if (day.length < 2) day = `0${day}`;

    // console.log("formatDateForInput return: ", [year, month, day].join("-"));

    // return [year, month, day].join("-");
    return stringDate;
};
