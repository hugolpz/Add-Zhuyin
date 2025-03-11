#!/bin/bash

if [ "$1" == "chrome" ]; then
  sed -i 's/"scripts": \["background.js"\]/"service_worker": "background.js"/' manifest.json
  sed -i '/"browser_specific_settings": {/,/},/d' manifest.json
  sed -i 's/"start": "web-ext run"/"start": "webpack-dev-server --open"/' package.json
  sed -i 's/"web-ext": "^6.0.0"/"webpack-dev-server": "^3.0.0"/' package.json
  echo "Switched to Chrome configuration."
elif [ "$1" == "firefox" ]; then
  sed -i 's/"service_worker": "background.js"/"scripts": ["background.js"]/' manifest.json
  sed -i '/"background": {/a \ \ "browser_specific_settings": {\n\ \ \ \ "gecko": {\n\ \ \ \ \ \ "id": "add-zhuyin@wikipedia.org"\n\ \ \ \ }\n\ \ },' manifest.json
  sed -i 's/"start": "webpack-dev-server --open"/"start": "web-ext run"/' package.json
  sed -i 's/"webpack-dev-server": "^3.0.0"/"web-ext": "^6.0.0"/' package.json
  echo "Switched to Firefox configuration."
else
  echo "Usage: $0 {chrome|firefox}"
fi
