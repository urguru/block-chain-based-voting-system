let config

if (process.env.REACT_APP_ENV === 'production') {
    config = {
        apiURL: "http://localhost:3080/api",
        contractAddress: "0x2184623D2a25410aa88738Be7281022df876294E",
    }
} else {
    config = {
        apiURL: "http://localhost:3080/api",
        contractAddress: "0x2184623D2a25410aa88738Be7281022df876294E",
    }
}

export default config;