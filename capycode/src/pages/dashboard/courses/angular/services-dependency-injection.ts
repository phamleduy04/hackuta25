import { FrameworkEnum } from "@/contexts/voice-context";
import { Course } from "../../courses";

export const servicesDependencyInjection: Course = {
  id: "a-2",
  title: "Angular Services & Dependency Injection",
  difficulty: "Intermediate",
  durationMin: 45,
  framework: FrameworkEnum.angular,
  plan: `
### Stage 1: Understanding Services
- [ ] Learn what services are and why they're used for business logic and data management.
- [ ] Create a basic service class with methods and properties.
- [ ] Understand the \`@Injectable()\` decorator and its role.
- [ ] Learn about service lifecycle and singleton pattern.

### Stage 2: Dependency Injection Basics
- [ ] Understand how Angular's dependency injection system works.
- [ ] Use \`providedIn: 'root'\` to make services available application-wide.
- [ ] Inject services into components using constructor injection.
- [ ] Learn about the injector hierarchy and service scope.

### Stage 3: Data Sharing Between Components
- [ ] Use services to share data between unrelated components.
- [ ] Implement observable patterns with RxJS \`BehaviorSubject\` and \`Observable\`.
- [ ] Subscribe to service data streams in multiple components.
- [ ] Update shared state from different components through the service.

### Stage 4: HTTP and Practical Services
- [ ] Create a data service that simulates API calls.
- [ ] Implement CRUD operations (Create, Read, Update, Delete) in a service.
- [ ] Handle loading states and error handling in services.
- [ ] Build a practical example with a service managing application state.
  `,
  files: {
    "/app.component.ts": `
// Angular Services & Dependency Injection — Guided Template
// Learn how to create services and use dependency injection.

import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

/*
Your guided TODOs (mirror the course plan):
- [ ] Stage 1: Create basic services with the @Injectable decorator
- [ ] Stage 2: Use dependency injection to inject services
- [ ] Stage 3: Share data between components using services and observables
- [ ] Stage 4: Build practical services with CRUD operations
*/

// ========================================
// STAGE 1: Basic Service
// ========================================

@Injectable({
  providedIn: 'root' // Makes service available application-wide as a singleton
})
export class CounterService {
  private count = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  reset() {
    this.count = 0;
  }

  getCount(): number {
    return this.count;
  }
}

// Component using the basic service
@Component({
  selector: 'app-counter-demo',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div style="padding: 16px; border: 2px solid #2196f3; border-radius: 8px; margin: 16px 0;">
      <h2>Counter Service Demo</h2>
      <p style="font-size: 24px; font-weight: bold;">Count: {{ counterService.getCount() }}</p>
      
      <button (click)="counterService.increment()" style="background-color: #4caf50; margin-right: 8px;">
        +1
      </button>
      <button (click)="counterService.decrement()" style="background-color: #f44336; margin-right: 8px;">
        -1
      </button>
      <button (click)="counterService.reset()" style="background-color: #ff9800;">
        Reset
      </button>
      
      <p style="font-size: 12px; color: #666; margin-top: 8px;">
        This counter is shared across all components using the same service instance.
      </p>
    </div>
  \`,
  styles: [\`
    button {
      padding: 8px 16px;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  \`]
})
export class CounterDemoComponent {
  // Dependency Injection: Angular automatically provides the service instance
  constructor(public counterService: CounterService) {}
}

// Another component using the same service (demonstrates singleton pattern)
@Component({
  selector: 'app-counter-display',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div style="padding: 16px; background-color: #e3f2fd; border-radius: 8px; margin: 16px 0;">
      <h3>Counter Display (Different Component)</h3>
      <p>Current count: {{ counterService.getCount() }}</p>
      <p style="font-size: 12px; color: #666;">
        This component shares the same CounterService instance!
      </p>
    </div>
  \`
})
export class CounterDisplayComponent {
  constructor(public counterService: CounterService) {}
}

// ========================================
// STAGE 3: Observable Service for Data Sharing
// ========================================

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // BehaviorSubject holds the current value and emits it to new subscribers
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  
  // Public observable that components can subscribe to
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  // Update the current user
  setUser(user: User | null) {
    this.currentUserSubject.next(user);
  }

  // Get current value without subscribing
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  logout() {
    this.currentUserSubject.next(null);
  }
}

// Component for logging in
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: \`
    <div style="padding: 16px; border: 2px solid #9c27b0; border-radius: 8px; margin: 16px 0;">
      <h2>Login Component</h2>
      
      <div *ngIf="!currentUser" style="margin-bottom: 16px;">
        <input [(ngModel)]="name" placeholder="Name" style="padding: 8px; margin-right: 8px;" />
        <input [(ngModel)]="email" placeholder="Email" style="padding: 8px; margin-right: 8px;" />
        <button (click)="login()" style="background-color: #9c27b0;">Login</button>
      </div>
      
      <div *ngIf="currentUser" style="padding: 12px; background-color: #f3e5f5; border-radius: 4px;">
        <p><strong>Logged in as:</strong> {{ currentUser.name }}</p>
        <p><strong>Email:</strong> {{ currentUser.email }}</p>
        <button (click)="logout()" style="background-color: #f44336;">Logout</button>
      </div>
    </div>
  \`,
  styles: [\`
    button {
      padding: 8px 16px;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    input {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  \`]
})
export class LoginComponent {
  name = '';
  email = '';
  currentUser: User | null = null;

  constructor(private userService: UserService) {
    // Subscribe to user changes
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  login() {
    if (this.name && this.email) {
      const user: User = {
        id: Date.now(),
        name: this.name,
        email: this.email
      };
      this.userService.setUser(user);
      this.name = '';
      this.email = '';
    }
  }

  logout() {
    this.userService.logout();
  }
}

// Component that displays user info (demonstrates data sharing)
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div style="padding: 16px; background-color: #e1bee7; border-radius: 8px; margin: 16px 0;">
      <h3>User Profile (Different Component)</h3>
      
      <div *ngIf="currentUser">
        <p>Welcome, {{ currentUser.name }}!</p>
        <p>Your email: {{ currentUser.email }}</p>
      </div>
      
      <p *ngIf="!currentUser" style="color: #666;">
        No user logged in. Use the login component above.
      </p>
      
      <p style="font-size: 12px; color: #666; margin-top: 8px;">
        This component automatically updates when the user changes!
      </p>
    </div>
  \`
})
export class UserProfileComponent {
  currentUser: User | null = null;

  constructor(private userService: UserService) {
    // Subscribe to the same observable
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }
}

// ========================================
// STAGE 4: Practical Service with CRUD Operations
// ========================================

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>([
    { id: 1, title: 'Learn Angular Services', completed: true },
    { id: 2, title: 'Understand Dependency Injection', completed: false },
    { id: 3, title: 'Build a real application', completed: false }
  ]);

  todos$: Observable<Todo[]> = this.todosSubject.asObservable();

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  // Simulate API delay
  private simulateDelay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // CREATE
  async addTodo(title: string): Promise<void> {
    this.isLoadingSubject.next(true);
    await this.simulateDelay();

    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false
    };

    const currentTodos = this.todosSubject.value;
    this.todosSubject.next([...currentTodos, newTodo]);
    this.isLoadingSubject.next(false);
  }

  // READ (already handled by the observable)

  // UPDATE
  async toggleTodo(id: number): Promise<void> {
    this.isLoadingSubject.next(true);
    await this.simulateDelay(300);

    const currentTodos = this.todosSubject.value;
    const updatedTodos = currentTodos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    this.todosSubject.next(updatedTodos);
    this.isLoadingSubject.next(false);
  }

  // DELETE
  async deleteTodo(id: number): Promise<void> {
    this.isLoadingSubject.next(true);
    await this.simulateDelay(300);

    const currentTodos = this.todosSubject.value;
    const filteredTodos = currentTodos.filter(todo => todo.id !== id);

    this.todosSubject.next(filteredTodos);
    this.isLoadingSubject.next(false);
  }

  // Get statistics
  getStats(): { total: number; completed: number; pending: number } {
    const todos = this.todosSubject.value;
    return {
      total: todos.length,
      completed: todos.filter(t => t.completed).length,
      pending: todos.filter(t => !t.completed).length
    };
  }
}

@Component({
  selector: 'app-todo-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: \`
    <div style="padding: 16px; border: 2px solid #4caf50; border-radius: 8px; margin: 16px 0;">
      <h2>Todo Manager (Service with CRUD)</h2>
      
      <!-- Add Todo Form -->
      <div style="margin-bottom: 16px;">
        <input 
          [(ngModel)]="newTodoTitle"
          (keyup.enter)="addTodo()"
          placeholder="Add a new todo"
          style="padding: 8px; width: 300px; margin-right: 8px;"
        />
        <button 
          (click)="addTodo()"
          [disabled]="isLoading"
          style="background-color: #4caf50;">
          {{ isLoading ? 'Loading...' : 'Add' }}
        </button>
      </div>
      
      <!-- Statistics -->
      <div style="padding: 12px; background-color: #e8f5e9; border-radius: 4px; margin-bottom: 16px;">
        <p><strong>Total:</strong> {{ stats.total }} | 
           <strong>Completed:</strong> {{ stats.completed }} | 
           <strong>Pending:</strong> {{ stats.pending }}
        </p>
      </div>
      
      <!-- Loading Indicator -->
      <p *ngIf="isLoading" style="color: #ff9800; font-weight: bold;">
        Processing...
      </p>
      
      <!-- Todo List -->
      <ul style="list-style: none; padding: 0;">
        <li *ngFor="let todo of todos" 
            style="padding: 12px; margin: 8px 0; background-color: #f5f5f5; border-radius: 4px;">
          <input 
            type="checkbox"
            [checked]="todo.completed"
            (change)="toggleTodo(todo.id)"
          />
          <span [style.text-decoration]="todo.completed ? 'line-through' : 'none'"
                [style.color]="todo.completed ? '#999' : '#000'"
                style="margin-left: 8px;">
            {{ todo.title }}
          </span>
          <button 
            (click)="deleteTodo(todo.id)"
            style="float: right; background-color: #f44336;">
            Delete
          </button>
        </li>
      </ul>
    </div>
  \`,
  styles: [\`
    button {
      padding: 8px 16px;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    input {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  \`]
})
export class TodoManagerComponent {
  newTodoTitle = '';
  todos: Todo[] = [];
  isLoading = false;
  stats = { total: 0, completed: 0, pending: 0 };

  constructor(private todoService: TodoService) {
    // Subscribe to todos
    this.todoService.todos$.subscribe(todos => {
      this.todos = todos;
      this.stats = this.todoService.getStats();
    });

    // Subscribe to loading state
    this.todoService.isLoading$.subscribe(loading => {
      this.isLoading = loading;
    });
  }

  async addTodo() {
    if (this.newTodoTitle.trim()) {
      await this.todoService.addTodo(this.newTodoTitle);
      this.newTodoTitle = '';
    }
  }

  async toggleTodo(id: number) {
    await this.todoService.toggleTodo(id);
  }

  async deleteTodo(id: number) {
    await this.todoService.deleteTodo(id);
  }
}

// ========================================
// Main App Component
// ========================================

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    CounterDemoComponent,
    CounterDisplayComponent,
    LoginComponent,
    UserProfileComponent,
    TodoManagerComponent
  ],
  template: \`
    <div style="padding: 24px; max-width: 900px; margin: 0 auto; font-family: Arial, sans-serif;">
      <h1 style="color: #3f51b5;">Angular Services & Dependency Injection</h1>
      
      <app-counter-demo></app-counter-demo>
      <app-counter-display></app-counter-display>
      
      <hr style="margin: 24px 0; border: none; border-top: 2px solid #ddd;" />
      
      <app-login></app-login>
      <app-user-profile></app-user-profile>
      
      <hr style="margin: 24px 0; border: none; border-top: 2px solid #ddd;" />
      
      <app-todo-manager></app-todo-manager>
      
      <!-- Your Turn -->
      <div style="padding: 16px; border: 2px dashed #999; border-radius: 8px; margin: 16px 0;">
        <h2>Your Turn: Shopping Cart Service</h2>
        <p style="color: #666;">
          Create a shopping cart service that:
          <br/>• Manages a list of products with add/remove methods
          <br/>• Uses BehaviorSubject to share cart items
          <br/>• Calculates total price
          <br/>• Has separate components for adding items and displaying cart
        </p>
        <!-- Add your service and components here -->
      </div>
    </div>
  \`,
  styles: []
})
export class AppComponent {}
`,
  }
};
