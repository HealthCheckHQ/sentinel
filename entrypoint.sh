#!/bin/sh
set -e
exec node -r source-map-support/register dist/worker.js
