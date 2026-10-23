// This port owns its application mappings. Inputs come only from the pinned local palette.
import { SCOPES } from "./scopes.mjs";

function uuid(seed) {
  let h = 2166136261;
  const out = [];
  for (let i = 0; i < 32; i++) {
    h ^= seed.charCodeAt(i % seed.length) + i;
    h = Math.imul(h, 16777619) >>> 0;
    out.push((h & 15).toString(16));
  }
  const s = out.join("");
  return `${s.slice(0, 8)}-${s.slice(8, 12)}-4${s.slice(13, 16)}-a${s.slice(17, 20)}-${s.slice(20, 32)}`;
}

function plistDict(obj, indent) {
  const pad = "\t".repeat(indent);
  return `${pad}<dict>\n${Object.entries(obj).map(([k, v]) => `${pad}\t<key>${esc(k)}</key>\n${pad}\t<string>${esc(v)}</string>`).join("\n")}\n${pad}</dict>`;
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");


const scopeRules = (f) =>
  SCOPES.map(({ role, scope, fontStyle }) => {
    const settings = {};
    if (role) settings.foreground = f.r(role);
    const style = fontStyle ?? (role && f.styles[role]);
    if (style) settings.fontStyle = style;
    return { scope, settings };
  });

const tmtheme = {
files: (f) => {
    const global = {
      background: f.r("bg"), foreground: f.r("fg"), caret: f.r("cursor"),
      lineHighlight: f.r("lineHighlight"), selection: f.r("selection"),
      invisibles: f.c("surface1"), gutter: f.r("bg"), gutterForeground: f.r("lineNumber"),
      findHighlight: f.r("match"), findHighlightForeground: f.r("bg"),
      bracketsForeground: f.r("accent"), guide: f.c("surface0"), activeGuide: f.c("surface2"),
    };
    const rules = scopeRules(f).map(({ scope, settings }) => `\t\t<dict>
\t\t\t<key>scope</key>
\t\t\t<string>${esc(scope.join(", "))}</string>
\t\t\t<key>settings</key>
${plistDict(settings, 3)}
\t\t</dict>`).join("\n");
    return [{
      path: `${f.slug}.tmTheme`,
      content: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
\t<key>name</key>
\t<string>${f.name}</string>
\t<key>settings</key>
\t<array>
\t\t<dict>
\t\t\t<key>settings</key>
${plistDict(global, 3)}
\t\t</dict>
${rules}
\t</array>
\t<key>uuid</key>
\t<string>${uuid(f.slug)}</string>
</dict>
</plist>
`,
    }];
  }
};

export function generate(flavors) {
  return [...flavors.flatMap(f => tmtheme.files(f)), ...(tmtheme.all?.(flavors) ?? [])].filter(f => !["LICENSE", "README.md", "package.json", "extension.toml"].includes(f.path.split("/").at(-1)));
}
