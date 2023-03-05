export const dedupe = (fullList) => {
  return _.uniqWith(fullList, _.isEqual);
};
