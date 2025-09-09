import axios from 'axios'


export const createShortUrl = async (url) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/urls/create`, { url },{ withCredentials: true })
        return response.data
    } catch (error) {
        throw new Error('Failed to create short URL')
    }
}

export const RecentUrls = async () =>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/urls/recent-urls`,{ withCredentials: true })
        console.log(import.meta.env.VITE_BACKEND_URL);
        
        return response.data
        
        
    } catch (error) {
        console.log(error)
        
    }
}

export const urlVisit = async (shortUrl) =>{
    window.open(`${import.meta.env.VITE_BACKEND_URL}/${shortUrl}`, '_blank');
}

export const getAllUrls = async (page, limit, search) =>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/urls/all-urls?search=${search}&page=${page}&limit=${limit}`,{ withCredentials: true })
        return response.data    
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
