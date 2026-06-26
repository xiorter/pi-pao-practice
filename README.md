# Pi PAO Practice 🥧

A browser-based practice tool for memorising the digits of **pi** (or any long number) using the **PAO (Person-Action-Object)** memory system, combined with a **mind-palace** approach (pins across a neighbourhood in Google Earth).

➡️ **[Try it live →](https://xiorter.github.io/pi-pao-practice/)**

![](./docs/screenshot-hero.png)

---

## What is PAO?

The **Person-Action-Object** system maps small groups of digits to vivid images you can chain into a story:

- **2-2-2 mode** — Person (2 digits) · Action (2 digits) · Object (2 digits). One chunk = 6 digits.
- **3-2-3 mode** — Person (3 digits) · Action (2 digits) · Object (3 digits). One chunk = 8 digits.
- The **Action list is shared** between the two modes: the 2-digit action key (00–99) means the same action whether you're in 2-2-2 or 3-2-3.
- The app auto-switches between 2-2-2 and 3-2-3 based on the digit position (configurable in **Settings → PAO Ranges**).

By visualising `Person → Action → Object` for each chunk, a stream of digits becomes a story you can recall. The **mind-palace** technique — placing those images at familiar locations (the author uses pins across his neighbourhood in Google Earth) — makes recall nearly automatic.

This app is the **practice surface**: type digits, reveal the image, get tested with SRS flashcards, track your coverage, and run drills.

---

## Features

- 🥧 **pi digit typing practice** with live coloured feedback and a helper bar
- 🃏 **SRS (spaced-repetition) flashcards** for the chunks you struggle with
- 📈 **Heatmaps & stats** — daily goal tracking, yearly activity heatmap, pi-coverage map
- 🏔️ **Everest mode** — race through as many digits as you can
- 🌗 **Dark mode**, mobile-friendly layout
- 🎨 **Customisable colours** — correct/incorrect/accent/background, plus a heatmap colour scheme
- ☁️ **Optional Firebase sync** — keep your progress across devices (you bring your own free Firebase project)
- 🔥 **Streaks & daily goals**
- ⌨️ **Keyboard-driven** for fast practice (see shortcuts below)
- 💾 Everything stored locally in your browser; no account required

---

## Quick start

A **first-run installer** walks you through the setup the first time you open the app. You can also re-open it anytime via the **?** button at the top of the page.

The five steps:

1. **Appearance** — light/dark mode, colours (correct, incorrect, accent, background).
2. **PAO source** — choose how you enter your PAO list: an Excel spreadsheet (recommended) or the raw textareas. A sample Excel is included at [`samples/sample-pao-system.xlsx`](./samples/sample-pao-system.xlsx).
3. **PAO ranges** — which 2-2-2 and 3-2-3 digit ranges to use.
4. **Anki images** *(skippable)* — load the `.txt` export from your Anki deck + the Anki media folder (as a folder or a zipped file). If you don't have Anki set up yet, see [Setting up Anki like the author](./docs/SETTING_UP_ANKI.md).
5. **Cloud sync** *(optional)* — connect a free Firebase project to sync your progress across devices.

---

## How the pieces fit together

The app keeps your **PAO terms** and your **Anki image filenames** as two separate data sources, joined by the digit number:

| Source | What it provides | How you provide it |
|---|---|---|
| **PAO terms** (Person / Action / Object) | The actual word for each digit pair/triple | Excel upload (recommended) **or** the textarea fields in **Settings → PAO Source** |
| **Anki image filenames** | Which image file goes with each person/object | The `.txt` Anki export (**File → Export → Notes in Plain Text**) + the Anki `collection.media` folder |
| **Pi digits** | The number sequence to practice | Built into the app (3000+ digits) |

The `.txt` Anki export is **not** for the PAO terms — it's only the mapping from digit number → image filename. The terms come from your Excel/textarea.

---

## The Anki export workflow

1. In Anki, open your PAO deck.
2. **File → Export.**
3. Choose **"Notes in Plain Text (.txt)"**.
4. Uncheck **"Include tags"**.
5. Export.

You'll get a `.txt` like:

```
#separator:tab
#html:true
00	Zeus	Sauce	"<img src=""zeus.jpg"">"	"<img src=""ketchup.jpg"">"
01	Sid	Seaweed	"<img src=""sid.jpg"">"	"<img src=""seaweed.jpg"">"
...
```

Upload it in **Settings → Anki Images**:
- **Millennium PAO — 3-digit images (.txt)** for 3-digit objects.
- **Century PAO — 2-digit images (.txt)** for 2-digit objects.

See [Setting up Anki like the author](./docs/SETTING_UP_ANKI.md) for the full setup walkthrough.

---

## Loading your media (the Anki media folder)

The app needs the images referenced by your Anki `.txt` export. They come from Anki's `collection.media` folder.

### Option A — Choose the folder (Chrome / Edge desktop only)

In **Settings → Anki Images**, click **"Choose media folder"** and pick the `collection.media` folder (or any folder containing the same image filenames).

### Option B — Upload a `.zip` of the folder (all browsers, incl. iOS Safari & mobile)

Zip up your `collection.media` folder, then click **"Upload media .zip"**. The app extracts it in-browser and stores the images in IndexedDB for instant access on future reloads.

> The filenames in the loaded media **must match** the `<img src="...">` values from your Anki `.txt` export. The app looks up images by exact filename.

> On the hosted site the `media/` folder is **not** shipped (it's typically hundreds of MB and includes your personal images). You always provide your own.

---

## PAO source: Excel vs textarea

Under **Settings → PAO Source**, pick one:

### Excel (recommended)

Upload a `.xlsx` with the following column layout (default — configurable in Settings):

| Column | Field |
|---|---|
| **E** | Number |
| **F** | 3-digit Person |
| **G** | 2-digit Action *(shared with 2-2-2 mode)* |
| **H** | 3-digit Object |
| **L** | 2-digit Person |
| **M** | 2-digit Object |

A working sample is at [`samples/sample-pao-system.xlsx`](./samples/sample-pao-system.xlsx). The original data comes from [Maya's Millennium PAO list on the Art of Memory forum](https://forum.artofmemory.com/t/mayas-millenium-pao/32629).

### Textarea

Three textareas (Person / Action / Object), one entry per line. Flexible separators are accepted:

- **Number–term separator:** ` - ` (space-dash-space), tab, comma, colon, or just spaces
- **Record separator:** newline **or** semicolon (`;`)

Examples (all valid):

```
00 - Zeus
01 - Sid
02 - Santa
```

```
00	Zeus	01	Sid	02	Santa
```

```
00-Zeus; 01-Sid; 02-Santa
```

Blank lines and lines starting with `#` are ignored.

---

## Heatmap & pi-coverage colour scheme

**Settings → Stats modal → Color scheme** lets you pick:

- **Ice** (default) — light `#95C8F3` → dark `#0063DE`
- **Magenta** — the original pink/magenta gradient

The chosen scheme drives both the yearly practice heatmap and the pi-coverage squares. Empty (no data) cells are `#EAEAEA` in light mode and `#222222` in dark mode.

---

## Firebase sync (optional)

To sync your progress across devices, plug in a free Firebase project:

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. Enable **Cloud Firestore** (start in test mode).
3. Register a **Web app** and copy the config object.
4. In the app, open **Settings → Cloud Sync**, paste the config JSON, pick a sync code (any string — used to namespace your data), and click **Connect**.

The free **Spark** plan is more than enough for personal use.

---

## Resources for building your own PAO list

- **[Joel Tagert — Making Memories: Creating a Major PAO](https://joeltagert.blogspot.com/2014/01/making-memories-creating-major-pao.html)** — practical walkthrough of building a PAO system from scratch.
- **[John Pratt's Atomic Memory system](https://johnpratt.com/atomic/atomic.html)** — the classic Major-system-based PAO/memory system this app is built around.
- **[Maya's Millennium PAO (Art of Memory forum)](https://forum.artofmemory.com/t/mayas-millenium-pao/32629)** — a community-built 1000-entry PAO list, the source of the sample data in this app.

---

## Keyboard shortcuts

| Key | Action |
|---|---|
| `W` | Hint (highlight next digit) |
| `N` | Reveal |
| `I` | Show image |
| `B` | Browse (list of all positions) |
| `S` | Stats |
| `E` | Everest mode |
| `A` | Add to mistakes |
| `H` | Mark as Hard |
| `L` | List mode |
| `R` | Review (SRS) |

---

## Local development

No build step. Just serve the folder:

```bash
# Python
python3 -m http.server 8000

# Or use the included launcher
./launch.sh
```

Then open <http://localhost:8000>.

---

## Browser support

| Feature | Chrome / Edge | Firefox | Safari | iOS Safari | Mobile Chrome |
|---|---|---|---|---|---|
| Typing, SRS, stats, heatmap | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Folder picker** (media) | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Zip upload** (media) | ✅ | ✅ | ✅ | ✅ | ✅ |
| IndexedDB persistence | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## License

[MIT](./LICENSE) © xiorter
