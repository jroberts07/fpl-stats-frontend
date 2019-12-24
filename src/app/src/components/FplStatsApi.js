import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://fpl-stats-api.localhost:30000'
})

export default {
    entryData(entryId, playerCookie) {
            return apiClient.get(`/entry_data/${entryId}?player_cookie=${playerCookie}`)
    },

    leagueTable(leagueId, playerCookie) {
        return apiClient.get(`/league_table/${leagueId}?player_cookie=${playerCookie}`)
    }
}