import axios from "axios";

export const api = axios.create({
    baseURL:'https://nxmulnexoemjyfyiuwut.supabase.co/rest/v1',
    headers: {
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${
            import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
          }`,
        },
})