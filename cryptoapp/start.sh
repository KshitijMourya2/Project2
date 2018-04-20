#!/bin/bash

export PORT=5600

cd ~/www/cryptoapp
./bin/cryptoapp stop || true
./bin/cryptoapp start
