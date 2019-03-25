const now = new Date();
export function getYear(){
    const year = now.getFullYear();
    return year;
}
export function getMonth(){
    const month = now.getMonth() + 1;
    return month;
}

export function getToday(){
    const today = now.getDate();
    return today;
}


export function getWeek(){
    const week = now.getDay();
    return week;
}




