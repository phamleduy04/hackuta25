import { FrameworkEnum } from "@/contexts/voice-context";
import { Course } from "../../courses";

export const useEffectLoopsState: Course = {
  id: "r-3",
  title: "useEffect Loops & State",
  difficulty: "Intermediate",
  durationMin: 35,
  framework: FrameworkEnum.react,
  plan: `
### Stage 1: Understanding useEffect Basics
- [ ] Learn the syntax of \`useEffect\` with a callback function and dependency array.
- [ ] Understand when effects run: after every render, on mount, or when dependencies change.
- [ ] Create a simple effect that logs to the console when the component mounts.
- [ ] Add cleanup functions using the return statement in \`useEffect\`.

### Stage 2: Dependency Arrays and When Effects Run
- [ ] Use an empty dependency array \`[]\` to run an effect only once on mount.
- [ ] Add specific dependencies to re-run effects when those values change.
- [ ] Understand the difference between no dependency array, empty array, and array with values.
- [ ] Observe how effects behave with different dependency configurations.

### Stage 3: Avoiding Infinite Loops
- [ ] Identify common causes of infinite loops (missing dependencies, state updates in effects).
- [ ] Learn to include all used variables in the dependency array.
- [ ] Use techniques like \`useCallback\` or moving functions inside effects to prevent loops.
- [ ] Debug and fix an intentionally broken component with an infinite loop.

### Stage 4: Practical Effects with State
- [ ] Fetch data on component mount and store it in state.
- [ ] Implement a timer or interval that updates state periodically.
- [ ] Set up proper cleanup to prevent memory leaks (clear intervals, cancel requests).
- [ ] Combine multiple state variables and effects in a realistic scenario.
  `,
  files: {
    "/App.js": `
// useEffect Loops & State — Guided Template
// Learn how to use useEffect correctly and avoid common pitfalls like infinite loops.

import { useState, useEffect } from "react";

/*
Your guided TODOs (mirror the course plan):
- [ ] Stage 1: Understand useEffect basics and cleanup
- [ ] Stage 2: Experiment with different dependency arrays
- [ ] Stage 3: Identify and fix infinite loop scenarios
- [ ] Stage 4: Build practical effects with timers and data fetching
*/

// Example 1: Basic useEffect on mount
function MountLogger() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log("Component mounted!");
    
    // Cleanup function (runs on unmount)
    return () => {
      console.log("Component will unmount!");
    };
  }, []); // Empty array = run once on mount
  
  return (
    <div>
      <h2>Mount Logger</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p style={{ fontSize: 12, color: "#666" }}>
        Open console to see mount/unmount logs
      </p>
    </div>
  );
}

// Example 2: Effect with dependencies
function DependencyDemo() {
  const [name, setName] = useState("Alice");
  const [age, setAge] = useState(25);
  
  // This effect runs whenever 'name' changes
  useEffect(() => {
    console.log(\`Name changed to: \${name}\`);
  }, [name]);
  
  // This effect runs whenever 'age' changes
  useEffect(() => {
    console.log(\`Age changed to: \${age}\`);
  }, [age]);
  
  return (
    <div>
      <h2>Dependency Demo</h2>
      <div>
        <label>Name: </label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Age: </label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />
      </div>
      <p style={{ fontSize: 12, color: "#666" }}>
        Check console to see which effects run
      </p>
    </div>
  );
}

// Example 3: Avoiding infinite loops
function SafeCounter() {
  const [count, setCount] = useState(0);
  const [doubleCount, setDoubleCount] = useState(0);
  
  // ✅ Correct: dependencies prevent infinite loop
  useEffect(() => {
    setDoubleCount(count * 2);
  }, [count]); // Only runs when count changes
  
  // ❌ WRONG (commented out): This would cause an infinite loop!
  // useEffect(() => {
  //   setDoubleCount(count * 2);
  // }); // No dependency array = runs after every render, causing new render
  
  return (
    <div>
      <h2>Safe Counter</h2>
      <p>Count: {count}</p>
      <p>Double: {doubleCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Example 4: Timer with cleanup
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    if (!isRunning) return;
    
    // Set up interval
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    
    // Cleanup: clear interval on unmount or when isRunning changes
    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);
  
  return (
    <div>
      <h2>Timer</h2>
      <p style={{ fontSize: 32, fontWeight: "bold" }}>{seconds}s</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <button onClick={() => setSeconds(0)} style={{ marginLeft: 8 }}>
        Reset
      </button>
    </div>
  );
}

// Example 5: Data fetching simulation
function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(1);
  
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    const timeoutId = setTimeout(() => {
      setData({
        id: userId,
        name: \`User \${userId}\`,
        email: \`user\${userId}@example.com\`,
      });
      setLoading(false);
    }, 1000);
    
    // Cleanup: cancel request if userId changes before completion
    return () => {
      clearTimeout(timeoutId);
    };
  }, [userId]);
  
  return (
    <div>
      <h2>Data Fetcher</h2>
      <div>
        <button onClick={() => setUserId(userId - 1)} disabled={userId <= 1}>
          Previous
        </button>
        <span style={{ margin: "0 12px" }}>User ID: {userId}</span>
        <button onClick={() => setUserId(userId + 1)} disabled={userId >= 5}>
          Next
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <div style={{ marginTop: 12, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
        </div>
      ) : null}
    </div>
  );
}

export default function App() {
  const [showMount, setShowMount] = useState(true);
  
  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h1>useEffect Loops & State</h1>
      
      <div>
        <button onClick={() => setShowMount(!showMount)}>
          {showMount ? "Hide" : "Show"} Mount Logger
        </button>
        {showMount && <MountLogger />}
      </div>
      <hr style={{ margin: "24px 0" }} />
      
      <DependencyDemo />
      <hr style={{ margin: "24px 0" }} />
      
      <SafeCounter />
      <hr style={{ margin: "24px 0" }} />
      
      <Timer />
      <hr style={{ margin: "24px 0" }} />
      
      <DataFetcher />
      <hr style={{ margin: "24px 0" }} />
      
      {/* Your Turn: Create a search debouncer */}
      {/* TODO: Add a search input with state */}
      {/* TODO: Use useEffect to delay the "search" by 500ms after typing stops */}
      {/* TODO: Show "Searching for: [query]" after the delay */}
      {/* TODO: Clean up the timeout if the user types again before 500ms */}
      <div>
        <h2>Your Turn: Search Debouncer</h2>
        <p style={{ color: "#666" }}>
          Build a search input that waits 500ms after the user stops typing before "searching".
        </p>
        {/* Add your code here */}
      </div>
    </div>
  );
}
`,
  }
};
