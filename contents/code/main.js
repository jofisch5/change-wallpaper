
const wallpapers = [
    "/usr/share/wallpapers/Foreland",
    "/home/texter/.local/share/wallpapers/A Small Tree"
];

workspace.currentDesktopChanged.connect(function() {
    // print("Desktop changed to desktop " + workspace.currentDesktop.x11DesktopNumber);
    desktop_number = workspace.currentDesktop.x11DesktopNumber - 1;
    if (desktop_number >= wallpapers.length) {
        return;
    }
    set_wallpaper = `
        var d = desktops()[0];
        d.wallpaperPlugin = "org.kde.image";
        d.currentConfigGroup = Array("Wallpaper", "org.kde.image", "General");
        d.writeConfig("Image", "${wallpapers[desktop_number]}");`;

    callDBus(
        "org.kde.plasmashell",
        "/PlasmaShell",
        "org.kde.PlasmaShell",
        "evaluateScript",
        set_wallpaper
    );
});


