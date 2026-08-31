/**
 * Background color picker
 *
 * Adds a small fixed widget in the top-right corner with a native color
 * input. Changing it sets the page's --bg CSS variable (which index.html's
 * `body { background: var(--bg); }` rule uses) and remembers the choice in
 * localStorage, so it's still applied the next time the page loads.
 *
 * Self-contained: just add <script src="background-color.js"></script>
 * before </body> in index.html. No other files or markup required.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'aipf-page-bg';

  // Inject the widget's markup.
  var widget = document.createElement('div');
  widget.id = 'bg-picker';
  widget.innerHTML =
    '<label for="bg-color-input">Background</label>' +
    '<input type="color" id="bg-color-input" value="#ffffff" aria-label="Choose page background color">';
  document.body.appendChild(widget);

  // Inject the widget's styles.
  var style = document.createElement('style');
  style.textContent =
    '#bg-picker { position: fixed; top: 12px; right: 12px; z-index: 1000; ' +
    'display: flex; align-items: center; gap: 6px; ' +
    'background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 6px; ' +
    'padding: 5px 9px; font-family: var(--font-body); font-size: 0.75rem; color: var(--text-secondary); }';
  document.head.appendChild(style);

  // Restore a previously saved color, then wire up live changes.
  var input = document.getElementById('bg-color-input');
  var saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    document.documentElement.style.setProperty('--bg', saved);
    input.value = saved;
  }
  input.addEventListener('input', function () {
    document.documentElement.style.setProperty('--bg', input.value);
    localStorage.setItem(STORAGE_KEY, input.value);
  });
})();
