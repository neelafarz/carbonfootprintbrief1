/**
 * Font size control
 *
 * Adds a small fixed widget with a slider that scales the page's text size
 * for legibility. Works by setting the root <html> element's font-size as a
 * percentage; since the rest of the stylesheet is written in rem units,
 * scaling the root scales every font-size, and most spacing, proportionally.
 * The chosen size is remembered in localStorage across visits.
 *
 * Self-contained: add <script src="font-size-control.js"></script> before
 * </body> in index.html. No other files or markup required.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'aipf-font-scale';
  var MIN = 80, MAX = 150, STEP = 10, DEFAULT = 100;

  // Inject the widget's markup. Positioned just below the background-color
  // picker (which sits at top:12px), so the two stack without overlapping.
  var widget = document.createElement('div');
  widget.id = 'font-size-picker';
  widget.innerHTML =
    '<label for="font-size-input">Text size</label>' +
    '<input type="range" id="font-size-input" min="' + MIN + '" max="' + MAX + '" step="' + STEP + '" value="' + DEFAULT + '" aria-label="Adjust page text size">' +
    '<span id="font-size-value">' + DEFAULT + '%</span>';
  document.body.appendChild(widget);

  // Inject the widget's styles.
  var style = document.createElement('style');
  style.textContent =
    '#font-size-picker { position: fixed; top: 54px; right: 12px; z-index: 1000; ' +
    'display: flex; align-items: center; gap: 6px; ' +
    'background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 6px; ' +
    'padding: 5px 9px; font-family: var(--font-body); font-size: 0.75rem; color: var(--text-secondary); }' +
    '#font-size-picker #font-size-value { font-variant-numeric: tabular-nums; min-width: 2.6em; text-align: right; }';
  document.head.appendChild(style);

  function apply(pct) {
    document.documentElement.style.fontSize = pct + '%';
  }

  var input = document.getElementById('font-size-input');
  var valueLabel = document.getElementById('font-size-value');

  var saved = parseInt(localStorage.getItem(STORAGE_KEY), 10);
  if (!isNaN(saved) && saved >= MIN && saved <= MAX) {
    input.value = saved;
    apply(saved);
    valueLabel.textContent = saved + '%';
  }

  input.addEventListener('input', function () {
    var pct = parseInt(input.value, 10);
    apply(pct);
    valueLabel.textContent = pct + '%';
    localStorage.setItem(STORAGE_KEY, String(pct));
  });
})();
