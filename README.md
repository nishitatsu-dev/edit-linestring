# edit-LineString

## Introduction

LineString feature at geojson file is edited on the CLI.
This module is intended to the user of the map "Vector" produced by Geospatial Information Authority of Japan.
Node version 17.0.0 or later is required.

## Installation

```shell
npm install -g @nishitatsu/edit-linestring
```

## Usage

Run the following, and answer the questions displayed at CLI. Option is not required.

```shell
edit-linestring [option]
```

### Options

```txt
  -l, --list      list the names of Features in the file
  -d, --decimate  decimate points every ~10 meters
  -s, --split     split LineString at a Point
  -j, --join      join LineStrings
  -r, --remove    remove Features
  -i, --invert    invert start and end of a LineString
  -h, --help      display help for command
```

## License

Licensed under the MIT license.
