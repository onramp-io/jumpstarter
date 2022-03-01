const reqIsUnauthorized = (req) => {
  return (
    req.user === undefined ||
    req.user.uid === undefined ||
    req.user.uid === null
  );
};

export default reqIsUnauthorized;
