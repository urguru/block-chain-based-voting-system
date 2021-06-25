let config

if (process.env.REACT_APP_ENV === 'production') {
    config = {
        apiURL: "http://localhost:3080/api",
        contractAddress: "0xf4B19eA65521f9173F748970C3084c0ce7E22fCB",
    }
} else {
    config = {
        apiURL: "http://localhost:3080/api",
        contractAddress: "0xf4B19eA65521f9173F748970C3084c0ce7E22fCB",
    }
}

export default config;