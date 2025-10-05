import { FrameworkEnum } from "@/contexts/voice-context";
import { Course } from "../../courses";

export const asyncJsFetch: Course = {
  id: "j-2",
  title: "Async JS with Fetch",
  difficulty: "Intermediate",
  durationMin: 38,
  framework: FrameworkEnum.static,
  plan: `
### Stage 1: Promises Fundamentals
- [ ] Understand the Promise states: pending, fulfilled, rejected.
- [ ] Use \`.then()\` to handle successful promise resolution.
- [ ] Use \`.catch()\` to handle errors and rejections.
- [ ] Chain multiple \`.then()\` calls for sequential operations.

### Stage 2: Async/Await Syntax
- [ ] Learn the \`async\` keyword to define asynchronous functions.
- [ ] Use \`await\` to pause execution until a promise resolves.
- [ ] Wrap \`await\` calls in try/catch blocks for error handling.
- [ ] Convert promise chains to cleaner async/await syntax.

### Stage 3: Fetch API Basics
- [ ] Use \`fetch()\` to make GET requests to retrieve data.
- [ ] Parse JSON responses with \`.json()\`.
- [ ] Check \`response.ok\` to handle HTTP errors.
- [ ] Make POST requests with headers and body.

### Stage 4: Advanced Async Patterns
- [ ] Run multiple async operations in parallel with \`Promise.all()\`.
- [ ] Use \`Promise.race()\` to get the fastest response.
- [ ] Implement proper error handling for multiple requests.
- [ ] Handle loading states and user feedback during async operations.
  `,
  files: {
    "/index.js": `
// Async JS with Fetch — Guided Template
// Master asynchronous JavaScript with promises, async/await, and the Fetch API.

/*
Your guided TODOs (mirror the course plan):
- [ ] Stage 1: Work with promises using .then() and .catch()
- [ ] Stage 2: Convert to async/await syntax
- [ ] Stage 3: Use fetch() for GET and POST requests
- [ ] Stage 4: Handle multiple async operations with Promise.all() and Promise.race()
*/

// ========================================
// STAGE 1: Promises Fundamentals
// ========================================

// Creating a simple promise
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(\`Waited \${ms}ms\`);
    }, ms);
  });
}

// Using .then() and .catch()
console.log("=== Stage 1: Promises ===");
console.log("Starting delay...");

delay(1000)
  .then((result) => {
    console.log(result); // "Waited 1000ms"
    return delay(500); // Chain another promise
  })
  .then((result) => {
    console.log(result); // "Waited 500ms"
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Promise with rejection
function randomSuccess() {
  return new Promise((resolve, reject) => {
    const random = Math.random();
    setTimeout(() => {
      if (random > 0.5) {
        resolve("Success!");
      } else {
        reject(new Error("Failed!"));
      }
    }, 500);
  });
}

randomSuccess()
  .then((result) => console.log("Random result:", result))
  .catch((error) => console.log("Caught error:", error.message));

// ========================================
// STAGE 2: Async/Await Syntax
// ========================================

// Converting promise chains to async/await
async function demonstrateAsyncAwait() {
  console.log("\\n=== Stage 2: Async/Await ===");
  
  try {
    console.log("Starting async operations...");
    
    const result1 = await delay(500);
    console.log(result1);
    
    const result2 = await delay(300);
    console.log(result2);
    
    console.log("All operations complete!");
  } catch (error) {
    console.error("Error in async function:", error);
  }
}

// Uncomment to run:
// demonstrateAsyncAwait();

// Async function with error handling
async function tryRandomSuccess() {
  try {
    const result = await randomSuccess();
    console.log("Async result:", result);
  } catch (error) {
    console.log("Async caught error:", error.message);
  }
}

// Uncomment to run:
// tryRandomSuccess();

// ========================================
// STAGE 3: Fetch API Basics
// ========================================

// GET request
async function fetchUsers() {
  console.log("\\n=== Stage 3: Fetch API ===");
  console.log("Fetching users...");
  
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    
    // Check if request was successful
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const users = await response.json();
    console.log("First 3 users:");
    users.slice(0, 3).forEach((user) => {
      console.log(\`- \${user.name} (\${user.email})\`);
    });
    
    return users;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
}

// Uncomment to run:
// fetchUsers();

// POST request
async function createPost(title, body) {
  console.log("\\nCreating post...");
  
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
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const post = await response.json();
    console.log("Created post:", post);
    return post;
  } catch (error) {
    console.error("Error creating post:", error.message);
    throw error;
  }
}

// Uncomment to run:
// createPost("My First Post", "This is the content of my post");

// ========================================
// STAGE 4: Advanced Async Patterns
// ========================================

// Promise.all() - run multiple promises in parallel
async function fetchMultipleUsers() {
  console.log("\\n=== Stage 4: Advanced Patterns ===");
  console.log("Fetching multiple users in parallel...");
  
  try {
    const [user1, user2, user3] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users/1").then(r => r.json()),
      fetch("https://jsonplaceholder.typicode.com/users/2").then(r => r.json()),
      fetch("https://jsonplaceholder.typicode.com/users/3").then(r => r.json()),
    ]);
    
    console.log("Fetched users:", [user1.name, user2.name, user3.name]);
    return [user1, user2, user3];
  } catch (error) {
    console.error("Error in Promise.all:", error.message);
  }
}

// Uncomment to run:
// fetchMultipleUsers();

// Promise.race() - get the fastest response
async function fetchFastest() {
  console.log("\\nTesting Promise.race...");
  
  try {
    const fastest = await Promise.race([
      delay(1000).then(() => "First (1000ms)"),
      delay(500).then(() => "Second (500ms)"),
      delay(1500).then(() => "Third (1500ms)"),
    ]);
    
    console.log("Fastest:", fastest);
  } catch (error) {
    console.error("Error in Promise.race:", error.message);
  }
}

// Uncomment to run:
// fetchFastest();

// Error handling with Promise.all()
async function fetchWithErrorHandling() {
  console.log("\\nFetching with individual error handling...");
  
  const promises = [
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then(r => r.json())
      .catch(error => ({ error: error.message })),
    fetch("https://invalid-url-that-will-fail.com/data")
      .then(r => r.json())
      .catch(error => ({ error: error.message })),
    fetch("https://jsonplaceholder.typicode.com/users/2")
      .then(r => r.json())
      .catch(error => ({ error: error.message })),
  ];
  
  const results = await Promise.all(promises);
  
  results.forEach((result, index) => {
    if (result.error) {
      console.log(\`Request \${index + 1}: Failed - \${result.error}\`);
    } else {
      console.log(\`Request \${index + 1}: Success - \${result.name}\`);
    }
  });
}

// Uncomment to run:
// fetchWithErrorHandling();

// Simulating loading states
async function fetchWithLoading() {
  let loading = true;
  let data = null;
  let error = null;
  
  console.log("\\nFetching with loading state...");
  console.log("Loading:", loading);
  
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    if (!response.ok) throw new Error("Failed to fetch");
    
    data = await response.json();
    loading = false;
    console.log("Loading:", loading);
    console.log("Data:", data.title);
  } catch (err) {
    error = err.message;
    loading = false;
    console.log("Loading:", loading);
    console.log("Error:", error);
  }
}

// Uncomment to run:
// fetchWithLoading();

// ========================================
// YOUR TURN: Practice Exercise
// ========================================

// TODO: Create an async function 'fetchUserPosts' that:
//       - Takes a userId parameter
//       - Fetches the user data from /users/{userId}
//       - Fetches their posts from /posts?userId={userId}
//       - Returns an object with user info and their posts
//       - Handle errors appropriately

// TODO: Create an async function 'fetchFirst Available' that:
//       - Uses Promise.race() with multiple API endpoints
//       - Returns the first successful response
//       - Falls back to another endpoint if the first fails

// TODO: Implement retry logic:
//       - Create a function that retries a fetch request up to 3 times
//       - Wait 1 second between retries
//       - Return the data or throw an error after all retries fail

// Add your code here:

console.log("\\n=== Your Turn ===");
console.log("Uncomment the examples above to see them run!");
console.log("Then implement the exercises to master async JavaScript.");

// Run one example to show output
(async () => {
  await demonstrateAsyncAwait();
})();
`,
  }
};
