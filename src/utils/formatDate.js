export const formatDate = date => {
    // console.log("date in formatDate: ", date); // 2020-03-03

    // const dateString =

    // need 3-03-2020
    // const dateObj = new Date(date);

    // const dateString = new Date(
    //     dateObj.getTime() - dateObj.getTimezoneOffset() * 60000
    // )
    //     .toISOString()
    //     .split("T")[0];

    // let formattedDate = `${dateString.slice(
    //     5,
    //     dateString.length
    // )}-${dateString.slice(0, 4)}`;

    // if (formattedDate[0] === 0 || formattedDate[0] === "0") {
    //     formattedDate = formattedDate.slice(1, formattedDate.length);
    // }

    const d = new Date(date);
    // console.log("d: ", d);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();

    // console.log("day: ", day);
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    // console.log("return value in formatDate: ", [year, month, day].join("-"));

    return [year, month, day].join("-");
    // console.log("dateString: ", dateString);
    // return dateString;
};
