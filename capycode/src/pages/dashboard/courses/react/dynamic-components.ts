import { FrameworkEnum } from "@/contexts/voice-context";
import { Course } from "../../courses";

export const dynamicComponents: Course = {
  id: "r-2",
  title: "Dynamic Components",
  difficulty: "Beginner",
  durationMin: 30,
  framework: FrameworkEnum.react,
  plan: `
### Stage 1: Rendering Lists with \`.map()\`
- [ ] Understand how to transform an array of data into an array of JSX elements using \`.map()\`.
- [ ] Add a \`key\` prop to each element to help React identify which items have changed.
- [ ] Render a simple list of items from an array of strings.
- [ ] Verify that all items appear correctly in the browser.

### Stage 2: Conditional Rendering
- [ ] Use conditional operators (\`&&\`, ternary \`? :\`) to show/hide elements based on state.
- [ ] Implement a toggle button that shows or hides a list.
- [ ] Display different messages when a list is empty vs. populated.
- [ ] Practice returning \`null\` to render nothing.

### Stage 3: Rendering Complex Objects
- [ ] Map over an array of objects (e.g., users with \`id\`, \`name\`, \`status\`).
- [ ] Display multiple properties from each object in the list.
- [ ] Apply conditional styling based on object properties (e.g., highlight active users).
- [ ] Add interactive elements (like buttons) to each list item.

### Stage 4: Dynamic Component Selection
- [ ] Create multiple component variants (e.g., \`Card\`, \`List\`, \`Grid\` views).
- [ ] Use a state variable to switch between different view components dynamically.
- [ ] Pass the same data to different component types.
- [ ] Add UI controls to let users switch views in real-time.
  `,
  files: {
    "/App.js": `
// Dynamic Components — Guided Template
// Learn how to render lists, conditionally show elements, and dynamically select components.

import { useState } from "react";

/*
Your guided TODOs (mirror the course plan):
- [ ] Stage 1: Render a list using .map() with proper keys
- [ ] Stage 2: Add conditional rendering with toggle
- [ ] Stage 3: Map over complex objects with multiple properties
- [ ] Stage 4: Switch between different view components
*/

// Sample data
const users = [
  { id: 1, name: "Alice Johnson", status: "active", role: "Developer" },
  { id: 2, name: "Bob Smith", status: "inactive", role: "Designer" },
  { id: 3, name: "Carol White", status: "active", role: "Manager" },
  { id: 4, name: "David Brown", status: "active", role: "Developer" },
];

// Example 1: Simple list rendering
function SimpleList() {
  const fruits = ["Apple", "Banana", "Cherry", "Date"];
  
  return (
    <div>
      <h2>Simple List</h2>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}

// Example 2: Conditional rendering with toggle
function ToggleList() {
  const [showList, setShowList] = useState(true);
  
  return (
    <div>
      <h2>Toggle List</h2>
      <button onClick={() => setShowList(!showList)}>
        {showList ? "Hide" : "Show"} List
      </button>
      {showList && (
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      )}
    </div>
  );
}

// Example 3: Rendering complex objects
function UserList() {
  return (
    <div>
      <h2>User Directory</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div style={{ display: "grid", gap: 8 }}>
          {users.map((user) => (
            <div
              key={user.id}
              style={{
                padding: 12,
                border: "1px solid #ddd",
                borderRadius: 8,
                background: user.status === "active" ? "#e8f5e9" : "#fafafa",
              }}
            >
              <strong>{user.name}</strong>
              <div style={{ fontSize: 14, color: "#666" }}>
                {user.role} • {user.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Example 4: Dynamic component selection
function CardView({ users }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
      {users.map((user) => (
        <div key={user.id} style={{ padding: 16, border: "2px solid #2196F3", borderRadius: 8 }}>
          <h3>{user.name}</h3>
          <p>{user.role}</p>
        </div>
      ))}
    </div>
  );
}

function ListView({ users }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {users.map((user) => (
        <li key={user.id} style={{ padding: 8, borderBottom: "1px solid #ddd" }}>
          {user.name} - {user.role}
        </li>
      ))}
    </ul>
  );
}

function DynamicView() {
  const [viewType, setViewType] = useState("card"); // "card" | "list"
  
  return (
    <div>
      <h2>Dynamic View Switcher</h2>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setViewType("card")} style={{ marginRight: 8 }}>
          Card View
        </button>
        <button onClick={() => setViewType("list")}>List View</button>
      </div>
      {viewType === "card" ? <CardView users={users} /> : <ListView users={users} />}
    </div>
  );
}

export default function App() {
  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h1>Dynamic Components</h1>
      
      <SimpleList />
      <hr style={{ margin: "24px 0" }} />
      
      <ToggleList />
      <hr style={{ margin: "24px 0" }} />
      
      <UserList />
      <hr style={{ margin: "24px 0" }} />
      
      <DynamicView />
      <hr style={{ margin: "24px 0" }} />
      
      {/* Your Turn: Create a filtered list */}
      {/* TODO: Add a filter state (e.g., show only "active" users) */}
      {/* TODO: Add filter buttons above the list */}
      {/* TODO: Use .filter() before .map() to show filtered results */}
      {/* TODO: Display a count of filtered items */}
      <div>
        <h2>Your Turn: Filtered User List</h2>
        <p style={{ color: "#666" }}>
          Add filter buttons to show "All", "Active", or "Inactive" users.
        </p>
        {/* Add your code here */}
      </div>
    </div>
  );
}
`,
  }
};
