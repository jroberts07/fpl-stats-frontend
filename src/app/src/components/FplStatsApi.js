import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:30000'
})

export default {
    entryData(entry_id, player_cookie) {
            return apiClient.get(`/entry_data/${entry_id}?player_id=${player_cookie}`)
        }
}