import { FrameworkEnum } from "@/contexts/voice-context";
import { Course } from "../../courses";

export const advancedTypesGenerics: Course = {
  id: "t-2",
  title: "Advanced Types & Generics",
  difficulty: "Intermediate",
  durationMin: 35,
  framework: FrameworkEnum.static,
  plan: `
### Stage 1: Union and Intersection Types
- [ ] Learn how to use union types (\`A | B\`) for values that can be one of several types.
- [ ] Use intersection types (\`A & B\`) to combine multiple types.
- [ ] Understand type narrowing with type guards and conditionals.
- [ ] Apply union and intersection types to function parameters and return types.

### Stage 2: Literal Types and Type Guards
- [ ] Define literal types for specific string, number, or boolean values.
- [ ] Combine literal types with unions for precise constraints.
- [ ] Implement type guards using \`typeof\`, \`instanceof\`, and custom predicates.
- [ ] Use discriminated unions with a common literal property.

### Stage 3: Generic Functions and Types
- [ ] Create generic functions that work with multiple types using \`<T>\`.
- [ ] Add constraints to generics using \`extends\`.
- [ ] Define generic interfaces and type aliases.
- [ ] Understand how TypeScript infers generic types from usage.

### Stage 4: Utility Types and Mapped Types
- [ ] Use built-in utility types like \`Partial<T>\`, \`Required<T>\`, \`Pick<T>\`, and \`Omit<T>\`.
- [ ] Apply \`Record<K, V>\` for dynamic object types with specific keys and values.
- [ ] Understand \`Readonly<T>\` and \`ReturnType<T>\`.
- [ ] Create custom mapped types to transform existing types.
  `,
  files: {
    "/index.ts": `
// Advanced Types & Generics — Guided Template
// Master TypeScript's advanced type system features.

/*
Your guided TODOs (mirror the course plan):
- [ ] Stage 1: Work with union and intersection types
- [ ] Stage 2: Use literal types and implement type guards
- [ ] Stage 3: Create generic functions and types
- [ ] Stage 4: Apply utility types and create mapped types
*/

// ========================================
// STAGE 1: Union and Intersection Types
// ========================================

// Union type: can be one of several types
type Status = "pending" | "approved" | "rejected";
type ID = string | number;

function processID(id: ID): void {
  // Type narrowing with typeof
  if (typeof id === "string") {
    console.log("Processing string ID:", id.toUpperCase());
  } else {
    console.log("Processing number ID:", id * 2);
  }
}

// Intersection type: combines multiple types
interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

type Person = HasName & HasAge;

const person: Person = {
  name: "Alice",
  age: 30,
};

console.log("Stage 1: Unions and Intersections");
processID("abc123");
processID(456);
console.log({ person });

// ========================================
// STAGE 2: Literal Types and Type Guards
// ========================================

// Literal types
type Direction = "north" | "south" | "east" | "west";
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

function move(direction: Direction): void {
  console.log(\`Moving \${direction}\`);
}

// Discriminated unions
interface Circle {
  kind: "circle"; // literal type discriminator
  radius: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape = Circle | Rectangle;

function calculateArea(shape: Shape): number {
  // Type guard using the discriminator
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}

const circle: Circle = { kind: "circle", radius: 5 };
const rectangle: Rectangle = { kind: "rectangle", width: 10, height: 20 };

console.log("\\nStage 2: Literal Types and Type Guards");
move("north");
console.log("Circle area:", calculateArea(circle));
console.log("Rectangle area:", calculateArea(rectangle));

// ========================================
// STAGE 3: Generic Functions and Types
// ========================================

// Generic function
function identity<T>(value: T): T {
  return value;
}

const num = identity<number>(42); // explicitly specify type
const str = identity("hello"); // TypeScript infers the type

// Generic function with constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alice", age: 30, email: "alice@example.com" };
const userName = getProperty(user, "name"); // type is string
const userAge = getProperty(user, "age"); // type is number

// Generic interface
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 123 };
const stringBox: Box<string> = { value: "hello" };

// Generic type alias
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

const successResult: Result<string> = {
  success: true,
  data: "Operation completed",
};

const errorResult: Result<string> = {
  success: false,
  error: new Error("Something went wrong"),
};

console.log("\\nStage 3: Generics");
console.log({ num, str, userName, userAge });
console.log({ numberBox, stringBox, successResult, errorResult });

// ========================================
// STAGE 4: Utility Types and Mapped Types
// ========================================

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial<T>: makes all properties optional
type PartialUser = Partial<User>;
const partialUser: PartialUser = { name: "Bob" }; // only name is required

// Required<T>: makes all properties required
interface OptionalConfig {
  host?: string;
  port?: number;
}
type RequiredConfig = Required<OptionalConfig>;
// Now host and port are both required

// Pick<T, K>: selects specific properties
type UserPreview = Pick<User, "id" | "name">;
const preview: UserPreview = { id: 1, name: "Alice" };

// Omit<T, K>: removes specific properties
type UserWithoutEmail = Omit<User, "email">;
const userNoEmail: UserWithoutEmail = { id: 1, name: "Alice", age: 30 };

// Record<K, V>: creates an object type with specific keys and values
type UserRoles = Record<string, "admin" | "user" | "guest">;
const roles: UserRoles = {
  alice: "admin",
  bob: "user",
  charlie: "guest",
};

// Readonly<T>: makes all properties readonly
type ReadonlyUser = Readonly<User>;
const readonlyUser: ReadonlyUser = { id: 1, name: "Alice", email: "alice@example.com", age: 30 };
// readonlyUser.name = "Bob"; // Error: cannot assign to readonly property

// ReturnType<T>: extracts the return type of a function
function createUser() {
  return { id: 1, name: "Alice", email: "alice@example.com" };
}
type CreatedUser = ReturnType<typeof createUser>;

// Custom mapped type: converts all properties to strings
type Stringify<T> = {
  [K in keyof T]: string;
};

type StringifiedUser = Stringify<User>;
const stringUser: StringifiedUser = {
  id: "1",
  name: "Alice",
  email: "alice@example.com",
  age: "30",
};

console.log("\\nStage 4: Utility Types");
console.log({ partialUser, preview, userNoEmail, roles, stringUser });

// ========================================
// YOUR TURN: Practice Exercise
// ========================================

// TODO: Create a generic function 'filterByProperty' that:
//       - Takes an array of objects and a property name
//       - Returns a new array with only unique values for that property
//       - Use generics with keyof constraint

// TODO: Create a type alias 'APIResponse<T>' that represents:
//       - A discriminated union with 'status' as the discriminator
//       - status: "success" with 'data: T'
//       - status: "error" with 'message: string' and 'code: number'

// TODO: Use Omit and & to create a 'UserUpdate' type that:
//       - Has all User properties except 'id'
//       - Adds a 'updatedAt' property of type Date

// Add your code here:

console.log("\\n=== Your Turn ===");
console.log("Implement the exercises above to practice advanced TypeScript features.");
`,
  }
};
