const Meta = imports.gi.Meta;
const Main = imports.ui.main;
const Shell = imports.gi.Shell;
const WorkspaceSwitcherPopup = imports.ui.workspaceSwitcherPopup;

const SHORTCUT_KEY = 'shortcut-key';

let settings = imports.misc.extensionUtils.getSettings();

var lastWorkspace = -1;
let workspacesSwitcherPopup;

function getWorkspaceSwitcherPopup() {
  if (!workspacesSwitcherPopup) {
    workspacesSwitcherPopup = new WorkspaceSwitcherPopup.WorkspaceSwitcherPopup({
      reactive: false,
    });
    workspacesSwitcherPopup.connect('destroy', () => {
      workspacesSwitcherPopup = null;
    });
  }
  return workspacesSwitcherPopup;
}

function getDirection() {
  if (global.workspace_manager.get_active_workspace_index() > lastWorkspace) {
    return Meta.MotionDirection.LEFT;
  } else {
    return Meta.MotionDirection.RIGHT;
  }
}

function goToLastWorkspace() {
  if (lastWorkspace < 0) {
    return;
  }
  getWorkspaceSwitcherPopup().display(getDirection(), lastWorkspace);
  const ws = global.workspace_manager.get_workspace_by_index(lastWorkspace);
  Main.wm.actionMoveWorkspace(ws);
}

function init() {}

let signals = [];

function enable() {
  var ModeType = Shell.hasOwnProperty('ActionMode') ? Shell.ActionMode : Shell.KeyBindingMode;
  Main.wm.addKeybinding(
    SHORTCUT_KEY,
    settings,
    Meta.KeyBindingFlags.NONE,
    ModeType.NORMAL | ModeType.OVERVIEW,
    goToLastWorkspace,
  );

  signals.push(
    (global.screen || global.workspace_manager).connect(
      'workspace-switched',
      function (display, prev, current, direction) {
        lastWorkspace = prev;
      },
    ),
  );
}

function disable() {
  // clean up
  Main.wm.removeKeybinding(SHORTCUT_KEY);

  let i = signals.length;
  while (i--) {
    (global.screen || global.workspace_manager).disconnect(signals.pop());
  }
}
