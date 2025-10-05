import { FrameworkEnum } from "@/contexts/voice-context";
import { Course } from "../../courses";

export const apiIntegrationBasics: Course = {
  id: "r-4",
  title: "API Integration Basics",
  difficulty: "Intermediate",
  durationMin: 40,
  framework: FrameworkEnum.react,
  plan: `
### Stage 1: Fetching Data on Component Mount
- [ ] Use \`fetch()\` to retrieve data from an API endpoint.
- [ ] Store the response in state using \`useState\`.
- [ ] Use \`useEffect\` with an empty dependency array to fetch on mount.
- [ ] Parse JSON response and render the data in your component.

### Stage 2: Handling Loading and Error States
- [ ] Add a \`loading\` state to show a spinner or message while fetching.
- [ ] Add an \`error\` state to catch and display fetch failures.
- [ ] Use try/catch blocks or \`.catch()\` to handle errors gracefully.
- [ ] Display appropriate UI for loading, error, and success states.

### Stage 3: POST Requests and Form Submission
- [ ] Create a form with controlled inputs (using state).
- [ ] Send a POST request with \`fetch()\` including headers and body.
- [ ] Handle the response and update UI accordingly (e.g., show success message).
- [ ] Reset the form after successful submission.

### Stage 4: Dynamic Fetching Based on User Input
- [ ] Fetch different data based on user interactions (e.g., search, pagination).
- [ ] Update the dependency array in \`useEffect\` to refetch when inputs change.
- [ ] Implement loading states for dynamic fetches.
- [ ] Handle edge cases like empty results or rapid input changes.
  `,
  files: {
    "/App.js": `
// API Integration Basics — Guided Template
// Learn how to fetch data, handle loading/error states, and send POST requests.

import { useState, useEffect } from "react";

/*
Your guided TODOs (mirror the course plan):
- [ ] Stage 1: Fetch data on component mount
- [ ] Stage 2: Handle loading and error states
- [ ] Stage 3: Submit form data with POST requests
- [ ] Stage 4: Fetch data dynamically based on user input
*/

// Example 1: Basic data fetching
function UserList() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    // Fetch users from JSONPlaceholder API
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

// Example 2: Loading and error states
function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data.slice(0, 5)); // Only show first 5 posts
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return <div><h2>Post List</h2><p>Loading posts...</p></div>;
  }
  
  if (error) {
    return (
      <div>
        <h2>Post List</h2>
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }
  
  return (
    <div>
      <h2>Post List</h2>
      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: 16, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
          <h3 style={{ margin: "0 0 8px 0" }}>{post.title}</h3>
          <p style={{ margin: 0, color: "#666" }}>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

// Example 3: POST request with form
function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          userId: 1,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      
      const data = await response.json();
      console.log("Created post:", data);
      
      setSuccess(true);
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 400 }}>
        <div>
          <label style={{ display: "block", marginBottom: 4 }}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: 4 }}>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={4}
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <button type="submit" disabled={submitting} style={{ padding: 10 }}>
          {submitting ? "Submitting..." : "Create Post"}
        </button>
        {success && <p style={{ color: "green" }}>✓ Post created successfully!</p>}
      </form>
    </div>
  );
}

// Example 4: Dynamic fetching with search
function UserSearch() {
  const [query, setQuery] = useState("");
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (!userId) return;
    
    setLoading(true);
    fetch(\`https://jsonplaceholder.typicode.com/users/\${userId}\`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setLoading(false);
      });
  }, [userId]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    const id = parseInt(query, 10);
    if (id >= 1 && id <= 10) {
      setUserId(id);
    } else {
      alert("Please enter a user ID between 1 and 10");
    }
  };
  
  return (
    <div>
      <h2>User Search</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: 16 }}>
        <input
          type="number"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter user ID (1-10)"
          min="1"
          max="10"
          style={{ padding: 8, marginRight: 8 }}
        />
        <button type="submit" style={{ padding: 8 }}>Search</button>
      </form>
      
      {loading ? (
        <p>Loading user...</p>
      ) : user ? (
        <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
          <h3>{user.name}</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
        </div>
      ) : null}
    </div>
  );
}

export default function App() {
  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h1>API Integration Basics</h1>
      
      <UserList />
      <hr style={{ margin: "24px 0" }} />
      
      <PostList />
      <hr style={{ margin: "24px 0" }} />
      
      <CreatePost />
      <hr style={{ margin: "24px 0" }} />
      
      <UserSearch />
      <hr style={{ margin: "24px 0" }} />
      
      {/* Your Turn: Build a paginated list */}
      {/* TODO: Fetch posts with pagination (e.g., 5 posts per page) */}
      {/* TODO: Add "Previous" and "Next" buttons */}
      {/* TODO: Show loading state when fetching new page */}
      {/* TODO: Display current page number and total pages */}
      <div>
        <h2>Your Turn: Paginated Posts</h2>
        <p style={{ color: "#666" }}>
          Fetch and display posts with pagination. Use the API: 
          https://jsonplaceholder.typicode.com/posts?_page=1&_limit=5
        </p>
        {/* Add your code here */}
      </div>
    </div>
  );
}
`,
  }
};
