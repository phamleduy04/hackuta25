import { FrameworkEnum } from "@/contexts/voice-context";
import { Course } from "../../courses";

export const typescriptBasics: Course = {
  id: "t-1",
  title: "TypeScript Basics: Types & Interfaces",
  difficulty: "Beginner",
  durationMin: 30,
  framework: FrameworkEnum.static,
  plan: `
### Stage 1: Primitive Types
- [ ] Learn how to annotate variables with \`string\`, \`number\`, \`boolean\`, \`null\`, and \`undefined\`.
- [ ] Understand type inference when TypeScript automatically detects types.
- [ ] Use \`let\` and \`const\` with explicit type annotations.
- [ ] Practice declaring variables with different primitive types.

### Stage 2: Arrays and Objects
- [ ] Annotate arrays using \`Type[]\` or \`Array<Type>\` syntax.
- [ ] Define object shapes with inline type annotations.
- [ ] Use optional properties with the \`?\` operator.
- [ ] Create nested object types for more complex data structures.

### Stage 3: Functions and Return Types
- [ ] Annotate function parameters with types.
- [ ] Specify function return types explicitly.
- [ ] Use \`void\` for functions that don't return a value.
- [ ] Understand how TypeScript infers return types.

### Stage 4: Interfaces and Type Aliases
- [ ] Define interfaces to describe object shapes.
- [ ] Create type aliases using the \`type\` keyword.
- [ ] Understand when to use \`interface\` vs \`type\`.
- [ ] Extend interfaces to create more specific types.
  `,
  files: {
    "/index.ts": `
// TypeScript Basics: Types & Interfaces — Guided Template
// Learn how to add type safety to your code with TypeScript.

/*
Your guided TODOs (mirror the course plan):
- [ ] Stage 1: Practice primitive type annotations
- [ ] Stage 2: Define arrays and object types
- [ ] Stage 3: Add types to function parameters and returns
- [ ] Stage 4: Create interfaces and type aliases
*/

// ========================================
// STAGE 1: Primitive Types
// ========================================

// Basic type annotations
const userName: string = "Alice";
const userAge: number = 25;
const isActive: boolean = true;
const nullValue: null = null;
const undefinedValue: undefined = undefined;

// Type inference (TypeScript automatically detects the type)
let inferredString = "Hello"; // TypeScript knows this is a string
let inferredNumber = 42; // TypeScript knows this is a number

console.log("Stage 1: Primitives");
console.log({ userName, userAge, isActive });

// ========================================
// STAGE 2: Arrays and Objects
// ========================================

// Array types
const numbers: number[] = [1, 2, 3, 4, 5];
const fruits: Array<string> = ["apple", "banana", "cherry"];

// Inline object type
const person: { name: string; age: number; email?: string } = {
  name: "Bob",
  age: 30,
  // email is optional (note the ?)
};

// Nested object types
const company: {
  name: string;
  address: {
    street: string;
    city: string;
    zipCode: number;
  };
} = {
  name: "Tech Corp",
  address: {
    street: "123 Main St",
    city: "San Francisco",
    zipCode: 94102,
  },
};

console.log("\\nStage 2: Arrays and Objects");
console.log({ numbers, fruits, person, company });

// ========================================
// STAGE 3: Functions and Return Types
// ========================================

// Function with typed parameters and return type
function add(a: number, b: number): number {
  return a + b;
}

// Function that returns void (no return value)
function logMessage(message: string): void {
  console.log(message);
}

// Arrow function with types
const multiply = (a: number, b: number): number => {
  return a * b;
};

// Function with optional parameters
function greet(name: string, title?: string): string {
  if (title) {
    return \`Hello, \${title} \${name}!\`;
  }
  return \`Hello, \${name}!\`;
}

console.log("\\nStage 3: Functions");
console.log("add(5, 3) =", add(5, 3));
console.log("multiply(4, 7) =", multiply(4, 7));
console.log(greet("Alice"));
console.log(greet("Bob", "Dr."));

// ========================================
// STAGE 4: Interfaces and Type Aliases
// ========================================

// Interface: describes the shape of an object
interface User {
  id: number;
  name: string;
  email: string;
  isAdmin?: boolean; // optional property
}

const user1: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  isAdmin: true,
};

const user2: User = {
  id: 2,
  name: "Bob",
  email: "bob@example.com",
  // isAdmin is optional, so we can omit it
};

// Type alias: creates a reusable type
type Point = {
  x: number;
  y: number;
};

const origin: Point = { x: 0, y: 0 };
const point: Point = { x: 10, y: 20 };

// Type alias for function signatures
type MathOperation = (a: number, b: number) => number;

const subtract: MathOperation = (a, b) => a - b;
const divide: MathOperation = (a, b) => a / b;

// Extending interfaces
interface AdminUser extends User {
  permissions: string[];
}

const admin: AdminUser = {
  id: 3,
  name: "Charlie",
  email: "charlie@example.com",
  isAdmin: true,
  permissions: ["read", "write", "delete"],
};

console.log("\\nStage 4: Interfaces and Type Aliases");
console.log({ user1, user2, origin, point, admin });
console.log("subtract(10, 3) =", subtract(10, 3));

// ========================================
// YOUR TURN: Practice Exercise
// ========================================

// TODO: Create an interface called 'Product' with:
//       - id (number)
//       - name (string)
//       - price (number)
//       - inStock (boolean)
//       - description (optional string)

// TODO: Create a function called 'calculateTotal' that takes:
//       - an array of Products
//       - returns the total price of all in-stock products

// TODO: Create an interface called 'ShoppingCart' with:
//       - userId (number)
//       - items (array of Products)
//       - total (number)

// Add your code here:

console.log("\\n=== Your Turn ===");
console.log("Define Product interface, calculateTotal function, and ShoppingCart interface above.");
`,
  }
};
