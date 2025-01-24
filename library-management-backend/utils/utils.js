//returns an object for use in update operations with each key from array "properties" which is not undefinded on "reqBody"
export const createUpdateObject = (properties, reqBody) => {
  const updateObject = {};
  properties.forEach((property) => {
    if (reqBody[property] !== undefined)
      updateObject[property] = reqBody[property];
  });
  return updateObject;
};
