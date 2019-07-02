const Meta = imports.gi.Meta;
const Main = imports.ui.main;
const Shell = imports.gi.Shell;

const SHORTCUT_KEY = 'shortcut-key';

const Self = imports.misc.extensionUtils.getCurrentExtension();
const Convenience = Self.imports.convenience;

let settings = Convenience.getSettings();

var currentWorkspace = -1;
var lastWorkspace = -1;

function goToLastWorkspace() {
  if (lastWorkspace < 0) {
    return;
  }

  // keep global.screen for backwards compatibility
  let ws = (global.screen || global.workspace_manager).get_workspace_by_index(lastWorkspace);
  ws.activate(global.get_current_time());
}


function init() {
}

let signals = [];

function enable() {
  var ModeType = Shell.hasOwnProperty('ActionMode') ? Shell.ActionMode : Shell.KeyBindingMode;
  Main.wm.addKeybinding(SHORTCUT_KEY, settings, Meta.KeyBindingFlags.NONE, ModeType.NORMAL | ModeType.OVERVIEW, goToLastWorkspace);

  signals.push((global.screen || global.workspace_manager).connect('workspace-switched', function(display, prev, current, direction) {
    lastWorkspace = currentWorkspace;
    currentWorkspace = current;
  }));
}

function disable() {
  // clean up
  Main.wm.removeKeybinding(SHORTCUT_KEY);

  let i = signals.length;
  while (i--) {
    (global.screen || global.workspace_manager).disconnect(signals.pop());
  }

}
