/* -*- coding: UTF-8, tab-width: 2 -*- */
'use strict';
(function setup() {
  const win = require('window-pmb');
  const jq = win.jQuery;
  const ld = win._;
  const qry = new URLSearchParams(win.location.search);

  const EX = {

    renderPlugin(pluginImpl) {
      EX.getPluginImpl = Object.bind(null, pluginImpl);
      jq('title').first().text(pluginImpl.name);
      const body = jq('body').html('');
      EX.logDiv = jq('<div class="log">').appendTo(body);
      EX.inputsForm = jq('<form action="nope://" method="get"'
        + ' class="plugin-inputs"'
        + '>').appendTo(body);
      EX.inputsForm[0].onsubmit = function runSoon() {
        setTimeout(EX.runPlugin, 10);
        return false;
      };
      EX.inputFieldsMap = {};
      EX.renderInputs({
        dest: EX.inputsForm,
      }, pluginImpl.inputs);
      const submitWrap = jq('<div class="plugin-input">')
        .appendTo(EX.inputsForm);
      jq('<input type="submit" value="&#x1F680;">').appendTo(submitWrap);
      EX.pageBottom = jq('<a id="bottom" name="bottom">').appendTo(body);
    },

    renderInputs(ctx, specs) {
      ld.mapValues(specs, (v, k) => EX.renderOneInput(ctx, k, v));
    },

    renderOneInput(ctx, name, spec) {
      const wrap = jq('<div class="plugin-input">').appendTo(ctx.dest);
      wrap.data({ name });
      const label = jq('<label>').appendTo(wrap);
      label.append(jq('<p>').text(spec.caption || ld.upperFirst(name)));

      const { uiType } = spec;
      const uiTypeOpt = (spec.uiTypeOpt || false);
      let field;
      (function decideFieldType() {
        if (uiType === 'string') {
          const size = (+uiTypeOpt.typicalLength || 20);
          const multiLine = (+uiTypeOpt.multiLine || 0);
          if (multiLine >= 1) {
            field =jq('<textarea wrap="off">');
            field.attr({ cols: size, rows: multiLine });
          } else {
            field = jq('<input type="text">');
            field.attr({ size });
          }
          if (uiTypeOpt.monospace) { field.addClass('monospace'); }
          return;
        }
      }());
      if (!field) { throw new Error('Unsupported field type: ' + uiType); }
      field.attr({ name });

      field[0].value = (function decideInitialValue() {
        let iv = qry.get(name);
        if ((iv === undefined) || (iv === null)) { iv = spec.defaultValue; }
        iv = String(iv || '');
        return iv;
      }());
      EX.inputFieldsMap[name] = field;
      field.appendTo(wrap);
    },

    async runPlugin() {
      const logEntry = jq('<div class="log-entry">').appendTo(EX.logDiv);
      const logTextElem = jq('<p>').appendTo(logEntry);
      const ctx = {
        hostQuery: qry,
        hostWindow: win,
        inputs: ld.mapValues(EX.inputFieldsMap, f => f[0].value),
        jQuery: jq,
        lodash: ld,
        logEntry,
        logTextElem,
      };
      try {
        const result = await EX.getPluginImpl().run(ctx);
        logTextElem.text(result);
        logEntry.addClass('success');
      } catch (err) {
        logTextElem.text(String(err));
        logEntry.addClass('error');
      }
      setTimeout(EX.scrollToBottom, 10);
    },


    scrollToBottom() { EX.pageBottom[0].scrollIntoView(); },

  };

  window.ui = EX;



  (function unifiedExport(e) {
    /* global define */
    const d = ((typeof define === 'function') && define);
    const m = ((typeof module === 'object') && module);
    if (d && d.amd) { d(function f() { return e; }); }
    if (m && m.exports) { m.exports = e; }
  }(EX));
}());
