# Open Graph (OG) Image Generator

A SvelteKit application for generating Open Graph (OG) images using customizable templates. This tool allows you to create social media thumbnails and preview images programmatically.

## Features

- **Template-based Image Generation** - Generate images using predefined templates
- **PNG and SVG Output** - Export images in multiple formats
- **URL-based API** - Generate images via HTTP requests
- **SvelteKit Application** - Web interface for template exploration

## Local Development

### Prerequisites

bun.js

### Installation

1. Clone the repository:

```bash
git clone https://github.com/canonical/open-graph-images-generator
cd open-graph-images-generator
```

2. Install dependencies:

```bash
bun install
```

### Running the Application

Start the development server:

```bash
bun dev
```

The application will be available at `http://localhost:5173`

## Using the OG Image Generator

### API Endpoints

#### Generate OG Image

```
GET /opengraph/{template}?{parameters}
```

**Parameters:**

- `format` (optional): Output format - `png` or `svg` (default: `png`)
- `scale` (optional): Scale factor for PNG output - number between 1-10 (default: 1)
- Template-specific parameters (see template schemas below)

### Web Interface

Visit the homepage at `http://localhost:5173` to:

- Browse available templates
- See template previews with example data
- Click on templates to explore them in detail
- View template parameters and examples

### Template Development

Templates are located in `src/templates/` and follow this structure:

```
templates/
├── {template-name}/
│   ├── index.ts          # Template definition
│   ├── schema.ts         # Zod validation schema
│   ├── {Template}.svelte # Svelte component
│   └── assets/           # Template assets
```

Each template must export:

- `id`: Unique template identifier
- `component`: Svelte component
- `schema`: Zod validation schema
- `width` and `height`: Image dimensions
- `example`: Example data for the template

## Architecture

- **Frontend**: SvelteKit with Svelte 5
- **Image Generation**: Satori + Resvg for SVG to PNG conversion
- **Styling**: Vanilla Framework (Canonical's design system)
- **Validation**: Zod for schema validation
