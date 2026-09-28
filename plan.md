# Implementation Plan

> EDITING DIRECTIVE: USER AND AGENT EDIT THIS FILE COLLABORATIVELY. THE USER MUST REVIEW AND APPROVE ITS CONTENT.

Purpose of this file: Turn the approved specification into ordered, updatable implementation and verification work.

## Instructions for the user

Preserve the approved requirements and verify the completed work. Direct priorities, scope, and meaningful checkpoints; judge technical choices, risks, and proposed changes; and approve results only after checking them against the specification rather than relying solely on the agent's report.

If the intended result changes, update the specification. If only the route changes, update this plan and record the revision.

## Instructions for the agent

Read AGENTS.md, brief.md, research.md, spec.md, and this file, then inspect the relevant project files. Begin with a concise orientation and one focused question.

Guide planning one stage at a time. Surface dependencies, risks, and verification needs without expanding scope or making decisions for the user. Draft concise, project-specific tasks and keep them current. Never mark approval gates or user-verification items complete on the user's behalf.

## Approach

Approved implementation approach — 27 September 2026.

Keep the calculator as a locally served, browser-only page. Separate factor records and calculation functions from the existing `index.html` interface so each figure can be traced to a source and checked without depending on the display. Rework the fixed daily prompt rows into editable project activities: text, image, video, and coding. Add streaming and personal video-meeting inputs alongside the project, then calculate a same-period comparison and show low/central/high assumption scenarios only for factors that support them. Carry forward an existing daily or lifestyle comparison only when its units, time period, boundary, and sources can be verified for use with the new project view; otherwise omit it from the new comparison.

Use one factor record per activity/scenario: source and version, unit, configuration, geography/year, included and excluded components, metric coverage, and uncertainty meaning. An unavailable metric stays unknown in rows and totals; a known subtotal must say which activities it omits. Keep electricity, carbon, and water calculations separate so factors with different boundaries are not silently combined. Text words/tokens should have one canonical stored workload to avoid conversion drift; image count and video duration already include rejected outputs, so no extra revision multiplier is applied.

The main dependency is evidence, not styling: `research.md` identifies historical streaming/meeting scenarios and unresolved commercial image, video, and coding factors. Before exposing any numerical default, reproduce its source calculation or label it as a narrow historical/illustrative scenario. If no defensible factor exists, show the workload and an unknown impact rather than inventing a coefficient. Audit the old EcoLogits snapshot, inherited “95% confidence” wording, and daily/lifestyle comparisons before reusing them.

Build in checkpoints: evidence and calculation rules; professional AI tasks and project totals; streaming and meetings; assumptions and source display; integration and verification. The existing page has no package setup, and `node` is unavailable in this workspace, so local verification should use a simple static server and browser checks, with dependency-free calculation checks where feasible.

## Checklist

Replace or expand the implementation placeholders below with tasks specific to the approved specification.

### Approval gates

- [ ] User has independently verified the research claims and selected features (approval recorded in `research.md`; independent verification remains open there)
- [x] User has reviewed and approved the specification (recorded in `spec.md`, 27 September 2026)
- [x] User has reviewed and approved the implementation approach and task sequence (27 September 2026)

### Implementation

#### Checkpoint 1 — evidence and calculation foundation

- [x] Inventory existing inputs, comparisons, report/share behavior, and numerical claims; map each to the approved specification and identify incompatible daily assumptions or unsupported wording.
- [x] Verify and version the candidate factors for text, images, video, coding, streaming by device, meetings, grid carbon, and available water. Record units, boundaries, provenance, dates, and scenario meaning; reject or leave unknown any factor that cannot support the proposed calculation.
- [x] Define a common activity result for energy, carbon, and water that distinguishes known values, unknown values, and incomplete subtotals; define same-period aggregation and avoid double-counting included components.
- [ ] Check the baseline page locally and preserve a reproducible reference for comparison during the build. (The original tracked page remains recoverable in Git; it was not browser checked before replacement.)

#### Checkpoint 2 — professional AI tasks and project totals

- [x] Present visible text, image, video, and coding task options; let employees add, edit, and remove tasks without random selection.
- [x] Implement text length × count with reversible words/tokens display conversion; implement coding tokens × count, total generated images, and combined generated video duration.
- [x] Show task-level energy/carbon/available water, unknown metrics, and project subtotals/totals. Ensure revisions and rejected image/video outputs are counted once through the entered totals.

#### Checkpoint 3 — broader digital comparisons

- [x] Add streaming duration and visible device options using verified, labelled device scenarios; include only supported energy/carbon/water metrics.
- [x] Add personal video-meeting duration in participant-hours, with device/network/data-centre boundary notes and no implicit participant multiplier.
- [x] Combine these activities with the AI project on the same selected period and clearly distinguish project totals from broader comparison totals.

#### Checkpoint 4 — uncertainty, presentation, and integration

- [x] Expose low/central/high scenarios where source evidence supports them; recalculate affected rows and totals and explain what changed. Remove unsupported statistical confidence language.
- [x] Attach plain-language source, year/geography, boundary, and missing-component notes to factual and numerical claims; make unknown water and other omitted metrics visible.
- [x] Bring methodology, verified comparison charts, share links, reset behavior, and generated report into line with the new activity model; omit inherited comparisons whose units, period, boundary, or sources cannot be verified.
- [ ] Check keyboard use, labels, mobile layout, and readability for Alex, Jordan, and Robin's reference paths. (Labels and 500px layout inspected; manual keyboard review remains.)

#### Checkpoint 5 — verify and deliver

- [x] Check factor arithmetic and unit conversions against source records, including text/coding multiplication, revisions, participant-hours, device choice, scenario switching, missing metrics, and compatible totals.
- [x] Run the calculator locally and exercise the three reference profiles on desktop and narrow screens; record observed results and any limits.
- [x] Keep `spec.md` aligned if an intended behavior changes, update this plan when the route changes, and commit meaningful verified checkpoints without secrets.

### Verification

- [ ] User has checked feature behavior and calculations against the specification and sources independently of the agent
- [ ] User has confirmed factual and numerical claims have working citations and communicate important limitations or uncertainty
- [ ] User has confirmed the project runs locally, serves all three reference profiles, and matches the specification

### Delivery

- [ ] Commit meaningful checkpoints and export the working chat transcripts
- [ ] Add the provided Project 2 debrief, complete it after verification, and export its transcript

## Revisions

Record material changes to the approach, sequence, or checklist and explain why they were made.

- 27 September 2026: Drafted the five-feature implementation sequence from the approved specification and source gaps in `research.md`. Plan approval remains pending.
- 27 September 2026: User chose to keep existing daily/lifestyle comparisons only when their units and sources can be verified; the approach also requires a compatible period and boundary before using them in the new project view.
- 27 September 2026: User approved the implementation plan in the planning conversation: “looks good to me”.
- 27 September 2026: Implementation uses Mistral's explicit 400-token text disclosure for carbon and water, an older image energy benchmark, three open-video energy scenarios, Carbon Trust device-specific streaming carbon, and German case-study meeting carbon. Coding impacts and unsupported metrics remain unknown. The old daily/lifestyle comparisons were omitted because their period and boundaries do not match the project view. Browser rendering was checked for Alex, Jordan, and Robin at desktop/narrow widths; arithmetic was checked separately. The user-verification gates remain open.
- 27 September 2026: Local verification: JavaScript syntax and calculation checks passed for word/token conversion, text and coding workload, image/video energy, scenario ordering, streaming/meeting carbon, and unknown subtotals. Python static server returned HTTP 200 for the page and all modules; headless Chrome rendered all three profile states, with Robin at narrow width. A 500px screenshot showed wrapped controls. No manual keyboard interaction or source-by-source user review was performed.

## Commands

### Start planning

User: Open the project repository as your workspace, start a fresh chat, and type `start planning`.

### Start implementation

User: After approving the plan, open the project repository in a fresh chat and type `start implementation`.

Agent: Read AGENTS.md, brief.md, spec.md, and this file, then inspect only the project files relevant to the approved work. Follow AGENTS.md and the approved plan. Do not begin implementation if the plan has not been approved. Keep the plan current, but never mark approval gates or user-verification items complete on the user's behalf.

### Save transcript

Agent: At the end of planning, remind the user that the transcript is a deliverable and ask them to say `save transcript`. Wait for that direction. When directed, save the entire conversation in the `transcripts/` directory as `plan-YYYY-MM-DD_HHMMSS.md`, mark user and agent responses clearly, and confirm the saved relative path.

Agent: At the end of every implementation chat, remind the user to say `save transcript`. When directed, save the entire conversation as `build-YYYY-MM-DD_HHMMSS.md` using the same location and formatting.
