import { getToday } from "./getToday";

export const getTomorrow = () => {
    var tomorrow = new Date(getToday());
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
}
