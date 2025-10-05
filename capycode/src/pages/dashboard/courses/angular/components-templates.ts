import { FrameworkEnum } from "@/contexts/voice-context";
import { Course } from "../../courses";

export const componentsTemplates: Course = {
  id: "a-1",
  title: "Angular Components & Templates",
  difficulty: "Beginner",
  durationMin: 40,
  framework: FrameworkEnum.angular,
  plan: `
### Stage 1: Component Basics
- [ ] Understand the structure of an Angular component (decorator, class, template, styles).
- [ ] Learn how to create a component with \`@Component\` decorator.
- [ ] Define properties in the component class and display them in the template.
- [ ] Use the \`selector\` property to embed components in templates.

### Stage 2: Data Binding
- [ ] Use interpolation \`{{ }}\` to display component properties in the template.
- [ ] Implement property binding with \`[property]\` syntax for HTML attributes.
- [ ] Use event binding with \`(event)\` syntax to handle user interactions.
- [ ] Combine property and event binding with two-way binding \`[(ngModel)]\`.

### Stage 3: Template Syntax
- [ ] Use \`*ngIf\` directive to conditionally display elements.
- [ ] Use \`*ngFor\` directive to render lists of items.
- [ ] Implement \`ngClass\` and \`ngStyle\` for dynamic styling.
- [ ] Use template reference variables with \`#\` to reference DOM elements.

### Stage 4: Component Communication
- [ ] Pass data from parent to child using \`@Input()\` decorator.
- [ ] Emit events from child to parent using \`@Output()\` and \`EventEmitter\`.
- [ ] Create a parent component that manages state and child components that display it.
- [ ] Build a practical example with multiple components communicating.
  `,
  files: {
    "/app.component.ts": `
// Angular Components & Templates — Guided Template
// Learn the fundamentals of Angular components and template syntax.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/*
Your guided TODOs (mirror the course plan):
- [ ] Stage 1: Understand component structure and create basic components
- [ ] Stage 2: Practice different types of data binding
- [ ] Stage 3: Use template directives for conditionals and loops
- [ ] Stage 4: Implement parent-child component communication
*/

// ========================================
// STAGE 1 & 2: Basic Component with Data Binding
// ========================================

@Component({
  selector: 'app-greeting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: \`
    <div style="padding: 16px; border: 2px solid #3f51b5; border-radius: 8px; margin: 16px 0;">
      <h2>Greeting Component</h2>
      
      <!-- Interpolation: Display component properties -->
      <p>Hello, {{ name }}!</p>
      <p>You are {{ age }} years old.</p>
      
      <!-- Property binding: Bind to HTML attributes -->
      <button [disabled]="isButtonDisabled" (click)="onButtonClick()">
        {{ buttonText }}
      </button>
      
      <!-- Two-way binding: Bind input value to component property -->
      <div style="margin-top: 16px;">
        <label>Change name: </label>
        <input [(ngModel)]="name" placeholder="Enter your name" />
      </div>
      
      <p style="font-size: 12px; color: #666; margin-top: 8px;">
        Button clicks: {{ clickCount }}
      </p>
    </div>
  \`,
  styles: [\`
    button {
      padding: 8px 16px;
      background-color: #3f51b5;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    button:hover:not(:disabled) {
      background-color: #303f9f;
    }
    input {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-left: 8px;
    }
  \`]
})
export class GreetingComponent {
  name = 'Alice';
  age = 25;
  buttonText = 'Click me!';
  isButtonDisabled = false;
  clickCount = 0;

  onButtonClick() {
    this.clickCount++;
    this.buttonText = \`Clicked \${this.clickCount} times\`;
  }
}

// ========================================
// STAGE 3: Template Directives
// ========================================

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: \`
    <div style="padding: 16px; border: 2px solid #4caf50; border-radius: 8px; margin: 16px 0;">
      <h2>Todo List</h2>
      
      <!-- Form to add new todos -->
      <div style="margin-bottom: 16px;">
        <input 
          #todoInput
          [(ngModel)]="newTodoText"
          (keyup.enter)="addTodo()"
          placeholder="Add a new todo"
          style="padding: 8px; width: 300px;"
        />
        <button (click)="addTodo()" style="margin-left: 8px;">Add</button>
      </div>
      
      <!-- Show message if no todos -->
      <p *ngIf="todos.length === 0" style="color: #666;">
        No todos yet. Add one above!
      </p>
      
      <!-- List of todos using *ngFor -->
      <ul style="list-style: none; padding: 0;">
        <li *ngFor="let todo of todos; let i = index" 
            [ngClass]="{ 'completed': todo.completed }"
            style="padding: 12px; margin: 8px 0; border-radius: 4px; background-color: #f5f5f5;">
          
          <input 
            type="checkbox" 
            [checked]="todo.completed"
            (change)="toggleTodo(i)"
          />
          
          <span [ngStyle]="{ 
            'text-decoration': todo.completed ? 'line-through' : 'none',
            'color': todo.completed ? '#999' : '#000',
            'margin-left': '8px'
          }">
            {{ todo.text }}
          </span>
          
          <button 
            (click)="deleteTodo(i)" 
            style="float: right; background-color: #f44336;">
            Delete
          </button>
        </li>
      </ul>
      
      <!-- Conditional styling demo -->
      <div style="margin-top: 16px; padding: 12px; border-radius: 4px;"
           [ngStyle]="{
             'background-color': todos.length > 5 ? '#ffebee' : '#e8f5e9',
             'border': todos.length > 5 ? '2px solid #f44336' : '2px solid #4caf50'
           }">
        <p>Total todos: {{ todos.length }}</p>
        <p>Completed: {{ getCompletedCount() }}</p>
        <p *ngIf="todos.length > 5" style="color: #f44336; font-weight: bold;">
          You have a lot of todos!
        </p>
      </div>
    </div>
  \`,
  styles: [\`
    button {
      padding: 8px 16px;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      opacity: 0.9;
    }
    .completed {
      opacity: 0.7;
    }
  \`]
})
export class TodoListComponent {
  newTodoText = '';
  todos: Array<{ text: string; completed: boolean }> = [
    { text: 'Learn Angular components', completed: true },
    { text: 'Practice data binding', completed: false },
    { text: 'Master template directives', completed: false },
  ];

  addTodo() {
    if (this.newTodoText.trim()) {
      this.todos.push({ text: this.newTodoText, completed: false });
      this.newTodoText = '';
    }
  }

  toggleTodo(index: number) {
    this.todos[index].completed = !this.todos[index].completed;
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
  }

  getCompletedCount(): number {
    return this.todos.filter(todo => todo.completed).length;
  }
}

// ========================================
// STAGE 4: Component Communication
// ========================================

// Child Component: Displays a single item
@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div style="border: 2px solid #ff9800; border-radius: 8px; padding: 16px; margin: 8px 0;">
      <h3>{{ item.name }}</h3>
      <p>Price: \${{ item.price }}</p>
      <p>Stock: {{ item.stock }}</p>
      
      <button 
        (click)="handlePurchase()"
        [disabled]="item.stock === 0"
        style="background-color: #ff9800;">
        {{ item.stock === 0 ? 'Out of Stock' : 'Buy Now' }}
      </button>
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
  \`]
})
export class ItemCardComponent {
  @Input() item!: { id: number; name: string; price: number; stock: number };
  @Output() purchase = new EventEmitter<number>();

  handlePurchase() {
    if (this.item.stock > 0) {
      this.purchase.emit(this.item.id);
    }
  }
}

// Parent Component: Manages items and handles purchases
@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  template: \`
    <div style="padding: 16px; border: 2px solid #9c27b0; border-radius: 8px; margin: 16px 0;">
      <h2>Store Component (Parent)</h2>
      
      <div style="margin-bottom: 16px; padding: 12px; background-color: #f3e5f5; border-radius: 4px;">
        <p><strong>Total Purchases:</strong> {{ totalPurchases }}</p>
        <p><strong>Revenue:</strong> \${{ totalRevenue }}</p>
      </div>
      
      <h3>Available Items:</h3>
      
      <!-- Pass data to child using @Input and listen to events using @Output -->
      <app-item-card
        *ngFor="let item of items"
        [item]="item"
        (purchase)="onPurchase($event)">
      </app-item-card>
      
      <div *ngIf="lastPurchase" 
           style="margin-top: 16px; padding: 12px; background-color: #c8e6c9; border-radius: 4px;">
        <p><strong>Last Purchase:</strong> {{ lastPurchase }}</p>
      </div>
    </div>
  \`,
  styles: []
})
export class StoreComponent {
  totalPurchases = 0;
  totalRevenue = 0;
  lastPurchase = '';

  items = [
    { id: 1, name: 'Laptop', price: 999, stock: 5 },
    { id: 2, name: 'Mouse', price: 29, stock: 15 },
    { id: 3, name: 'Keyboard', price: 79, stock: 0 },
    { id: 4, name: 'Monitor', price: 299, stock: 8 },
  ];

  onPurchase(itemId: number) {
    const item = this.items.find(i => i.id === itemId);
    if (item && item.stock > 0) {
      item.stock--;
      this.totalPurchases++;
      this.totalRevenue += item.price;
      this.lastPurchase = \`\${item.name} - \$\${item.price}\`;
    }
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
    GreetingComponent,
    TodoListComponent,
    StoreComponent
  ],
  template: \`
    <div style="padding: 24px; max-width: 900px; margin: 0 auto; font-family: Arial, sans-serif;">
      <h1 style="color: #3f51b5;">Angular Components & Templates</h1>
      
      <app-greeting></app-greeting>
      
      <app-todo-list></app-todo-list>
      
      <app-store></app-store>
      
      <!-- Your Turn: Create a Counter Component -->
      <div style="padding: 16px; border: 2px dashed #999; border-radius: 8px; margin: 16px 0;">
        <h2>Your Turn: Counter Component</h2>
        <p style="color: #666;">
          Create a child component that:
          <br/>• Has \`@Input()\` for initial count value
          <br/>• Has increment/decrement buttons
          <br/>• Emits \`@Output()\` event when count reaches 10
          <br/>• Use it in a parent component that shows an alert
        </p>
        <!-- Add your component here -->
      </div>
    </div>
  \`,
  styles: []
})
export class AppComponent {}
`,
  }
};
