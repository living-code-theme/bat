<!-- living-code-readme:1 -->
# 🦇 Living Code for bat · delta (tmTheme)

**Calm slate. Living color.** Living Code for bat · delta (tmTheme). Repository-owned theme files, installation instructions and four color flavors.

[Installation](#installation) · [Flavors](#flavors) · [Configuration](#configuration) · [All ports](https://github.com/living-code-theme)

## Previews

<table data-lc-flavors>
<tr>
<td width="50%" valign="top">
<strong>Night</strong><br><sub>Dark · full palette</sub><br><br>
<a href="images/night.png"><img src="images/night.png" alt="bat · delta (tmTheme) running Living Code Night" width="640"></a>
</td>
<td width="50%" valign="top">
<strong>Frost</strong><br><sub>Dark · softer chroma</sub><br><br>
<a href="images/frost.png"><img src="images/frost.png" alt="bat · delta (tmTheme) running Living Code Frost" width="640"></a>
</td>
</tr>
<tr>
<td width="50%" valign="top">
<strong>Paper</strong><br><sub>Light · near-white slate</sub><br><br>
<a href="images/paper.png"><img src="images/paper.png" alt="bat · delta (tmTheme) running Living Code Paper" width="640"></a>
</td>
<td width="50%" valign="top">
<strong>Signal</strong><br><sub>Dark · teal accent</sub><br><br>
<a href="images/signal.png"><img src="images/signal.png" alt="bat · delta (tmTheme) running Living Code Signal" width="640"></a>
</td>
</tr>
</table>

Select any preview to view the image at full size.

## Installation

**bat / delta**

```sh
curl -fsSL --create-dirs --output-dir "$(bat --config-dir)/themes" -O "https://raw.githubusercontent.com/living-code-theme/tmtheme/main/living-code-{night,frost,paper,signal}.tmTheme" && bat cache --build
bat --list-themes | grep living-code
```

Then `--theme="living-code-night"` in `$(bat --config-dir)/config`, and `syntax-theme = living-code-night` under `[delta]` in `~/.gitconfig`. For delta's diff backgrounds, headers and gutters, also use the dedicated [delta port](https://github.com/living-code-theme/delta).

**Sublime Text** has its own native color scheme: use the dedicated [Sublime Text port](https://github.com/living-code-theme/sublime). The `.tmTheme` files are kept for bat and delta.

## Flavors

Expand a flavor for its full-size preview and activation instructions.

<details data-lc-flavor="night">
<summary><strong>Night</strong> · Dark · full palette</summary>

<p><a href="images/night.png"><img src="images/night.png" alt="bat · delta (tmTheme) running Living Code Night" width="1280"></a></p>

After installing the themes and rebuilding bat's cache:

```sh
bat --theme="living-code-night"
```

For delta, set `syntax-theme = living-code-night` under `[delta]`.

</details>

<details data-lc-flavor="frost">
<summary><strong>Frost</strong> · Dark · softer chroma</summary>

<p><a href="images/frost.png"><img src="images/frost.png" alt="bat · delta (tmTheme) running Living Code Frost" width="1280"></a></p>

After installing the themes and rebuilding bat's cache:

```sh
bat --theme="living-code-frost"
```

For delta, set `syntax-theme = living-code-frost` under `[delta]`.

</details>

<details data-lc-flavor="paper">
<summary><strong>Paper</strong> · Light · near-white slate</summary>

<p><a href="images/paper.png"><img src="images/paper.png" alt="bat · delta (tmTheme) running Living Code Paper" width="1280"></a></p>

After installing the themes and rebuilding bat's cache:

```sh
bat --theme="living-code-paper"
```

For delta, set `syntax-theme = living-code-paper` under `[delta]`.

</details>

<details data-lc-flavor="signal">
<summary><strong>Signal</strong> · Dark · teal accent</summary>

<p><a href="images/signal.png"><img src="images/signal.png" alt="bat · delta (tmTheme) running Living Code Signal" width="1280"></a></p>

After installing the themes and rebuilding bat's cache:

```sh
bat --theme="living-code-signal"
```

For delta, set `syntax-theme = living-code-signal` under `[delta]`.

</details>

## Configuration

See [bat · delta (tmTheme)'s documentation](https://github.com/sharkdp/bat) for application settings and reload behavior. The activation instructions above identify each supported flavor; keep your other application configuration.

## Compatibility

This port supplies theme files for bat · delta (tmTheme), not the application itself. Install the application separately and follow the installation instructions for its supported configuration format.

## Contributing

Found a problem? [Open an issue](https://github.com/living-code-theme/tmtheme/issues/new/choose) with the app version, the flavor and a screenshot. Want Living Code somewhere else? [Request a port](https://github.com/living-code-theme/core/issues/new?template=port-request.yml).

Pull requests are welcome. Keep this README, `port.json` and `images/` in sync, and use real screenshots of the app, never mockups.

🦎 **One chameleon, many habitats.** Part of [Living Code](https://github.com/living-code-theme).

## License

[MIT](LICENSE) © Elliot Luque
