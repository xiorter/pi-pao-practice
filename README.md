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

The action list is shared between both modes. The app can auto-switch between modes by digit position (configurable in Settings → PAO Ranges). Most people start with 2-2-2 and add 3-2-3 later.

---

## Getting started

Open the app for the first time and the **setup wizard** walks you through loading your PAO list, optionally linking Anki images, and configuring appearance and cloud sync. You can revisit any of this later via **Settings** or the **?** button (which opens the [full documentation](https://github.com/xiorter/pi-pao-practice)).

A sample spreadsheet is included at [`samples/sample-pao-system.xlsx`](./samples/sample-pao-system.xlsx). For setting up Anki images, see [Setting up Anki](./docs/SETTING_UP_ANKI.md).

---

## Features

### Typing practice

The main screen shows the digits of pi one chunk at a time. You type the digits, and each one lights up green or red as you go. A helper bar above the input shows the PAO terms for the current chunk, and you can reveal the associated Anki images with `I`. Mistakes lock the input until corrected (configurable).

When you complete a chunk, it is automatically rated **Good** in the SRS deck if it was already in the deck and you hadn't completed it earlier that day. This keeps your review schedule up to date just by practising normally.

### Spaced repetition (SRS)

The built-in SRS is modelled closely on Anki's algorithm. Each chunk of digits is a card, identified by its starting position in pi. Cards enter the deck in two ways:

- **Automatically** when you type through a chunk (rated Good)
- **Manually** by pressing `A` (Again) or `H` (Hard) on a chunk, or by enabling auto-mistake mode in Settings (any mistyped chunk is immediately added as Again)

During a review session (`R`), each card is shown as a digit string. You recall the PAO image, then reveal and self-rate:

| Rating | Effect |
|---|---|
| **Again** | Card returns to learning steps, due today |
| **Hard** | Interval × 1.2, ease factor −0.15 |
| **Good** | Interval × ease factor |
| **Easy** | Interval × ease factor × 1.3, ease factor +0.15 |

New cards go through short learning steps (default: 1 min, 10 min) before graduating to spaced intervals. Lapsed cards go through a shorter relearning step before returning to review. The next interval for each rating is shown on the buttons before you choose.

### Everest mode

Everest (`E`) is a streak-based recall drill. A random chunk is selected from within your chosen digit range, and you are shown only the chunk's digits — not its position in pi or its PAO label. Your task is to type the digits of the chunk immediately **before** it and the chunk immediately **after** it from memory, using the middle chunk as your PAO cue.

- A correct answer increments your streak; a wrong answer resets it to zero and adds the incorrectly-recalled chunks to the SRS deck as Again
- After submitting, a three-block context panel reveals the correct digits and PAO labels for all three chunks, so you can review what you missed
- **Raw mode** hides the chunk number and pi position during the question, making it harder
- **Easy mode** shows your Anki images for the middle chunk as a hint while you answer
- High scores are tracked separately per mode (normal / raw / easy / raw+easy) and per digit range

### Stats

The stats screen (`S`) shows:

- **Summary figures** — total digits typed, current streak, longest streak, best day, daily average, and days-learned percentage (days with any activity divided by days since you started)
- **Yearly activity heatmap** — one square per day, coloured by digits typed and/or SRS reviews completed. Future dates show upcoming scheduled review load. Hover any square for the exact counts. Switch between years with the arrows
- **Pi coverage map** — one square per chunk across all of pi, coloured by SRS status. Two view modes: *Due* (darker = due sooner; a distinct purple for overdue chunks) and *Ease* (darker = harder ease factor). Hover any square to see the PAO label, digits, images, and due date. This gives you an at-a-glance picture of how far your SRS deck reaches and where the trouble spots are

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
- [John Pratt's Atomic Memory system](https://johnpratt.com/atomic/atomic.html) — image mnemonics to help remember elements 00–99

---

## License

[MIT](./LICENSE) © xiorter
