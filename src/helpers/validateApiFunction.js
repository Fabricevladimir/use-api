/**
 * Validates given api function
 * @param {*} apiFunction - Api function to be validated
 */
export function validateApiFunction(apiFunction) {
  // function is null or undefined
  if(!apiFunction) {
    throw new Error("apiFunction is required.")
  }

  // value is not of type function
  if(typeof apiFunction !== 'function') {
    throw new TypeError("apiFunction must be of type function.")
  }
}
