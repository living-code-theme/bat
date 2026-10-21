// Port-owned role-contract tests, exercising generated files and real grammars.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {resolveAll} from '../scripts/palette.mjs';
import {generate} from '../src/generate.mjs';
import {bundledThemes,createHighlighter} from 'shiki';
import {SAMPLES} from './contract.mjs';

const flavors = resolveAll();

function plist(xml) {
  const toks = [...xml.matchAll(/<(\/?)(dict|array|key|string|integer|real|true|false)\/?>([^<]*)/g)];
  let i = 0;
  const unescape = (t) => t.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
  const value = () => {
    const [, , tag, text] = toks[i++];
    if (tag === "dict") {
      const o = {};
      while (!(toks[i][1] === "/" && toks[i][2] === "dict")) { const key = unescape(toks[i][3]); i += 2; o[key] = value(); }
      i++;
      return o;
    }
    if (tag === "array") {
      const a = [];
      while (!(toks[i][1] === "/" && toks[i][2] === "array")) a.push(value());
      i++;
      return a;
    }
    if (tag === "true" || tag === "false") return tag === "true";
    i++;
    return unescape(text);
  };
  while (toks[i][2] !== "dict") i++;
  return value();
}

const root = new URL("../", import.meta.url);

const read = (path) => readFileSync(new URL(path, root), "utf8");

const TEXTMATE_PORTS = {tmtheme: (f) => {
    const p = plist(read(`${f.slug}.tmTheme`));
    const [global, ...rules] = p.settings;
    return { colors: { "editor.foreground": global.settings.foreground, "editor.background": global.settings.background }, tokenColors: rules };
  }};

const at = (code, needle) => {
  const [text, nth = "1"] = needle.split(/#(?=\d+$)/);
  let i = -1;
  for (let n = 0; n < Number(nth); n++) {
    i = code.indexOf(text, i + 1);
    if (i < 0) throw new Error(`"${text}" occurs fewer than ${nth} times in the sample`);
  }
  return i;
};

const norm = (hex) => hex?.toLowerCase().slice(0, 7);

const EDITOR_UI = {tmtheme: (f) => {
    const g = plist(read(`${f.slug}.tmTheme`)).settings[0].settings;
    return { bg: g.background, fg: g.foreground, cursor: g.caret, selection: g.selection, lineNumber: g.gutterForeground, lineHighlight: g.lineHighlight };
  }};

test("TextMate ports give every sample token its role (VS Code, Expressive Code, tmTheme, Sublime Text, Hunk)", async () => {
  const themes = [];
  for (const f of flavors) for (const [port, load] of Object.entries(TEXTMATE_PORTS)) {
    themes.push({ ...(await load(f)), name: `${port}:${f.id}`, type: f.light ? "light" : "dark", port, f });
  }
  const hl = await createHighlighter({ themes, langs: [...new Set(SAMPLES.map((s) => s.lang))] });
  const failures = [];
  for (const { lang, code, expect } of SAMPLES) {
    for (const theme of themes) {
      const tokens = hl.codeToTokensBase(code, { lang, theme: theme.name }).flat();
      for (const [needle, role] of expect) {
        const offset = at(code, needle);
        const token = tokens.find((t) => t.offset <= offset && offset < t.offset + t.content.length);
        const got = norm(token?.color), want = norm(theme.f.r(role));
        if (got !== want) failures.push(`${theme.name} ${lang} ${JSON.stringify(needle)}: ${role} is ${want}, got ${got}`);
      }
    }
  }
  assert.deepEqual(failures, []);
});

test("every editor draws its editing surface with the same roles", async () => {
  const failures = [];
  for (const f of flavors) {
    for (const [port, load] of Object.entries(EDITOR_UI)) {
      const got = await load(f);
      for (const [role, color] of Object.entries(got)) {
        if (norm(color) !== norm(f.r(role))) failures.push(`${port} ${f.id} ${role}: ${f.r(role)}, got ${color}`);
      }
    }
  }
  assert.deepEqual(failures, []);
});
