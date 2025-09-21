# change-wallpaper

KWin script to change the wallpaper per virtual desktop.

## Purpose

Plasma doesn't offer to configure different backgrounds per virtual
desktop. This KWin script is a demo to show how to trigger a Plasma
Shell script changing the wallpaper when the current desktop changes.

The script assumes there is only a single screen and there are no
Activities in use.

## Usage

Modify the `wallpapers` array to contain the paths to the wallpapers
that should be shown on the respective desktop. Then install the
script with

```bash
kpackagetool6 --type=KWin/Script -i [path-to]/change-wallpaper
```

After this the script shows up in the Plasma system settings in
the KWin Scripts section. From there you can enable it.

If you want to unintall the package, first disable it and hit
apply. Then you can remove it.
