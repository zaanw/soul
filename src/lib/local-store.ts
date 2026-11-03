// Real browser-only draft storage. This is not an AI or server API mock.
type Draft={id:string;title:string;messages:{id:string;role:'user'|'assistant';content:string}[];updatedAt:string};
type Rule={id:string;content:string};
type Store={chats:Draft[];memory:Rule[];enabled:boolean};
const key='soul-pages-data-v1';
export async function localData(path:string,method='GET',body?:unknown){
 const data:Store=JSON.parse(localStorage.getItem(key)||'{"chats":[],"memory":[],"enabled":true}');
 const payload=body as {title?:string;content?:string;enabled?:boolean;role?:'user'|'assistant'}|undefined;
 const [route,query]=path.split('?'),[resource,id]=route.split('/');
 const save=()=>localStorage.setItem(key,JSON.stringify(data));
 if(resource==='config')return {models:[],configured:false};
 if(resource==='chats'){
  if(method==='GET')return id?data.chats.find(c=>c.id===id):data.chats.filter(c=>c.title.toLowerCase().includes((new URLSearchParams(query).get('q')||'').toLowerCase())).sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt));
  if(method==='POST'){const draft:Draft={id:crypto.randomUUID(),title:'Новый черновик',messages:[],updatedAt:new Date().toISOString()};data.chats.unshift(draft);save();return draft;}
  if(method==='PUT'&&id){const draft=data.chats.find(c=>c.id===id);if(!draft)throw Error('Chat not found');if(payload?.role!=='assistant'||!payload.content?.trim())throw Error('Invalid assistant message');const idx=draft.messages.findLastIndex(m=>m.role==='assistant');if(idx>=0)draft.messages[idx]={id:crypto.randomUUID(),role:'assistant',content:payload.content.trim().slice(0,12000)};else draft.messages.push({id:crypto.randomUUID(),role:'assistant',content:payload.content.trim().slice(0,12000)});draft.updatedAt=new Date().toISOString();save();return {ok:true};}
  if(method==='POST'&&id){const draft=data.chats.find(c=>c.id===id);if(!draft)throw Error('Chat not found');if(!payload?.content?.trim()||!['user','assistant'].includes(payload.role||''))throw Error('Invalid message');const msg={id:crypto.randomUUID(),role:payload.role!,content:payload.content.trim().slice(0,12000)};draft.messages.push(msg);if(draft.title==='Новый черновик'&&msg.role==='user')draft.title=msg.content.slice(0,60);draft.updatedAt=new Date().toISOString();save();return msg;}
  if(method==='PATCH'){const draft=data.chats.find(c=>c.id===id);if(!draft)throw Error('Draft not found');draft.title=payload?.title?.trim().slice(0,100)||draft.title;draft.updatedAt=new Date().toISOString();}
  if(method==='DELETE')data.chats=id?data.chats.filter(c=>c.id!==id):[];
 }
 if(resource==='memory'){
  if(method==='GET')return {items:data.memory,enabled:data.enabled};
  if(method==='POST'){if(!payload?.content?.trim())throw Error('Empty rule');data.memory.push({id:crypto.randomUUID(),content:payload.content.trim().slice(0,2000)});}
  if(method==='PATCH'){if(id){const rule=data.memory.find(m=>m.id===id);if(rule&&payload?.content?.trim())rule.content=payload.content.trim().slice(0,2000);}else data.enabled=payload?.enabled??true;}
  if(method==='DELETE')data.memory=id?data.memory.filter(m=>m.id!==id):[];
 }
 if(resource==='export')return data.chats;
 save();return {ok:true};
}
