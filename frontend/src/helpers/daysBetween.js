export const daysBetween = (date1, date2) => {
    if (!date1 || !date2) return 0;
    const date1Obj = new Date (date1);
    const date2Obj = new Date (date2);

    //get the time differnece in milliseconds
    const timeDif = Math.abs(date2Obj.getTime() - date1Obj.getTime());

    const oneDay = 1000 * 60 * 60 * 24;
    const daysDif = Math.round(timeDif / oneDay);

    return daysDif;
}
