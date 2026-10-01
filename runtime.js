/* Tau Prolog adapter: real consultation, queries, streams and backtracking. */
class PrologRuntime {
 constructor(){this.session=null;this.source=null;this.output='';this.input='';this.position=0;this.limit=20000;}
 async load(source){
  this.session=pl.create(this.limit);this.source=null;this.output='';
  const out={put:text=>{if(this.output.length<30000)this.output+=String(text).slice(0,30000-this.output.length);return true;},flush:()=>true};
  this.session.streams.user_output.stream=out;this.session.streams.user_error.stream=out;
  this.session.streams.user_input.stream={get:n=>{if(this.position>=this.input.length)return 'end_of_stream';const x=this.input.slice(this.position,this.position+n);this.position+=x.length;return x;},eof:()=>this.position>=this.input.length};
  // Course compatibility helper: Tau 0.3.4 does not provide SWI's tab/1.
  const prelude=":- use_module(library(lists)).\n:- use_module(library(charsio)).\n:- use_module(library(format)).\ntab(N) :- integer(N), N >= 0, lab_spaces(N).\nlab_spaces(0) :- !.\nlab_spaces(N) :- put_char(' '), M is N-1, lab_spaces(M).\n";
  const opts={text:true,url:false,file:false,script:false,html:false};
  await new Promise((resolve,reject)=>this.session.consult(prelude,{...opts,success:resolve,error:e=>reject(new Error(this.formatError(e)))}));
  await new Promise((resolve,reject)=>this.session.consult(source,{...opts,success:resolve,error:e=>reject(new Error(this.formatError(e)))}));
  this.source=source;
 }
 setInput(input){this.input=input ? input+'\n' : '';this.position=0;const s=this.session.streams.user_input;s.position=0;s.char_count=0;s.line_count=1;s.line_position=0;}
 async query(query,input=''){
  this.output='';this.setInput(input);let q=query.trim().replace(/^\?\-\s*/,'');if(!q)throw new Error('Enter a Prolog query first.');
  await new Promise((resolve,reject)=>this.session.query(q,{success:resolve,error:e=>reject(new Error(this.formatError(e)))}));
  return this.next();
 }
 async next(){
  this.output='';
  return new Promise((resolve,reject)=>this.session.answer({success:answer=>resolve({success:true,text:pl.format_answer(answer,{session:this.session}),output:this.output}),fail:()=>resolve({success:false,text:'false.',output:this.output}),error:e=>reject(new Error(this.formatError(e))),limit:()=>reject(new Error('Execution limit reached (20,000 inference steps). Check recursive rules or narrow your query.'))}));
 }
 formatError(e){return typeof e==='string'?e:e.toString();}
}
if(typeof module!=='undefined')module.exports=PrologRuntime;

