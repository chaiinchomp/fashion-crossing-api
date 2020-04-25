#!/bin/bash

set -ex

USERNAME=chaiinchomp
IMAGE=fashion-crossing-api

docker build                 \
  --no-cache                 \
  -t $USERNAME/$IMAGE:latest \
  .
