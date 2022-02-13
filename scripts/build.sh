#!/bin/sh

set -o errexit
set -o nounset
set -o pipefail

echo $(date +'%Y-%m-%d %H:%M:%S'): "Start building."

echo "webpacking..."
yarn webpack > webpack.log

echo "assets copying..."
OUT_DIR="dist"
FE_DIR="src/frontend"
CP_LIST="
  assets
  *.bd.js
  *.bd.css
  favicon.ico
  sitemap.xml
"

rm -rf $OUT_DIR
mkdir -p $OUT_DIR
for item in $CP_LIST
do
  cp -r $FE_DIR/$item $OUT_DIR
done

echo "pages rendering..."

echo $(date +'%Y-%m-%d %H:%M:%S'): "Done building."
