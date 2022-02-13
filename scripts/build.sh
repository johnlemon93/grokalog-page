#!/bin/sh

set -o errexit
set -o nounset
set -o pipefail

echo $(date +'%Y-%m-%d %H:%M:%S'): "Start building."
export OUT_DIR="dist"
rm -rf $OUT_DIR # clean previous build
mkdir -p $OUT_DIR

echo "webpacking..."
yarn webpack > webpack.log

echo "assets copying..."
FE_DIR="src/frontend"
CP_LIST="
  assets
  *.bd.js
  *.bd.css
  favicon.ico
  sitemap.xml
"
for item in $CP_LIST
do
  cp -r $FE_DIR/$item $OUT_DIR
done

echo "pages rendering..."
rsync -r --exclude '*.md' --exclude '*.js' src/posts/ $OUT_DIR/p
node --experimental-specifier-resolution=node  ./scripts/build.js

echo $(date +'%Y-%m-%d %H:%M:%S'): "Done building."
