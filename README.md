# Logic Lab — Prolog Practice

A complete HTML, CSS, and JavaScript practice app with 20 guided exercises based on your IT405 / IT405L lecture and teacher demonstration decks.

## Start practicing

Open **index.html** in Chrome, Edge, or Firefox. All interpreter files are included; no installation or internet connection is needed for the downloaded app.

1. Choose an exercise from the learning path.
2. Read the challenge and edit the Prolog program. On narrow screens, the challenge appears below the editor.
3. Click **Run query**. Click **Next solution ;** to backtrack.
4. For `read/1`, open **Program input** and enter terms ending in periods.
5. Click **Check solution** to run the exercise tests.
6. Use hints or expand the worked solution if you get stuck.

**Free playground** accepts your own programs and queries. **Download .pl** exports the current program for SWI-Prolog.

## Scenario playground

Choose **Scenario playground** to apply ILO1–ILO4 in five small Prolog projects:

1. **Grading system** — weighted grades, a passing threshold, and a student report.
2. **Billing system** — structured orders, quantities, discounts, and receipts.
3. **Fare calculator** — distance calculations, passenger categories, and tickets.
4. **Library loan system** — dynamic facts, borrowing/returning, and overdue notices.
5. **Inventory checker** — compound-term inspection, stock reports, and a custom operator.

Each scenario includes starter code, an ILO topic map, explicit requirements, sample input/output, a hint, a worked solution, and behavioral checks including boundary and invalid inputs. Start with facts and calculation rules, then add input/output. Scenario drafts and completion are saved separately from the 20 original lessons and the free playground. Prices, fares, fees, and grading thresholds are fictional practice rules.

The collection revisits facts, rules, backtracking, data terms, dynamic knowledge bases, term inspection, I/O, and operators. You can keep experimenting after passing the checks. Checks verify sample behavior, not every possible program or whether you used a specific predicate.

Code drafts and completion history are saved in localStorage in the current browser. A hosted copy and a downloaded copy have separate storage. Private browsing, clearing site data, moving the local app, or changing browsers can lose saved progress. Download programs you want to keep.

## Topics

- Facts, rules, backtracking, syntax, and unification
- Dynamic knowledge bases, atoms, variables, functor/3, and arg/3
- write/1, nl/0, tab/1, format/2, read/1, and structured input
- Arithmetic evaluation, term/value comparisons, precedence, and custom operators
- Two combined practice challenges

Exercises are original practice adaptations, not official graded activity sheets. The supplied decks mention separate activity sheets, but those sheets were not in the provided folders. No instructor setup or submission instructions were treated as requests to perform those actions.

## Engine compatibility

The app runs real Tau Prolog 0.3.4 in JavaScript. The course uses SWI-Prolog. Common language features work, but this is not a complete SWI-Prolog replacement.

- The lists, charsio, and format modules are preloaded.
- Use double-quoted format text: `format("Hello, ~w!~n", [Name]).` Tau expects a list of characters. SWI also accepts this example but treats double-quoted text as a string by default.
- A Prolog helper implements `tab/1` for the lab's spacing examples.
- Input comes from the Program input box. Exhausted input gives `end_of_file`.
- Run query consults edited source automatically. Do not type `[demo].` to load a local file.
- Runtime assertz/retract changes persist across queries until you edit/reset the source or change exercises. They do not modify the saved program text.
- Checks use fresh sessions, independent of prior console commands.
- Each answer has a 20,000-inference-step limit and output is capped at 30,000 characters. Use small programs here.
- Passing checks verifies the tested behavior, not every possible input or whether a particular implementation technique was used.
- SWI-specific libraries, local filesystem operations, and all SWI extensions are outside the supported course workspace.

The lecture statement that only `is/2` evaluates arithmetic is too broad: arithmetic comparison predicates such as `=:=/2` and `>=/2` evaluate their operands too. The practice text uses this distinction.

## Edit the app

- `index.html` — page structure
- `styles.css` — responsive layout and theme
- `lessons.js` — exercises, hints, worked solutions, and behavioral tests
- `scenarios.js` — five ILO1–ILO4 mini-projects and their checks
- `runtime.js` — interpreter sessions, input/output, and compatibility helper
- `app.js` — editor controls, progress storage, and feedback
- `vendor/` — bundled Tau Prolog modules and BSD license

No build step is required. Serve `` with any static web server, or open index.html directly. Supported browsers can optionally expose the visible query runner through WebMCP.

Run `node tests/scenarios.test.cjs` to verify all lesson and scenario worked solutions with the bundled interpreter, plus scenario starters, sample output, and library session behavior. No npm install is needed.

## Source material

Prepared from the seven provided PowerPoint decks by Charles Fonzy C. Varquez, IT405 / IT405L, SLSU Tomas Oppus Campus:

1. IT405_ILO1_Intro_to_Logic_Programming.pptx
2. IT405_ILO2_Facets_Syntax_KnowledgeBase_DataObjects.pptx
3. IT405_ILO3_Input_and_Output.pptx
4. IT405_ILO4_Prolog_Operators.pptx
5. IT405L_Lab1_Teacher_Demonstration (2).pptx
6. IT405L_Lab2_Teacher_Demonstration.pptx
7. IT405L_Lab3_Teacher_Demonstration.pptx

Tau Prolog: https://tau-prolog.org/ · source: https://github.com/tau-prolog/tau-prolog


