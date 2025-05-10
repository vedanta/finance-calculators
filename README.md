# cra-run

A simple way to run Claude-created React apps using Docker containers.

## Features
- Simple and portable
- Minimal effort to run apps
- Support for both JSX and TSX
- Self-contained Docker deployment

## Quick Start

### Using JSX template:
```bash
docker-compose -f docker-compose.jsx.yml up
```

### Using TSX template:
```bash
docker-compose -f docker-compose.tsx.yml up
```

## Development

Local testing:
```bash
npm run test:jsx  # Test JSX template
npm run test:tsx  # Test TSX template
```

## Templates
- `/templates/jsx` - JavaScript/JSX template
- `/templates/tsx` - TypeScript/TSX template
