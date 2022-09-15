import md5 from "md5";
const hash = (plain) => {
  return md5(plain);
};

export const encryptPassword = (password) => {
  const hashPassword = hash(password);
  return hashPassword;
};

export const comparePassword = (hashPassword, password) => {
  const toCompareHashPassword = hash(password);
  return hashPassword === toCompareHashPassword;
};
