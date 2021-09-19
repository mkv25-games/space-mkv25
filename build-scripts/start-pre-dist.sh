#!/bin/bash

run() {
  cd mainui
  npm install
  npm run build
  cd ..
  APP_MODE=local-dist electron-forge start
}

scriptCancelled="false"
trap catchStop INT
catchStop() {
    echo ""
    pkill -P $$
    echo "[start-pre-dist.sh] Stopped local pre-distribution application".
    scriptCancelled="true"
    trap - INT
    exit
}

waitForStop() {
    while :
    do
        if [ "$scriptCancelled" == "true" ]; then
            return
        fi
        sleep 1
    done
}

run
waitForStop
return 0