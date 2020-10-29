import axios from 'axios'
import { bindActionCreators } from 'redux'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    console.log("tullaanko tänne?")
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

export default { 
    getAll,
    createNew }