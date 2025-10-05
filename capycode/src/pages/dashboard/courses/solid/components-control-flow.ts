import { FrameworkEnum } from "@/contexts/voice-context";
import { Course } from "../../courses";

export const componentsControlFlow: Course = {
  id: "s-2",
  title: "Solid Components & Control Flow",
  difficulty: "Beginner",
  durationMin: 35,
  framework: FrameworkEnum.solid,
  plan: `
### Stage 1: Component Basics and Props
- [ ] Create functional components in Solid with TypeScript.
- [ ] Pass props to components and access them directly (no destructuring needed).
- [ ] Understand that props are getters and should not be destructured.
- [ ] Use props in JSX and see reactive updates.

### Stage 2: Conditional Rendering with \`<Show>\`
- [ ] Use the \`<Show>\` component for conditional rendering.
- [ ] Understand \`when\` prop for the condition.
- [ ] Use \`fallback\` prop for else conditions.
- [ ] Compare \`<Show>\` to ternary operators and see benefits.

### Stage 3: List Rendering with \`<For>\` and \`<Index>\`
- [ ] Use \`<For>\` to render lists with by-reference equality.
- [ ] Use \`<Index>\` to render lists with by-value equality.
- [ ] Understand when to use \`<For>\` vs \`<Index>\`.
- [ ] Add stable keys with the \`each\` prop.

### Stage 4: Advanced Control Flow
- [ ] Use \`<Switch>\` and \`<Match>\` for multiple conditions.
- [ ] Use \`<Portal>\` to render outside the component tree.
- [ ] Use \`<ErrorBoundary>\` to catch and handle errors.
- [ ] Combine control flow components for complex UIs.
  `,
  files: {
    "/App.tsx": `
// Solid Components & Control Flow — Guided Template
// Learn Solid's component patterns and built-in control flow components.

import { createSignal, Show, For, Index, Switch, Match, ErrorBoundary, Portal } from "solid-js";
import type { Component } from "solid-js";
import styles from "./App.module.css";

/*
Your guided TODOs (mirror the course plan):
- [ ] Stage 1: Create components with props
- [ ] Stage 2: Use <Show> for conditional rendering
- [ ] Stage 3: Render lists with <For> and <Index>
- [ ] Stage 4: Use advanced control flow components
*/

// ========================================
// STAGE 1: Component Basics and Props
// ========================================

// Props interface
interface CardProps {
  title: string;
  description?: string;
  variant?: "default" | "primary" | "success";
  onClick?: () => void;
}

// Reusable Card component
const Card: Component<CardProps> = (props) => {
  // Note: Don't destructure props! They're getters in Solid
  const getVariantClass = () => {
    switch (props.variant || "default") {
      case "primary":
        return styles.cardPrimary;
      case "success":
        return styles.cardSuccess;
      default:
        return "";
    }
  };
  
  return (
    <div class={\`\${styles.card} \${getVariantClass()}\`} onClick={props.onClick}>
      <h3 class={styles.cardTitle}>{props.title}</h3>
      {props.description && <p class={styles.cardDesc}>{props.description}</p>}
    </div>
  );
};

const ComponentBasics: Component = () => {
  const [clickCount, setClickCount] = createSignal(0);
  
  return (
    <div class={styles.section}>
      <h2>Stage 1: Components & Props</h2>
      <div style={{ display: "grid", gap: "12px" }}>
        <Card title="Default Card" description="This is a default card" />
        
        <Card
          title="Primary Card"
          description="This is a primary variant"
          variant="primary"
        />
        
        <Card
          title="Success Card"
          description="This is a success variant"
          variant="success"
        />
        
        <Card
          title="Clickable Card"
          description={\`Clicked \${clickCount()} times\`}
          variant="primary"
          onClick={() => setClickCount((c) => c + 1)}
        />
      </div>
    </div>
  );
};

// ========================================
// STAGE 2: Conditional Rendering
// ========================================

const ConditionalRendering: Component = () => {
  const [isLoggedIn, setIsLoggedIn] = createSignal(false);
  const [hasPermission, setHasPermission] = createSignal(false);
  const [status, setStatus] = createSignal<"loading" | "success" | "error">("loading");
  
  return (
    <div class={styles.section}>
      <h2>Stage 2: Conditional Rendering with &lt;Show&gt;</h2>
      
      {/* Basic Show */}
      <div>
        <button onClick={() => setIsLoggedIn(!isLoggedIn())}>
          {isLoggedIn() ? "Logout" : "Login"}
        </button>
        
        <Show when={isLoggedIn()} fallback={<p>Please log in</p>}>
          <p style={{ color: "green" }}>✓ You are logged in!</p>
        </Show>
      </div>
      
      {/* Nested Show */}
      <div style={{ "margin-top": "16px" }}>
        <button onClick={() => setHasPermission(!hasPermission())}>
          Toggle Permission
        </button>
        
        <Show when={isLoggedIn()}>
          <Show when={hasPermission()} fallback={<p style={{ color: "orange" }}>⚠️ Access denied</p>}>
            <p style={{ color: "green" }}>✓ You have permission to view this content</p>
          </Show>
        </Show>
      </div>
      
      {/* Switch/Match for multiple conditions */}
      <div style={{ "margin-top": "16px" }}>
        <div>
          <button onClick={() => setStatus("loading")}>Loading</button>
          <button onClick={() => setStatus("success")}>Success</button>
          <button onClick={() => setStatus("error")}>Error</button>
        </div>
        
        <Switch>
          <Match when={status() === "loading"}>
            <p>⏳ Loading data...</p>
          </Match>
          <Match when={status() === "success"}>
            <p style={{ color: "green" }}>✓ Data loaded successfully!</p>
          </Match>
          <Match when={status() === "error"}>
            <p style={{ color: "red" }}>✗ Error loading data</p>
          </Match>
        </Switch>
      </div>
    </div>
  );
};

// ========================================
// STAGE 3: List Rendering
// ========================================

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const ListRendering: Component = () => {
  const [todos, setTodos] = createSignal<Todo[]>([
    { id: 1, text: "Learn Solid basics", completed: true },
    { id: 2, text: "Build a project", completed: false },
    { id: 3, text: "Deploy to production", completed: false },
  ]);
  
  const [newTodo, setNewTodo] = createSignal("");
  const [numbers] = createSignal([1, 2, 3, 4, 5]);
  
  const addTodo = () => {
    const text = newTodo().trim();
    if (text) {
      setTodos((prev) => [
        ...prev,
        { id: Date.now(), text, completed: false },
      ]);
      setNewTodo("");
    }
  };
  
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  
  return (
    <div class={styles.section}>
      <h2>Stage 3: List Rendering</h2>
      
      {/* For: by-reference (good for objects with IDs) */}
      <div>
        <h3>&lt;For&gt; - Todo List (by reference)</h3>
        <div style={{ display: "flex", gap: "8px", "margin-bottom": "12px" }}>
          <input
            type="text"
            value={newTodo()}
            onInput={(e) => setNewTodo(e.currentTarget.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a todo..."
          />
          <button onClick={addTodo}>Add</button>
        </div>
        
        <For each={todos()}>
          {(todo) => (
            <div class={styles.todoItem}>
              <label style={{ display: "flex", "align-items": "center", gap: "8px" }}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span style={{ "text-decoration": todo.completed ? "line-through" : "none" }}>
                  {todo.text}
                </span>
              </label>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          )}
        </For>
      </div>
      
      {/* Index: by-value (good for primitives) */}
      <div style={{ "margin-top": "24px" }}>
        <h3>&lt;Index&gt; - Number List (by value)</h3>
        <ul>
          <Index each={numbers()}>
            {(num, i) => (
              <li>
                Index {i}: Value is {num()}
              </li>
            )}
          </Index>
        </ul>
      </div>
    </div>
  );
};

// ========================================
// STAGE 4: Advanced Control Flow
// ========================================

const BuggyComponent: Component = () => {
  const [shouldError, setShouldError] = createSignal(false);
  
  if (shouldError()) {
    throw new Error("Intentional error for demonstration!");
  }
  
  return (
    <div>
      <p>This component works fine.</p>
      <button onClick={() => setShouldError(true)}>Trigger Error</button>
    </div>
  );
};

const AdvancedControlFlow: Component = () => {
  const [view, setView] = createSignal<"home" | "profile" | "settings">("home");
  const [showPortal, setShowPortal] = createSignal(false);
  
  return (
    <div class={styles.section}>
      <h2>Stage 4: Advanced Control Flow</h2>
      
      {/* Switch/Match for navigation */}
      <div>
        <h3>Switch & Match - Navigation</h3>
        <div style={{ display: "flex", gap: "8px", "margin-bottom": "12px" }}>
          <button onClick={() => setView("home")}>Home</button>
          <button onClick={() => setView("profile")}>Profile</button>
          <button onClick={() => setView("settings")}>Settings</button>
        </div>
        
        <div style={{ padding: "16px", border: "1px solid #ddd", "border-radius": "8px" }}>
          <Switch>
            <Match when={view() === "home"}>
              <h4>🏠 Home</h4>
              <p>Welcome to the home page!</p>
            </Match>
            <Match when={view() === "profile"}>
              <h4>👤 Profile</h4>
              <p>View your profile information here.</p>
            </Match>
            <Match when={view() === "settings"}>
              <h4>⚙️ Settings</h4>
              <p>Adjust your preferences.</p>
            </Match>
          </Switch>
        </div>
      </div>
      
      {/* ErrorBoundary */}
      <div style={{ "margin-top": "24px" }}>
        <h3>ErrorBoundary - Error Handling</h3>
        <ErrorBoundary
          fallback={(err) => (
            <div style={{ padding: "16px", background: "#ffebee", "border-radius": "8px", color: "#c62828" }}>
              <strong>Error:</strong> {err.message}
              <br />
              <button onClick={() => window.location.reload()}>Reset</button>
            </div>
          )}
        >
          <BuggyComponent />
        </ErrorBoundary>
      </div>
      
      {/* Portal */}
      <div style={{ "margin-top": "24px" }}>
        <h3>Portal - Render Outside Tree</h3>
        <button onClick={() => setShowPortal(!showPortal())}>
          {showPortal() ? "Hide" : "Show"} Portal
        </button>
        
        <Show when={showPortal()}>
          <Portal>
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                padding: "24px",
                background: "white",
                border: "2px solid #333",
                "border-radius": "12px",
                "box-shadow": "0 4px 12px rgba(0,0,0,0.3)",
                "z-index": 1000,
              }}
            >
              <h3>Portal Content</h3>
              <p>This is rendered outside the component tree!</p>
              <button onClick={() => setShowPortal(false)}>Close</button>
            </div>
          </Portal>
        </Show>
      </div>
    </div>
  );
};

// ========================================
// YOUR TURN: Practice Exercise
// ========================================

const YourTurn: Component = () => {
  return (
    <div class={styles.section}>
      <h2>Your Turn: Build a Filtered List</h2>
      <p style={{ color: "#666" }}>
        TODO: Create a user directory that:
        - Has a signal for a list of users (name, role, status)
        - Has a signal for filter type ("all", "active", "inactive")
        - Uses &lt;Show&gt; to display filter buttons
        - Uses &lt;For&gt; to render filtered users
        - Uses &lt;Show&gt; within each user to conditionally show status badge
      </p>
      {/* Add your code here */}
    </div>
  );
};

// ========================================
// MAIN APP
// ========================================

const App: Component = () => {
  return (
    <div class={styles.app}>
      <h1>Solid Components & Control Flow</h1>
      
      <ComponentBasics />
      <hr />
      
      <ConditionalRendering />
      <hr />
      
      <ListRendering />
      <hr />
      
      <AdvancedControlFlow />
      <hr />
      
      <YourTurn />
    </div>
  );
};

export default App;
`,
    "/App.module.css": `
.app {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
  font-family: sans-serif;
}

.section {
  margin-bottom: 24px;
}

hr {
  margin: 32px 0;
  border: none;
  border-top: 1px solid #ddd;
}

.card {
  padding: 16px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cardPrimary {
  background: #e3f2fd;
  border-color: #2196f3;
}

.cardSuccess {
  background: #e8f5e9;
  border-color: #4caf50;
}

.cardTitle {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.cardDesc {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.todoItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
}

button {
  padding: 8px 16px;
  margin: 4px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
}

button:hover {
  background: #f0f0f0;
}

input[type="text"],
input[type="number"] {
  padding: 8px;
  margin: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
}

label {
  cursor: pointer;
}
`,
    "/index.tsx": `
/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';

const root = document.getElementById('root');

render(() => <App />, root!);
`,
    "/index.html": `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <title>Solid Components & Control Flow</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>

    <script src="/src/index.tsx" type="module"></script>
  </body>
</html>
`,
    "/index.css": `
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
`,
    "/package.json": `
{
  "name": "solid-components-control-flow",
  "version": "1.0.0",
  "description": "Learn Solid's component patterns and control flow",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
  "dependencies": {
    "solid-js": "^1.8.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "vite-plugin-solid": "^2.8.0"
  }
}
`,
  }
};
