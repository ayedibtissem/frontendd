import axios from 'axios';

const UserService = {};

UserService.register = function (data, isAdmin) {
  const url = isAdmin
    ? 'https://cybersec.onrender.com/users/admin/signup'
    : 'https://cybersec.onrender.com/users/signup';

  return axios.post(url, data);
};

UserService.signin = function (data, isAdmin) {
  const url = isAdmin
    ? 'https://cybersec.onrender.com/users/admin/signin'
    : 'https://cybersec.onrender.com/users/signin';

  return axios.post(url, data);
};

export default UserService;
