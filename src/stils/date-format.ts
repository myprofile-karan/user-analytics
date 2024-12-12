import dayjs from "dayjs";

export const formatDate = (isoDate: string): string => {
    return dayjs(isoDate).format("DD-MM-YYYY, HH:mm");
  };