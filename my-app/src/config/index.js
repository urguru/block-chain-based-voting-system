let config

if (process.env.REACT_APP_ENV === 'production') {
    config = {
        apiURL: "http://localhost:3080/api",
        contractAddress: "0xce53524a6c1ab0db241f76536ea69a37a2a1a701",
    }
} else {
    config = {
        apiURL: "http://localhost:3080/api",
        contractAddress: "0xce53524a6c1ab0db241f76536ea69a37a2a1a701",
    }
}

export default config;