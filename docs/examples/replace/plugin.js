/* -*- coding: UTF-8, tab-width: 2 -*- */
'use strict';
(function setup() {
  const EX = {

    name: 'Text replace demo',

    description: `
      A simple dummy module that replaces text in one of the inputs.
      `,

    inputs: {

      orig: {
        caption: 'Original text',
        uiType: 'string',
        uiTypeOpt: { typicalLength: 80, multiLine: 5 },
        help: `
          Original text in which you may want to replace some text.
          `, // No trim required here.
        examples: [],
        defaultValue: `
          Sed ut perspiciatis, unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam eaque ipsa,
          quae ab illo inventore veritatis et quasi architecto beatae vitae
          dicta sunt, explicabo.
          `.trim(),
      },

      what: {
        caption: 'Replace this',
        uiType: 'string',
        uiTypeOpt: { typicalLength: 20 },
        help: 'The old/bad text to be replaced.',
        examples: ['sit', 'quasi'],
        defaultValue: 'error',
      },

      'with': {
        caption: 'with this',
        uiType: 'string',
        uiTypeOpt: { typicalLength: 20 },
        help: 'The new/better text to use instead.',
        examples: ['stand', 'exactly'],
        defaultValue: 'crash',
      },

    },

    run(ctx) {
      const { inputs } = ctx;
      return inputs.orig.split(inputs.what).join(inputs['with']);
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
