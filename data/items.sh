#!/bin/bash

ITEMS_PATH="../../google-sheets-to-json/out/items.json"
CLOTHING_PATH="clothing.json"

set -e

import() {
  node tools/import.js $ITEMS_PATH $CLOTHING_PATH
}

import $@
