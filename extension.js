import Meta from "gi://Meta";
import Shell from "gi://Shell";

import * as Main from "resource:///org/gnome/shell/ui/main.js";

import {
  Extension,
  gettext as _,
} from "resource:///org/gnome/shell/extensions/extension.js";

// Globals
const SHORTCUT_KEY = "shortcut-key";

let currentWorkspace = 0;
let lastWorkspace = -1;

export default class GoToLastWorkspace extends Extension {
  signals = [];
  enable() {
    this._settings = this.getSettings();

    const ModeType = Shell.hasOwnProperty("ActionMode")
      ? Shell.ActionMode
      : Shell.KeyBindingMode;

    Main.wm.addKeybinding(
      SHORTCUT_KEY,
      this._settings,
      Meta.KeyBindingFlags.NONE,
      ModeType.NORMAL | ModeType.OVERVIEW,
      this._goToLastWorkspace,
    );

    this.signals.push(
      global.workspace_manager.connect(
        "workspace-switched",
        function (display, prev, current, direction) {
          lastWorkspace = currentWorkspace;
          currentWorkspace = current;
        },
      ),
    );
  }

  disable() {
    // clean up
    this._settings = null;
    Main.wm.removeKeybinding(SHORTCUT_KEY);

    let i = this.signals.length;
    while (i--) {
      global.workspace_manager.disconnect(this.signals.pop());
    }
  }

  _goToLastWorkspace() {
    if (lastWorkspace < 0) {
      return;
    }

    let ws = global.workspace_manager.get_workspace_by_index(lastWorkspace);
    ws.activate(global.get_current_time());
  }
}
