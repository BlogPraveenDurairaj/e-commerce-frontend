import { api } from "./api";

export const getRole = (userID, accessToken) => api.get(`/profiles?id=eq.${userID}`, {
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
})