# Research

> EDITING DIRECTIVE: USER AND AGENT EDIT THIS FILE COLLABORATIVELY. THE USER MUST REVIEW AND APPROVE ITS CONTENT.

Purpose of this file: Develop and record the evidence and decisions that will guide the technical specification.

## Instructions for the user

You are responsible for the ethics, accuracy, and fairness of the research. Direct the inquiry toward useful questions, judge sources and suggestions rather than accepting them at face value, and approve only results supported by verified evidence and audience needs. Seek evidence that challenges your assumptions, represent uncertainty honestly, and reject claims you cannot verify. See [UNESCO's Guidance for generative AI in education and research](https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research).

## Instructions for the agent

Read AGENTS.md, brief.md, and this file. Begin with a concise orientation and one focused question.

Guide the research one stage at a time. Help the user explore options, assess sources, and identify contrary evidence or uncertainty without making decisions for them. Draft concise updates for review, and never mark research or feature choices approved on the user's behalf.

## Reference employee profiles

- Alex — Los Angeles, 24, junior video editor: Uses text, image, and video-generation tools for production work. Streams reference media and uses social platforms across a phone, laptop, and television. Wants to understand impacts beyond text prompts and is particularly attentive to water use.
- Jordan — Austin, 38, creative technologist: Uses coding agents and generative tools in long, irregular sessions. Games on a desktop PC and participates in frequent video calls. Finds "prompts per day" too simplistic and wants assumptions, ranges, and project-level totals.
- Robin — Chicago, 56, operations manager: Uses text AI occasionally but spends substantial time in video meetings, streaming media, and social platforms. Is skeptical of the company's motives and needs plain-language explanations, visible sources, and honest indications of uncertainty.

These are fictional starting profiles, not evidence about demographic groups. Research the activities, circumstances, and needs they represent rather than making assumptions based on age or location.

## Audience needs

### Draft for review — 14 September 2026

Status updated 24 September 2026: the user explicitly approved the research and the five selected features. Specification has not begun, as explicitly directed by the user. No specification or implementation plan is approved. Outstanding source-verification tasks remain open.

The profile descriptions above are the source for these needs; they are fictional design inputs, not findings from employee interviews:

| Profile | Need from the brief | Assumption requiring user verification |
| --- | --- | --- |
| Alex | Image/video production, streaming and social use across devices, water impacts | Whether Alex can report attempts, clip settings, and accepted outputs |
| Jordan | Irregular coding sessions, project totals, ranges, desktop gaming and calls | Whether token logs or device measurements are available |
| Robin | Occasional text AI, meetings/streaming/social use, plain explanations and trustworthy sources | Which explanation format is understandable and credible to Robin |

### Existing project evidence checked directly

Inspected `index.html`, the calculator content in `ai-footprint`, and the project guidance. These observations describe source code, not verified environmental facts or browser-tested behavior:

- `index.html:56–59` describes a fixed coding-session proxy and an anecdotal build footprint. The anecdote has not been independently substantiated.
- `index.html:85` explicitly excludes image/video generation and retries.
- `index.html:325–334` defines output categories, including a roughly 100,000-token coding session. This is an existing assumption, not evidence of typical employee usage.
- `index.html:477` sets annualization to 365 days. Professional use needs an explicit period assumption.
- `index.html:530–555` calculates carbon using the employee-selected region and adds stored embodied emissions; it sums low/high endpoints. Neither the actual server region nor a statistical interpretation of the summed interval has been verified.
- `index.html:109–123` calls its ranges 95% confidence intervals. Reproduction against the specific EcoLogits version/data is still required.

Research implication: inspect and qualify inherited factors before reusing them. Employee residence must not silently stand for confirmed AI server location. Existing explanatory claims are not automatically trusted because they already have links.

## Possible features

The following table preserves the alternatives considered during research. The user's chosen grouping is recorded under Selected features; it is pending review, not an approved specification. Profile mappings are design judgments based on the fictional profiles above. Citations and explanations support the features rather than count as separate calculation features.

| Candidate | What the employee could calculate or learn | Profiles served | Dependency / verification need |
| --- | --- | --- | --- |
| Image-production estimate | Totals for generated variants, including discarded attempts | Alex primarily; Jordan | S3 is only a benchmark proxy; verify settings and prevent unsupported commercial-model labels |
| Video-production estimate | Totals for clip attempts and accepted footage | Alex primarily; Jordan | S4 settings differ; obtain matching factors and distinguish generation from viewing |
| Coding workload estimate | Enter actual workload or explicit session scenarios instead of a single fixed session size | Jordan primarily | S5 does not validate commercial-tool factors; avoid converting session duration directly into server energy |
| Project period and revisions | Combine activities over a named project, with retries and workdays | Jordan and Alex; Robin for team context | Agree activity units and avoid counting retries twice |
| Device-aware streaming | Compare viewing hours on selected devices over the same period as AI use | Alex and Robin | S6/S7 are historical; current device factors and consistent boundaries need checking |
| Video-call estimate | Personal participant-hours and device use, with optional meeting totals | Robin and Jordan | S10 cannot supply a reliable modern default; prevent multiplying a meeting total by participants twice |
| Desktop/console gaming estimate | Calculate hours × measured or documented device power, adding the display separately | Jordan | S8 covers consoles, not Jordan's desktop; desktop measurements/source still needed |
| Social-use estimate | Add scrolling time to the same-period digital total | Alex and Robin | S9 represents one old phone/scenario; avoid presenting its platform ranking as universal |
| Water-boundary scenarios | Compare direct cooling with a broader water estimate where compatible factors exist | Alex primarily; Robin and Jordan | S1/S2/S11 use different boundaries; unknown upstream water cannot be zero |
| Assumption sensitivity | Recalculate totals under explicit low/central/high workload and infrastructure assumptions | Jordan and Robin; Alex for water | Scenario bounds must not be labelled a statistical confidence interval |

The authoritative brief requires five meaningful features, at least two for professional AI use, at least two for broader digital life, and a fifth addressing the strongest remaining need. The user's five choices and their grouping are recorded below for review.

## Source assessments

### Audit rules

Checked directly means the specific published text/table was read. It does not mean raw measurements were reproduced, vendor infrastructure inspected, or all supplementary materials audited. Assessments below are agent recommendations for user review. No candidate coefficient is approved for implementation.

**S1 — Cooper Elsworth et al. (2025), Measuring the environmental impact of delivering AI at Google Scale, arXiv:2508.15734, v1.** [Exact paper](https://arxiv.org/html/2508.15734v1)

- Claim: May 2025 median Gemini Apps text prompt: 0.24 Wh, 0.03 g CO₂e, 0.26 mL water.
- Direct check: abstract, Table 1, §§3.3–3.4. Table 1 includes accelerator, CPU/memory, idle capacity, and overhead. §3.3 includes embodied hardware carbon and market-based electricity accounting; water uses data-centre consumptive WUE.
- Limits: provider-produced study; no independent reproduction. Median is not a workload mean. Water omits electricity-generation water in this calculation. Not a training-inclusive lifecycle total or a factor for every model.
- Confidence/recommendation: strong support for what this paper reports; use with qualifications as a dated reference, not a universal default.

**S2 — Mistral AI (22 July 2025), Our contribution to a global environmental standard for AI.** [Exact disclosure](https://mistral.ai/news/our-contribution-to-a-global-environmental-standard-for-ai/)

- Claim: 400-token Le Chat response: 1.14 g CO₂e and 45 mL water, excluding user terminals.
- Direct check: inference bullet, upstream-impact explanation, “Learnings and limits,” and indicator footnote. Mistral reports collaboration with Carbone 4/ADEME and review by Resilio/Hubblo.
- Limits: checked the public summary, not a complete underlying inventory. No corresponding electricity figure there; hardware impacts approximated. Water indicator is WCP. Different boundary/accounting from S1; the two numbers do not form a valid uncertainty interval or provider ranking.
- Confidence/recommendation: moderate for reusable factors; use with qualifications as a disclosure, pending inventory review.

**S3 — Alexandra Sasha Luccioni, Yacine Jernite and Emma Strubell (2024), Power Hungry Processing: Watts Driving the Cost of AI Deployment?, arXiv:2311.16863 v2.** [Exact paper](https://arxiv.org/html/2311.16863v2)

- Claim: image generation mean 2.907 kWh per 1,000 inferences; standard deviation 3.31 kWh on that basis. Equivalent mean: 2.907 Wh/image.
- Direct check: §3 methodology and Table 2/caption. Experiments use an A100, CodeCarbon, and sequential inference; paper supplies a code/log link, which was not reproduced.
- Limits: historical model sample and hardware; neither current commercial-product measurement nor quality-matched ranking. Standard deviation is not min/max or a confidence interval; do not subtract it to create negative energy bounds.
- Confidence/recommendation: moderate transferability; use with qualifications for benchmark scenarios only.

**S4 — J. Delavande (2025), How Much Power does a SOTA Open Video Model Use?, Hugging Face community benchmark.** [Exact experiment write-up](https://huggingface.co/blog/jdelavande/text-to-video-energy-cost)

- Claim: approximately 0.14 Wh for AnimateDiff, 56 Wh for Mochi, and 109 Wh for WAN2.1-T2V-14B in the reported configurations.
- Direct check: “Experimental Setup,” parameter table, and “Energy Use.” H100, CodeCarbon, CPU/GPU/RAM accounting; duration/resolution/steps differ across models.
- Limits: exploratory, not a controlled equal-output commercial-tool comparison. Text says five measured runs while another passage describes ten prompt generations; clarification needed. Its 0.14 Wh/10 W light-bulb analogy is wrong: arithmetic gives 50.4 seconds, not minutes. No independent rerun or full lifecycle validation.
- Confidence/recommendation: low–moderate; use only with explicit qualifications, not default factors yet. Reject faulty analogies.

**S5 — Arihant Tripathy, Ch Pavan Harshit and Karthik Vaidhyanathan (2025/2026), SWEnergy: An Empirical Study on Energy Efficiency in Agentic Issue Resolution Frameworks with SLMs, arXiv:2512.09543; AGENT 2026.** [Exact abstract](https://arxiv.org/abs/2512.09543)

- Claim: reported 9.4× framework energy difference with the same Gemma model; near-zero issue-resolution rates.
- Direct check: abstract's methods/results, including fixed hardware and small-model scope. Full experimental logs and tables not checked.
- Limits: not evidence of commercial coding-agent energy per successful task. Low success means low per-attempt energy cannot establish useful efficiency.
- Confidence/recommendation: use with qualifications to motivate task/outcome accounting; reject as a commercial coefficient.

**S6 — George Kamiya / IEA (2020, updated analysis), The carbon footprint of streaming video: fact-checking the headlines.** [Exact analysis](https://www.iea.org/commentaries/the-carbon-footprint-of-streaming-video-fact-checking-the-headlines)

- Claim: approximately 0.077 kWh per Netflix viewing hour in the modelled 2019 scenario.
- Direct check: estimate paragraph, device/network/resolution discussion, and network energy-intensity caution.
- Limits: modelled historical average, not today's measured employee session. Cannot assign directly to video calls. Device choice changes scope/results; fixed kWh/GB is problematic for high-bitrate network energy modelling.
- Confidence/recommendation: use with qualifications for dated context and methodology; obtain scenario factors before implementation.

**S7 — Carbon Trust (2021), Updated calculation released on the carbon impact of online video streaming.** [Exact release](https://www.carbontrust.com/news-and-insights/news/updated-calculation-released-on-the-carbon-impact-of-online-video-streaming)

- Claim: 55 g CO₂e per hour of video-on-demand in Europe in 2020; viewing device is a major determinant.
- Direct check: published release and stated scope. The linked white paper's detailed factor tables have not been audited.
- Limits: old regional estimate, not live streaming. Do not combine with S6 as if energy and carbon were measured together. Industry collaboration should be visible in assessment.
- Confidence/recommendation: use with qualifications for historical context only until full-method review.

**S8 — Sony Interactive Entertainment, Energy Efficiency disclosures.** [Exact measurements](https://www.playstation.com/en-gb/legal/ecodesign/)

- Claim: selected PS5 game tests around 197–209 W. Examples directly checked: CFI-1016A HD three-game average 196.9 W (15 December 2020), CFI-1116B 208.8 W (16 December 2021).
- Direct check: named model entries, game averages, and test dates. One hour at those average powers gives 196.9–208.8 Wh by arithmetic.
- Limits: console only, not screen/network/cloud gaming; selected historical models, not a range for all gaming. Does not represent Jordan's desktop PC. No carbon/water factor supplied by these power measurements.
- Confidence/recommendation: use with qualifications for exact console scenarios; obtain desktop evidence separately.

**S9 — Greenspector (21 June 2023), What is the environmental footprint of social networking applications? 2023 Edition.** [Exact study](https://blog.greenspector.com/en/what-is-the-environmental-footprint-of-social-networking-applications-2023/)

- Claim: reported scrolling estimates span 0.47–0.96 g CO₂e/minute across tested apps. Multiplying by 60 gives 28.2–57.6 g/hour.
- Direct check: results text and measurement/projection methodology: Samsung phone, Android 10, Wi-Fi, fixed brightness, French users, assumed server settings.
- Limits: device resource measurement plus modelled impacts, not end-to-end metering; feeds contain different content. Old app versions and device. No raw experiment reproduction.
- Confidence/recommendation: low–moderate generalizability; use with qualifications for this scenario only. Reject universal rankings.

**S10 — Renee Obringer et al. (2021), The overlooked environmental footprint of increasing Internet use, Resources, Conservation & Recycling 167, 105389.** [Institutional paper record](https://energy.mit.edu/publication/the-overlooked-environmental-footprint-of-increasing-internet-use/), [DOI](https://doi.org/10.1016/j.resconrec.2020.105389), [author-institution explanation](https://news.mit.edu/2021/how-to-reduce-environmental-impact-next-virtual-meeting-0304)

- Claim previously mentioned: substantial videoconferencing impacts and camera-off savings. Institutional explanation reports 96% reduction.
- Direct check: paper first-page text with per-GB factors and MIT's explanation. Complete supplementary derivation not audited.
- Limits: data-volume attribution does not establish the marginal electricity saved by switching a camera off; methodological tension with S6. No validated current video-call energy/water default from this review.
- Confidence/recommendation: retain as conflicting evidence; reject headline savings as a calculator default pending deeper verification.

**S11 — Pengfei Li, Jianyi Yang, Mohammad A. Islam and Shaolei Ren, Making AI Less “Thirsty”, arXiv:2304.03271 (initial 2023; subsequently revised).** [Exact paper record](https://arxiv.org/abs/2304.03271)

- Claim used here: AI water accounting must distinguish withdrawal/consumption and deployment location/time.
- Direct check: abstract describing a modelled water framework and spatial/temporal differences. Full equations and version-specific per-conversation assumptions not audited.
- Limits: modelled results are not direct measurement of present-day chatbot requests. Earlier conversation's bottle-of-water discussion is background, not an approved numerical claim.
- Confidence/recommendation: use with qualifications for methodological context; defer numerical adoption until full-paper review.

**S12 — IEA (2026), Key Questions on Energy and AI, Executive summary.** [Exact passage](https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary)

- Claim: reasoning, agentic tasks and video can consume hundreds/thousands of times the energy of simple text queries.
- Direct check: section “Energy consumption per AI query has declined massively, but much more energy-intensive use cases are becoming increasingly popular.”
- Limits: synthesis, not a coefficient for an individual tool; underlying task-by-task evidence not independently audited here.
- Confidence/recommendation: use with qualifications for context only; never apply that multiplier to every coding/video request.

**S13 — Carbon Trust, The carbon impact of AI video generation.** [Exact overview](https://www.carbontrust.com/our-work-and-impact/guides-reports-and-tools/the-carbon-impact-of-ai-video-generation)

- Claim: professional production involves repeated generations and inconsistent disclosures complicate comparison.
- Direct check: report landing-page overview, including DIMPACT commissioning. Full report not checked.
- Limits: supports a research direction, not an independently verified per-clip coefficient.
- Confidence/recommendation: use with qualifications as contextual evidence; full report is a follow-up dependency if video is selected.

**S14 — EcoLogits, Methodology introduction (live documentation, checked 14 September 2026).** [Exact documentation](https://ecologits.ai/latest/methodology/)

- Claim: its framework estimates lifecycle-related impacts and describes water consumption from data centres and electricity generation.
- Direct check: methodology introduction, scope headings, and approximation-interval description.
- Limits: current documentation does not reproduce the version/data embedded in this calculator; no numeric model factor or 95% coverage assertion validated. Primary energy and electricity are different quantities and must not be interchanged.
- Confidence/recommendation: candidate methodology; defer existing factor/range approval until version-pinned reproduction.

### Previous illustrative totals: arithmetic, not evidence of typical work

These quantities were invented examples, not employee observations. They must not become defaults without user choice:

- 100 text requests × 0.24 Wh (S1) = 24 Wh, conditional on every request matching that reference. A median alone cannot predict a workload total.
- 20 accepted images × 5 attempts × 2.907 Wh (S3) = 290.7 Wh = 0.2907 kWh. Both activity counts are assumptions.
- 12 accepted clips × 10 attempts × assumed 10–100 Wh = 1.2–12 kWh. The 10–100 Wh interval was a chosen sensitivity scenario, not a source-derived confidence interval or commercial-product range.
- 1.2–12 kWh × assumed 400 g CO₂e/kWh = 480–4,800 g = 0.48–4.8 kg CO₂e. The electricity factor was illustrative and has no approved location/provider attribution.

Proposed accounting identity: sum activity count × compatible per-activity factor. Add device/network/lifecycle components only when not already included. Carbon and water require separate, boundary-compatible factors. Missing values stay unknown. This is a proposed method, not a product decision.

### Additional primary-source research — 21 September 2026

This extends the source audit at the user's request. Assessments are draft recommendations, not approval. Original paper methods and relevant results were read where noted; experiments were not rerun. Source age, measurement boundaries, and missing evidence remain part of every candidate calculation.

**S15 — Jens Gröger, Ran Liu, Lutz Stobbe, Jan Druschke and Nikolai Richter (2021), Green Cloud Computing: Lebenszyklusbasierte Datenerhebung zu Umweltwirkungen des Cloud Computing, Umweltbundesamt TEXTE 94/2021.** [Original report, printed pp. 31–32](https://www.umweltbundesamt.de/system/files/medien/5750/publikationen/2021-06-17_texte_94-2021_green-cloud-computing.pdf#page=31)

- Evidence checked directly: English summary Table 12 and accompanying scope text; device-comparison paragraph on printed p. 32. PDF text extraction was readable; the attempted screenshot of Table 12 failed, so visual table verification remains open.
- Supported figures: data-centre contribution **2.27 g CO₂e per participant-hour**, consisting of **0.34 g** server production and **1.93 g** operation. Broader scenarios report **55 g/hour** for a laptop and **90 g/hour** for desktop plus monitor.
- Limitations: one provider case and historical German assumptions; broader totals include device/network contributions and must not be added to them again. Not a current Zoom/Teams measurement or a universal range. No water coefficient adopted.
- Confidence/decision: use with qualifications; stronger support for a participant-hour method than a streaming proxy, but only a dated scenario coefficient.
- Project relevance: Robin/Jordan call calculations. Proposed unit: sum each participant's attendance duration; distinguish personal and whole-meeting totals.

**S16 — Evan Mills et al. (2019), A Plug-Loads Game Changer: Computer Gaming Energy Efficiency without Performance Compromise, California Energy Commission CEC-500-2019-042 / Lawrence Berkeley National Laboratory.** [Original report, printed pp. 23–26](https://eta-publications.lbl.gov/sites/default/files/cec-500-2019-042.pdf#page=32)

- Evidence checked directly: gameplay results around Figure 7 and the separate display discussion; report describes desktop average gameplay power across tested system/game combinations of **34–410 W**. Displays are treated separately in the assessment.
- Limitations: historical hardware/games, not today's desktop population or a statistical interval. The report's cloud-gaming network assumptions should not be carried into current defaults. No carbon or water coefficient follows from the power range alone.
- Confidence/decision: use with qualifications for historical measured variation and accounting method; reject 34–410 W as a guaranteed modern minimum/maximum.
- Project relevance: Jordan's desktop gaming. Proposed calculation: measured average system watts × hours / 1,000 = kWh; add monitor electricity if excluded from the measurement. Prefer a supplied measurement or a clearly identified hardware scenario over a universal PC value.

**S17 — Jared Fernandez, Clara Na, Vashisth Tiwari, Yonatan Bisk, Sasha Luccioni and Emma Strubell (2025), Energy Considerations of Large Language Model Inference and Efficiency Optimizations, ACL, pp. 32556–32569.** [Original paper](https://aclanthology.org/2025.acl-long.1563.pdf)

- Evidence checked directly: §2 experimental setup, input/output length and batching discussion, and workload-binning method around printed p. 32562. Experiments distinguish prompt processing from output generation and study serving software/hardware choices.
- Supported claim: output length alone does not capture all workload and deployment effects on energy. The paper supports recording both input and output characteristics.
- Limitations: tested open models and simulated workloads; not direct measurement of a commercial coding agent. A token count is an input to an estimate, not a universal energy factor. No carbon/water conversion adopted.
- Confidence/decision: use with qualifications for methodology; do not transfer its optimization percentages to employees' tools.
- Project relevance: Jordan's coding/project feature. Proposed task record: calls, input/output counts where available, model, and separately identified execution/tests. Missing internal reasoning/caching information remains an uncertainty.

**S18 — Jae-Won Chung, Jeff J. Ma, Ruofan Wu, Jiachen Liu, Oh Jun Kweon, Yuxuan Xia, Zhiyu Wu and Mosharaf Chowdhury (2025), The ML.ENERGY Benchmark: Toward Automated Inference Energy Measurement and Optimization, NeurIPS Datasets and Benchmarks.** [Original paper](https://proceedings.neurips.cc/paper_files/paper/2025/file/9dc510e3d7b0b3b2a58ffed7a3ad6b0f-Paper-Datasets_and_Benchmarks_Track.pdf)

- Evidence checked directly: §§2.1–2.3, §3.2, and Appendix E. Measurement focuses on GPU energy, whole generation responses, and service-aware allocation when requests are batched. The benchmark covers text, image and video generation.
- Supported claim: energy assigned to a request depends on how concurrent requests share hardware; an entire server's consumption is not automatically the consumption of one request.
- Limitations: GPU-only measurement excludes CPU, network, cooling, and full lifecycle impacts. Appendix E acknowledges incomplete model/task/hardware coverage. Individual benchmark result files were not reproduced.
- Confidence/decision: use with qualifications for measurement design and as a candidate source for configuration-matched factors; no leaderboard number adopted yet.
- Project relevance: Alex/Jordan modality estimates and Robin's explanation of what is counted. Useful independent methodological contrast with S19's whole-machine allocation.

**S19 — EcoLogits, Environmental Impacts of Video Generation, live methodology checked 21 September 2026.** [Exact method and equations](https://ecologits.ai/latest/methodology/video_generation/)

- Evidence checked directly: latency regression, whole-server power allocation, PUE equation, water equation, and stated exclusions.
- Supported method: server energy = estimated generation time × server power; facility energy adds cooling/power overhead through PUE. Operating water = server kWh × (onsite L/kWh + PUE × electricity-generation L/kWh).
- Limitations: assumes fixed hardware; explicitly allocates whole-machine power without batch sharing. Provider location/cooling values are assumptions. Power percentiles propagate through equations but do not cover every structural uncertainty. Manufacturing water is excluded for lack of data.
- Confidence/decision: use with qualifications as a transparent candidate model; not validated proprietary-service telemetry. Pin version and reproduce scenarios before adoption.
- Project relevance: Alex's video/water scenarios. Plain-language explanation: “Cooling water and water used to generate electricity are counted separately; manufacturing water is unknown.”

**S20 — Nidhal Jegham, Boris Gamazaychikov and Sasha Luccioni (2026), Lights, Camera, Carbon: Architectural Scaling Laws for Video Generation Energy Consumption, arXiv:2607.04553v1.** [Original preprint](https://arxiv.org/html/2607.04553v1)

- Evidence checked directly: §4.4 proprietary-model case study and §5 limitations, plus its stated distinction between measured open models and estimated proprietary models. This is the paper linked by S19.
- Supported claim: closed-API energy estimates depend on inferred hardware/power and an assumed batch size; API timing is not direct electricity measurement.
- Limitations: authors explicitly say closed hardware/power cannot be verified. A good timing fit does not independently validate assumed power or allocation. Preprint; no independent replication here. Image-to-video, upscaling and other workflows need further evidence.
- Confidence/decision: use with qualifications for sensitivity methods; reject its commercial-model rankings as established measurements. S19 and S20 are related evidence, not independent confirmations.
- Project relevance: Alex. Duration/resolution inputs are justified candidates, but smooth-looking estimates should not imply certainty about a provider's infrastructure.

**S21 — US Environmental Protection Agency, Frequent Questions About eGRID, live guidance checked 21 September 2026.** [Exact guidance, questions 11–14](https://www.epa.gov/egrid/frequent-questions-about-egrid)

- Evidence checked directly: guidance on data year, geographic level, average versus nonbaseload rates, and transmission losses. EPA recommends subregion output rates for electricity-use estimates.
- Supported claim: regional electricity accounting should follow the location where electricity is consumed; average inventory factors and avoided-emissions factors serve different questions.
- Limitations: annual average generation data, not hour-specific or provider-contract accounting; not a complete lifecycle inventory. No location-specific coefficient downloaded/approved in this pass. Check CO₂ versus CO₂e fields and whether losses are already included.
- Confidence/decision: use for the accounting method; factor selection/versioning still open.
- Project relevance: all profiles. Proposed separation of employee-device region and AI-service region, with “unknown service location” retained when appropriate.

### What this evidence changes — proposals for review

| Candidate direction | Better support now available | Remaining verification |
| --- | --- | --- |
| Calls by participant-hour and device | S15 provides an explicit component breakdown | Current US/device scenarios; avoid counting components twice |
| Desktop gaming by hours and measured power | S16 directly addresses desktop equipment | Current hardware or user measurement; display boundary |
| Coding/project workload totals | S17/S18 support workload-sensitive accounting | Matching factors, hidden computation, execution/testing energy |
| Video production with duration/resolution/attempts | S19/S20 expose equations and assumptions | Model validity, batching, hardware and output-quality comparability |
| Direct/indirect water scenarios | S19 separates cooling from electricity-generation water | Site-specific factors; manufacturing water remains unknown |
| Region-aware carbon estimates | S21 supports electricity-location accounting | Actual service location; factor year, units and loss treatment |

These are interpretations for this project, not evidence that the fictional profiles or actual employees prefer these interfaces. Existing profile coverage remains grounded in the brief.

### Illustrative project arithmetic from the new evidence

Assume, purely for illustration, a project includes **10 participant-hours** of calls. Under S15's historical laptop scenario, 10 × 55 = **550 g CO₂e**; its desktop scenario gives 10 × 90 = **900 g CO₂e**. These are alternative device scenarios, not lower/upper confidence bounds. Attendance is counted once per person, and the data-centre contribution is already included. This example shows how project totals can be transparent without pretending to measure the employee's actual service.

### Missing evidence and verification priorities

- Current commercial image/video/coding footprints still cannot be inferred reliably from product names alone (S17–S20).
- The new studies do not validate the existing calculator's EcoLogits data snapshot or its “95% confidence” wording.
- S15/S16 strengthen calls/gaming research but do not establish current default factors for US employees.
- Social media remains supported only by the narrow S9 scenario; no stronger general-purpose factor established in this pass.
- A complete, comparable water total across every activity remains unavailable. An operating-water subtotal must identify excluded/unknown components (S19).
- Before feature adoption, create a reproducible factor record: source/version, activity unit, configuration, included components, geography/year, uncertainty meaning, and permitted extrapolation. This is a proposed verification task, not a selected feature.

### Current research tasks

- [x] Agent read project guidance and identified the documented profiles.
- [x] Agent drafted source-specific assessments and feature alternatives.
- [ ] Verify candidate factors against complete methods, units, boundaries, and reproducible data before adoption.
- [x] Agent inspected additional original methods for calls, desktop gaming, AI workloads, video and electricity accounting (S15–S21).
- [ ] Validate device-aware streaming and video-call scenarios; historical cases are documented, current defaults remain open. Desktop gaming is deferred.
- [ ] Reproduce inherited EcoLogits factors and determine what its displayed bounds actually mean.
- [ ] User reviews claims, evidence limitations, and assumptions.
- [x] Agent recorded the user's five feature choices on 24 September 2026.
- [ ] User verifies the recorded feature descriptions, brief coverage, profile coverage, and rejected-alternative rationale.
- [x] User explicitly approved the research and selected features on 24 September 2026. Specification must not begin yet, per the user's instruction.

No implementation tasks are finalized; they depend on selected features and an approved specification. User-verification and approval items remain open.

## Selected features

### Chosen for the research draft — 24 September 2026

**Approval status: APPROVED BY THE USER — 24 September 2026.** The user explicitly approved the research and these five selected features. This does not approve a specification or implementation plan, or establish that outstanding verification tasks have been completed. Specification has not begun and must not begin yet, per the user's instruction.

| Feature | Calculation contribution and reason for selection | How it serves the profiles | Evidence and remaining limits |
| --- | --- | --- | --- |
| **1. Multimodal professional AI calculator** | Represents text, image, and video tasks with modality-specific inputs and estimates. Makes professional production visible beyond text prompts. | **Alex:** directly covers image/video production and identifies available water estimates. **Jordan:** covers generative tools alongside coding work. **Robin:** retains an understandable text-use path and shows which activities are included. | S1–S4 and S18–S20. Match factors to settings and distinguish measured benchmarks from modelled commercial estimates. Energy, carbon, and water coverage may differ; missing metrics remain unknown. |
| **2. Project workload and revision calculator** | Combines activities over a project, including coding workloads, revisions, and unsuccessful attempts. Reports project totals and, where meaningful, impact per accepted output. | **Jordan:** accommodates long, irregular coding work rather than assuming a fixed daily prompt count. **Alex:** includes discarded production attempts. **Robin:** can understand how the total was assembled from project activities. | S5, S13, S17 and S18 support workload/outcome accounting, not a universal session factor. Keep execution/testing separate where evidence permits. Define whether counts include retries so they are counted only once. |
| **3. Device-aware streaming calculator** | Adds viewing time and device choice to same-period digital comparisons. | **Alex:** represents reference viewing across phone, laptop, and television. **Robin:** provides context from a familiar activity. **Jordan:** can include streaming when relevant without assuming it is part of the profile. | S6/S7 support device-sensitive accounting; estimates are historical. Verify device factors and distinguish electricity-only from broader lifecycle totals. |
| **4. Video meeting calculator** | Calculates personal participant-hours, with clearly distinguished whole-meeting totals if included in the later specification. | **Robin:** represents a substantial stated work activity. **Jordan:** includes frequent calls alongside coding projects. **Alex:** can include meetings when relevant, without assuming a particular meeting habit. | S15 provides a component-level case study. Its German historical figures are scenarios, not current US service measurements. Avoid counting participants or device/network components twice. |
| **5. Uncertainty and assumptions explorer** | Recalculates totals under explicit alternative workload/factor assumptions and shows which assumptions change the result. Addresses the remaining need to understand uncertainty across all calculations. | **Jordan:** exposes ranges and project assumptions. **Robin:** supports scrutiny through plain explanations and visible sources. **Alex:** sees the scope and gaps in water estimates as well as production assumptions. | S1/S2 and S17–S21 show differing boundaries, deployment assumptions, and allocation methods. Scenario ranges are not automatically confidence intervals. Water boundaries must be explained, but a separate direct-versus-broader-water calculator is not selected. |

### Coverage and feature boundaries for review

- Features 1 and 2 address professional AI use; features 3 and 4 address broader digital life; feature 5 addresses uncertainty and transparency. This maps the chosen set to the brief without treating citations or wording alone as features.
- Feature 1 estimates individual task types; feature 2 aggregates the work and revisions into a project; feature 5 changes explicit assumptions and recalculates those results. These distinctions prevent counting the same capability as multiple features.
- Alex is served primarily by multimodal production, revisions, streaming, and transparent water limitations. Jordan is served primarily by coding/project workloads, revisions, meetings, and ranges. Robin is served primarily by text access, streaming, meetings, and understandable evidence/assumptions.
- These mappings come from the fictional profiles in this document, not employee interviews or demographic evidence. Detailed inputs, defaults, output presentation, and acceptance checks remain for specification after research approval.

### Rejected alternatives for this five-feature scope

“Rejected” means not included in the chosen set; it does not mean the activity has no impact. The evidence does not justify claiming all alternatives are categorically much weaker than all selected features.

| Alternative | Why it is not selected | Evidence assessment and trade-off |
| --- | --- | --- |
| **Gaming calculator** | Would primarily add coverage for Jordan, who is already served by projects/coding, meetings, and uncertainty. The chosen streaming/meeting pair covers more of the profiles' stated activities. | S8 has console measurements; S16 has measured desktop variation. This is useful evidence, but weaker support for a current generic desktop default because hardware/game conditions differ and measurements are historical. It is not demonstrably weaker than every selected streaming/call scenario, which also has age limits. Deferring it is partly an audience-coverage decision. |
| **Social-media calculator** | Adds another digital-habit category while introducing a narrow evidence basis; streaming and meetings provide the selected broader-life comparisons. | S9 covers a specific older phone, network, app versions, and feed-scrolling experiment, with modelled infrastructure. This offers weak support for a general platform-independent coefficient or present-day platform ranking. Alex and Robin's social use remains outside the current scope; streaming must not be presented as measuring all social activity. |
| **Standalone water-boundary feature** | A separate calculator switching between direct cooling and broader water totals is deferred. Water definitions, exclusions, and uncertainty remain visible in the selected calculators/explorer. | S1, S2, S11 and S19 have differing water scopes; S19 explicitly lacks manufacturing-water data. The reviewed evidence is insufficient for compatible complete-water factors across every activity. That is weaker support for a comprehensive boundary-switching calculation, not weak evidence that water matters. The explorer must not fabricate missing factors or turn unknown water into zero. |

No rejected alternative has been implemented or removed from existing code. No final numerical defaults are approved by this selection.

User approval: Review the completed research directly. Confirm that sources exist and support the claims the project will use, correct the document as needed, and explicitly approve the selected features before developing the specification. The agent cannot complete this approval on the user's behalf.

### Approval record

- Date: 24 September 2026.
- User's explicit instruction: “i approve the selected features and the research. plz record my approval in research.md. do not begin specification yet.”
- Recorded outcome: research and the five selected features approved by the user.
- Next-stage constraint: do not begin specification yet.
- Independent verification items remain open unless the user explicitly confirms their completion.

## Commands

### Start research

User: Open the project repository as your workspace, start a fresh chat, and type `start research`.

### Save transcript

Agent: After the user approves the selected features, remind them that the transcript is a deliverable and ask them to say `save transcript`. Wait for that direction.

When the user directs the agent to save the transcript, the agent saves the entire conversation in the `transcripts/` directory as `research-YYYY-MM-DD_HHMMSS.md`, marks user and agent responses clearly, and confirms the saved relative path.
