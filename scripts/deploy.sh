#!/bin/bash

set -ex

USERNAME=chaiinchomp
IMAGE=fashion-crossing-api
HEROKU_APP=fashion-crossing-api
VERSION=`cat VERSION`

./scripts/build.sh

docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$VERSION
docker push $USERNAME/$IMAGE:latest
docker push $USERNAME/$IMAGE:$VERSION
heroku container:push web --app $HEROKU_APP
heroku container:release web --app $HEROKU_APP