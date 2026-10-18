'use strict';
const $=id=>document.getElementById(id), KEY='blush_moonlight_v2_data';
const defaults={shifts:[],goals:{sales:5000,atv:150,upt:1.6,conversion:30,loyalty:35}};
let data;
try{data=JSON.parse(localStorage.getItem(KEY))||structuredClone(defaults)}catch{data=structuredClone(defaults)}
if(!Array.isArray(data.shifts)||!data.goals)data=structuredClone(defaults);
if(!Array.isArray(data.development))data.development=[];
function persist(){try{localStorage.setItem(KEY,JSON.stringify(data));return true}catch(e){alert('Unable to save: device storage is unavailable or full. Export a backup and check browser settings.');return false}}
function todayLocal(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
$('date').value=todayLocal();
const money=v=>new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(v);
const num=id=>Number($(id).value), opt=id=>$(id).value.trim()===''?null:Number($(id).value);
function valid(s){return /^\d{4}-\d{2}-\d{2}$/.test(s.date)&&Number.isFinite(s.sales)&&s.sales>=0&&['transactions','units','signups'].every(k=>Number.isInteger(s[k])&&s[k]>=0)&&['opportunities','eligible'].every(k=>s[k]===null||(Number.isInteger(s[k])&&s[k]>=0))&&(!s.opportunities||s.transactions<=s.opportunities)&&(!s.eligible||s.signups<=s.eligible)&&s.notes.length<=500}
function showPage(page){document.querySelectorAll('.page').forEach(el=>el.classList.toggle('hidden',el.id!==page));document.querySelectorAll('nav button').forEach(el=>el.classList.toggle('active',el.dataset.page===page));if(page==='dashboard')renderDashboard();if(page==='history')renderHistory();if(page==='goals')renderGoals();if(page==='development')renderDevelopment()}
document.querySelectorAll('nav button').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));
$('shiftForm').addEventListener('submit',e=>{e.preventDefault();const s={date:$('date').value,sales:num('sales'),transactions:num('transactions'),units:num('units'),opportunities:opt('opportunities'),signups:num('signups'),eligible:opt('eligible'),notes:$('notes').value.trim()};if(!valid(s)){ $('entryMessage').textContent='Please check the values: transactions cannot exceed opportunities, and signups cannot exceed eligible opportunities.';return}const index=data.shifts.findIndex(x=>x.date===s.date);if(index>=0)data.shifts[index]=s;else data.shifts.push(s);if(persist())$('entryMessage').textContent='Saved! Your shift is recorded on this device. ✦'});
function loadShift(s){for(const k of ['date','sales','transactions','units','opportunities','signups','eligible','notes'])$(k).value=s[k]??'';showPage('entry');window.scrollTo(0,0)}
function selected(){const now=new Date(),date=todayLocal(),period=$('period').value;let min='0000-01-01';if(period==='week'){const d=new Date(now.getFullYear(),now.getMonth(),now.getDate());d.setDate(d.getDate()-((d.getDay()+6)%7));min=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}if(period==='month')min=date.slice(0,7)+'-01';return data.shifts.filter(s=>s.date>=min&&s.date<=date).sort((a,b)=>a.date.localeCompare(b.date))}
$('period').addEventListener('change',renderDashboard);
function sum(a,k){return a.reduce((t,s)=>t+s[k],0)}
function renderDashboard(){const shifts=selected(),el=$('cards');el.replaceChildren();$('bars').replaceChildren();$('coaching').replaceChildren();$('progress').replaceChildren();if(!shifts.length){el.textContent='No saved shifts for this period. Start on Daily entry.';return}const sales=sum(shifts,'sales'),tx=sum(shifts,'transactions'),units=sum(shifts,'units'),signups=sum(shifts,'signups'),opp=shifts.every(s=>s.opportunities!==null)?sum(shifts,'opportunities'):null,eligible=shifts.every(s=>s.eligible!==null)?sum(shifts,'eligible'):null,atv=tx?sales/tx:null,upt=tx?units/tx:null,conv=opp?100*tx/opp:null,loyal=eligible?100*signups/eligible:null;const cards=[['Sales',money(sales)],['Average transaction',atv===null?'—':money(atv)],['Units / transaction',upt===null?'—':upt.toFixed(2)],['Conversion',conv===null?'Unknown':conv.toFixed(1)+'%'],['Loyalty signup rate',loyal===null?'Unknown':loyal.toFixed(1)+'%'],['Transactions',String(tx)]];for(const [name,value] of cards){const div=document.createElement('div');div.className='card';const label=document.createElement('span'),v=document.createElement('strong');label.textContent=name;v.textContent=value;div.append(label,v);el.append(div)}if($('period').value==='week'&&data.goals.sales>0){const pct=100*sales/data.goals.sales;const p=document.createElement('div');p.className='barline';const title=document.createElement('p');title.textContent=`Weekly sales goal: ${money(data.goals.sales)} · ${pct.toFixed(1)}% reached`;const track=document.createElement('div');track.className='track';const fill=document.createElement('div');fill.className='fill';fill.style.width=Math.min(100,pct)+'%';track.append(fill);p.append(title,track);$('progress').append(p)}const max=Math.max(1,...shifts.map(s=>s.sales));for(const s of shifts){const row=document.createElement('div');row.className='barrow';const date=document.createElement('span'),track=document.createElement('div'),bar=document.createElement('div'),value=document.createElement('span');date.textContent=s.date.slice(5);bar.className='salesbar';bar.style.width=(100*s.sales/max)+'%';track.append(bar);value.textContent=money(s.sales);row.append(date,track,value);$('bars').append(row)}const tips=[];if(atv!==null&&atv<data.goals.atv)tips.push('Average transaction is below goal: practise showing a relevant coordinating piece when it genuinely suits the customer.');if(upt!==null&&upt<data.goals.upt)tips.push('Units per transaction are below goal: try a thoughtful styling or layering demonstration.');if(conv!==null&&conv<data.goals.conversion)tips.push('Conversion is below goal: focus on listening, discovery questions, and making the next step easy.');if(loyal!==null&&loyal<data.goals.loyalty)tips.push('Loyalty signup rate is below goal: explain the program benefits clearly, without pressure.');if(opp===null)tips.push('Conversion is unavailable because at least one shift lacks customer opportunities.');if(eligible===null)tips.push('Loyalty rate is unavailable because at least one shift lacks eligible opportunities.');if(!tips.length)tips.push('Lovely progress! Keep testing what helps customers and compare results over several shifts.');for(const tip of tips){const p=document.createElement('p');p.textContent='✦ '+tip;$('coaching').append(p)}}
function renderHistory(){const el=$('historyList');el.replaceChildren();const shifts=[...data.shifts].sort((a,b)=>b.date.localeCompare(a.date));if(!shifts.length){el.textContent='No saved shifts yet.';return}for(const s of shifts){const row=document.createElement('div');row.className='historyrow';const title=document.createElement('strong');title.textContent=`${s.date} · ${money(s.sales)} · ${s.transactions} transactions`;const edit=document.createElement('button');edit.textContent='Edit';edit.addEventListener('click',()=>loadShift(s));const del=document.createElement('button');del.textContent='Delete';del.addEventListener('click',()=>{if(confirm(`Delete shift ${s.date}?`)){data.shifts=data.shifts.filter(x=>x.date!==s.date);persist();renderHistory()}});row.append(title,document.createElement('br'),edit,del);el.append(row)}}
function renderGoals(){for(const [k,id] of Object.entries({sales:'goalSales',atv:'goalAtv',upt:'goalUpt',conversion:'goalConversion',loyalty:'goalLoyalty'}))$(id).value=data.goals[k]}
$('goalsForm').addEventListener('submit',e=>{e.preventDefault();const g={sales:num('goalSales'),atv:num('goalAtv'),upt:num('goalUpt'),conversion:num('goalConversion'),loyalty:num('goalLoyalty')};if(Object.values(g).some(x=>!Number.isFinite(x)||x<0)||g.conversion>100||g.loyalty>100){alert('Please enter valid goals. Percentage goals must be 0–100.');return}data.goals=g;if(persist())alert('Goals saved ✦')});
function download(name,content,type){const url=URL.createObjectURL(new Blob([content],{type})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000)}
$('export').addEventListener('click',()=>download('blush-moonlight-backup-'+todayLocal()+'.json',JSON.stringify({app:'blush-moonlight',version:2,exportedAt:new Date().toISOString(),...data},null,2),'application/json'));
$('csv').addEventListener('click',()=>{const keys=['date','sales','transactions','units','opportunities','signups','eligible','notes'];const esc=v=>'"'+String(v??'').replaceAll('"','""')+'"';download('blush-moonlight-shifts.csv',[keys.join(','),...data.shifts.map(s=>keys.map(k=>esc(s[k])).join(','))].join('\r\n'),'text/csv')});
$('import').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try{const incoming=JSON.parse(await file.text());if(incoming.app!=='blush-moonlight'||!Array.isArray(incoming.shifts)||!incoming.shifts.every(s=>s&&typeof s.notes==='string'&&valid(s))||!incoming.goals||!['sales','atv','upt','conversion','loyalty'].every(k=>typeof incoming.goals[k]==='number'&&Number.isFinite(incoming.goals[k])&&incoming.goals[k]>=0)||incoming.goals.conversion>100||incoming.goals.loyalty>100||new Set(incoming.shifts.map(s=>s.date)).size!==incoming.shifts.length)throw Error('Invalid backup');if(!confirm('Replace ALL current shifts and goals with this backup? Export your current backup first.'))return;if(incoming.development!==undefined&&(!Array.isArray(incoming.development)||!incoming.development.every(validDevelopment)||new Set(incoming.development.map(x=>x.date)).size!==incoming.development.length))throw Error('Invalid development data');data={shifts:incoming.shifts,goals:incoming.goals,development:incoming.development||[]};if(persist())$('backupMessage').textContent='Backup restored successfully.'}catch(err){$('backupMessage').textContent='Import failed: file is not a valid Blush & Moonlight backup.'}finally{e.target.value=''}});
function status(){ $('offlineStatus').textContent=navigator.onLine?'Online · data stored on this device':'Offline · data stored on this device'}window.addEventListener('online',status);window.addEventListener('offline',status);status();
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('./sw.js').catch(()=>{});

// V2.1: Personal development. Kept in the same local data and JSON backup as V2.0.
const salesLabels={discovery:'Ask a thoughtful discovery question',styling:'Suggest a relevant coordinating piece',loyalty:'Explain loyalty benefits without pressure',followup:'Invite the customer to consider next steps'};
const knowledgeLabels={materials:'Review metal and plating basics',care:'Explain jewelry care clearly',styling:'Practice layering and styling',gifting:'Practice gift discovery'};
const leadershipLabels={support:'Support a teammate during a busy moment',feedback:'Give specific, kind feedback',prioritize:'Prioritize tasks during a rush',reflect:'Reflect on one leadership decision'};
function validDevelopment(x){
  return x&&typeof x==='object'&&/^\d{4}-\d{2}-\d{2}$/.test(x.date)&&
    Object.hasOwn(salesLabels,x.salesPractice)&&Object.hasOwn(knowledgeLabels,x.knowledgePractice)&&
    Object.hasOwn(leadershipLabels,x.leadershipPractice)&&
    ['salesDone','knowledgeDone','leadershipDone'].every(k=>typeof x[k]==='boolean')&&
    ['win','next'].every(k=>typeof x[k]==='string'&&x[k].length<=350);
}
$('growthDate').value=todayLocal();
function gamePlan(){
  const shifts=selected(),g=data.goals,tx=sum(shifts,'transactions'),sales=sum(shifts,'sales'),units=sum(shifts,'units');
  const opp=shifts.length&&shifts.every(s=>s.opportunities!==null)?sum(shifts,'opportunities'):null;
  const eligible=shifts.length&&shifts.every(s=>s.eligible!==null)?sum(shifts,'eligible'):null;
  const metrics=[
    {name:'average transaction',actual:tx?sales/tx:null,target:g.atv,tip:'Ask what occasion or style matters most, then suggest a relevant option within their budget.'},
    {name:'units per transaction',actual:tx?units/tx:null,target:g.upt,tip:'Offer one coordinating piece only when it fits the customer’s interests.'},
    {name:'conversion',actual:opp?100*tx/opp:null,target:g.conversion,tip:'Use a warm discovery question and give the customer room to decide.'},
    {name:'loyalty signup rate',actual:eligible?100*sum(shifts,'signups')/eligible:null,target:g.loyalty,tip:'Explain the approved loyalty benefits clearly, without pressure.'}
  ];
  const below=metrics.filter(m=>m.actual!==null&&m.target>0&&m.actual<m.target).sort((a,b)=>a.actual/a.target-b.actual/b.target);
  return below.length?{title:'Sales focus: '+below[0].name,tip:below[0].tip}:{
    title:shifts.length?'Sales focus: maintain your momentum':'Sales focus: thoughtful discovery',
    tip:shifts.length?'Your available metrics are on target. Keep listening and offer recommendations that genuinely help.':'Begin with one open-ended question about style, occasion, or budget.'
  };
}
function renderDevelopment(){
  const plan=gamePlan(),box=$('gamePlan');box.replaceChildren();
  const heading=document.createElement('h3');heading.textContent='Next shift game plan';
  const sales=document.createElement('p');sales.textContent='♡ '+plan.title+' — '+plan.tip;
  const knowledge=document.createElement('p');knowledge.textContent='✧ Knowledge: spend two minutes reviewing jewelry care or material information from trusted sources.';
  const leadership=document.createElement('p');leadership.textContent='☾ Leadership: look for one opportunity to support a teammate or give useful encouragement.';
  box.append(heading,sales,knowledge,leadership);
  const list=$('growthHistory');list.replaceChildren();
  const entries=[...data.development].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,10);
  if(!entries.length){list.textContent='No development check-ins yet.';return}
  for(const e of entries){
    const card=document.createElement('div');card.className='historyrow';
    const title=document.createElement('strong');title.textContent=e.date+' · '+[e.salesDone,e.knowledgeDone,e.leadershipDone].filter(Boolean).length+'/3 practices';
    const details=document.createElement('p');details.textContent=[e.win?'Win: '+e.win:'',e.next?'Next: '+e.next:''].filter(Boolean).join(' · ')||'Check-in saved.';
    const edit=document.createElement('button');edit.textContent='Edit';edit.addEventListener('click',()=>{loadDevelopment(e);window.scrollTo(0,0)});
    const del=document.createElement('button');del.textContent='Delete';del.addEventListener('click',()=>{if(confirm('Delete development check-in for '+e.date+'?')){const previous=data.development;data.development=previous.filter(x=>x.date!==e.date);if(!persist())data.development=previous;renderDevelopment()}});
    card.append(title,details,edit,del);list.append(card);
  }
}
function loadDevelopment(e){
  $('growthDate').value=e.date;
  for(const k of ['salesPractice','knowledgePractice','leadershipPractice'])$(k).value=e[k];
  for(const k of ['salesDone','knowledgeDone','leadershipDone'])$(k).checked=e[k];
  $('growthWin').value=e.win;$('growthNext').value=e.next;
}
$('growthDate').addEventListener('change',()=>{
  const found=data.development.find(x=>x.date===$('growthDate').value);
  if(found)loadDevelopment(found);
  else {for(const k of ['salesDone','knowledgeDone','leadershipDone'])$(k).checked=false;$('growthWin').value='';$('growthNext').value=''}
});
$('growthForm').addEventListener('submit',e=>{
  e.preventDefault();
  const entry={date:$('growthDate').value,salesPractice:$('salesPractice').value,knowledgePractice:$('knowledgePractice').value,leadershipPractice:$('leadershipPractice').value,
    salesDone:$('salesDone').checked,knowledgeDone:$('knowledgeDone').checked,leadershipDone:$('leadershipDone').checked,
    win:$('growthWin').value.trim(),next:$('growthNext').value.trim()};
  if(!validDevelopment(entry)){$('growthMessage').textContent='Please check your entries.';return}
  const old=data.development;
  data.development=[...old.filter(x=>x.date!==entry.date),entry];
  if(persist())$('growthMessage').textContent='Saved your growth check-in ✦';
  else data.development=old;
  renderDevelopment();
});
const questions=[
  {q:'A customer asks how to care for plated jewelry. What is the safest general advice?',a:['Avoid harsh chemicals and store it dry','Scrub with abrasive powder','Wear it in chlorinated pools'],correct:0,why:'Gentle cleaning and avoiding chemicals generally help protect plating. Follow the item’s approved care guidance.'},
  {q:'Someone is shopping for an anniversary gift. What should you ask first?',a:['What styles or pieces does the recipient enjoy?','What is the most expensive item?','Would you like the same item everyone buys?'],correct:0,why:'Discovery questions help you match the gift to the recipient and the shopper’s budget.'},
  {q:'A customer is unsure about layering necklaces. What is a useful starting point?',a:['Try different lengths and check how they sit together','Always choose identical lengths','Ignore the customer’s preferred style'],correct:0,why:'Varying lengths can help layers sit comfortably and remain visually distinct.'},
  {q:'A customer asks if a particular metal is hypoallergenic. What should you do?',a:['Verify the exact material and approved product details','Promise it will never cause a reaction','Assume all silver-coloured jewelry is the same'],correct:0,why:'Sensitivity varies by person and composition. Avoid unverified guarantees.'},
  {q:'A teammate is overwhelmed during a rush. Which action best supports them?',a:['Offer a specific task you can take on','Criticize them in front of customers','Ignore them until closing'],correct:0,why:'Specific, calm support is more useful than vague encouragement or public criticism.'},
  {q:'What makes feedback more useful for a teammate?',a:['A specific observation and constructive next step','A judgment about their personality','Comparing them publicly with coworkers'],correct:0,why:'Clear, respectful feedback focuses on behaviours and actionable next steps.'}
];
let questionIndex=0;
function renderQuestion(){
  const q=questions[questionIndex];$('quizQuestion').textContent=q.q;
  const answers=$('quizAnswers');answers.replaceChildren();$('quizFeedback').textContent='';
  q.a.forEach((answer,i)=>{const b=document.createElement('button');b.type='button';b.textContent=answer;b.addEventListener('click',()=>{
    $('quizFeedback').textContent=(i===q.correct?'Correct! ':'Not quite. ')+q.why;
    answers.querySelectorAll('button').forEach(button=>button.disabled=true);
  });answers.append(b)});
}
$('nextQuestion').addEventListener('click',()=>{questionIndex=(questionIndex+1)%questions.length;renderQuestion()});
renderQuestion();
