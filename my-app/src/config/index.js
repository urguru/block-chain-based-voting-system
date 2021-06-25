let config

if (process.env.REACT_APP_ENV === 'production') {
    config = {
        apiURL: "http://localhost:3080/api",
        contractAddress: "0xCaE89e4d5D826068Af793A67912137A459537E4b",
    }
} else {
    config = {
        apiURL: "http://localhost:3080/api",
        contractAddress: "0xCaE89e4d5D826068Af793A67912137A459537E4b",
    }
}

export default config;