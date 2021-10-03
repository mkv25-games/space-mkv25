#!/bin/bash

run() {
    cd mainui
    npm install
    npm run serve &
    cd ..
    APP_MODE=local-dev npm run forge-start
}

scriptCancelled="false"
trap catchStop INT
catchStop() {
    echo ""
    pkill -P $$
    echo "[start-dev.sh] Stopped dev server and application".
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