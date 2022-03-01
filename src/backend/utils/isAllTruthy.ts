import isNotNullNorUndefined from "./isNotNullNorUndefined";

function isAllTruthy(reqBodyParams) {
  return Object.values(reqBodyParams).every((param) =>
    isNotNullNorUndefined(param)
  );
}

export default isAllTruthy;
