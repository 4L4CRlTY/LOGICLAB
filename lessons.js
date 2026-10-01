/* Original practice exercises adapted from the supplied IT405 decks. */
const GROUPS = [
  "Facts & rules",
  "Knowledge & data",
  "Input & output",
  "Prolog operators"
];
const LESSONS = [
  {
    "id": "facts",
    "group": 0,
    "title": "Tell Prolog what you know",
    "description": "Start with a tiny teaching knowledge base. Fonz teaches IT405 and IT405L. Write these two facts so Prolog can answer questions about them.",
    "concept": "A fact states a relationship. Lowercase names such as fonz are atoms. Every clause ends with a period.",
    "requirements": [
      "Add teaches(fonz, it405).",
      "Add a second fact for it405l.",
      "Run the query, then request the next solution."
    ],
    "starter": "% What courses does Fonz teach?\nteaches(fonz, it405).\n\n% Add the second fact below.\n",
    "query": "teaches(fonz, Course).",
    "expected": "Course = it405 ;\nCourse = it405l.",
    "solution": "teaches(fonz, it405).\nteaches(fonz, it405l).",
    "hint": "Copy the shape of the first fact. Change only the second argument to it405l. Keep the final period.",
    "tests": [
      {
        "name": "Fonz teaches IT405",
        "query": "teaches(fonz,it405).",
        "success": true
      },
      {
        "name": "Fonz teaches IT405L",
        "query": "teaches(fonz,it405l).",
        "success": true
      },
      {
        "name": "Exactly those two courses",
        "query": "findall(C,teaches(fonz,C),Cs), msort(Cs,[it405,it405l]).",
        "success": true
      }
    ],
    "source": "Lecture ILO 1–2 · Lab 1, slides 6–7",
    "input": ""
  },
  {
    "id": "rules",
    "group": 0,
    "title": "Connect facts with a rule",
    "description": "Define instructor_of(Person, Course) using teaches/2. Your rule should work for any teacher and course in the knowledge base.",
    "concept": "Head :- Body means the head is true if the body succeeds. Variables start with an uppercase letter or an underscore.",
    "requirements": [
      "Keep all three teaches/2 facts.",
      "Write one general instructor_of/2 rule."
    ],
    "starter": "teaches(fonz, it405).\nteaches(fonz, it405l).\nteaches(reyes, it214).\n\n% Define instructor_of(Person, Course).\n",
    "query": "instructor_of(fonz, C).",
    "expected": "C = it405 ;\nC = it405l.",
    "solution": "teaches(fonz, it405).\nteaches(fonz, it405l).\nteaches(reyes, it214).\ninstructor_of(P, C) :- teaches(P, C).",
    "hint": "Use the same two variables in the head and the teaches/2 goal after :- .",
    "tests": [
      {
        "name": "Finds Fonz and IT405",
        "query": "instructor_of(fonz,it405).",
        "success": true
      },
      {
        "name": "Finds another teacher",
        "query": "instructor_of(reyes,it214).",
        "success": true
      },
      {
        "name": "Rejects a course not taught",
        "query": "instructor_of(reyes,it405).",
        "success": false
      }
    ],
    "source": "Lecture ILO 1–2 · Lab 1, slides 6–7",
    "input": ""
  },
  {
    "id": "backtracking",
    "group": 0,
    "title": "Find every possible answer",
    "description": "Write classmate_of(A, B) for students enrolled in the same course. A student must not count as their own classmate.",
    "concept": "Prolog searches facts in order and can backtrack to find another answer. A comma joins goals that must all succeed.",
    "requirements": [
      "Use enrolled/2 twice with a shared course variable.",
      "Require different students with A \\= B."
    ],
    "starter": "enrolled(maria, it405).\nenrolled(ben, it405).\nenrolled(ana, it405).\nenrolled(carlos, it214).\n\n% Add classmate_of/2.\n",
    "query": "classmate_of(maria, Who).",
    "expected": "Who = ben ;\nWho = ana.",
    "solution": "enrolled(maria, it405).\nenrolled(ben, it405).\nenrolled(ana, it405).\nenrolled(carlos, it214).\nclassmate_of(A, B) :- enrolled(A, C), enrolled(B, C), A \\= B.",
    "hint": "Bind A and B with enrolled/2 before checking A \\= B. Goal order matters for this test.",
    "tests": [
      {
        "name": "Finds both classmates",
        "query": "findall(B,classmate_of(maria,B),Bs), msort(Bs,[ana,ben]).",
        "success": true
      },
      {
        "name": "Excludes self",
        "query": "classmate_of(maria,maria).",
        "success": false
      },
      {
        "name": "Excludes other courses",
        "query": "classmate_of(maria,carlos).",
        "success": false
      }
    ],
    "source": "Lecture ILO 1–2 · Lab 1, slides 6–7 · extension practice",
    "input": ""
  },
  {
    "id": "syntax",
    "group": 0,
    "title": "Repair a broken program",
    "description": "This knowledge base has two syntax mistakes. Repair them so the program loads and teacher/1 finds Fonz.",
    "concept": "Predicate names normally begin with lowercase letters. Comments begin with %. Check the preceding clause when an error location looks surprising.",
    "requirements": [
      "Correct the capitalized predicate.",
      "Finish the fact with a period.",
      "Keep teacher/1 general."
    ],
    "starter": "Teaches(fonz, it405)\nteacher(P) :- teaches(P, _).\n",
    "query": "teacher(Who).",
    "expected": "Who = fonz.",
    "solution": "teaches(fonz, it405).\nteacher(P) :- teaches(P, _).",
    "hint": "Teaches is parsed as a variable. Use teaches, and add a period after the fact.",
    "tests": [
      {
        "name": "Fact loads correctly",
        "query": "teaches(fonz,it405).",
        "success": true
      },
      {
        "name": "Rule identifies the teacher",
        "query": "teacher(fonz).",
        "success": true
      },
      {
        "name": "Unknown teacher fails",
        "query": "teacher(ana).",
        "success": false
      }
    ],
    "source": "Lecture ILO 2 · Lab 1, slides 12–13",
    "input": ""
  },
  {
    "id": "unification",
    "group": 0,
    "title": "Match the structure",
    "description": "Extract the teacher and course from a teaches/2 compound term by defining unpack/3. Make it work for any matching term.",
    "concept": "Unification matches the functor and arguments. It can bind variables without performing arithmetic.",
    "requirements": [
      "Define unpack(Term, Teacher, Course).",
      "Accept a teaches/2 term and expose its arguments."
    ],
    "starter": "% Example: unpack(teaches(fonz,it405), P, C).\n% Define unpack/3 below.\n",
    "query": "unpack(teaches(fonz, it405), P, C).",
    "expected": "P = fonz, C = it405.",
    "solution": "unpack(teaches(P, C), P, C).",
    "hint": "Put teaches(P, C) directly in the first argument of unpack/3.",
    "tests": [
      {
        "name": "Extracts both arguments",
        "query": "unpack(teaches(fonz,it405),fonz,it405).",
        "success": true
      },
      {
        "name": "Works for new values",
        "query": "unpack(teaches(reyes,it214),reyes,it214).",
        "success": true
      },
      {
        "name": "Rejects a different structure",
        "query": "unpack(enrolled(ana,it405),ana,it405).",
        "success": false
      }
    ],
    "source": "Lecture ILO 1–2 · Lab 1, slides 6–7",
    "input": ""
  },
  {
    "id": "dynamic",
    "group": 1,
    "title": "Change the knowledge base",
    "description": "Declare teaches/2 dynamic, then write add_teacher/2 and remove_teacher/2. Use queries to add a fact, inspect it, and remove it.",
    "concept": "assertz/1 adds a clause at the end. retract/1 removes a matching clause. Changes remain in this running session until you edit or reload the program.",
    "requirements": [
      "Declare :- dynamic(teaches/2).",
      "Implement add_teacher(P,C) using assertz/1.",
      "Implement remove_teacher(P,C) using retract/1."
    ],
    "starter": ":- dynamic(teaches/2).\nteaches(fonz, it405).\n\n% Define add_teacher/2 and remove_teacher/2.\n",
    "query": "add_teacher(reyes, it214), teaches(reyes, it214).",
    "expected": "true.",
    "solution": ":- dynamic(teaches/2).\nteaches(fonz, it405).\nadd_teacher(P, C) :- assertz(teaches(P, C)).\nremove_teacher(P, C) :- retract(teaches(P, C)).",
    "hint": "Wrap teaches(P, C) inside assertz(...) or retract(...). Try listing(teaches/2). in the console afterward.",
    "tests": [
      {
        "name": "Adds a new fact",
        "query": "add_teacher(reyes,it214), teaches(reyes,it214).",
        "success": true
      },
      {
        "name": "Removes an added fact",
        "query": "add_teacher(ana,it999), remove_teacher(ana,it999), \\+ teaches(ana,it999).",
        "success": true
      },
      {
        "name": "Preserves the original fact",
        "query": "teaches(fonz,it405).",
        "success": true
      }
    ],
    "source": "Lecture ILO 2 · Lab 1, slides 9–10",
    "input": ""
  },
  {
    "id": "types",
    "group": 1,
    "title": "Atoms are not variables",
    "description": "Define named_student/1 so it succeeds only for an atom. Then experiment with maria, the quoted atom 'Maria', and the variable Maria.",
    "concept": "maria and 'Maria' are atoms. An unquoted Maria is a variable. atom/1 tests an atom; var/1 tests an unbound variable.",
    "requirements": [
      "Use atom/1 in named_student/1.",
      "Reject numbers and unbound variables."
    ],
    "starter": "% Define named_student(Name).\n",
    "query": "named_student('Maria').",
    "expected": "true.",
    "solution": "named_student(Name) :- atom(Name).",
    "hint": "Use named_student(Name) :- atom(Name). Try named_student(Maria). to see the difference.",
    "tests": [
      {
        "name": "Accepts lowercase atoms",
        "query": "named_student(maria).",
        "success": true
      },
      {
        "name": "Accepts quoted atoms",
        "query": "named_student('Maria').",
        "success": true
      },
      {
        "name": "Rejects an unbound variable",
        "query": "named_student(Name).",
        "success": false
      },
      {
        "name": "Rejects numbers",
        "query": "named_student(405).",
        "success": false
      }
    ],
    "source": "Lecture ILO 2 · Lab 1, slide 15",
    "input": ""
  },
  {
    "id": "functor",
    "group": 1,
    "title": "Inspect a compound term",
    "description": "Write describe/3 to return a term’s functor and arity. For date(15,july,2026), the functor is date and the arity is 3.",
    "concept": "functor(Term, Name, Arity) describes the outer shape of a term. Arity is the number of arguments.",
    "requirements": [
      "Define describe(Term, Name, Arity) with functor/3.",
      "Support both compound terms and atoms."
    ],
    "starter": "% Define describe/3.\n",
    "query": "describe(date(15,july,2026), F, A).",
    "expected": "F = date, A = 3.",
    "solution": "describe(Term, Name, Arity) :- functor(Term, Name, Arity).",
    "hint": "The three arguments can pass directly to functor/3. An atom has arity 0.",
    "tests": [
      {
        "name": "Describes a date",
        "query": "describe(date(15,july,2026),date,3).",
        "success": true
      },
      {
        "name": "Describes another structure",
        "query": "describe(teaches(fonz,it405),teaches,2).",
        "success": true
      },
      {
        "name": "Describes an atom",
        "query": "describe(maria,maria,0).",
        "success": true
      }
    ],
    "source": "Lecture ILO 2 · Lab 1, slide 16",
    "input": ""
  },
  {
    "id": "arg",
    "group": 1,
    "title": "Pull out an argument",
    "description": "Write month_of/2 to extract the second argument of a date/3 term using arg/3.",
    "concept": "arg(Index, Term, Value) counts arguments starting at 1. The second argument in date(15,july,2026) is july.",
    "requirements": [
      "Use arg/3 to read argument 2.",
      "Make the rule work for different months."
    ],
    "starter": "% month_of(date(Day,Month,Year), Month).\n",
    "query": "month_of(date(15,july,2026), M).",
    "expected": "M = july.",
    "solution": "month_of(Date, Month) :- arg(2, Date, Month).",
    "hint": "Use arg(2, Date, Month) as the body of month_of/2.",
    "tests": [
      {
        "name": "Extracts July",
        "query": "month_of(date(15,july,2026),july).",
        "success": true
      },
      {
        "name": "Extracts another month",
        "query": "month_of(date(1,october,2026),october).",
        "success": true
      },
      {
        "name": "Does not return the day",
        "query": "month_of(date(15,july,2026),15).",
        "success": false
      }
    ],
    "source": "Lecture ILO 2 · Lab 1, slide 16",
    "input": ""
  },
  {
    "id": "output",
    "group": 2,
    "title": "Print your first report",
    "description": "Write report/0 to print a two-line course report. Use write/1 for text, tab/1 for spaces, and nl/0 for a new line.",
    "concept": "Output is a side effect. A goal can print text and still succeed or fail. Quoted atoms preserve spaces and punctuation.",
    "requirements": [
      "Print Name: Fonz on line one.",
      "Print Course: IT405 followed by two spaces and (Logic Programming) on line two.",
      "End each line with nl."
    ],
    "starter": "% Define report/0.\nreport :-\n    write('Name: Fonz').\n",
    "query": "report.",
    "expected": "Name: Fonz\nCourse: IT405  (Logic Programming)\ntrue.",
    "solution": "report :-\n    write('Name: Fonz'), nl,\n    write('Course: IT405'), tab(2),\n    write('(Logic Programming)'), nl.",
    "hint": "Separate goals with commas. Only the final goal gets the clause’s period.",
    "tests": [
      {
        "name": "Prints both lines with correct spacing",
        "query": "report.",
        "output": "Name: Fonz\nCourse: IT405  (Logic Programming)\n",
        "input": "",
        "success": true
      }
    ],
    "source": "Lecture ILO 3 · Lab 2, slide 6",
    "input": ""
  },
  {
    "id": "format",
    "group": 2,
    "title": "Format a course report",
    "description": "Define course_report(Name, Course) to print two labeled lines. Use format/2 and fill its placeholders with the arguments.",
    "concept": "~w writes a term, ~d writes an integer, and ~n starts a new line. Each value placeholder consumes one item from the argument list.",
    "requirements": [
      "Print Name: followed by the supplied name.",
      "Print Course: followed by the supplied course.",
      "End both lines with a newline."
    ],
    "starter": "% Define course_report/2 using format/2.\n",
    "query": "course_report(fonz, it405).",
    "expected": "Name: fonz\nCourse: it405\ntrue.",
    "solution": "course_report(Name, Course) :-\n    format(\"Name: ~w~nCourse: ~w~n\", [Name, Course]).",
    "hint": "Use the format string \"Name: ~w~nCourse: ~w~n\" with [Name, Course].",
    "tests": [
      {
        "name": "Formats the first report",
        "query": "course_report(fonz,it405).",
        "output": "Name: fonz\nCourse: it405\n",
        "input": "",
        "success": true
      },
      {
        "name": "Uses new arguments",
        "query": "course_report(reyes,it214).",
        "output": "Name: reyes\nCourse: it214\n",
        "input": "",
        "success": true
      }
    ],
    "source": "Lecture ILO 3 · Lab 2, slide 7",
    "input": ""
  },
  {
    "id": "read",
    "group": 2,
    "title": "Read a name and respond",
    "description": "Define ask_name/0 to read a name and print a greeting. Put the input in the Program input box before running your query.",
    "concept": "read/1 reads a complete Prolog term ending in a period. Use 'Maria'. for a capitalized name; Maria. is a variable.",
    "requirements": [
      "Read one term with read(Name).",
      "Print Hello, followed by the name and an exclamation mark.",
      "End with a newline."
    ],
    "starter": "% Input is supplied in the Program input box.\n% Define ask_name/0.\n",
    "query": "ask_name.",
    "expected": "Hello, maria!\ntrue.",
    "solution": "ask_name :-\n    read(Name),\n    format(\"Hello, ~w!~n\", [Name]).",
    "hint": "Read before printing. Use format(\"Hello, ~w!~n\", [Name]).",
    "tests": [
      {
        "name": "Greets maria",
        "query": "ask_name.",
        "output": "Hello, maria!\n",
        "input": "maria.",
        "success": true
      },
      {
        "name": "Preserves a quoted proper name",
        "query": "ask_name.",
        "output": "Hello, Maria!\n",
        "input": "'Maria'.",
        "success": true
      }
    ],
    "source": "Lecture ILO 3 · Lab 2, slides 9–10",
    "input": "maria."
  },
  {
    "id": "dateinput",
    "group": 2,
    "title": "Read a structured date",
    "description": "Define read_date/0 to read date(Day, Month, Year), then print each component on a single line.",
    "concept": "A read/1 argument can be a pattern. Unification binds D, M, and Y to the corresponding parts of the input term.",
    "requirements": [
      "Read directly into date(D, M, Y).",
      "Print Day D, Month M, Year Y followed by a newline."
    ],
    "starter": "% Define read_date/0.\n",
    "query": "read_date.",
    "expected": "Day 15, Month july, Year 2026\ntrue.",
    "solution": "read_date :-\n    read(date(D, M, Y)),\n    format(\"Day ~w, Month ~w, Year ~w~n\", [D, M, Y]).",
    "hint": "Use read(date(D, M, Y)) followed by format/2 with three ~w placeholders.",
    "tests": [
      {
        "name": "Reads the example date",
        "query": "read_date.",
        "output": "Day 15, Month july, Year 2026\n",
        "input": "date(15,july,2026).",
        "success": true
      },
      {
        "name": "Reads a different date",
        "query": "read_date.",
        "output": "Day 1, Month october, Year 2027\n",
        "input": "date(1,october,2027).",
        "success": true
      }
    ],
    "source": "Lecture ILO 3 · Lab 2, slide 12",
    "input": "date(15, july, 2026)."
  },
  {
    "id": "lookup",
    "group": 2,
    "title": "Build an enrollment lookup",
    "description": "Combine input, a knowledge base, and output. Read a student, find their course, and print the enrollment message.",
    "concept": "The variable read from input becomes the key for a knowledge-base query. If no matching fact exists, that goal fails.",
    "requirements": [
      "Keep both enrolled/2 facts.",
      "Define lookup/0 to read a student and query enrolled/2.",
      "Print STUDENT is enrolled in COURSE with a newline."
    ],
    "starter": "enrolled(maria, it405).\nenrolled(ben, it405l).\n\n% Define lookup/0.\n",
    "query": "lookup.",
    "expected": "maria is enrolled in it405\ntrue.",
    "solution": "enrolled(maria, it405).\nenrolled(ben, it405l).\nlookup :-\n    read(S), enrolled(S, C),\n    format(\"~w is enrolled in ~w~n\", [S, C]).",
    "hint": "Use the same S variable for read(S), enrolled(S,C), and the output list.",
    "tests": [
      {
        "name": "Looks up maria",
        "query": "lookup.",
        "output": "maria is enrolled in it405\n",
        "input": "maria.",
        "success": true
      },
      {
        "name": "Looks up ben",
        "query": "lookup.",
        "output": "ben is enrolled in it405l\n",
        "input": "ben.",
        "success": true
      },
      {
        "name": "Unknown student fails",
        "query": "lookup.",
        "input": "carlos.",
        "success": false,
        "output": ""
      }
    ],
    "source": "Lecture ILO 3 · Lab 2, slide 13",
    "input": "maria."
  },
  {
    "id": "arithmetic",
    "group": 3,
    "title": "Evaluate an expression",
    "description": "Define area(Length, Width, Area) to calculate a rectangle’s area. Use arithmetic evaluation so the answer is a number.",
    "concept": "is/2 evaluates its right-hand expression. =/2 only unifies, so X = 2+3 binds X to a compound term. Arithmetic comparisons also evaluate expressions.",
    "requirements": [
      "Compute Area using Length * Width.",
      "Support any supplied numeric length and width."
    ],
    "starter": "% Calculate the area of a rectangle.\narea(L, W, A) :-\n    A = L * W.\n",
    "query": "area(5, 3, A).",
    "expected": "A = 15.",
    "solution": "area(L, W, A) :- A is L * W.",
    "hint": "Replace = with is. L and W must already be numbers when is/2 runs.",
    "tests": [
      {
        "name": "Computes 5 × 3",
        "query": "area(5,3,A), A == 15.",
        "success": true
      },
      {
        "name": "Computes a new size",
        "query": "area(7,4,A), A == 28.",
        "success": true
      },
      {
        "name": "Handles zero",
        "query": "area(0,5,A), A == 0.",
        "success": true
      }
    ],
    "source": "Lecture ILO 4 · Lab 3, slides 6–7",
    "input": ""
  },
  {
    "id": "comparison",
    "group": 3,
    "title": "Compare values and terms",
    "description": "Implement same_value/2 for arithmetic equality and same_term/2 for strict term identity. They answer different questions.",
    "concept": "=:= evaluates both sides and compares numbers. == checks identical terms without binding variables. = attempts to unify terms.",
    "requirements": [
      "Define same_value(A,B) using =:=.",
      "Define same_term(A,B) using ==."
    ],
    "starter": "% Define same_value/2 and same_term/2.\n",
    "query": "same_value(2+3, 3+2).",
    "expected": "true.",
    "solution": "same_value(A, B) :- A =:= B.\nsame_term(A, B) :- A == B.",
    "hint": "The operators go between A and B. Try same_term(2+3, 3+2).; it should fail.",
    "tests": [
      {
        "name": "Equal arithmetic values succeed",
        "query": "same_value(2+3,3+2).",
        "success": true
      },
      {
        "name": "Different values fail",
        "query": "same_value(2+3,6).",
        "success": false
      },
      {
        "name": "Identical terms succeed",
        "query": "same_term(2+3,+(2,3)).",
        "success": true
      },
      {
        "name": "Different structures fail",
        "query": "same_term(2+3,3+2).",
        "success": false
      },
      {
        "name": "Does not bind a fresh variable",
        "query": "same_term(X,5).",
        "success": false
      }
    ],
    "source": "Lecture ILO 4 · Lab 3, slides 9–10",
    "input": ""
  },
  {
    "id": "precedence",
    "group": 3,
    "title": "Let precedence do the work",
    "description": "Write calculate/2 to evaluate any arithmetic expression. Test how parentheses change the result of 2 + 3 * 4.",
    "concept": "Lower priority numbers bind more tightly: * has priority 400 and + has 500. The expression 2+3*4 groups as 2+(3*4).",
    "requirements": [
      "Define calculate(Expression, Result) using is/2.",
      "Run both 2+3*4 and (2+3)*4."
    ],
    "starter": "% Define calculate/2.\n",
    "query": "calculate(2 + 3 * 4, X).",
    "expected": "X = 14.",
    "solution": "calculate(Expression, Result) :- Result is Expression.",
    "hint": "The Result belongs on the left side of is. The Expression belongs on the right.",
    "tests": [
      {
        "name": "Multiplication binds first",
        "query": "calculate(2+3*4,R), R == 14.",
        "success": true
      },
      {
        "name": "Parentheses change grouping",
        "query": "calculate((2+3)*4,R), R == 20.",
        "success": true
      },
      {
        "name": "Handles integer division and modulo",
        "query": "calculate(17//5+17 mod 5,R), R == 5.",
        "success": true
      }
    ],
    "source": "Lecture ILO 4 · Lab 3, slides 12–13",
    "input": ""
  },
  {
    "id": "operators",
    "group": 3,
    "title": "Create your own operator",
    "description": "Make classmate_of readable as an infix operator. Declare it before writing two facts in the new notation.",
    "concept": "op(Priority, Type, Name) changes how Prolog reads expressions. An infix operator still represents an ordinary compound term.",
    "requirements": [
      "Declare classmate_of with priority 700 and type xfx.",
      "Add maria classmate_of ben. and ben classmate_of maria."
    ],
    "starter": "% Declare the operator first.\n\n% Add the two classmate facts below.\n",
    "query": "X classmate_of ben.",
    "expected": "X = maria.",
    "solution": ":- op(700, xfx, classmate_of).\nmaria classmate_of ben.\nben classmate_of maria.",
    "hint": "Start with :- op(700, xfx, classmate_of). The directive must come before the infix facts.",
    "tests": [
      {
        "name": "Operator is declared",
        "query": "current_op(700,xfx,classmate_of).",
        "success": true
      },
      {
        "name": "Finds Maria",
        "query": "maria classmate_of ben.",
        "success": true
      },
      {
        "name": "Finds Ben",
        "query": "ben classmate_of maria.",
        "success": true
      },
      {
        "name": "Does not invent relationships",
        "query": "ana classmate_of ben.",
        "success": false
      }
    ],
    "source": "Lecture ILO 4 · Lab 3, slides 15–16",
    "input": ""
  },
  {
    "id": "eligibility",
    "group": 3,
    "title": "Put your skills together",
    "description": "Build can_enroll(Student, Course) using student scores and course requirements. A student qualifies when their score is at least the required score.",
    "concept": "Use facts to represent the data, unification to connect it, and >= to compare the numbers after they have been bound.",
    "requirements": [
      "Keep the student and requirement facts.",
      "Define can_enroll/2 as a general rule.",
      "Accept equal scores as well as higher scores."
    ],
    "starter": "score(maria, 85).\nscore(ben, 75).\nscore(ana, 60).\nrequires(it405, 75).\nrequires(it214, 80).\n\n% Define can_enroll/2.\n",
    "query": "can_enroll(Student, it405).",
    "expected": "Student = maria ;\nStudent = ben.",
    "solution": "score(maria, 85).\nscore(ben, 75).\nscore(ana, 60).\nrequires(it405, 75).\nrequires(it214, 80).\ncan_enroll(S, C) :- score(S, N), requires(C, Minimum), N >= Minimum.",
    "hint": "Find score(S,N), then requires(C,Minimum), then compare N >= Minimum.",
    "tests": [
      {
        "name": "Accepts a higher score",
        "query": "can_enroll(maria,it214).",
        "success": true
      },
      {
        "name": "Accepts the exact threshold",
        "query": "can_enroll(ben,it405).",
        "success": true
      },
      {
        "name": "Rejects a lower score",
        "query": "can_enroll(ana,it405).",
        "success": false
      },
      {
        "name": "Checks each course requirement",
        "query": "can_enroll(ben,it214).",
        "success": false
      }
    ],
    "source": "Practice challenge combining Lecture ILO 1–4",
    "input": ""
  },
  {
    "id": "reportchallenge",
    "group": 3,
    "title": "A complete interactive report",
    "description": "Read a student name, look up their score, and print a report. If the score is at least 75, print passed; otherwise print needs_practice.",
    "concept": "An if-then-else has the shape (Condition -> Then ; Else). Bind the score before comparing it. This challenge extends the supplied lab topics.",
    "requirements": [
      "Keep the three score/2 facts.",
      "Define result/0 to read a student.",
      "Print STUDENT: STATUS followed by a newline."
    ],
    "starter": "score(maria, 85).\nscore(ben, 75).\nscore(ana, 60).\n\n% Define result/0.\n",
    "query": "result.",
    "expected": "maria: passed\ntrue.",
    "solution": "score(maria, 85).\nscore(ben, 75).\nscore(ana, 60).\nresult :-\n    read(S), score(S, N),\n    (N >= 75 -> Status = passed ; Status = needs_practice),\n    format(\"~w: ~w~n\", [S, Status]).",
    "hint": "Use (N >= 75 -> Status = passed ; Status = needs_practice), then format/2.",
    "tests": [
      {
        "name": "Reports a passing student",
        "query": "result.",
        "output": "maria: passed\n",
        "input": "maria.",
        "success": true
      },
      {
        "name": "Includes the threshold",
        "query": "result.",
        "output": "ben: passed\n",
        "input": "ben.",
        "success": true
      },
      {
        "name": "Reports a student below threshold",
        "query": "result.",
        "output": "ana: needs_practice\n",
        "input": "ana.",
        "success": true
      }
    ],
    "source": "Extension challenge · Lab 2 I/O + Lab 3 comparisons",
    "input": "maria."
  }
];
const SANDBOX = {
  "id": "sandbox",
  "group": -1,
  "title": "Your free playground",
  "description": "Try your own facts, rules, and queries. The running knowledge base stays available across queries until you change the program or reset it.",
  "concept": "The program editor contains clauses; the query box contains a goal. Use Next solution to ask Prolog to backtrack.",
  "requirements": [
    "Write a program or modify the example.",
    "Supply Program input when you use read/1.",
    "Download your program as a .pl file to use in SWI-Prolog."
  ],
  "starter": "% A place to experiment.\n:- dynamic(teaches/2).\nteaches(fonz, it405).\nteaches(fonz, it405l).\ninstructor_of(P, C) :- teaches(P, C).\n",
  "query": "instructor_of(fonz, Course).",
  "expected": "Course = it405 ;\nCourse = it405l.",
  "hint": "Try listing(teaches/2)., assertz(teaches(reyes,it214))., or X is 2+3*4.",
  "solution": "",
  "source": "Free practice · no automatic grading",
  "input": "",
  "tests": []
};