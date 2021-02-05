#!/bin/bash

BUILD_PATH="../testgae2/_frontend"
if [ -d ${BUILD_PATH} ]; then
  rm -rf ${BUILD_PATH}
fi
yarn build
mv ./dist ${BUILD_PATH}
