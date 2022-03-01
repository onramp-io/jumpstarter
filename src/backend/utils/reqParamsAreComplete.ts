import isAllTruthy from "./isAllTruthy";

const reqParamsAreComplete = (requestParams, numParametersNeeded) => {
  return (
    isAllTruthy(requestParams) &&
    Object.keys(requestParams).length >= numParametersNeeded
  );
};

export default reqParamsAreComplete;
