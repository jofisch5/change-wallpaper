
const default_wallpaper = "/home/texter/.local/share/wallpapers/A Small Tree";
const wallpapers = {
    3: "/home/texter/.local/share/wallpapers/Technology",
    4: "/home/texter/.local/share/wallpapers/Skylines",
    5: "/home/texter/.local/share/wallpapers/Bonsai"
};

const default_location = "/home/texter/Desktop";
const locations = {
    5: "/home/texter/Documents/Programming/Plasma"
};

workspace.currentDesktopChanged.connect(function() {
    desktop_number = workspace.currentDesktop.x11DesktopNumber;
    const wallpaper = (desktop_number in wallpapers) ? wallpapers[desktop_number] : default_wallpaper;
    const location = (desktop_number in locations) ? locations[desktop_number] : default_location;
    configure = `
        var d = desktopForScreen(0);
        d.currentConfigGroup = ["General"];
        d.writeConfig("url", "${location}");
        d.wallpaperPlugin = "org.kde.image";
        d.currentConfigGroup = ["Wallpaper", "org.kde.image", "General"];
        d.writeConfig("Image", "${wallpaper}");
    `;
    callDBus(
        "org.kde.plasmashell",
        "/PlasmaShell",
        "org.kde.PlasmaShell",
        "evaluateScript",
        configure
    );
});


