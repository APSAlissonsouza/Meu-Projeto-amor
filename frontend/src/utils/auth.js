export function salvarToken(token) {
  localStorage.setItem('token', token);
}

export function obterToken() {
  return localStorage.getItem('token');
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('nome');
  localStorage.removeItem('aniversarioNamoro');
  localStorage.removeItem('aniversarioNoivado');
}

export function estaLogado() {
  return !!localStorage.getItem('token');
}
