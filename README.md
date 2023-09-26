# Go To Last Workspace

Extension for the Gnome Shell to quickly toggle between the two last
workspaces with a single key (Super+Escape).

It installs a keybinding which defaults to `<Super>Escape`. Repeatedly
pressing the shortcut key causes the active workspace to toggle
between the last two selected workspaces.

**NOTE:** This latest version v11 of the extension works only supports Gnome 45.

## Installation

### For latest release supporting Gnome 45:

Use GNU make:

    make install

To just pack/build the extension without installation

    make build

### For Gnome verions 3.28 to 44:

* Grab the extension from **[Gnome Extensions](https://extensions.gnome.org/extension/1089/go-to-last-workspace/)**

* Manual : Grab the latest release and unzip to `.local/share/gnome-shell/extensions/gnome-shell-go-to-last-workspace@github.com/`

## Adjusting the shortcut key

From extension version 6 it is possible to change the shortcut key using an extension preferences window.

Alternatively, to change the default shortcut run something like this:

    gsettings --schemadir $HOME/.local/share/gnome-shell/extensions/gnome-shell-go-to-last-workspace@github.com/schemas \
    set org.gnome.shell.extensions.go-to-last-workspace shortcut-key "['<Super>Tab']"

## Older Gnome versions (manual extension installation)

If you by some reason need run this awesome extension on ancient Gnome 3.20, e.g. on Ubuntu 16.04, please use the following instructions:

0. Go to your user local extension directory:

`$ cd ~/.local/share/gnome-shell/extensions`

1. Remove the extension if it exists:

`$ rm -rf ./gnome-shell-go-to-last-workspace@github.com/`

2. Clone source code:

`$ git clone https://github.com/arjan/gnome-shell-go-to-last-workspace.git`

3. Rename the cloned repo to correspond the extension UUID:

`$ mv gnome-shell-go-to-last-workspace gnome-shell-go-to-last-workspace@github.com`

4. Pick an old working revision:

`$ git checkout 6c82ffa82b869e6a97928709788f9a68b38369fa`

5. Set the default hotkey:

`$ gsettings --schemadir ~/.local/share/gnome-shell/extensions/gnome-shell-go-to-last-workspace@github.com/schemas set org.gnome.shell.extensions.go-to-last-workspace shortcut-key "['<Super>Escape']"`

6. Restart Gnome Shell:

Press `Alt+F2`, then type `r` and press enter key.
