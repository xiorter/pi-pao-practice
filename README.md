# Pi PAO Practice 🥧

A browser-based tool for memorising the digits of **pi** (or any long number) using the **PAO (Person-Action-Object)** memory system and spaced repetition.

➡️ **[Try it live →](https://xiorter.github.io/pi-pao-practice/)**

---

## Background

If you're new to memory techniques, three concepts underpin this app:

- **PAO system** — maps groups of digits to vivid Person-Action-Object images you chain into scenes. [What is PAO?](https://artofmemory.com/blog/pao-system/)
- **Mind palace** — a familiar route or place where you "store" those scenes for later recall. [How to build a memory palace.](https://artofmemory.com/blog/how-to-build-a-memory-palace/)
- **Major system** — a phonetic code that converts digits into consonant sounds, making it easier to invent memorable words for each number. [How the major system works.](https://artofmemory.com/blog/major-system/)

The sample PAO list included in this repo is loosely based on the major system — it's the primary guide for 2-digit entries and a starting point for 3-digit ones — but it makes plenty of deliberate exceptions. For example, 3-digit objects for 000–099 are chemical elements ordered by atomic number (using [John Pratt's Atomic Memory system](https://johnpratt.com/atomic/atomic.html) as a reference), and some entries follow number-shape logic rather than phonetics. Treat the sample as a starting point and personalise it freely.

---

## Two modes

| Mode | Chunk structure | Digits per chunk |
|---|---|---|
| **2-2-2 (Century)** | Person (2) · Action (2) · Object (2) | 6 |
| **3-2-3 (Millennium)** | Person (3) · Action (2) · Object (3) | 8 |

The action list is shared between both modes. The app auto-switches between modes by digit position (configurable in **Settings → PAO Ranges**). Most people start with 2-2-2 and add 3-2-3 later.

---

## Features

- 🥧 Digit typing practice with live colour feedback
- 🃏 Built-in SRS flashcards for chunks you struggle with
- 📈 Heatmaps and stats — daily goal, yearly activity, pi-coverage map
- 🏔️ Everest mode — race through as many digits as possible
- 🌗 Dark mode and mobile-friendly layout
- 🎨 Customisable colours — correct/incorrect/accent/background
- ☁️ Optional Firebase sync — bring your own free Firebase project
- 🔥 Streaks and daily goals
- ⌨️ Keyboard shortcuts for fast practice
- 💾 Everything stored locally in your browser — no account required

---

## Getting started

Open the app for the first time and the **setup wizard** will walk you through five steps:

1. **Appearance** — light/dark mode and colour scheme
2. **PAO source** — load your PAO list from an Excel file (recommended) or paste it into textareas. A sample spreadsheet is at [`samples/sample-pao-system.xlsx`](./samples/sample-pao-system.xlsx)
3. **PAO ranges** — set which digit positions use 2-2-2 vs 3-2-3
4. **Anki images** *(optional)* — link images from your Anki deck to each PAO entry. See [Setting up Anki](./docs/SETTING_UP_ANKI.md)
5. **Cloud sync** *(optional)* — connect a Firebase project to sync progress across devices

You can revisit any of these later via **Settings**.

---

## Loading your PAO list

### Excel (recommended)

Upload a `.xlsx` using the default column layout below — or change the column mapping in Settings if your file is structured differently.

| Column | Field |
|---|---|
| E | Number |
| F | 3-digit Person |
| G | 2-digit Action (shared) |
| H | 3-digit Object |
| L | 2-digit Person |
| M | 2-digit Object |

### Textarea

Paste one entry per line into the Person, Action, and Object fields. Flexible separators are accepted: ` - `, tab, comma, colon, or plain spaces. Semicolons can separate records on the same line. Lines starting with `#` are ignored.

---

## Loading Anki images

The app can display your Anki card images during practice. It needs two things:

1. **A `.txt` export from your Anki deck** — this maps digit numbers to image filenames. In Anki: **File → Export → Notes in Plain Text → uncheck Include tags → Export**
2. **Your Anki `collection.media` folder** (or a `.zip` of it) — this is where the actual image files live

Load both in **Settings → Anki Images**:
- *Millennium PAO (.txt)* — for 3-digit entries
- *Century PAO (.txt)* — for 2-digit entries

Don't have an Anki deck yet? See [Setting up Anki](./docs/SETTING_UP_ANKI.md).

### Getting the media into the app

The app detects your browser and shows the right option automatically. On Chrome and Edge desktop you'll get a folder picker; on Firefox, Safari, and mobile you'll get a zip upload instead. Either way, the images are stored locally in IndexedDB and persist across reloads.

> The folder picker isn't available on all browsers due to a browser API limitation — this is why the zip option exists.

---

## Firebase sync (optional)

To sync progress across devices:

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Cloud Firestore** in test mode
3. Register a web app and copy the config object
4. In **Settings → Cloud Sync**, paste the config and click Connect

The free Spark plan is more than enough.

---

## Running locally

No build step needed. Serve the folder with Python:

```bash
python3 -m http.server 8000
# or
./launch.sh
```

Then open [http://localhost:8000](http://localhost:8000). A local server is required (rather than opening `index.html` directly) so that images load correctly.

---

## Resources

- [Art of Memory forum](https://forum.artofmemory.com) — the main community for memory techniques
- [Maya's Millennium PAO](https://forum.artofmemory.com/t/mayas-millenium-pao/32629) — the community list the sample data is based on
- [John Pratt's Atomic Memory system](https://johnpratt.com/atomic/atomic.html) — image mnemonics to help remember elements 00-99

---

## License

[MIT](./LICENSE) © xiorter
