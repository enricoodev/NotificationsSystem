fx_version "cerulean"
game "gta5"
lua54 "yes"     
version "1.0.0"

author "ByteDevs - Enrico"
description "Notifications System"

client_script "client.lua"

shared_scripts {
    "config.lua"
}

ui_page "web/index.html"

files {
    "web/index.html",
    "web/style.css",
    "web/script.js",
    "web/sound/sound.mp3"
}
