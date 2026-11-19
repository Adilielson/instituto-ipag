import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const compile=async(source)=>import('data:text/javascript;base64,'+Buffer.from(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ES2022,target:ts.ScriptTarget.ES2022}}).outputText).toString('base64'));
const {logoPlacement,prepareLogo}=await compile(readFileSync('src/lib/institutional/logo-upload.ts','utf8'));
let checks=0;const test=(v)=>{assert.ok(v);checks++;};
for(const [w,h] of [[1200,400],[400,1200],[600,300],[50,50]]){const p=logoPlacement(w,h);test(p.width<=560&&p.height<=260);test(Math.abs(p.width/p.height-w/h)<0.02);test(p.x>=20&&p.y>=20);test(p.width<=w&&p.height<=h);}
for(const pair of [[0,1],[NaN,10],[20000,1],[8000,8000]]){assert.throws(()=>logoPlacement(...pair));checks++;}
await assert.rejects(prepareLogo(new File(['x'],'a.svg',{type:'image/svg+xml'})));checks++;
await assert.rejects(prepareLogo(new File([new Uint8Array(5*1024*1024+1)],'a.png',{type:'image/png'})));checks++;
let drawn,canvas;
globalThis.Image=class {naturalWidth=1200;naturalHeight=400;set src(v){queueMicrotask(()=>this.onload());}};
globalThis.document={createElement:()=>canvas={width:0,height:0,getContext:()=>({drawImage:(...args)=>drawn=args}),toBlob:fn=>fn(new Blob(['png'],{type:'image/png'}))}};
const file=await prepareLogo(new File(['png'],'brand.png',{type:'image/png'}));test(file.type==='image/png');test(canvas.width===600&&canvas.height===300);test(drawn[3]===560&&drawn[4]===187);
const routeSource=readFileSync('src/routes/api/public/partners/$id/logo.ts','utf8').replace(/import \{ createFileRoute \} from ["']@tanstack\/react-router["'];/,'const createFileRoute=()=>config=>config;').replace(/import\(["']@\/integrations\/supabase\/client.server["']\)/g,'Promise.resolve(globalThis.__storage)');
let row={file_path:'test.png'},dbError=null,downloads=0,asset=new Blob(['png'],{type:'image/png'});
globalThis.__storage={supabaseAdmin:{from:()=>({select(){return this;},eq(k,v){if(k==='published')assert.equal(v,true);return this;},async maybeSingle(){return {data:row,error:dbError};}}),storage:{from:()=>({download:async()=>{downloads++;return {data:asset};}})}}};
const {Route}=await compile(routeSource);const get=(id='11111111-1111-4111-8111-111111111111')=>Route.server.handlers.GET({params:{id}});
test((await get('../../x')).status===404);test(downloads===0);
let response=await get();test(response.status===200);test(response.headers.get('Content-Type')==='image/png');test(response.headers.get('Cache-Control').includes('max-age=60'));
row=null;response=await get();test(response.status===404);test(response.headers.get('Cache-Control')==='no-store');
row={file_path:'test.png'};dbError=new Error('secret details');response=await get();test(response.status===503);test(!(await response.text()).includes('secret'));
dbError=null;asset=new Blob(['<script>'],{type:'text/html'});test((await get()).status===503);
console.log(`${checks} partner logo checks passed`);
