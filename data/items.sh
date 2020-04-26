#!/bin/bash

CLOTHING_PATH="clothing.json"

set -e

import() {
  node tools/import.js $CLOTHING_PATH
}

import $@
