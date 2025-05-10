# Using cra-run with Claude-generated React Apps

## Step-by-Step Guide

### 1. Create Your React App with Claude

Ask Claude to create a React component. For example:
```
"Create a todo list app in React"
```

Claude will generate a complete React component.

### 2. Set Up Your Project

1. Click "Use this template" on https://github.com/vedanta/cra-run
2. Create a new repository with a name like `my-todo-app`
3. Clone your new repository:
   ```bash
   git clone https://github.com/[your-username]/my-todo-app
   cd my-todo-app
   ```

### 3. Add Your Claude Component

Choose either JSX or TSX template based on your needs:

#### For JSX (JavaScript):

Replace the content of `templates/jsx/src/App.jsx` with your Claude-generated component:

```jsx
// templates/jsx/src/App.jsx
import React from 'react';

// Paste your Claude-generated component here
function App() {
  // Your component code
}

export default App;
```

#### For TSX (TypeScript):

Replace the content of `templates/tsx/src/App.tsx` with your Claude-generated component:

```tsx
// templates/tsx/src/App.tsx
import React from 'react';

// Paste your Claude-generated component here
function App() {
  // Your component code
}

export default App;
```

### 4. Test Locally

Choose your template:

```bash
# For JSX
cd templates/jsx
npm install
npm start

# For TSX
cd templates/tsx
npm install
npm start
```

Your app will open at http://localhost:3000

### 5. Deploy to GitHub Pages

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Add my todo app"
   git push origin main
   ```

2. Enable GitHub Pages:
   - Go to your repository's Settings
   - Navigate to Pages
   - Under "Build and deployment", select "GitHub Actions"

3. Your app will be live at:
   ```
   https://[your-username].github.io/[repository-name]/
   ```

## Examples

### Example 1: Simple Counter App

Ask Claude:
```
"Create a React counter app with increment and decrement buttons"
```

Claude might generate:
```jsx
import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default App;
```

### Example 2: Todo List with TypeScript

Ask Claude:
```
"Create a TypeScript React todo list with add and delete functionality"
```

Claude might generate:
```tsx
import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input }]);
      setInput('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

## Tips for Claude Prompts

1. Be specific about functionality:
   ```
   "Create a React weather app that fetches data from an API and displays current temperature"
   ```

2. Specify styling preferences:
   ```
   "Create a React calculator with modern CSS styling"
   ```

3. Request TypeScript if needed:
   ```
   "Create a TypeScript React form with validation"
   ```

4. Ask for specific features:
   ```
   "Create a React timer app with start, pause, and reset functionality"
   ```

## Using with Docker

If you prefer Docker:

```bash
# JSX
docker-compose -f docker-compose.jsx.yml up

# TSX
docker-compose -f docker-compose.tsx.yml up
```

## Troubleshooting

### Port Already in Use
If port 3000 is busy, modify `webpack.config.js`:
```js
devServer: {
  port: 3001,  // or any available port
}
```

### Build Errors
Ensure all dependencies are installed:
```bash
npm install
```

### GitHub Pages Not Working
1. Check repository settings for correct GitHub Actions source
2. Verify the workflow is passing in the Actions tab
3. Wait a few minutes for deployment to complete

## Next Steps

- Add more complex components
- Integrate with APIs
- Add routing with React Router
- Style with CSS frameworks like Tailwind
- Add state management with Redux or Context API
