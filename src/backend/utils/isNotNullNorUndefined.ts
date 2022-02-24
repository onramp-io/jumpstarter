const isNotNullNorUndefined = (reqBodyParam) => {
  if (reqBodyParam !== null && reqBodyParam !== undefined) {
    return true;
  } else {
    return false;
  }
};

export default isNotNullNorUndefined;
