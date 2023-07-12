import axios from 'axios';
// const port = 8000

export default axios.create({
    baseURL:`https://quiz-app-mern-backend.vercel.app/`
});