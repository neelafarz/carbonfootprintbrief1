# Technical Specification

> EDITING DIRECTIVE: USER AND AGENT EDIT THIS FILE COLLABORATIVELY. THE USER MUST REVIEW AND APPROVE ITS CONTENT.

Purpose of this file: Define what the completed project must do so it can be planned, built, and verified.

## Instructions for the user

Translate the approved research into a specification without distorting its evidence, limitations, or uncertainty. Direct the work toward the intended result, judge gaps and trade-offs rather than accepting invented requirements, and approve only a complete, testable specification grounded in the research.

## Instructions for the agent

Read AGENTS.md, brief.md, research.md, and this file. Begin with a concise orientation and one focused question.

Guide the specification one feature at a time. Help turn approved decisions into precise requirements and surface gaps or trade-offs without inventing requirements or making product decisions. Draft concise updates for review, focus on the intended result rather than implementation steps, and never approve the specification on the user's behalf.

## Goal

Build an expanded environmental footprint calculator for employees at a national creative-media company. The calculator should help employees estimate professional AI use across text, image, video, and coding work, then compare those estimates with selected broader digital activities: streaming and video meetings.

The calculator must show energy, carbon, and available water estimates where source support exists. It must also show uncertainty, assumptions, and missing evidence clearly, so employees can understand what the estimate includes without treating modelled values as exact measurements.

The five approved feature areas are:

1. Multimodal professional AI calculator.
2. Project workload and revision calculator.
3. Device-aware streaming calculator.
4. Video meeting calculator.
5. Uncertainty and assumptions explorer.

Together these must serve the three reference employee profiles from `research.md`:

- Alex: needs image/video production, streaming context, and visible water limitations.
- Jordan: needs coding/project workloads, irregular task totals, meetings, and assumption sensitivity.
- Robin: needs simple text AI entry points, familiar comparisons, plain-language methodology, and visible uncertainty.

## Features

For each feature, define:

- the need it addresses and intended audience outcome
- its behavior, inputs, and outputs
- its calculations, supporting evidence, and uncertainty
- its interface expectations and acceptance checks

### 1. Multimodal professional AI calculator

Need and audience outcome:

- Employees can estimate AI work by the kind of task they actually performed rather than by one generic prompt count.
- Alex can represent image and video production work, including discarded attempts.
- Jordan can include generative tasks alongside coding work.
- Robin can use simple text tasks and see how each task contributes to the total.

Behavior and inputs:

- Show all AI task options on screen.
- Do not randomly generate a task.
- Employees select tasks they actually did and add them to a project.
- Employees can edit or remove added tasks.
- Text task options:
  - Draft email.
  - Summarize document.
  - Write report.
- Text task inputs:
  - Task count.
  - Length per task.
  - Toggle between words and tokens.
  - Automatically convert between words and tokens when the toggle changes.
  - Calculate text workload as length per task times task count.
- Text task counts do not include revisions or failed attempts.
- Text tasks do not need a separate revision field.
- Image generation inputs:
  - Total images generated, including rejected images, alternate versions, and revisions.
- Video generation inputs:
  - Total combined duration of generated clips.
  - Include rejected attempts and revisions in the total duration when the employee generated them.
  - Do not ask for resolution.
- Coding task inputs:
  - Tokens per coding task.
  - Coding task count.
  - Calculate coding workload as tokens per coding task times coding task count.

Outputs:

- Energy estimate for each task where a supported factor exists.
- Carbon estimate for each task where a supported factor exists.
- Available water estimate for each task where a supported factor exists.
- A combined project contribution across added AI tasks.
- Plain-language notes for any metric that is unavailable or not comparable across sources.

Calculations, evidence, and uncertainty:

- Text AI evidence comes mainly from S1 and S2 in `research.md`; their boundaries differ and must not be blended into one provider ranking.
- Image evidence comes mainly from S3 and S18; S3 is an older benchmark proxy, and S18 supports measurement methodology more than a universal default.
- Video evidence comes mainly from S4 and S18-S20; video estimates depend on model, duration, batching, assumed hardware, and allocation method.
- Coding evidence comes mainly from S5, S17, and S18; token counts are workload inputs, not direct proof of commercial coding-agent energy.
- Water estimates may be unavailable or boundary-limited for some task types. Unknown water must be displayed as unknown, not as zero.

Interface expectations and acceptance checks:

- A user can add at least one text, image, video, and coding task.
- A user can edit and remove a task after adding it.
- Text conversion changes the displayed unit without losing the entered workload meaning.
- The calculation visibly uses per-task length times task count for text and coding.
- Image/video revision impacts are represented through total generated outputs or total generated duration.
- Source notes identify which evidence supports each task type and what the limitations are.

### 2. Project workload and revision calculator

Need and audience outcome:

- Employees can combine multiple activities into a project total instead of estimating isolated single prompts.
- Alex can count discarded production work through generated image totals and generated video duration.
- Jordan can represent coding work as tokens per task times task count.
- Robin can see how the total was assembled from concrete task rows.

Behavior and inputs:

- The project calculator should collect added AI tasks into one project summary.
- Each task row should retain its task type, entered units, task count, and calculated contribution.
- Text revisions are not separately tracked.
- Image revisions are counted by entering the total number of generated images.
- Video revisions are counted by entering the total combined generated duration.
- Coding work uses tokens per coding task times coding task count.

Outputs:

- Project total energy.
- Project total carbon.
- Project total available water where supported.
- Per-task subtotal rows so employees can audit the total.
- Clear labels for unknown or omitted metrics.

Calculations, evidence, and uncertainty:

- Project totals must sum only compatible activity estimates.
- Components that are already included in a factor must not be added again.
- Scenario ranges are assumption ranges unless the cited source explicitly supports a statistical interpretation.
- The calculator must avoid labelling inherited or newly selected ranges as 95% confidence intervals unless that meaning is directly verified.

Interface expectations and acceptance checks:

- A user can build a project from multiple task types.
- The project summary updates when a task is edited or removed.
- The project total does not double-count revisions.
- The project total distinguishes available estimates from unavailable metrics.

### 3. Device-aware streaming calculator

Need and audience outcome:

- Employees can compare AI project impacts with familiar streaming activity over a similar period.
- Alex can represent reference viewing across common devices.
- Robin gets a broader digital-life comparison that is easier to understand than abstract AI units.
- Jordan can include streaming when relevant without making it the center of the profile.

Behavior and inputs:

- Employees enter streaming duration.
- Employees select the viewing device from visible device options.
- Resolution is not required unless later evidence makes it necessary and the user approves that change.

Outputs:

- Streaming energy estimate where supported.
- Streaming carbon estimate where supported.
- Water estimate only where source support exists.
- Streaming contribution included in the overall comparison total, with source and boundary notes.

Calculations, evidence, and uncertainty:

- Streaming evidence comes mainly from S6 and S7.
- These sources are historical and region-specific; current defaults need verification before implementation.
- Device choice matters and must be treated as part of the calculation boundary.
- Fixed data-volume assumptions must be handled carefully because S6 warns against simple kWh-per-GB modelling.

Interface expectations and acceptance checks:

- A user can enter streaming duration and choose a device.
- The calculator does not imply that streaming covers social media or all digital entertainment.
- The source explanation states that streaming factors are historical scenarios unless stronger current factors are verified.

### 4. Video meeting calculator

Need and audience outcome:

- Employees can estimate meeting participation as a familiar work activity.
- Robin can represent frequent meetings.
- Jordan can include calls alongside coding and project work.
- Alex can include meetings when relevant.

Behavior and inputs:

- Employees enter their own meeting duration.
- Meeting calculations are based on participant-hours.
- If whole-meeting totals are added later, the interface must distinguish personal participant-hours from whole-meeting participant totals so participants are not counted twice.

Outputs:

- Personal video meeting energy estimate where supported.
- Personal video meeting carbon estimate where supported.
- Water estimate only where source support exists.
- Notes explaining whether device, network, and data-centre components are included.

Calculations, evidence, and uncertainty:

- Video meeting evidence comes mainly from S15.
- S15 provides a historical German case study with component-level estimates; it is not a current US service measurement.
- Device and data-centre components must not be double-counted.
- Meeting duration should be counted once per participant.

Interface expectations and acceptance checks:

- A user can enter meeting duration and see a participant-hour estimate.
- The calculator explains the factor boundary in plain language.
- The calculator does not multiply personal meeting hours by participants unless a clearly separate whole-meeting mode is specified and approved.

### 5. Uncertainty and assumptions explorer

Need and audience outcome:

- Employees can see how estimates change when assumptions change.
- Jordan can inspect scenario ranges and project assumptions.
- Robin can judge the credibility of results through plain-language source notes.
- Alex can see where water estimates are limited or missing.

Behavior and inputs:

- Show the assumptions used for each selected activity.
- Let users inspect alternative low, central, and high scenarios only where the evidence supports those scenarios.
- Show source, factor boundary, unit, geography/year where relevant, and missing components.
- Do not present assumption scenarios as statistical confidence intervals unless directly verified.

Outputs:

- Updated totals under selected assumption scenarios.
- Plain-language source notes attached to factual and numerical claims.
- A visible explanation of uncertainty and missing evidence.
- Labels for unavailable metrics.

Calculations, evidence, and uncertainty:

- Assumption handling is supported by S1/S2 and S17-S21, which show that boundaries, model configuration, infrastructure location, batching, and water accounting differ.
- The explorer must preserve those differences instead of forcing every source into one false universal range.
- Water boundaries must be explained inside the selected features, but a standalone water-boundary calculator is out of scope.

Interface expectations and acceptance checks:

- A user can identify which assumptions affect totals.
- Source notes are visible for factual or numerical claims used by the calculator.
- The calculator distinguishes measured, modelled, benchmark, and illustrative values when that distinction matters.
- Unknown components are described plainly.

## User approval

Review the completed specification directly and explicitly approve it before planning begins. The agent cannot complete this approval on the user's behalf.

- [x] User explicitly approved this specification on 27 September 2026.
- [x] Specification transcript saved at `transcripts/spec-2026-09-27_231856.md`.

## Out of scope

Record ideas that will not be part of this project.

The following alternatives were considered during research and are not included in this five-feature specification:

- Gaming calculator.
- Social media calculator.
- Standalone water-boundary feature.

Reasons:

- Gaming has useful evidence for some measured scenarios, but it is deferred because the selected features cover more of the reference profiles and because a current generic desktop default still needs stronger support.
- Social media is deferred because the reviewed evidence is narrow and scenario-specific. The selected streaming feature must not be presented as measuring social media.
- A standalone water-boundary feature is deferred because complete, compatible water factors are not available across all activities. Water limitations remain visible in the selected calculators and uncertainty explorer.

The following are also out of scope unless the user explicitly approves a later specification change:

- Randomly generated tasks.
- Dropdown-only task selection.
- Video resolution input.
- Separate text revision tracking.
- Treating unknown water as zero.
- Presenting scenario ranges as confidence intervals without source support.

## Revisions

If implementation changes the intended result, update the specification and record what changed and why.

- 27 September 2026: Drafted specification from approved research and user decisions made during the specification conversation. User approval is still pending.
- 27 September 2026: User explicitly approved the completed specification.
- 27 September 2026: Saved the specification transcript at `transcripts/spec-2026-09-27_231856.md`.

## Commands

### Start specification

User: Open the project repository as your workspace, start a fresh chat, and type `start specification`.

### Save transcript

Agent: After the user approves the specification, remind them that the transcript is a deliverable and ask them to say `save transcript`. Wait for that direction.

When the user directs the agent to save the transcript, the agent saves the entire conversation in the `transcripts/` directory as `spec-YYYY-MM-DD_HHMMSS.md`, marks user and agent responses clearly, and confirms the saved relative path.
