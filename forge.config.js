module.exports = {
    packagerConfig: {
        asar: true,
    },
    rebuildConfig: {},
    publishers: [
        {
            name: "@electron-forge/publisher-github",
            config: {
                repository: {
                    owner: "totallynotadi",
                    name: "anotion",
                },
            },
        },
    ],
    makers: [
        {
            name: "@rabbitholesyndrome/electron-forge-maker-portable",
        },
        {
            name: "@electron-forge/maker-zip",
            platforms: ["darwin"],
        },
        {
            name: "@electron-forge/maker-deb",
            config: {},
        },
    ],
    plugins: [
        {
            name: "@electron-forge/plugin-auto-unpack-natives",
            config: {},
        },
    ],
};
