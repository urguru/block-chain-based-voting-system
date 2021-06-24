let config

if (process.env.REACT_APP_ENV === 'production') {
    config = {
        apiURL: "http://localhost:3080/api",
        contractAddress: "0x31EcFAEBaACFE119E6f5263D9c4c3AdF982a0018",
    }
} else {
    config = {
        apiURL: "http://localhost:3080/api",
        contractAddress: "0x31EcFAEBaACFE119E6f5263D9c4c3AdF982a0018",
    }
}

export default config;