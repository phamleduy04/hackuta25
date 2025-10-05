import { FrameworkEnum } from "@/contexts/voice-context";
import { Course } from "../../courses";

export const signalsReactivity: Course = {
  id: "s-1",
  title: "Solid Signals & Reactivity",
  difficulty: "Beginner",
  durationMin: 30,
  framework: FrameworkEnum.solid,
  plan: `
### Stage 1: Understanding Signals with \`createSignal\`
- [ ] Learn how Solid's signals create reactive primitives using \`createSignal()\`.
- [ ] Understand that signals return a getter and setter \`[value, setValue]\`.
- [ ] Call the getter as a function to access the current value.
- [ ] Update signals using the setter and observe automatic UI updates.

### Stage 2: Derived Values with \`createMemo\`
- [ ] Use \`createMemo()\` to create computed values that depend on signals.
- [ ] Understand that memos cache their results until dependencies change.
- [ ] Compare memos to derived functions and see caching benefits.
- [ ] Chain multiple memos to build complex derived state.

### Stage 3: Side Effects with \`createEffect\`
- [ ] Use \`createEffect()\` to run side effects when signals change.
- [ ] Understand automatic dependency tracking (no dependency arrays needed).
- [ ] Return cleanup functions from effects for proper teardown.
- [ ] Compare Solid's effects to React's useEffect.

### Stage 4: Managing State with \`createStore\`
- [ ] Use \`createStore()\` for nested reactive objects.
- [ ] Update store values with fine-grained reactivity.
- [ ] Use path-based updates for nested properties.
- [ ] Understand when to use stores vs signals.
  `,
  files: {
    "/App.tsx": `
// Solid Signals & Reactivity — Guided Template
// Learn Solid's reactive primitives: signals, memos, effects, and stores.

import { createSignal, createMemo, createEffect, createStore } from "solid-js";
import type { Component } from "solid-js";
import styles from "./App.module.css";

/*
Your guided TODOs (mirror the course plan):
- [ ] Stage 1: Work with signals using createSignal
- [ ] Stage 2: Create derived values with createMemo
- [ ] Stage 3: Run side effects with createEffect
- [ ] Stage 4: Manage complex state with createStore
*/

// ========================================
// STAGE 1: Signals
// ========================================

const Counter: Component = () => {
  // createSignal returns [getter, setter]
  const [count, setCount] = createSignal(0);
  
  // Call getter as a function to access value
  const increment = () => setCount(count() + 1);
  const decrement = () => setCount(count() - 1);
  
  return (
    <div class={styles.section}>
      <h2>Stage 1: Signals</h2>
      <p>Count: {count()}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

// ========================================
// STAGE 2: Memos
// ========================================

const ShoppingCart: Component = () => {
  const [items, setItems] = createSignal([
    { id: 1, name: "Laptop", price: 999, quantity: 1 },
    { id: 2, name: "Mouse", price: 29, quantity: 2 },
    { id: 3, name: "Keyboard", price: 79, quantity: 1 },
  ]);
  
  // createMemo caches the result until dependencies change
  const totalItems = createMemo(() => {
    return items().reduce((sum, item) => sum + item.quantity, 0);
  });
  
  const totalPrice = createMemo(() => {
    return items().reduce((sum, item) => sum + item.price * item.quantity, 0);
  });
  
  const updateQuantity = (id: number, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };
  
  return (
    <div class={styles.section}>
      <h2>Stage 2: Memos (Computed Values)</h2>
      <div>
        {items().map((item) => (
          <div class={styles.cartItem}>
            <span>
              {item.name} - \${item.price}
            </span>
            <input
              type="number"
              value={item.quantity}
              min="0"
              onInput={(e) => updateQuantity(item.id, parseInt(e.currentTarget.value) || 0)}
              style={{ width: "60px", "margin-left": "12px" }}
            />
          </div>
        ))}
      </div>
      <p>
        <strong>Total Items:</strong> {totalItems()}
      </p>
      <p>
        <strong>Total Price:</strong> \${totalPrice().toFixed(2)}
      </p>
    </div>
  );
};

// ========================================
// STAGE 3: Effects
// ========================================

const Logger: Component = () => {
  const [message, setMessage] = createSignal("");
  const [log, setLog] = createSignal<string[]>([]);
  
  // createEffect automatically tracks signal dependencies
  createEffect(() => {
    const msg = message();
    if (msg) {
      const timestamp = new Date().toLocaleTimeString();
      setLog((prev) => [\`[\${timestamp}] \${msg}\`, ...prev].slice(0, 5));
    }
  });
  
  return (
    <div class={styles.section}>
      <h2>Stage 3: Effects (Side Effects)</h2>
      <input
        type="text"
        value={message()}
        onInput={(e) => setMessage(e.currentTarget.value)}
        placeholder="Type a message..."
      />
      <button onClick={() => setMessage("")}>Clear</button>
      
      <div style={{ "margin-top": "12px" }}>
        <h3>Log (last 5):</h3>
        {log().length === 0 ? (
          <p style={{ color: "#666" }}>No messages yet</p>
        ) : (
          <ul style={{ "list-style": "none", padding: 0 }}>
            {log().map((entry, i) => (
              <li style={{ padding: "4px 0" }}>{entry}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// ========================================
// STAGE 4: Stores
// ========================================

const UserProfile: Component = () => {
  // createStore for nested reactive objects
  const [user, setUser] = createStore({
    name: "Alice",
    age: 30,
    address: {
      street: "123 Main St",
      city: "San Francisco",
      zipCode: "94102",
    },
    preferences: {
      theme: "dark",
      notifications: true,
    },
  });
  
  // Update nested values with path-based updates
  const updateCity = (city: string) => {
    setUser("address", "city", city);
  };
  
  const toggleNotifications = () => {
    setUser("preferences", "notifications", (prev) => !prev);
  };
  
  return (
    <div class={styles.section}>
      <h2>Stage 4: Stores (Nested Objects)</h2>
      
      <div style={{ display: "grid", gap: "12px" }}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={user.name}
            onInput={(e) => setUser("name", e.currentTarget.value)}
          />
        </div>
        
        <div>
          <label>Age: </label>
          <input
            type="number"
            value={user.age}
            onInput={(e) => setUser("age", parseInt(e.currentTarget.value) || 0)}
          />
        </div>
        
        <div>
          <label>City: </label>
          <input
            type="text"
            value={user.address.city}
            onInput={(e) => updateCity(e.currentTarget.value)}
          />
        </div>
        
        <div>
          <label>
            <input
              type="checkbox"
              checked={user.preferences.notifications}
              onChange={toggleNotifications}
            />
            Enable Notifications
          </label>
        </div>
      </div>
      
      <div style={{ "margin-top": "16px", padding: "12px", background: "#f5f5f5", "border-radius": "8px" }}>
        <h3>User Data:</h3>
        <pre style={{ margin: 0 }}>{JSON.stringify(user, null, 2)}</pre>
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
      <h2>Your Turn: Build a Timer</h2>
      <p style={{ color: "#666" }}>
        TODO: Create a timer that:
        - Has a signal for seconds
        - Has a signal for isRunning state
        - Has a memo for formatted time (MM:SS)
        - Has an effect that updates seconds every second when running
        - Has start/stop/reset buttons
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
      <h1>Solid Signals & Reactivity</h1>
      
      <Counter />
      <hr />
      
      <ShoppingCart />
      <hr />
      
      <Logger />
      <hr />
      
      <UserProfile />
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

.cartItem {
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
}

label {
  margin-right: 12px;
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
    <title>Solid Signals & Reactivity</title>
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
  "name": "solid-signals-reactivity",
  "version": "1.0.0",
  "description": "Learn Solid's reactive primitives",
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
