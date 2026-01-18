# SVG Pixelation Filter

This project uses custom SVG filters to create pixelation effects on elements.

## How It Works

The pixelation filters (found in `src/lib/filters.svelte`) use a combination of SVG filter primitives:

1. **feFlood** - Creates a small colored rectangle (the "pixel" unit)
2. **feComposite** - Defines the grid dimensions
3. **feTile** - Tiles the pixel pattern across the entire area
4. **feComposite (in operator)** - Masks the source graphic with the tiled pattern
5. **feMorphology (dilate)** - Expands the sampled pixels to fill the grid

## Available Filters

- `#pixelate` - 8x8px grid (radius: 4)
- `#pixelate-md` - 6x6px grid (radius: 3)
- `#pixelate-sm` - 4x4px grid (radius: 2)
- `#pixelate-xs` - 2x2px grid (radius: 1)
- `#pixelate-mosaic` - Alternative approach using displacement maps

## Usage

Apply to any element using CSS:

```css
.pixelated {
  filter: url(#pixelate);
}
```

The technique essentially samples the source graphic at regular intervals and dilates those samples to create blocky pixels.
