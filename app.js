import {SOURCES,FACTORS} from './factors.js';
import {calculateTask,calculateDigital,subtotal,wordsToTokens,tokensToWords} from './calculator.js';

const $=id=>document.getElementById(id);
let tasks=[];
let nextId=1;
let displayUnit='words';
let scenario='central';
const labels={email:'Draft email',summary:'Summarize document',report:'Write report',image:'Generate images',video:'Generate video',coding:'Coding tasks'};
const defaults={email:130,summary:190,report:750};
const fmt=(n,unit)=>n===null?'Unknown':`${n<0.01&&n>0?n.toPrecision(2):n.toLocaleString(undefined,{maximumFractionDigits:2})} ${unit}`;
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const metric=(row,key,unit)=>fmt(row[key],unit);

function taskForm(task) {
  const type=task.type;
  const title=labels[type]||labels[task.kind];
  let fields='';
  if(type==='text') fields=`<label>Length per task <input data-field="length" type="number" min="0" step="any" value="${displayUnit==='words'?tokensToWords(task.tokens):task.tokens}"></label><span class="unit">${displayUnit} per task</span><label>Task count <input data-field="count" type="number" min="0" step="1" value="${task.count}"></label>`;
  if(type==='coding') fields=`<label>Tokens per task <input data-field="tokens" type="number" min="0" step="any" value="${task.tokens}"></label><label>Task count <input data-field="count" type="number" min="0" step="1" value="${task.count}"></label>`;
  if(type==='image') fields=`<label>Total generated images <input data-field="images" type="number" min="0" step="1" value="${task.images}"></label>`;
  if(type==='video') fields=`<label>Total generated clip seconds <input data-field="seconds" type="number" min="0" step="any" value="${task.seconds}"></label>`;
  return `<div class="task card" data-id="${task.id}"><div class="task-heading"><h3>${escape(title)}</h3><button type="button" class="remove" aria-label="Remove ${escape(title)}">Remove</button></div><div class="fields">${fields}</div><p class="result" data-result></p></div>`;
}
function add(kind){
  const type=['email','summary','report'].includes(kind)?'text':kind;
  const task={id:nextId++,kind,type,tokens:wordsToTokens(defaults[kind]||400),count:1,images:1,seconds:5};
  tasks.push(task); renderTasks(); update();
  document.querySelector(`[data-id="${task.id}"] input`)?.focus();
}
function renderTasks(){ $('tasks').innerHTML=tasks.length?tasks.map(taskForm).join(''):'<p class="empty">Add a task above to start a project.</p>'; }
function totalsHtml(total){
  const display=(key,unit,label)=>`<span><b>${total.known[key]?metric(total,key,unit):'Unknown'}</b><small>${label} subtotal${total.missing[key]?' · '+total.missing[key]+' unknown':''}</small></span>`;
  return `<div class="metrics">${display('wh','Wh','electricity')}${display('g','g CO₂e','carbon')}${display('ml','mL','water')}</div>`;
}
function update(){
  const rows=tasks.map(t=>calculateTask(t,scenario));
  tasks.forEach((task,i)=>{
    const el=document.querySelector(`[data-id="${task.id}"] [data-result]`);
    const workload=(task.type==='text'||task.type==='coding')?`${fmt(task.tokens,'tokens/task')} × ${task.count} = ${fmt(task.tokens*task.count,'tokens')}`:task.type==='image'?`${fmt(task.images,'generated images')}`:`${fmt(task.seconds,'generated seconds')}`;
    if(el) el.innerHTML=`${workload}<br>${fmt(rows[i].wh,'Wh')} · ${fmt(rows[i].g,'g CO₂e')} · ${fmt(rows[i].ml,'mL water')} — ${escape(rows[i].coverage)} <a href="#source-${rows[i].source}">Source and scope</a>`;
  });
  const project=subtotal(rows);
  $('project-total').innerHTML=totalsHtml(project);
  const streamHours=Number($('stream-hours').value)||0;
  const meetingHours=Number($('meeting-hours').value)||0;
  const stream=calculateDigital(streamHours,$('stream-device').value,'stream');
  const meeting=calculateDigital(meetingHours,$('meeting-device').value,'meeting');
  $('stream-result').textContent=`${fmt(stream.g,'g CO₂e')} · energy and water unknown · ${stream.coverage}`;
  $('meeting-result').textContent=`${fmt(meeting.g,'g CO₂e')} · energy and water unknown · ${meeting.coverage}`;
  const compared=subtotal([...rows,...(streamHours?[stream]:[]),...(meetingHours?[meeting]:[])]);
  $('comparison-total').innerHTML=totalsHtml(compared);
  $('comparison-note').textContent='These are available-component subtotals for the same entered period, not complete footprints. AI text uses Mistral provider accounting; streaming and meeting carbon use historical European/German scenarios. They have different boundaries, so their sum is illustrative. Unknown values are omitted, never treated as zero.';
  $('scenario-note').textContent=`Video factor: ${FACTORS.video.scenarios[scenario].label} (${fmt(FACTORS.video.scenarios[scenario].wh,'Wh per generated second')}). These model settings differ; low and high are alternative benchmarks, not a confidence interval.`;
}
function saveState(){return {tasks,scenario,displayUnit,period:$('period').value,streamHours:$('stream-hours').value,streamDevice:$('stream-device').value,meetingHours:$('meeting-hours').value,meetingDevice:$('meeting-device').value};}
function restoreState(state){
  if(!state||!Array.isArray(state.tasks)) return;
  tasks=state.tasks.filter(t=>['text','coding','image','video'].includes(t.type)).slice(0,100).map(t=>({id:nextId++,kind:t.kind,type:t.type,tokens:Math.max(0,Number(t.tokens)||0),count:Math.max(0,Number(t.count)||0),images:Math.max(0,Number(t.images)||0),seconds:Math.max(0,Number(t.seconds)||0)}));
  scenario=['low','central','high'].includes(state.scenario)?state.scenario:'central';
  displayUnit=state.displayUnit==='tokens'?'tokens':'words';
  $('period').value=String(state.period||'').slice(0,120);
  $('unit-toggle').value=displayUnit;$('scenario').value=scenario;
  for(const [id,value] of [['stream-hours',state.streamHours],['meeting-hours',state.meetingHours]]) $(id).value=Math.max(0,Number(value)||0);
  for(const [id,value,allowed] of [['stream-device',state.streamDevice,FACTORS.stream.devices],['meeting-device',state.meetingDevice,FACTORS.meeting.devices]]) if(allowed[value]) $(id).value=value;
  renderTasks();update();
}
document.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>add(b.dataset.add)));
$('tasks').addEventListener('input',e=>{
  const wrap=e.target.closest('[data-id]'); if(!wrap)return;
  const task=tasks.find(t=>t.id===Number(wrap.dataset.id));if(!task)return;
  const value=Math.max(0,Number(e.target.value)||0),field=e.target.dataset.field;
  if(field==='length') task.tokens=displayUnit==='words'?wordsToTokens(value):value;
  else if(field) task[field]=value;
  update();
});
$('tasks').addEventListener('click',e=>{if(!e.target.classList.contains('remove'))return;tasks=tasks.filter(t=>t.id!==Number(e.target.closest('[data-id]').dataset.id));renderTasks();update();});
$('unit-toggle').addEventListener('change',e=>{displayUnit=e.target.value;renderTasks();update();});
$('scenario').addEventListener('change',e=>{scenario=e.target.value;update();});
for(const id of ['stream-hours','stream-device','meeting-hours','meeting-device']) $(id).addEventListener('input',update);
$('reset').addEventListener('click',()=>{tasks=[];scenario='central';displayUnit='words';$('period').value='';$('unit-toggle').value=displayUnit;$('scenario').value=scenario;$('stream-hours').value=0;$('meeting-hours').value=0;$('stream-device').value='phone';$('meeting-device').value='laptop';history.replaceState(null,'',location.pathname);renderTasks();update();});
$('share').addEventListener('click',async()=>{const data=btoa(JSON.stringify(saveState()));const url=new URL(location.href);url.searchParams.set('project',data);try{await navigator.clipboard.writeText(url.href);$('share-status').textContent='Project link copied.';}catch{$('share-status').textContent=url.href;}});
$('report').addEventListener('click',()=>{const rows=tasks.map(t=>calculateTask(t,scenario));const report=['Project estimate — '+new Date().toLocaleDateString(),`Period: ${$('period').value||'user-selected shared period'}`,'',...tasks.map((t,i)=>`${labels[t.kind]}: ${fmt(rows[i].wh,'Wh')}, ${fmt(rows[i].g,'g CO₂e')}, ${fmt(rows[i].ml,'mL water')}. ${rows[i].coverage}`),'',`Streaming: ${$('stream-hours').value} hours on ${FACTORS.stream.devices[$('stream-device').value].label}. ${$('stream-result').textContent}`,`Meetings: ${$('meeting-hours').value} participant-hours on ${FACTORS.meeting.devices[$('meeting-device').value].label}. ${$('meeting-result').textContent}`,'','Assumptions and limitations:',$('scenario-note').textContent,$('comparison-note').textContent,'',...Object.values(SOURCES).map(s=>`${s.name}: ${s.url} — ${s.note}`)].join('\n');const blob=new Blob([report],{type:'text/plain'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='project-footprint-report.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
$('sources').innerHTML=Object.entries(SOURCES).map(([id,s])=>`<li id="source-${id}"><a href="${s.url}" target="_blank" rel="noopener">${escape(s.name)}</a>. ${escape(s.note)}</li>`).join('');
try {const encoded=new URL(location.href).searchParams.get('project');if(encoded)restoreState(JSON.parse(atob(encoded)));else {renderTasks();update();}} catch {renderTasks();update();$('share-status').textContent='Could not read project link.';}
