export function saveToken(token) {
  // Spliting token for little security
  const part1 = String(token).substring(0, 5);
  const part2 = String(token).substring(5);
  // Token will be saved for a session only
  sessionStorage.setItem('_a_', part1);
  sessionStorage.setItem('_z_', part2);
}

export function getToken() {
  // Joining token
  const part1 = sessionStorage.getItem('_a_');
  const part2 = sessionStorage.getItem('_z_');
  return part1 + part2;
}
