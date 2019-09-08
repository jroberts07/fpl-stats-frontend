import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://fpl-stats-api.localhost:30000'
})

export default {
    entryData(EntryId, playerCookie) {
            return apiClient.get(`/entry_data/${EntryId}?player_id=${playerCookie}`)
        }
}