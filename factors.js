// Published scenario records. null means the source does not support that metric.
export const SOURCES = {
  text: {name:'Mistral AI, Le Chat environmental disclosure (2025)', url:'https://mistral.ai/news/our-contribution-to-a-global-environmental-standard-for-ai/', note:'400-token response: 1.14 g CO₂e and 45 mL water (WCP), excluding user terminals. No corresponding electricity factor is disclosed. Scaling by output tokens is illustrative; input and reasoning workload can change impacts. This is not a universal model factor.'},
  coding: {name:'Fernandez et al., Energy Considerations of LLM Inference (2025)',url:'https://aclanthology.org/2025.acl-long.1563.pdf',note:'Coding-agent work depends on input and output length, model, batching and tool execution. No transferable commercial-agent coefficient was adopted, so impacts remain unknown.'},
  image: {name:'Luccioni et al., Power Hungry Processing (2024)', url:'https://arxiv.org/html/2311.16863v2', note:'Mean 2.907 Wh per image from an older open-model A100 benchmark. Hardware and model settings differ from commercial tools; water was not reported.'},
  video: {name:'Delavande et al., open video benchmark (2025)', url:'https://huggingface.co/blog/jdelavande/text-to-video-energy-cost', note:'H100 benchmark with differing models, resolution, frame rate and steps. Energy per generated second is extrapolated from short measured clips; it does not establish the energy of commercial video tools. Water was not reported.'},
  stream: {name:'Carbon Trust, Carbon impact of video streaming (2021)', url:'https://www.carbontrust.com/sites/default/files/documents/resource/public/Carbon-impact-of-video-streaming.pdf#page=52', note:'Modelled European 2020 video-on-demand scenarios. Carbon includes viewing device, network, router and data centre. Phone uses cellular/automatic quality; laptop uses fixed network/SD; TV uses fixed network/FHD. Device-specific energy and water are not taken from this figure. Not social media or live video.'},
  meeting: {name:'Gröger et al., German Environment Agency (2021)', url:'https://www.umweltbundesamt.de/system/files/medien/5750/publikationen/2021-06-17_texte_94-2021_green-cloud-computing.pdf#page=31', note:'Historical German case study: 55 g CO₂e per laptop participant-hour or 90 g for desktop plus monitor. Includes device, network and data-centre components, so no component is added again. Energy and water are unavailable.'},
};
export const FACTORS = {
  text: {source:'text', unit:'400 output tokens', wh:null, g:1.14, ml:45},
  image: {source:'image', unit:'generated image', wh:2.907, g:null, ml:null},
  video: {
    source:'video', unit:'generated second',
    scenarios: {
      low:{label:'AnimateDiff benchmark', wh:0.14/1.6},
      central:{label:'Mochi benchmark', wh:56/(84/30)},
      high:{label:'WAN2.1 14B benchmark', wh:109/(81/15)}
    }, g:null, ml:null
  },
  stream: {source:'stream', unit:'viewing hour', devices:{phone:{label:'Phone · cellular',g:8},laptop:{label:'Laptop · fixed network',g:16},tv:{label:'50-inch TV · fixed network',g:58}},wh:null,ml:null},
  meeting: {source:'meeting',unit:'participant-hour', devices:{laptop:{label:'Laptop',g:55},desktop:{label:'Desktop + monitor',g:90}},wh:null,ml:null}
};
