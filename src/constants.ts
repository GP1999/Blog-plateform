/* eslint-disable no-useless-escape */
export const emailRegex = /^(?!.{50})[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
export const nameRegex = /^[a-zA-Z][a-zA-Z ]*$/;
export const phoneNumberRegex = /^\+91[5-9]{1}\d{9}$/;
export const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/