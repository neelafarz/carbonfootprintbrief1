import {FACTORS} from './factors.js';

export const wordsToTokens = words => words / 0.75;
export const tokensToWords = tokens => tokens * 0.75;
const amount = value => Math.max(0, Number(value) || 0);

export function calculateTask(task, scenario='central') {
  const type = task.type;
  if (type === 'coding') return {wh:null,g:null,ml:null,source:'coding',coverage:'Token workload recorded; agent inference, tools, execution and tests have no defensible common factor.'};
  if (type === 'text') {
    const tokens = amount(task.tokens) * amount(task.count);
    const factor = FACTORS.text;
    const scale = tokens / 400;
    return {wh:null,g:scale*factor.g,ml:scale*factor.ml,source:'text',coverage:'Illustrative scaling of a 400-token Le Chat disclosure; electricity unknown. Input and reasoning workload may differ.'};
  }
  if (type === 'image') return {wh:amount(task.images)*FACTORS.image.wh,g:null,ml:null,source:'image',coverage:'Energy benchmark only; carbon and water unknown.'};
  if (type === 'video') return {wh:amount(task.seconds)*FACTORS.video.scenarios[scenario].wh,g:null,ml:null,source:'video',coverage:`${FACTORS.video.scenarios[scenario].label}; generated seconds include discarded clips. Carbon and water unknown.`};
  throw new Error('Unknown task type');
}

export function calculateDigital(hours,device,kind) {
  const factor=FACTORS[kind].devices[device];
  if (!factor) throw new Error('Unknown device');
  return {wh:null,g:amount(hours)*factor.g,ml:null,source:kind,coverage:factor.label};
}

export function subtotal(rows) {
  const result={wh:0,g:0,ml:0,missing:{wh:0,g:0,ml:0},known:{wh:0,g:0,ml:0}};
  for (const row of rows) for (const metric of ['wh','g','ml']) {
    if (row[metric] === null) result.missing[metric]++;
    else {result[metric]+=row[metric];result.known[metric]++;}
  }
  return result;
}
