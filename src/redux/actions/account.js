export function login(data) {
  return {
    type: 'LOGIN',
    payload: data, // data = { token: String, admin | user | teacher : String }
  };
}

export function logout() {
  return {
    type: 'LOGOUT',
  };
}
