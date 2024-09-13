import { addMinutes } from "date-fns";

export const getUtcDateFromIso = (dateString: string) => {
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset();
  return addMinutes(date, offset);
};
