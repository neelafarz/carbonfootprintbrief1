/**
 * Global CO2 ticker
 *
 * A simulated, ticking counter for the world's CO2 emissions since the page
 * was opened, shown next to a static readout of the reader's own entered
 * AI-use footprint for comparison.
 *
 * IMPORTANT: this is not a live feed — nothing measures global emissions in
 * real time. It takes a known annual total and divides it into an average
 * per-second rate, then animates a number climbing at that rate (the same
 * technique used by "national debt clock" style displays). The widget says
 * this plainly rather than implying real-time precision.
 *
 * Rate basis: ~37.4 billion metric tons of CO2/year from fossil fuels and
 * industry (Global Carbon Project / IEA, recent-year estimate). This figure
 * was not freshly verified against a live source when this file was written
 * — it changes little year to year, but update GLOBAL_CO2_TONNES_PER_YEAR
 * below if you want to refresh it against the latest Global Carbon Project
 * report (globalcarbonproject.org) or Our World in Data.
 *
 * Self-contained: add <script src="global-co2-ticker.js"></script> before
 * </body> in index.html. No other files or markup required. Reads the
 * existing #aipf-running element (already on the page) to find the reader's
 * daily AI-carbon figure; if that element isn't present, the comparison line
 * is simply omitted.
 */
(function () {
  'use strict';

  var GLOBAL_CO2_TONNES_PER_YEAR = 37.4e9; // Global Carbon Project / IEA, recent-year estimate
  var SECONDS_PER_YEAR = 365 * 24 * 3600;
  var RATE_KG_PER_SECOND = (GLOBAL_CO2_TONNES_PER_YEAR * 1000) / SECONDS_PER_YEAR;

  function fmtKg(kg) {
    if (kg >= 1e9) return (kg / 1e9).toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' billion kg CO2';
    if (kg >= 1e6) return (kg / 1e6).toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' million kg CO2';
    if (kg >= 1000) return (kg / 1000).toLocaleString('en-US', { maximumFractionDigits: 1 }) + ' t CO2';
    return Math.round(kg).toLocaleString('en-US') + ' kg CO2';
  }

  // Pulls the reader's own daily AI-carbon figure out of the existing page
  // text (e.g. "...costing about 12.3 g CO2e...") rather than touching the
  // calculator's own script, so this stays a fully separate add-on.
  function readDailyAiCarbonGrams() {
    var box = document.getElementById('aipf-running');
    if (!box) return null;
    var m = /costing about\s+([\d,.]+)\s*(g|kg|t)\b/.exec(box.textContent || '');
    if (!m) return null;
    var n = parseFloat(m[1].replace(/,/g, ''));
    if (isNaN(n)) return null;
    var mult = m[2] === 't' ? 1e6 : m[2] === 'kg' ? 1000 : 1;
    return n * mult;
  }
  function fmtGrams(g) {
    if (g >= 1e6) return (g / 1e6).toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' t CO2e';
    if (g >= 1000) return (g / 1000).toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' kg CO2e';
    return Math.round(g).toLocaleString('en-US') + ' g CO2e';
  }

  function build() {
    var root = document.getElementById('aipf');
    if (!root) return;

    var style = document.createElement('style');
    style.textContent =
      '#co2-ticker-value { font-family: var(--font-editorial); font-size: clamp(1.6rem, 1.1rem + 2vw, 2.4rem); ' +
      'font-weight: 600; font-variant-numeric: tabular-nums; color: var(--accent); margin: 0.3rem 0; }';
    document.head.appendChild(style);

    var section = document.createElement('section');
    section.className = 'aipf-below';
    section.id = 'co2-ticker';
    section.setAttribute('aria-label', "The world's CO2 emissions since you opened this page");
    section.innerHTML =
      '<h2 class="aipf-h2">The world’s CO2 emissions since you opened this page</h2>' +
      '<p class="aipf-sub">A simulated counter, not a live feed: global annual emissions divided into an average per-second rate, ticking up while this tab stays open.</p>' +
      '<div id="co2-ticker-value">0 kg CO2</div>' +
      '<p class="aipf-fine" id="co2-ticker-compare"></p>' +
      '<p class="aipf-fine">Based on ~37.4 billion metric tons of global CO2 emissions a year from fossil fuels and industry (Global Carbon Project / IEA estimate) ÷ seconds in a year. Excludes other greenhouse gases and land-use emissions, and is an average, not a real-time measurement.</p>';
    root.appendChild(section);

    var valueEl = document.getElementById('co2-ticker-value');
    var compareEl = document.getElementById('co2-ticker-compare');
    var startTime = performance.now();
    var lastPaint = 0;

    function updateCompareLine() {
      var grams = readDailyAiCarbonGrams();
      compareEl.textContent = grams != null
        ? 'For comparison, your entered AI use costs about ' + fmtGrams(grams) + ' a day.'
        : 'Add some AI use above to compare it against this.';
    }
    updateCompareLine();

    // Keep the comparison line in sync as the reader edits their usage rows.
    var runningBox = document.getElementById('aipf-running');
    if (runningBox && window.MutationObserver) {
      new MutationObserver(updateCompareLine).observe(runningBox, { childList: true, characterData: true, subtree: true });
    }

    function tick(now) {
      if (now - lastPaint > 100) { // throttle DOM writes to ~10fps; still reads real elapsed time
        var elapsedSeconds = (now - startTime) / 1000;
        valueEl.textContent = fmtKg(elapsedSeconds * RATE_KG_PER_SECOND);
        lastPaint = now;
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (document.readyState !== 'loading') build();
  else document.addEventListener('DOMContentLoaded', build);
})();
