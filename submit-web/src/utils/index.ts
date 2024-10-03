export const stringToBoolean = (
  value: string | boolean,
): boolean | undefined => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
  }
  return undefined;
};

export const booleanToString = (value: boolean | string | unknown): string => {
  if (typeof value === "string") return value;
  if (typeof value === "boolean") return value.toString();
  return "";
};
