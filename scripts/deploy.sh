#!/bin/sh

set -o errexit
set -o nounset
set -o pipefail

OUT_DIR=../johnlemon93.github.io
cp -r dist/ $OUT_DIR
echo $(date +'%Y-%m-%d %H:%M:%S'): "Deployed to $OUT_DIR."
