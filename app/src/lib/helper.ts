import { STATUS, StatusType } from "./constants";

/**
 * Formats a date timestamp into the format "21 June, 2024".
 * @param {string | number | Date} date - The date to format. Can be a date string, a timestamp, or a Date object.
 * @returns {string} - The formatted date string.
 */
export function formatDate(date: string | number | Date): string {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Intl.DateTimeFormat('en-GB', options).format(new Date(date));
}

export const arrayToStringWithCommas = (arr: string[] | undefined): string => {
  if (!arr) return ''; // Return empty string or handle as per your requirement
  return arr.join(', ');
};

export const getStatusColor = (status: StatusType) => {
  return STATUS[status].COLOR;
};
export const getStatusText = (status: StatusType) => {
  return STATUS[status].TEXT;
};

export const truncateString = (str: string, num: number) => {
  if (str.length > num) {
    return str.substring(0, 15) + '...';
  }
  return str;
}