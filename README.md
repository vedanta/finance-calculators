# cra-run

A simple way to run Claude-created React apps using Docker containers or local development.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Creating Your First Claude App

1. **Ask Claude to create a React app**:
   ```
   "Create a todo list app in React"
   "Build a calculator inspired by HP-12C"
   "Make a unit conversion app"
   ```

2. **Save the generated code** from Claude to a file (`.jsx` or `.tsx`)

3. **Clone this template**:
   ```bash
   git clone https://github.com/vedanta/cra-run my-awesome-app
   cd my-awesome-app
   ```

4. **Remove the original git remote**:
   ```bash
   git remote remove origin
   ```

5. **Add your Claude-generated code**:

   For JavaScript (JSX):
   ```bash
   cd templates/jsx
   # Copy your code to src/App.jsx
   cp /path/to/your/claude-app.jsx src/App.jsx
   ```

   For TypeScript (TSX):
   ```bash
   cd templates/tsx
   # Copy your code to src/App.tsx
   cp /path/to/your/claude-app.tsx src/App.tsx
   ```

6. **Install dependencies**:
   ```bash
   npm install
   # Install any additional packages your app needs
   npm install lucide-react  # Example: if your app uses icons
   ```

7. **Run locally**:
   ```bash
   npm start
   ```
   Your app will open at http://localhost:3000

## 🌐 Deploying to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (e.g., `my-awesome-app`)
3. Don't initialize with README

### Step 2: Push Your Code

```bash
# Navigate to project root
cd ../..  # Back to project root

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit - My Awesome App"

# Add your new repository as remote
git remote add origin https://github.com/your-username/my-awesome-app.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under "Build and deployment":
   - Source: Select **"GitHub Actions"**

### Step 4: Wait for Deployment

1. Go to **Actions** tab in your repository
2. Watch the workflow complete (2-3 minutes)
3. Your app will be live at: `https://your-username.github.io/my-awesome-app/`

## 🔧 Troubleshooting

### App shows blank page on GitHub Pages
- The template automatically handles the correct paths for GitHub Pages
- If issues persist, check the Actions tab for error logs

### Port 3000 already in use
```bash
# Kill existing processes on port 3000
lsof -i :3000
kill -9 <PID>

# Or use a different port
npm start -- --port 3001
```

### TypeScript errors
- The TSX template has relaxed TypeScript settings
- If you get type errors, you can:
  1. Use the JSX template instead
  2. Add proper type definitions
  3. Rename `.tsx` files to `.jsx`

### Missing dependencies
- Install any packages your Claude app requires:
```bash
npm install package-name
```

## 📁 Project Structure

```
my-awesome-app/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── docker/
│   ├── Dockerfile.jsx          # Docker config for JSX
│   └── Dockerfile.tsx          # Docker config for TSX
├── templates/
│   ├── jsx/                    # JavaScript/JSX template
│   │   ├── src/
│   │   │   ├── App.jsx        # Your app goes here
│   │   │   ├── index.js
│   │   │   └── styles.css     # Tailwind CSS
│   │   ├── public/
│   │   ├── package.json
│   │   └── webpack.config.js
│   └── tsx/                    # TypeScript/TSX template
│       ├── src/
│       │   ├── App.tsx        # Your app goes here
│       │   ├── index.tsx
│       │   └── styles.css
│       ├── public/
│       ├── package.json
│       ├── tsconfig.json
│       └── webpack.config.js
├── docker-compose.jsx.yml
├── docker-compose.tsx.yml
└── README.md
```

## 🐳 Using Docker

### JSX App
```bash
docker-compose -f docker-compose.jsx.yml up
```

### TSX App
```bash
docker-compose -f docker-compose.tsx.yml up
```

## ✨ Features

- **Simple**: Drop in your Claude-generated code and run
- **Portable**: Works locally and deploys to GitHub Pages automatically
- **Flexible**: Supports both JSX and TSX
- **Modern**: Includes Tailwind CSS, React 18, and hot reloading
- **Docker Ready**: Optional Docker support for containerized deployment

## 📚 Examples

### Example 1: Todo List
```bash
# Ask Claude: "Create a todo list app in React"
# Follow the Quick Start steps above
# Your todo app will be live in minutes!
```

### Example 2: Calculator
```bash
# Ask Claude: "Build a calculator app inspired by HP-12C"
# Save the code to App.jsx
# Deploy to GitHub Pages
```

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Test locally
npm run test:jsx  # Test JSX template
npm run test:tsx  # Test TSX template
```

## 🔄 Updating Your App

To update your deployed app:

```bash
# Make changes to src/App.jsx (or App.tsx)
# Commit and push
git add .
git commit -m "Update app features"
git push origin main

# GitHub Pages will automatically redeploy
```

## 📖 Tips for Claude

When asking Claude to create apps:

1. **Be specific about functionality**:
   ```
   "Create a weather app that fetches data from an API"
   ```

2. **Mention styling preferences**:
   ```
   "Build a modern dashboard with dark mode using Tailwind CSS"
   ```

3. **Request TypeScript if needed**:
   ```
   "Create a TypeScript React form with validation"
   ```

4. **Ask for specific libraries**:
   ```
   "Build a chart app using React and Recharts"
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Designed to work seamlessly with Claude-generated React applications
- Built with React 18, Webpack 5, and Tailwind CSS
- Automated GitHub Pages deployment included
