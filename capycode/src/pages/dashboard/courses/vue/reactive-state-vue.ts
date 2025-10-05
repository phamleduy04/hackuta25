import { FrameworkEnum } from "@/contexts/voice-context";
import { Course } from "../../courses";

export const reactiveStateVue: Course = {
  id: "v-2",
  title: "Reactive State in Vue",
  difficulty: "Beginner",
  durationMin: 28,
  framework: FrameworkEnum.vue,
  plan: `
### Stage 1: Understanding Reactivity with \`data()\`
- [ ] Define reactive state using the \`data()\` function in Options API.
- [ ] Understand how Vue tracks changes and automatically updates the DOM.
- [ ] Mutate data properties and observe reactive updates.
- [ ] Use nested objects and arrays in reactive state.

### Stage 2: Computed Properties
- [ ] Create computed properties that derive values from reactive state.
- [ ] Understand that computed properties are cached based on their dependencies.
- [ ] Use computed properties for expensive calculations or filtering.
- [ ] Compare computed properties to methods to see caching benefits.

### Stage 3: Watchers for Side Effects
- [ ] Use the \`watch\` option to react to data changes with side effects.
- [ ] Watch specific properties and execute code when they change.
- [ ] Access old and new values in watchers.
- [ ] Understand when to use watchers vs computed properties.

### Stage 4: Composition API with \`ref\` and \`reactive\`
- [ ] Learn the Composition API as an alternative to Options API.
- [ ] Use \`ref()\` to create reactive primitive values.
- [ ] Use \`reactive()\` for reactive objects.
- [ ] Access and mutate refs with \`.value\` and reactive objects directly.
  `,
  files: {
    "/src/App.vue": `
<template>
  <div class="app">
    <h1>Reactive State in Vue</h1>
    
    <!-- ========================================
         STAGE 1: data() and Reactivity
         ======================================== -->
    <section>
      <h2>Stage 1: Reactive Data</h2>
      
      <div>
        <button @click="counter++">Increment</button>
        <button @click="counter--">Decrement</button>
        <p>Counter: {{ counter }}</p>
      </div>
      
      <div>
        <input v-model="message" placeholder="Type something..." />
        <p>You typed: {{ message }}</p>
        <p>Length: {{ message.length }} characters</p>
      </div>
      
      <div>
        <h3>User Profile</h3>
        <input v-model="user.name" placeholder="Name" />
        <input v-model.number="user.age" type="number" placeholder="Age" />
        <p>{{ user.name }} is {{ user.age }} years old</p>
      </div>
    </section>
    
    <hr />
    
    <!-- ========================================
         STAGE 2: Computed Properties
         ======================================== -->
    <section>
      <h2>Stage 2: Computed Properties</h2>
      
      <div>
        <h3>Shopping Cart</h3>
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <span>{{ item.name }} - \${{ item.price }}</span>
          <input 
            v-model.number="item.quantity" 
            type="number" 
            min="0"
            style="width: 60px; margin-left: 12px;"
          />
        </div>
        <p><strong>Total Items:</strong> {{ totalItems }}</p>
        <p><strong>Total Price:</strong> \${{ totalPrice.toFixed(2) }}</p>
      </div>
      
      <div>
        <h3>Search Filter</h3>
        <input v-model="searchTerm" placeholder="Search users..." />
        <ul>
          <li v-for="user in filteredUsers" :key="user.id">
            {{ user.name }} ({{ user.role }})
          </li>
        </ul>
        <p>{{ filteredUsers.length }} results</p>
      </div>
    </section>
    
    <hr />
    
    <!-- ========================================
         STAGE 3: Watchers
         ======================================== -->
    <section>
      <h2>Stage 3: Watchers</h2>
      
      <div>
        <h3>Debounced Search</h3>
        <input 
          v-model="debouncedInput" 
          placeholder="Type to trigger watcher..."
        />
        <p v-if="watchMessage">{{ watchMessage }}</p>
      </div>
      
      <div>
        <h3>Volume Control</h3>
        <input 
          v-model.number="volume" 
          type="range" 
          min="0" 
          max="100"
        />
        <span>{{ volume }}</span>
        <p v-if="volumeWarning" style="color: red;">{{ volumeWarning }}</p>
      </div>
    </section>
    
    <hr />
    
    <!-- ========================================
         STAGE 4: Composition API (ref & reactive)
         ======================================== -->
    <section>
      <h2>Stage 4: Composition API</h2>
      <p style="color: #666; font-size: 14px;">
        Note: This example uses Options API. To use Composition API, 
        replace the \`data()\`, \`computed\`, and \`methods\` with \`setup()\` 
        and use \`ref()\` and \`reactive()\`.
      </p>
      
      <div>
        <h3>Composition API Example (in comments)</h3>
        <pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto;">
<code>import { ref, reactive, computed } from 'vue';

export default {
  setup() {
    // ref for primitive values
    const count = ref(0);
    const increment = () => count.value++;
    
    // reactive for objects
    const user = reactive({
      name: 'Alice',
      age: 30
    });
    
    // computed
    const doubleCount = computed(() => count.value * 2);
    
    return {
      count,
      increment,
      user,
      doubleCount
    };
  }
}</code>
        </pre>
      </div>
    </section>
    
    <hr />
    
    <!-- ========================================
         YOUR TURN: Practice Exercise
         ======================================== -->
    <section>
      <h2>Your Turn: Build a Task Timer</h2>
      <p style="color: #666;">
        TODO: Create a task timer that:
        - Has a reactive \`seconds\` counter
        - Has a computed \`formattedTime\` (MM:SS format)
        - Has a watcher that alerts when timer reaches 60 seconds
        - Has start/stop/reset buttons
        - Displays the formatted time
      </p>
      <!-- Add your code here -->
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Stage 1: Reactive Data
      counter: 0,
      message: '',
      user: {
        name: 'Alice',
        age: 25,
      },
      
      // Stage 2: Computed Properties
      cart: [
        { id: 1, name: 'Laptop', price: 999, quantity: 1 },
        { id: 2, name: 'Mouse', price: 29, quantity: 2 },
        { id: 3, name: 'Keyboard', price: 79, quantity: 1 },
      ],
      allUsers: [
        { id: 1, name: 'Alice', role: 'Developer' },
        { id: 2, name: 'Bob', role: 'Designer' },
        { id: 3, name: 'Charlie', role: 'Developer' },
        { id: 4, name: 'Diana', role: 'Manager' },
      ],
      searchTerm: '',
      
      // Stage 3: Watchers
      debouncedInput: '',
      watchMessage: '',
      volume: 50,
      volumeWarning: '',
    };
  },
  
  computed: {
    // Total number of items in cart
    totalItems() {
      return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    },
    
    // Total price of all items
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    
    // Filtered users based on search term
    filteredUsers() {
      const term = this.searchTerm.toLowerCase();
      if (!term) return this.allUsers;
      
      return this.allUsers.filter(user => 
        user.name.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
      );
    },
  },
  
  watch: {
    // Watch debouncedInput and show message after typing stops
    debouncedInput(newValue) {
      this.watchMessage = 'Typing...';
      
      // Clear previous timeout
      clearTimeout(this.debounceTimer);
      
      // Set new timeout
      this.debounceTimer = setTimeout(() => {
        this.watchMessage = \`You typed: "\${newValue}"\`;
      }, 500);
    },
    
    // Watch volume and show warning if too high
    volume(newValue, oldValue) {
      console.log(\`Volume changed from \${oldValue} to \${newValue}\`);
      
      if (newValue > 80) {
        this.volumeWarning = '⚠️ Warning: Volume is very high!';
      } else if (newValue > 60) {
        this.volumeWarning = '⚠️ Caution: Volume is high';
      } else {
        this.volumeWarning = '';
      }
    },
  },
  
  methods: {
    // Methods are not cached (called every time)
    getCurrentTime() {
      return new Date().toLocaleTimeString();
    },
  },
  
  beforeUnmount() {
    // Clean up timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
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

.cart-item {
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
input[type="number"]:not([style*="width"]) {
  padding: 8px;
  margin: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 8px;
  margin: 4px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
`,
  }
};
