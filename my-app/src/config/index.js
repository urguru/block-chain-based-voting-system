let config

if (process.env.REACT_APP_ENV === 'production') {
    config = {
        apiURL: "http://localhost:3080/api",
        contractAddress: "0x5033b83f774400E6Df1F245F01729909d4cDC993",
    }
} else {
    config = {
        apiURL: "http://localhost:3080/api",
        contractAddress: "0x5033b83f774400E6Df1F245F01729909d4cDC993",
    }
}

export default config;