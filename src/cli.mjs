// -*- coding: utf-8, tab-width: 2 -*-

import 'p-fatal';
import 'usnam-pmb';

import lodash from 'lodash';

import parseCliArgs from 'cli-args-parse-dashdash-2402-pmb';


function env(k, d) { return String(process.env[k] || d || ''); }


const injections = {
  env,
  lodash,
};


const EX = async function cliMain() {
  const ctx = {
    ...EX.injections,
    inputs: {},
    invokedAs: env('INVOKED_AS'), // exported by cli.sh
  };

  [ctx.cliOpt, ...ctx.cliArgs] = parseCliArgs(process.argv.slice(2));
  ctx.pluginFile = (function decidePluginName() {
    let p = process.cwd() + '/' + ctx.invokedAs.split('/').slice(-1)[0];
    p = p.replace(/\.sh$/, '');
    p = p.replace(/(?:(\/)|\.|\-)cli$/, '$1');
    p = p.replace(/\/$/, '/plugin');
    p += '.js';
    return p;
  }());

  const pluginImpl = await import(ctx.pluginFile);
  Object.assign(ctx.inputs, (pluginImpl.parseCliArgs || Boolean)(ctx));
  lodash.mapValues(pluginImpl.inputs, function grab(v, k) {
    if (ctx.inputs[k] !== undefined) { return; }
    const optVal = ctx.cliOpt[k];
    if (optVal !== undefined) {
      ctx.inputs[k] = optVal;
      return;
    }
    ctx.inputs[k] = ctx.cliArgs.shift();
  });

  const result = await pluginImpl.run(ctx);
  if (result !== undefined) { console.log(result); }
};


Object.assign(EX, {
  autorun: true,
  getInjections() { return injections; },
});



setImmediate(() => (EX.autorun && EX()));

export default EX;
