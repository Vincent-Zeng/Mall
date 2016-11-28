export const login = ({ telephone, name, password }) => {
  return fetch(`/customer/register`, {
    method: 'POST',
    body: JSON.stringify({ "telephone": telephone, "password": password, "name": name })
  })
}
