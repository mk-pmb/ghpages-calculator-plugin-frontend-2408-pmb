#!/bin/bash
# -*- coding: utf-8, tab-width: 2 -*-

function cli_main () {
  export LANG{,UAGE}=en_US.UTF-8  # make error messages search engine-friendly
  local INVOKED_AS="$(basename -- "$0" .sh)"
  export INVOKED_AS
  local INVOKED_IN="$(readlink -m -- "$(dirname -- "$0")")"
  export INVOKED_IN
  local REPOPATH="$(readlink -m -- "$BASH_SOURCE"/..)"
  nodemjs "$REPOPATH/src/cli.mjs" "$@" || return $?
}

cli_main "$@"; exit $?
