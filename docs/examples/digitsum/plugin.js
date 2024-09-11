/* -*- coding: UTF-8, tab-width: 2 -*- */
'use strict';
(function setup() {
  const EX = {

    name: 'Digit sum',

    description: `
      Add all the digits of a number.
      `,

    inputs: {

      number: {
        uiType: 'string',
        uiTypeOpt: { typicalLength: 20 },
      },

    },

    run(ctx) {
      let sum = 0;
      const num = String(ctx.inputs.number || '');
      const bad = num.replace(/\d/g, function digit(d) {
        sum += +d;
        return '';
      });
      if (bad) { throw new Error('Found unexpected non-digit character(s)!'); }
      return sum;
    },

  };







  (function unifiedExport(e) {
    /* global define */
    const d = ((typeof define === 'function') && define);
    const m = ((typeof module === 'object') && module);
    if (d && d.amd) { d(function f() { return e; }); }
    if (m && m.exports) { m.exports = e; }
  }(EX));
}());
