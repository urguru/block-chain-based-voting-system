let config

if (process.env.REACT_APP_ENV === 'production') {
    config = {
        apiURL: "https://api.clinikk.com",
    }
} else {
    config = {
        apiURL: "http://localhost:3080/api",
    }
}

export default config;