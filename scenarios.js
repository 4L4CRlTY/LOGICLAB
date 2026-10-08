/* Original mini-projects using the ILO topics already taught in Logic Lab. */
const SCENARIOS = [
  {
    id: 'scenario-grading', title: 'Grading system', level: 'Start here',
    description: 'Help a teacher calculate a final grade. Combine a quiz worth 40% and an exam worth 60%, then print whether the student passed. These are practice rules, not an official grading policy.',
    concept: 'Build in small steps: store facts, calculate a value, classify it, then connect the rules to input and output.',
    requirements: [
      'Keep marks(maria,80,90), marks(ben,75,75), and marks(ana,60,70).',
      'Define grade(Student,Final,Status). Final is (Quiz*40 + Exam*60)/100. Status is passed for Final >= 75; otherwise needs_practice.',
      'Define report/0: read a student atom and print NAME: FINAL - STATUS with a newline. Use format("~w: ~2f - ~w~n", [...]) for two decimal places.',
      'Unknown students must fail. Query grade(Student,Final,Status) and use Next solution to explore all three students.'
    ],
    ilo: ['ILO1 · Facts and rules model students and results; backtracking finds every student.', 'ILO2 · Atoms identify students; variables and marks/3 connect their data.', 'ILO3 · read/1 accepts a student; format/2 prints a report.', 'ILO4 · is/2, parentheses, multiplication, division, and >= calculate and classify grades.'],
    starter: 'marks(maria, 80, 90).\nmarks(ben, 75, 75).\nmarks(ana, 60, 70).\n\n% 1. Define grade(Student, Final, Status).\n% 2. Define report/0 using read/1 and format/2.\n',
    solution: 'marks(maria, 80, 90).\nmarks(ben, 75, 75).\nmarks(ana, 60, 70).\ngrade(Student, Final, Status) :-\n    marks(Student, Quiz, Exam),\n    Final is (Quiz*40 + Exam*60)/100,\n    (Final >= 75 -> Status = passed ; Status = needs_practice).\nreport :-\n    read(Student),\n    grade(Student, Final, Status),\n    format("~w: ~2f - ~w~n", [Student, Final, Status]).',
    query: 'report.', input: 'maria.', expected: 'maria: 86.00 - passed\ntrue.',
    hint: 'First get Quiz and Exam from marks/3. Bind Final with is before comparing it. Use (Final >= 75 -> Status = passed ; Status = needs_practice).',
    tests: [
      {name:'Weighted grade',query:'grade(maria,F,passed), F =:= 86.',success:true},
      {name:'75 is passing',query:'grade(ben,F,passed), F =:= 75.',success:true},
      {name:'Below the threshold',query:'grade(ana,F,needs_practice), F =:= 66.',success:true},
      {name:'Unknown student',query:'grade(unknown,_,_).',success:false},
      {name:'One result for each student',query:'findall(S,grade(S,_,_),Ss), msort(Ss,[ana,ben,maria]).',success:true},
      {name:'Interactive report',query:'report.',input:'maria.',output:'maria: 86.00 - passed\n',success:true},
      {name:'Report reads another student',query:'report.',input:'ana.',output:'ana: 66.00 - needs_practice\n',success:true}
    ]
  },
  {
    id:'scenario-billing', title:'Billing system', level:'Everyday math',
    description:'Build a small shop checkout for one product and quantity. Give a 10% discount when the subtotal reaches 100, and print the amount due.',
    concept:'Represent the input as a compound term, order(Item,Quantity). Separate the bill calculation from printing so you can test each rule.',
    requirements:[
      'Keep price(notebook,50), price(pen,10), and price(bag,200).',
      'Define bill(Item,Quantity,Total). Quantity must be a positive integer. Subtotal = Price*Quantity; charge 90% if Subtotal >= 100, otherwise charge the full subtotal.',
      'Define checkout/0: read order(Item,Quantity), then print ITEM x QUANTITY: TOTAL and a newline. Print Total with ~2f.',
      'Unknown products, zero, negative, fractional, and nonnumeric quantities must fail.'
    ],
    ilo:['ILO1 · Product facts and billing rules answer queries.', 'ILO2 · Unify order(Item,Quantity); validate the quantity with integer/1.', 'ILO3 · Read a structured order and format a receipt.', 'ILO4 · Multiply prices, compare the threshold, and evaluate the discount.'],
    starter:'price(notebook, 50).\nprice(pen, 10).\nprice(bag, 200).\n\n% Define bill(Item, Quantity, Total).\n% Define checkout/0. Input: order(notebook, 2).\n',
    solution:'price(notebook, 50).\nprice(pen, 10).\nprice(bag, 200).\nbill(Item, Quantity, Total) :-\n    integer(Quantity), Quantity > 0,\n    price(Item, Price),\n    Subtotal is Price*Quantity,\n    (Subtotal >= 100 -> Total is Subtotal*90/100 ; Total is Subtotal).\ncheckout :-\n    read(order(Item, Quantity)),\n    bill(Item, Quantity, Total),\n    format("~w x ~d: ~2f~n", [Item, Quantity, Total]).',
    query:'checkout.',input:'order(notebook, 2).',expected:'notebook x 2: 90.00\ntrue.',
    hint:'Check integer(Quantity) before Quantity > 0. In checkout, read(order(Item,Quantity)) directly unifies the two fields. Use ~w, ~d, and ~2f in the receipt.',
    tests:[
      {name:'Below discount threshold',query:'bill(pen,9,T), T =:= 90.',success:true},
      {name:'Exactly at threshold',query:'bill(notebook,2,T), T =:= 90.',success:true},
      {name:'Above threshold',query:'bill(bag,2,T), T =:= 360.',success:true},
      {name:'Unknown item',query:'bill(unknown,1,_).',success:false},
      ...[0,-1,1.5,'two'].map(q=>({name:'Reject quantity '+q,query:`bill(pen,${q},_).`,success:false})),
      {name:'Receipt from structured input',query:'checkout.',input:'order(notebook, 2).',output:'notebook x 2: 90.00\n',success:true},
      {name:'Receipt for another order',query:'checkout.',input:'order(pen, 3).',output:'pen x 3: 30.00\n',success:true}
    ]
  },
  {
    id:'scenario-fare',title:'Fare calculator',level:'More conditions',
    description:'Create a practice fare calculator. The base fare covers the first four kilometers; each extra kilometer costs 2. Students and seniors receive a 20% discount.',
    concept:'Keep categories as facts. Validate inputs before arithmetic, and group alternatives with parentheses. These fares are fictional practice values.',
    requirements:[
      'Keep base_fare(12), passenger(regular), passenger(student), and passenger(senior).',
      'Define fare(Type,Km,Total). Km must be a positive number, and Type must be a known passenger category.',
      'For Km =< 4, Raw is the base fare. Otherwise Raw is Base + (Km-4)*2. Students OR seniors pay Raw*80/100; regular passengers pay Raw.',
      'Define ticket/0 to read trip(Type,Km) and print TYPE: TOTAL with two decimal places and a newline.'
    ],
    ilo:['ILO1 · Facts describe passenger categories and the base fare.', 'ILO2 · trip/2 groups data; number/1 guards arithmetic inputs.', 'ILO3 · Read a trip and print a ticket.', 'ILO4 · Practice =<, >, subtraction, precedence, and a parenthesized OR.'],
    starter:'base_fare(12).\npassenger(regular).\npassenger(student).\npassenger(senior).\n\n% Define fare(Type, Km, Total).\n% Define ticket/0.\n',
    solution:'base_fare(12).\npassenger(regular).\npassenger(student).\npassenger(senior).\nfare(Type, Km, Total) :-\n    passenger(Type), number(Km), Km > 0, base_fare(Base),\n    (Km =< 4 -> Raw is Base ; Raw is Base + (Km-4)*2),\n    ((Type == student ; Type == senior) -> Total is Raw*80/100 ; Total is Raw).\nticket :-\n    read(trip(Type, Km)), fare(Type, Km, Total),\n    format("~w: ~2f~n", [Type, Total]).',
    query:'ticket.',input:'trip(student, 6).',expected:'student: 12.80\ntrue.',
    hint:'Use (Km =< 4 -> ... ; ...) for distance. For the discount use ((Type == student ; Type == senior) -> ... ; ...).',
    tests:[
      {name:'Short regular trip',query:'fare(regular,2,T), T =:= 12.',success:true},
      {name:'Four-kilometer boundary',query:'fare(regular,4,T), T =:= 12.',success:true},
      {name:'Extra distance',query:'fare(regular,6,T), T =:= 16.',success:true},
      {name:'Student discount',query:'fare(student,6,T), abs(T-12.8) < 0.0001.',success:true},
      {name:'Senior discount',query:'fare(senior,4,T), abs(T-9.6) < 0.0001.',success:true},
      {name:'Fractional distance',query:'fare(regular,4.5,T), T =:= 13.',success:true},
      {name:'Unknown category',query:'fare(visitor,4,_).',success:false},
      ...[0,-2,'far'].map(k=>({name:'Reject distance '+k,query:`fare(regular,${k},_).`,success:false})),
      {name:'Printed ticket',query:'ticket.',input:'trip(student, 6).',output:'student: 12.80\n',success:true}
    ]
  },
  {
    id:'scenario-library',title:'Library loan system',level:'Changing facts',
    description:'Track who borrows a library book and calculate a simple overdue fee. Practice changing a knowledge base with assertz/1 and retract/1.',
    concept:'Declare loan/2 dynamic before changing it. Runtime changes last until you edit/reset the program or change exercises; checks each start with a fresh library.',
    requirements:[
      'Keep book(prolog_basics), book(logic_puzzles), loan(prolog_basics,maria), and a dynamic declaration for loan/2.',
      'Define borrow(Book,Person): require a known book and no existing loan, then assertz the new loan. Define return_book(Book,Person) to retract their loan.',
      'Define fee(Days,Amount): Days must be a nonnegative integer; Amount is Days*2.',
      'Define notice/0: read overdue(Book,Days), look up its borrower, and print PERSON: AMOUNT with two decimals and a newline.'
    ],
    ilo:['ILO1 · Rules express borrowing and returning relationships.', 'ILO2 · Dynamic loan/2 facts, assertz/1, retract/1, and compound overdue/2 data.', 'ILO3 · read/1 and format/2 produce an overdue notice.', 'ILO4 · Negation checks availability; >= and is/2 calculate the fee.'],
    starter:':- dynamic(loan/2).\nbook(prolog_basics).\nbook(logic_puzzles).\nloan(prolog_basics, maria).\n\n% Define borrow(Book, Person) and return_book(Book, Person).\n% Define fee(Days, Amount) and notice/0.\n',
    solution:':- dynamic(loan/2).\nbook(prolog_basics).\nbook(logic_puzzles).\nloan(prolog_basics, maria).\nborrow(Book, Person) :-\n    book(Book), \\+ loan(Book, _), assertz(loan(Book, Person)).\nreturn_book(Book, Person) :- retract(loan(Book, Person)).\nfee(Days, Amount) :- integer(Days), Days >= 0, Amount is Days*2.\nnotice :-\n    read(overdue(Book, Days)), loan(Book, Person), fee(Days, Amount),\n    format("~w: ~2f~n", [Person, Amount]).',
    query:'notice.',input:'overdue(prolog_basics, 3).',expected:'maria: 6.00\ntrue.',
    hint:'Use \\+ loan(Book,_) after book(Book) to check availability. Try borrow(logic_puzzles,ben). and then loan(Book,Person). as separate queries.',
    tests:[
      {name:'Borrow an available book',query:'borrow(logic_puzzles,ben), loan(logic_puzzles,ben).',success:true},
      {name:'Cannot lend a borrowed book',query:'borrow(prolog_basics,ben).',success:false},
      {name:'Cannot lend an unknown book',query:'borrow(unknown,ben).',success:false},
      {name:'Cannot borrow twice',query:'borrow(logic_puzzles,ben), borrow(logic_puzzles,ana).',success:false},
      {name:'Return and lend again',query:'return_book(prolog_basics,maria), \\+ loan(prolog_basics,maria), borrow(prolog_basics,ben), loan(prolog_basics,ben).',success:true},
      {name:'Wrong borrower cannot return it',query:'return_book(prolog_basics,ben).',success:false},
      {name:'No overdue fee',query:'fee(0,A), A =:= 0.',success:true},
      {name:'Three days overdue',query:'fee(3,A), A =:= 6.',success:true},
      ...[-1,1.5,'late'].map(d=>({name:'Reject days '+d,query:`fee(${d},_).`,success:false})),
      {name:'Overdue notice',query:'notice.',input:'overdue(prolog_basics, 3).',output:'maria: 6.00\n',success:true}
    ]
  },
  {
    id:'scenario-inventory',title:'Inventory checker',level:'Put it together',
    description:'Help a shop spot items that need restocking. Inspect stock records and create a readable custom operator for asking about low stock.',
    concept:'A compound term has a functor, arity, and arguments. A custom operator is alternate syntax for an ordinary predicate; it does not define the rule for you.',
    requirements:[
      'Keep stock(pen,4), stock(notebook,10), stock(bag,0), and the declaration :- op(700,xfx,needs).',
      'Define inspect(Record,Item,Quantity) using functor/3 and arg/3. Only accept stock/2 records whose Quantity is a nonnegative integer.',
      'Define needs(Item,restock) when a known item has Quantity < 5. Queries such as pen needs restock. must work.',
      'Define stock_report/0: read an item, look up its stock, and print ITEM: QUANTITY - STATUS with a newline. Status is restock below 5, otherwise enough.'
    ],
    ilo:['ILO1 · Stock facts and rules support queries and backtracking.', 'ILO2 · Inspect stock/2 with functor/3 and arg/3; distinguish atoms, numbers, and variables.', 'ILO3 · read/1 accepts an item; format/2 prints its stock report.', 'ILO4 · Define an xfx operator and use < with if-then-else. Compare terms with unification.'],
    starter:':- op(700, xfx, needs).\nstock(pen, 4).\nstock(notebook, 10).\nstock(bag, 0).\n\n% Define inspect(Record, Item, Quantity).\n% Define needs(Item, restock).\n% Define stock_report/0.\n',
    solution:':- op(700, xfx, needs).\nstock(pen, 4).\nstock(notebook, 10).\nstock(bag, 0).\ninspect(Record, Item, Quantity) :-\n    functor(Record, stock, 2),\n    arg(1, Record, Item), arg(2, Record, Quantity),\n    integer(Quantity), Quantity >= 0.\nneeds(Item, restock) :- stock(Item, Quantity), Quantity < 5.\nstock_report :-\n    read(Item), stock(Item, Quantity),\n    (Item needs restock -> Status = restock ; Status = enough),\n    format("~w: ~d - ~w~n", [Item, Quantity, Status]).',
    query:'stock_report.',input:'pen.',expected:'pen: 4 - restock\ntrue.',
    hint:'functor(Record,stock,2) checks the shape. arg(1,Record,Item) extracts the first field. Define needs/2 normally after its operator declaration, then try Item needs restock.',
    tests:[
      {name:'Inspect a record',query:'inspect(stock(pen,4),pen,4).',success:true},
      {name:'Inspect a different record',query:'inspect(stock(eraser,8),eraser,8).',success:true},
      {name:'Reject wrong functor',query:'inspect(price(pen,4),_,_).',success:false},
      {name:'Reject wrong arity',query:'inspect(stock(pen,4,extra),_,_).',success:false},
      {name:'Reject negative stock',query:'inspect(stock(pen,-1),_,_).',success:false},
      {name:'Reject nonnumeric stock',query:'inspect(stock(pen,many),_,_).',success:false},
      {name:'Custom operator query',query:'pen needs restock.',success:true},
      {name:'Enough stock',query:'notebook needs restock.',success:false},
      {name:'All items needing restock',query:'findall(I,I needs restock,Items), msort(Items,[bag,pen]).',success:true},
      {name:'Unknown item',query:'unknown needs restock.',success:false},
      {name:'Low stock report',query:'stock_report.',input:'pen.',output:'pen: 4 - restock\n',success:true},
      {name:'Enough stock report',query:'stock_report.',input:'notebook.',output:'notebook: 10 - enough\n',success:true}
    ]
  }
].map(s=>({...s,group:-2,source:'Original scenario practice · combines the ILO1–ILO4 topics in this app. Checks verify behavior, not which predicates you used.'}));
