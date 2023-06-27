module.exports = {
    packagerConfig: {
        asar: true,
        appanme: "BetterNotion",
    },
    rebuildConfig: {},
    publishers: [
        {
            name: "@electron-forge/publisher-github",
            config: {
                repository: {
                    owner: "totallynotadi",
                    name: "anotion",
                    draft: true,
                },
            },
        },
    ],
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            config: {
                title: "BetterNotion",
                name: "BetterNotion",
                authors: "Aditya Gaikwad>",
                description:
                    "fixing the ugly titlebar for Notion Desktop app for Windows",
                loadingGif: "./assets/notion.png",
                iconUrl:
                    "https://raw.githubusercontent.com/totallynotadi/anotion/main/assets/notion.ico",
                icon: "./assets/notion.ico",
                setupIcon: "./assets/notion.ico",
            },
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
