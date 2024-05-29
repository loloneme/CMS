import axios from "axios"

const URL = "http://localhost:8080"

const api = axios.create({
    baseURL: URL,
});


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
    const response = await api.get('/handler/hall/categories');
    return response.data;
}

export const signIn = async (userData) => {
    const response = await api.post('/auth/sign-in', userData);
    return response.data;
}

export const createCinema = async (cinemaData) => {
    const response = await api.post('/handler/cinema', cinemaData)
    return response.data
}

export const updateCinema = async (cinemaData) => {
    console.log(cinemaData.halls[0])

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
    console.log(movieData.countries)
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

// export const getAllRepertoires = async () => {
//     const response = await api.get('/handler/repertoire/sessions/all');
//     return response.data;
// }

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

// export const createUser = (data) => {
//     axios.post(`${URL}`, data)
// }

// export const signIn = async (email, password) => {
//     const data = {
//         email: email,
//         password: password
//     }
//     try {
//         // Отправить запрос на сервер для проверки учетных данных
//         await axios.post(`${URL}/auth/login`, data)
//         .then(
//             (data) => {
//                 console.log(data.data.token)
//                 return data.data.token
//             }
//         );
//     } catch (error) {
//         console.error('Error during login:', error);
//         return null;
//     }
// };

