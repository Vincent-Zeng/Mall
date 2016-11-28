export const login = ({ telephone, password }) => {
  return fetch(`/customer/login`, {
    method: 'POST',
    body: JSON.stringify({ "telephone": telephone, "password": password })
  })
}
