/**
 * Account Reducer
 * @param {Object} state 
 * @param {Object} action 
 * @param {string='LOGIN','LOGOUT'} action.type
 * @param {Object} action.payload
 * @param {Object} action.payload.student Update student data
 * @param {Object} action.payload.admin Update admin data
 * @returns 
 */

export default function account(state = {}, action) {
  switch (action.type) {
    case 'LOGIN': return { ...state, ...action.payload };
    case 'LOGOUT': return {};
    default: return state;
  }
}
