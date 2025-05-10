# cra-run

A simple way to run Claude-created React apps using Docker containers.

## 🚀 Features

- Simple and portable
- Minimal effort to run apps - drop in and run
- Support for both JSX and TSX
- Self-contained Docker deployment
- GitHub Pages ready

## 🛠️ Quick Start

### Using as a Template

1. Visit https://github.com/vedanta/cra-run
2. Click "Use this template" to create your own repository
3. Clone your new repository locally

### Running Locally

#### Using JSX template:
```bash
# Using Docker
docker-compose -f docker-compose.jsx.yml up

# Or run directly
cd templates/jsx
npm install
npm start
```

#### Using TSX template:
```bash
# Using Docker
docker-compose -f docker-compose.tsx.yml up

# Or run directly
cd templates/tsx
npm install
npm start
```

## 🎯 Workflow

### 1. Create your React Component

Replace the content in `src/App.jsx` (or `src/App.tsx`) with your Claude-generated React component:

```jsx
// templates/jsx/src/App.jsx
import React from 'react';

// Your Claude-generated component here
function App() {
  // Your component code
}

export default App;
```

### 2. Deploy to GitHub Pages

1. Push your changes to GitHub
2. Go to your repository Settings → Pages
3. Select "GitHub Actions" as the source
4. Your app will be automatically deployed to `https://[username].github.io/[repository-name]/`

## 📁 Project Structure

```
cra-run/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── docker/
│   ├── Dockerfile.jsx          # Docker config for JSX
│   └── Dockerfile.tsx          # Docker config for TSX
├── templates/
│   ├── jsx/                    # JavaScript/JSX template
│   │   ├── src/
│   │   │   ├── App.jsx
│   │   │   └── index.js
│   │   ├── public/
│   │   └── package.json
│   └── tsx/                    # TypeScript/TSX template
│       ├── src/
│       │   ├── App.tsx
│       │   └── index.tsx
│       ├── public/
│       ├── tsconfig.json
│       └── package.json
├── docker-compose.jsx.yml
├── docker-compose.tsx.yml
└── README.md
```

## 🔧 Development

### Local Testing

```bash
# Test JSX template
npm run test:jsx

# Test TSX template
npm run test:tsx
```

### Building for Production

```bash
# JSX
cd templates/jsx
npm run build

# TSX
cd templates/tsx
npm run build
```

## 🐳 Docker Commands

```bash
# Build and run JSX app
docker-compose -f docker-compose.jsx.yml up --build

# Build and run TSX app
docker-compose -f docker-compose.tsx.yml up --build

# Stop containers
docker-compose -f docker-compose.[jsx|tsx].yml down
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

- Created to simplify running Claude-generated React applications
- Built with React 18
- Optimized for GitHub Pages deployment

## Handling TypeScript Strictness

The TSX template uses relaxed TypeScript settings. If you encounter type errors:
1. Use the JSX template instead
2. Or add type definitions to your TypeScript code
3. Or rename .tsx to .jsx files
