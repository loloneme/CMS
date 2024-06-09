import axios from "axios"

const URL = "http://localhost:8080"

const api = axios.create({
    baseURL: URL,
});

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token && !config.url.includes('/auth/sign-in')) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export const signIn = async (userData) => {
    const response = await api.post('/auth/sign-in', userData);
    return response.data;
}

export const getRoles = async () => {
    const response = await api.get('/handler/user/roles')
    return response.data
}

export const getUsers = async () => {
    const response = await api.get('/handler/user/all')
    return response.data
}

export const createUser = async (userData) => {
    const response = await api.post('/auth/sign-up', userData)
    return response.data
}

export const updateUser = async (userData) => {
    const response = await api.put(`/handler/user/${userData.user_id}`, userData)
    return response.data
}

export const deleteUser = async (userId) => {
    const response = await api.delete(`/handler/user/${userId}`)
    return response.data
}


export const getAllMovies = async () => {
    const response = await api.get('/handler/movie/all');
    return response.data;
}

export const getAllCinemas = async () => {
    const response = await api.get('/handler/cinema/all');
    return response.data;
}

export const getCinema = async (cinemaId) => {
    const response = await api.get(`/handler/cinema/${cinemaId}`);
    return response.data;
}

export const getAllCategories = async () => {
    const response = await api.get('/handler/cinema/categories');
    return response.data;
}

export const getAllHallCategories = async () => {
    const response = await api.get('/handler/cinema/halls/categories');
    return response.data;
}

export const createCinema = async (cinemaData) => {
    const response = await api.post('/handler/cinema', cinemaData)
    return response.data
}

export const updateCinema = async (cinemaData) => {
    const response = await api.put(`/handler/cinema/${cinemaData.cinema_id}`, cinemaData)
    return response.data
}

export const deleteCinema = async (cinemaId) => {
    const response = await api.delete(`/handler/cinema/${cinemaId}`)
    return response.data
}

export const getAllGenres = async () => {
    const response = await api.get('/handler/movie/genres');
    return response.data;
}

export const getAllStudios = async () => {
    const response = await api.get('/handler/movie/studios');
    return response.data;
}

export const getAllActors = async () => {
    const response = await api.get('/handler/movie/actors');
    return response.data;
}

export const getAllCinemaNames = async () => {
    const response = await api.get('/handler/repertoire/cinemas/all');
    return response.data;
}

export const createMovie = async (movieData) => {
    const response = await api.post('/handler/movie', movieData)
    return response.data
}

export const updateMovie = async (movieData) => {
    const response = await api.put(`/handler/movie/${movieData.movie_id}`, movieData)
    return response.data
}

export const getAllMoviesBriefInfo = async () => {
    const response = await api.get('/handler/repertoire/movies/all');
    return response.data;
}

export const deleteMovie = async (movieId) => {
    const response = await api.delete(`/handler/movie/${movieId}`)
    return response.data
}

export const getAllCountries = async () => {
    const response = await api.get('/handler/movie/countries');
    return response.data;
}

export const getRepertoiresByCinemaAndMovie = async (cinemaId, movieId) => {
    const params = new URLSearchParams({
        cinema_id: cinemaId,
        movie_id: movieId
    });

    try {
        const response = await api.get(`/handler/repertoire/sessions?${params.toString()}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching repertoires:', error);
        throw error;
    }
};

export const getSession = async (sessionId) => {
    const response = await api.get(`/handler/repertoire/sessions/${sessionId}`)
    return response.data
}

export const updateSession = async (sessionData) => {
    const response = await api.put(`/handler/repertoire/${sessionData.session_id}`, sessionData)
    return response.data
}

export const createSession = async (sessionData) => {
    const response = await api.post(`/handler/repertoire`, sessionData)
    return response.data
}

export const deleteSession = async (sessionId) => {
    const response = await api.delete(`/handler/repertoire/${sessionId}`)
    return response.data
}

