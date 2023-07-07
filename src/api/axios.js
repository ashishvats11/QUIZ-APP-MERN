import axios from 'axios';
const port = 8000

export default axios.create({
    baseURL:`http://localhost:${port}`
});