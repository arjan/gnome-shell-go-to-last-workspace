// Library imports
const GObject = imports.gi.GObject;
const Gdk = imports.gi.Gdk;
const Gtk = imports.gi.Gtk;
const ExtensionUtils = imports.misc.extensionUtils;

// Globals
const pretty_names = {
  "shortcut-key": "Go to last workspace",
};

function init() {}

function buildPrefsWidget() {
  let model = new Gtk.ListStore();

  model.set_column_types([
    GObject.TYPE_STRING,
    GObject.TYPE_STRING,
    GObject.TYPE_INT,
    GObject.TYPE_INT,
  ]);

  let settings = ExtensionUtils.getSettings();

  for (key in pretty_names) {
    append_hotkey(model, settings, key, pretty_names[key]);
  }

  let treeview = new Gtk.TreeView({
    model: model,
  });

  let col;
  let cellrend;
  cellrend = new Gtk.CellRendererText();
  col = new Gtk.TreeViewColumn({
    title: "Keybinding",
  });
  col.pack_start(cellrend, true);
  col.add_attribute(cellrend, "text", 1);
  treeview.append_column(col);

  cellrend = new Gtk.CellRendererAccel({
    editable: true,
    "accel-mode": Gtk.CellRendererAccelMode.GTK,
  });
  cellrend.connect("accel-edited", function (rend, iter, key, mods) {
    let value = Gtk.accelerator_name(key, mods);
    log("change");
    log(value);
    log(key);
    log(mods);
    let [success, iter1] = model.get_iter_from_string(iter);
    if (!success) {
      throw new Error("Something be broken, yo.");
    }
    let name = model.get_value(iter1, 0);
    model.set(iter1, [2, 3], [mods, key]);
    settings.set_strv(name, [value]);
  });

  col = new Gtk.TreeViewColumn({
    title: "Accel",
  });

  col.pack_end(cellrend, false);
  col.add_attribute(cellrend, "accel-mods", 2);
  col.add_attribute(cellrend, "accel-key", 3);
  treeview.append_column(col);
  treeview.expand_all();

  return treeview;
}

function append_hotkey(model, settings, name, pretty_name) {
  let [_something, key, mods] = Gtk.accelerator_parse(
    settings.get_strv(name)[0]
  );
  let row = model.insert(-1);
  model.set(row, [0, 1, 2, 3], [name, pretty_name, mods, key]);
}
