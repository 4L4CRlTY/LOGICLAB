const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
global.pl = require('../vendor/core.js');
for (const name of ['lists', 'charsio', 'format']) require(`../vendor/${name}.js`)(pl);
const Runtime = require('../runtime.js');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root,'lessons.js'),'utf8') + '\n' + fs.readFileSync(path.join(root,'scenarios.js'),'utf8') + '\nthis.exercises=[...LESSONS,...SCENARIOS];this.scenarios=SCENARIOS;', context);

(async()=>{
  let count=0;
  assert.equal(new Set(context.exercises.map(x=>x.id)).size,context.exercises.length);
  for (const exercise of context.exercises) {
    for (const test of exercise.tests) {
      const runtime = new Runtime();
      await runtime.load(exercise.solution);
      const result = await runtime.query(test.query,test.input||'');
      assert.equal(result.success,test.success,`${exercise.id}: ${test.name}: ${result.text}`);
      if(test.output!==undefined) assert.equal(result.output,test.output,`${exercise.id}: ${test.name}`);
      count++;
    }
    console.log(`PASS ${exercise.id}: ${exercise.tests.length} checks`);
  }
  for(const scenario of context.scenarios){
    assert.equal(scenario.ilo.length,4);
    const runtime=new Runtime();
    await runtime.load(scenario.starter); // TODO comments must leave a valid program.
    await runtime.load(scenario.solution);
    const answer=await runtime.query(scenario.query,scenario.input);
    assert.equal(answer.success,true);
    assert.equal(answer.output+'true.',scenario.expected,`${scenario.id}: sample output`);
  }
  const library=context.scenarios.find(x=>x.id==='scenario-library');
  const runtime=new Runtime();
  await runtime.load(library.solution);
  assert.equal((await runtime.query('borrow(logic_puzzles,ben).')).success,true);
  assert.equal((await runtime.query('loan(logic_puzzles,ben).')).success,true);
  await runtime.load(library.solution);
  assert.equal((await runtime.query('loan(logic_puzzles,ben).')).success,false);
  console.log(`Passed ${count} behavioral checks, all 5 scenario starters and samples, and library session persistence/reset.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
