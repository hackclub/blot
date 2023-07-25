#!/bin/sh

yarn set version berry
cd ../..
yarn config set enableImmutableInstalls false
yarn plugin import workspace-tools
yarn config set nodeLinker node-modules
yarn install
yarn build