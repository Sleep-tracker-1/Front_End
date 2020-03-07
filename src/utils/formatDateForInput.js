export const formatDateForInput = date => {
    console.log("date in formatDate: ", date);

    // TestGraph date for time input comes in as 2020-3-01
    // needs to come back as 2020-03-01 (YYYY-MM-DD)

    const timeZoneAdjusted = `${date}T00:00-0800`;
    // console.log("timeZoneAdjusted: ", timeZoneAdjusted);

    const d = new Date(timeZoneAdjusted);
    // console.log("d: ", d);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    console.log("formatDateForInput return: ", [year, month, day].join("-"));
    return [year, month, day].join("-");
};
