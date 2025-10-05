import { FrameworkEnum } from "@/contexts/voice-context";
import { Course } from "../../courses";

export const jsFundamentalsScopeClosures: Course = {
  id: "j-1",
  title: "JS Fundamentals: Scope & Closures",
  difficulty: "Intermediate",
  durationMin: 40,
  framework: FrameworkEnum.static,
  plan: `
### Stage 1: Understanding Scope
- [ ] Learn the difference between global, function, and block scope.
- [ ] Understand how \`var\`, \`let\`, and \`const\` behave differently with scope.
- [ ] Observe variable shadowing when inner scopes have variables with the same name.
- [ ] Practice accessing variables from different scopes.

### Stage 2: Lexical Scoping and Scope Chain
- [ ] Understand lexical scoping: inner functions have access to outer function variables.
- [ ] Follow the scope chain to see how JavaScript resolves variable names.
- [ ] Recognize that scope is determined at write-time, not runtime.
- [ ] Nest functions and access variables from multiple levels up.

### Stage 3: Closures and Private Variables
- [ ] Define a closure: a function that "remembers" its lexical scope even when executed elsewhere.
- [ ] Create functions that return inner functions with access to outer variables.
- [ ] Use closures to create private variables and methods.
- [ ] Build practical examples like counters and factory functions with closures.

### Stage 4: Common Closure Patterns
- [ ] Implement the module pattern using closures for encapsulation.
- [ ] Create function factories that generate customized functions.
- [ ] Use closures in event handlers and callbacks.
- [ ] Understand common closure pitfalls (e.g., loops with \`var\`).
  `,
  files: {
    "/index.js": `
// JS Fundamentals: Scope & Closures — Guided Template
// Master JavaScript scoping rules and closure patterns.

/*
Your guided TODOs (mirror the course plan):
- [ ] Stage 1: Understand global, function, and block scope
- [ ] Stage 2: Follow the scope chain and lexical scoping
- [ ] Stage 3: Create closures and private variables
- [ ] Stage 4: Apply common closure patterns
*/

// ========================================
// STAGE 1: Understanding Scope
// ========================================

// Global scope
const globalVar = "I'm global";

function demonstrateScope() {
  // Function scope
  const functionVar = "I'm in function scope";
  
  if (true) {
    // Block scope (let and const)
    const blockVar = "I'm in block scope";
    let blockLet = "Also block scoped";
    var functionScopedVar = "I'm function scoped (not block)";
    
    console.log(blockVar); // ✓ accessible
    console.log(globalVar); // ✓ accessible
  }
  
  // console.log(blockVar); // ✗ Error: blockVar is not defined
  console.log(functionScopedVar); // ✓ var is function-scoped, not block-scoped
  console.log(globalVar); // ✓ accessible
}

// Variable shadowing
const name = "Global Alice";

function shadowExample() {
  const name = "Function Bob"; // shadows global name
  
  console.log(name); // "Function Bob"
  
  if (true) {
    const name = "Block Charlie"; // shadows function name
    console.log(name); // "Block Charlie"
  }
  
  console.log(name); // "Function Bob"
}

console.log("=== Stage 1: Scope ===");
demonstrateScope();
shadowExample();

// ========================================
// STAGE 2: Lexical Scoping and Scope Chain
// ========================================

const outerVar = "Outer";

function outer() {
  const middleVar = "Middle";
  
  function middle() {
    const innerVar = "Inner";
    
    function inner() {
      // Inner can access all outer scopes (lexical scoping)
      console.log("From inner:", innerVar, middleVar, outerVar);
    }
    
    inner();
  }
  
  middle();
}

// Scope chain example
function createGreeting(greeting) {
  // This variable is in the closure
  return function(name) {
    // Inner function has access to 'greeting' from outer scope
    return \`\${greeting}, \${name}!\`;
  };
}

const sayHello = createGreeting("Hello");
const sayHi = createGreeting("Hi");

console.log("\\n=== Stage 2: Lexical Scoping ===");
outer();
console.log(sayHello("Alice")); // "Hello, Alice!"
console.log(sayHi("Bob")); // "Hi, Bob!"

// ========================================
// STAGE 3: Closures and Private Variables
// ========================================

// Basic closure: inner function remembers outer variables
function createCounter() {
  let count = 0; // private variable
  
  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log("\\n=== Stage 3: Closures ===");
console.log("Counter 1:", counter1.increment()); // 1
console.log("Counter 1:", counter1.increment()); // 2
console.log("Counter 2:", counter2.increment()); // 1 (separate instance)
console.log("Counter 1 current:", counter1.getCount()); // 2

// Factory function with closures
function createBankAccount(initialBalance) {
  let balance = initialBalance; // private
  
  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) {
        return "Insufficient funds";
      }
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
console.log("Initial:", account.getBalance()); // 100
console.log("After deposit:", account.deposit(50)); // 150
console.log("After withdraw:", account.withdraw(30)); // 120
// console.log(account.balance); // undefined (private!)

// ========================================
// STAGE 4: Common Closure Patterns
// ========================================

// Module pattern
const calculator = (function() {
  // Private variables and functions
  let history = [];
  
  function addToHistory(operation, result) {
    history.push({ operation, result, timestamp: new Date() });
  }
  
  // Public API
  return {
    add(a, b) {
      const result = a + b;
      addToHistory(\`\${a} + \${b}\`, result);
      return result;
    },
    subtract(a, b) {
      const result = a - b;
      addToHistory(\`\${a} - \${b}\`, result);
      return result;
    },
    getHistory() {
      return [...history]; // return a copy
    },
    clearHistory() {
      history = [];
    }
  };
})();

console.log("\\n=== Stage 4: Closure Patterns ===");
console.log("5 + 3 =", calculator.add(5, 3));
console.log("10 - 4 =", calculator.subtract(10, 4));
console.log("History:", calculator.getHistory());

// Function factory
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log("\\nFunction Factory:");
console.log("double(5) =", double(5)); // 10
console.log("triple(5) =", triple(5)); // 15

// Closure in callbacks
function setupButtons() {
  const buttons = [];
  
  // WRONG: using var in a loop (common pitfall)
  for (var i = 0; i < 3; i++) {
    buttons.push(function() {
      console.log("Button", i); // Will always log 3!
    });
  }
  
  // RIGHT: using let creates a new binding for each iteration
  const correctButtons = [];
  for (let j = 0; j < 3; j++) {
    correctButtons.push(function() {
      console.log("Button", j); // Logs correct index
    });
  }
  
  return { buttons, correctButtons };
}

const { buttons, correctButtons } = setupButtons();
console.log("\\nClosure Pitfall (var):");
buttons.forEach(btn => btn()); // All log "Button 3"

console.log("\\nClosure Fixed (let):");
correctButtons.forEach(btn => btn()); // Logs "Button 0", "Button 1", "Button 2"

// ========================================
// YOUR TURN: Practice Exercise
// ========================================

// TODO: Create a function 'createTimer' that:
//       - Stores a private start time
//       - Returns an object with:
//         * start() - records current time
//         * stop() - returns elapsed time in seconds
//         * reset() - resets the timer

// TODO: Create a function 'createSecretkeeper' that:
//       - Takes a secret string
//       - Returns an object with:
//         * getHint() - returns first 3 characters
//         * guess(attempt) - returns true if correct, false otherwise
//         * getAttempts() - returns number of guesses made

// TODO: Fix this common closure bug:
// function createMultipliers() {
//   const funcs = [];
//   for (var i = 1; i <= 3; i++) {
//     funcs.push(function(n) { return n * i; });
//   }
//   return funcs;
// }
// Why does this not work as expected? Fix it.

// Add your code here:

console.log("\\n=== Your Turn ===");
console.log("Implement the exercises above to master closures!");
`,
  }
};
