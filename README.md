Go To Last Workspace
====================

Extension for the Gnome Shell to quickly toggle between the two last
workspaces with a single key (Super+Escape).

It installs a keybinding which defaults to `<Super>escape`. Repeatedly
pressing the shortcut key causes the active workspace to toggle
between the last two selected workspaces.

Tested with Gnome version 3.20 through 3.30.

## Adjusting the shortcut key

To change the default shortcut run something like this:

    gsettings --schemadir $HOME/.local/share/gnome-shell/extensions/gnome-shell-go-to-last-workspace@github.com/schemas \
    set org.gnome.shell.extensions.go-to-last-workspace shortcut-key "['<Super>w','<Alt>F1']"
