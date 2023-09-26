UUID = gnome-shell-go-to-last-workspace@github.com

build:   clean
			   mkdir -p build/
			   gnome-extensions pack -f -o build/

install: build remove
				 gnome-extensions install -f build/$(UUID).shell-extension.zip

remove:
				 rm -rf $(HOME)/.local/share/gnome-shell/extensions/$(UUID)


clean:
			   rm -rf build/
