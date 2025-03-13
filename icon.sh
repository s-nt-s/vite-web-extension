#!/bin/bash

doImg() {
    pointsize=$((${1} / 6))
    convert src/assets/img/logo.svg -resize "${1}x${1}" "public/icon-${1}.png"
    convert src/assets/img/logo.svg -resize "${1}x${1}" -gravity center -fill red -font "Ubuntu-Mono-Bold" \
    -size "${1}x${1}" -pointsize "$pointsize" -density 300 \
    -annotate 45 "DEV"  public/dev-icon-${1}.png
}

doImg 32
doImg 128
