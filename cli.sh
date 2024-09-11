#!/bin/bash
# -*- coding: utf-8, tab-width: 2 -*-
export INVOKED_AS="$0"
exec nodemjs "$(readlink -m -- "$BASH_SOURCE"/..)/src/cli.mjs" "$@"; exit $?
# In external projects, you can basically copy this, and in your cli.mjs
# just write: import 'ghpages-calculator-plugin-frontend-2408-pmb/src/cli.mjs';
