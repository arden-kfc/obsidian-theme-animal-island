# Animal Island — Obsidian Theme

An animal forest-style Obsidian theme.

## Installation

1. Copy the two files `manifest.json` and `theme.css` into your vault:

   ```
   <your vault>/.obsidian/themes/Animal Island/
   ```

   Note that the final path must be `.obsidian/themes/Animal Island/theme.css`.

2. Open Obsidian → Settings → Appearance → Themes, and select **Animal Island**.
3. Both dark/light modes are supported:
   - Light = **Island Day** (parchment + mint green, original color scheme)
   - Dark = **Island Night** (warm dark brown parchment, same color palette)

## Design Features

- **Color palette**: warm parchment background (`#f8f8f0` / `rgb(247,243,223)`), earthy brown text (never pure black), mint cyan primary color `#19c8b9`.
- **Controls**: buttons, input fields, and search boxes are all 50px pill-shaped; all interactive elements have a border radius of at least 12px.
- **3D game buttons**: only primary actions (`.mod-cta`) and dangerous actions (`.mod-warning`) use pixel-stacked shadows
  `0 5px 0 0 #bdaea0` (6px on hover, 1px when pressed + downward shift), while ordinary buttons only have soft shadows.
- **Focus**: a unified yellow `#ffcc00` focus ring is used instead of cool blue.
- **Fonts**: Nunito + Noto Sans SC (body text 500, headings 600–900, with Chinese covered by Noto Sans SC).
  Fonts are loaded via Google Fonts, with automatic fallback to system Chinese fonts when offline.
- **Animations**: `cubic-bezier(0.4, 0, 0.2, 1)`, 0.15–0.35s, with slight upward movement on hover and downward movement when pressed;
  dialogs use a zoom-in entrance animation and respect the system “Reduce Motion” setting.
- **Details**: the left sidebar has a dotted wallpaper texture; toggles use cream-colored circular knobs + inset-shadow tracks;
  tags, properties, blockquotes, code blocks, and tables all have rounded corners; the metadata area is styled as a parchment card.

## Customization

The theme declares a complete set of `--animal-*` design tokens (colors, border radii, shadows, animations) at the top in `:root`,
and all Obsidian variables in `.theme-light` / `.theme-dark` at the bottom reference these tokens.
When changing colors, modify the tokens first, for example, to change the primary color to lime:

```css
:root {
  --animal-primary: #d1da49;
  --animal-primary-hover: #dde56e;
  --animal-primary-active: #b9c23a;
}
```

## License

This theme's code is released under [The Unlicense](LICENSE) — dedicated to the public domain. You are free to use, modify, and redistribute it for any purpose, commercial or non-commercial, with no attribution required.

The theme styles only take visual inspiration from the animal-island-ui design guidelines (CC BY-NC 4.0, non-commercial use), which applies to that upstream project, not to this theme's code.