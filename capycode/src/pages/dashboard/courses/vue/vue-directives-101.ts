import { FrameworkEnum } from "@/contexts/voice-context";
import { Course } from "../../courses";

export const vueDirectives101: Course = {
  id: "v-1",
  title: "Vue Directives 101",
  difficulty: "Beginner",
  durationMin: 25,
  framework: FrameworkEnum.vue,
  plan: `
### Stage 1: Conditional Rendering with \`v-if\` and \`v-show\`
- [ ] Use \`v-if\` to conditionally render elements based on data.
- [ ] Understand the difference between \`v-if\` (removes from DOM) and \`v-show\` (toggles visibility).
- [ ] Combine \`v-if\`, \`v-else-if\`, and \`v-else\` for multiple conditions.
- [ ] Choose between \`v-if\` and \`v-show\` based on performance needs.

### Stage 2: List Rendering with \`v-for\`
- [ ] Use \`v-for\` to iterate over arrays and render lists.
- [ ] Add the \`:key\` attribute to help Vue track elements efficiently.
- [ ] Iterate over objects to display key-value pairs.
- [ ] Use index and access nested arrays with \`v-for\`.

### Stage 3: Data Binding with \`v-bind\` and \`v-model\`
- [ ] Use \`v-bind\` (or \`:\`) to bind attributes dynamically.
- [ ] Bind classes and styles conditionally with objects and arrays.
- [ ] Use \`v-model\` for two-way data binding on form inputs.
- [ ] Apply \`v-model\` to checkboxes, radio buttons, and select elements.

### Stage 4: Event Handling with \`v-on\`
- [ ] Use \`v-on\` (or \`@\`) to listen for DOM events like click, input, submit.
- [ ] Pass arguments to event handlers and access the event object.
- [ ] Use event modifiers like \`.prevent\`, \`.stop\`, and \`.once\`.
- [ ] Combine directives to build interactive forms and components.
  `,
  files: {
    "/src/App.vue": `
<template>
  <div class="app">
    <h1>Vue Directives 101</h1>
    
    <!-- ========================================
         STAGE 1: Conditional Rendering
         ======================================== -->
    <section>
      <h2>Stage 1: v-if and v-show</h2>
      
      <button @click="showMessage = !showMessage">
        Toggle Message
      </button>
      
      <!-- v-if: completely removes element from DOM -->
      <p v-if="showMessage">This message uses v-if</p>
      
      <!-- v-show: toggles CSS display property -->
      <p v-show="showMessage" style="color: blue;">
        This message uses v-show
      </p>
      
      <!-- v-if, v-else-if, v-else -->
      <div>
        <label>Enter a number: </label>
        <input v-model.number="userNumber" type="number" />
      </div>
      
      <p v-if="userNumber < 0">Negative number</p>
      <p v-else-if="userNumber === 0">Zero</p>
      <p v-else-if="userNumber > 0 && userNumber <= 10">Small positive number</p>
      <p v-else>Large positive number</p>
    </section>
    
    <hr />
    
    <!-- ========================================
         STAGE 2: List Rendering
         ======================================== -->
    <section>
      <h2>Stage 2: v-for</h2>
      
      <h3>Simple Array</h3>
      <ul>
        <li v-for="(fruit, index) in fruits" :key="index">
          {{ index + 1 }}. {{ fruit }}
        </li>
      </ul>
      
      <h3>Array of Objects</h3>
      <div v-for="user in users" :key="user.id" class="user-card">
        <strong>{{ user.name }}</strong>
        <p>{{ user.email }}</p>
      </div>
      
      <h3>Object Properties</h3>
      <ul>
        <li v-for="(value, key) in userProfile" :key="key">
          <strong>{{ key }}:</strong> {{ value }}
        </li>
      </ul>
    </section>
    
    <hr />
    
    <!-- ========================================
         STAGE 3: Data Binding
         ======================================== -->
    <section>
      <h2>Stage 3: v-bind and v-model</h2>
      
      <h3>v-bind for Attributes</h3>
      <img :src="imageUrl" :alt="imageAlt" width="100" />
      <a :href="linkUrl" target="_blank">Visit Example</a>
      
      <h3>Dynamic Classes</h3>
      <button 
        @click="isActive = !isActive"
        :class="{ active: isActive, 'btn-primary': true }"
      >
        {{ isActive ? 'Active' : 'Inactive' }}
      </button>
      
      <h3>v-model for Two-Way Binding</h3>
      <div>
        <label>Name: </label>
        <input v-model="formData.name" type="text" />
        <p>Hello, {{ formData.name }}!</p>
      </div>
      
      <div>
        <label>
          <input v-model="formData.agree" type="checkbox" />
          I agree to the terms
        </label>
        <p>Agreed: {{ formData.agree }}</p>
      </div>
      
      <div>
        <label>
          <input v-model="formData.color" type="radio" value="red" />
          Red
        </label>
        <label>
          <input v-model="formData.color" type="radio" value="blue" />
          Blue
        </label>
        <label>
          <input v-model="formData.color" type="radio" value="green" />
          Green
        </label>
        <p>Selected: {{ formData.color }}</p>
      </div>
    </section>
    
    <hr />
    
    <!-- ========================================
         STAGE 4: Event Handling
         ======================================== -->
    <section>
      <h2>Stage 4: v-on Event Handling</h2>
      
      <h3>Basic Events</h3>
      <button @click="count++">Clicked {{ count }} times</button>
      <button @click="handleClick('Hello!')">Click with Argument</button>
      
      <h3>Event Modifiers</h3>
      <form @submit.prevent="handleSubmit">
        <input v-model="submitMessage" placeholder="Enter message" />
        <button type="submit">Submit (prevents page reload)</button>
      </form>
      <p v-if="lastSubmitted">Last submitted: {{ lastSubmitted }}</p>
      
      <h3>Key Modifiers</h3>
      <input 
        v-model="searchQuery"
        @keyup.enter="performSearch"
        placeholder="Press Enter to search"
      />
      <p v-if="searchResult">Search result: {{ searchResult }}</p>
    </section>
    
    <hr />
    
    <!-- ========================================
         YOUR TURN: Practice Exercise
         ======================================== -->
    <section>
      <h2>Your Turn: Build a Todo List</h2>
      <p style="color: #666;">
        TODO: Create a simple todo list with:
        - Input field with v-model for new todos
        - Button to add todo (@click)
        - List of todos (v-for)
        - Checkbox for each todo (v-model)
        - Conditional styling for completed todos (:class)
        - Delete button for each todo (@click)
      </p>
      <!-- Add your code here -->
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Stage 1: Conditional Rendering
      showMessage: true,
      userNumber: 5,
      
      // Stage 2: List Rendering
      fruits: ['Apple', 'Banana', 'Cherry', 'Date'],
      users: [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
        { id: 3, name: 'Carol White', email: 'carol@example.com' },
      ],
      userProfile: {
        name: 'Alice',
        age: 30,
        city: 'San Francisco',
        role: 'Developer',
      },
      
      // Stage 3: Data Binding
      imageUrl: 'https://via.placeholder.com/100',
      imageAlt: 'Placeholder image',
      linkUrl: 'https://example.com',
      isActive: false,
      formData: {
        name: '',
        agree: false,
        color: 'red',
      },
      
      // Stage 4: Event Handling
      count: 0,
      submitMessage: '',
      lastSubmitted: '',
      searchQuery: '',
      searchResult: '',
    };
  },
  methods: {
    handleClick(message) {
      alert(message);
    },
    handleSubmit() {
      this.lastSubmitted = this.submitMessage;
      this.submitMessage = '';
    },
    performSearch() {
      this.searchResult = \`Searching for: \${this.searchQuery}\`;
    },
  },
};
</script>

<style scoped>
.app {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
  font-family: sans-serif;
}

section {
  margin-bottom: 24px;
}

hr {
  margin: 32px 0;
  border: none;
  border-top: 1px solid #ddd;
}

.user-card {
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.user-card strong {
  display: block;
  margin-bottom: 4px;
}

.user-card p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

button {
  padding: 8px 16px;
  margin: 4px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
}

button.active {
  background: #4CAF50;
  color: white;
}

button.btn-primary {
  border-color: #2196F3;
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
</style>
`,
  }
};
