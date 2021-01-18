import axios from 'axios';

export default axios.create({
  //baseURL: `https://apitestenode.herokuapp.com/api/`
  baseURL: `http://localhost:3000/api/`
});