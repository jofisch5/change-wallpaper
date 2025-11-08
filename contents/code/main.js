
const base_path = "/home/texter/.local/share/wallpapers/";
const default_wallpaper = {name: "A Small Tree", image: {light: "2560x1440.jpg", dark: "2560x1440.jpg"}};
const image_prefix = "/contents/images";
const wallpapers = {
    3: {name: "Technology", image: {light: "2560x1440.jpg", dark: "3840x2160.jpg"}},
    4: {name: "Skylines", image: {light: "2560x1440.jpg", dark: "2560x1440.jpg"}},
    5: {name: "Bonsai", image: {light: "2560x1440.jpg", dark: "2560x1440.jpg"}}
};
const colors = {
    6: {light: "#FF0000", dark: "#00FF00"}
};
const default_location = "/home/texter/Desktop";
const locations = {
    5: "/home/texter/Documents/Programming/Plasma"
};

function isItLight(colorScheme) {
    return colorScheme.endsWith("Light");
}

function buildImagePath(desktop_number, colorScheme) {
    const wallpaper = (desktop_number in wallpapers) ? wallpapers[desktop_number] : default_wallpaper;
    const isLight = isItLight(colorScheme);
    const image_name = isLight ? wallpaper.image.light : wallpaper.image.dark;
    const suffix = isLight ? "/" : "_dark/";
    return base_path + wallpaper.name + image_prefix + suffix + image_name;
}

function getColor(desktop_number, colorScheme) {
    return isItLight(colorScheme) ? colors[desktop_number].light : colors[desktop_number].dark;
}

function updateConfiguration(desktop_number, colorScheme) {
    const isColor = (desktop_number in colors);
    const wallpaperType = isColor ? "Color" : "Image";
    const colorOrImage = isColor ? getColor(desktop_number, colorScheme) : buildImagePath(desktop_number, colorScheme);
    const location = (desktop_number in locations) ? locations[desktop_number] : default_location;
    configure = `
        var d = desktopForScreen(0);
        d.currentConfigGroup = ["General"];
        d.writeConfig("url", "${location}");
        d.wallpaperPlugin = "org.kde.${wallpaperType.toLowerCase()}";
        d.currentConfigGroup = ["Wallpaper", "org.kde.${wallpaperType.toLowerCase()}", "General"];
        d.writeConfig("${wallpaperType}", "${colorOrImage}");
    `;
    callDBus(
        "org.kde.plasmashell",
        "/PlasmaShell",
        "org.kde.PlasmaShell",
        "evaluateScript",
        configure
    );
}

let readColorScheme = `
    const config = ConfigFile('kdeglobals');
    config.group = 'General';
    print(config.readEntry('ColorScheme'));
`
workspace.currentDesktopChanged.connect(function() {
    desktop_number = workspace.currentDesktop.x11DesktopNumber;
    callDBus(
        "org.kde.plasmashell",
        "/PlasmaShell",
        "org.kde.PlasmaShell",
        "evaluateScript",
        readColorScheme,
        function (colorScheme) {
            updateConfiguration(desktop_number, colorScheme);
        }
    );
});
