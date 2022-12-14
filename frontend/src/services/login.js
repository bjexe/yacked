import axios from 'axios'

const baseUrl = '/api/login'

async function login(form) {
    const response = await axios.post(baseUrl, form)
    return response.data
}

export default login