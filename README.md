# Pi PAO Practice 🥧

A browser-based tool for memorising the digits of **pi** using the **PAO (Person-Action-Object)** memory system and spaced repetition.

➡️ **[Try it live →](https://xiorter.github.io/pi-pao-practice/)**

---

## Background

If you're new to memory techniques, three concepts underpin this app:

- **PAO system** — maps groups of digits to vivid Person-Action-Object images you chain into scenes. [What is PAO?](https://artofmemory.com/blog/pao-system/)
- **Mind palace** — a familiar route or place where you "store" those scenes for later recall. [How to build a memory palace.](https://artofmemory.com/blog/how-to-build-a-memory-palace/)
- **Major system** — a phonetic code that converts digits into consonant sounds, making it easier to invent memorable words for each number. [How the major system works.](https://artofmemory.com/blog/major-system/)

The [sample PAO list](./samples/sample-pao-system.xlsx) included in this repo is loosely based on the major system but has plenty of exceptions. For example, 3-digit objects for 000–099 are chemical elements ordered by atomic number, and some entries follow number-shape logic rather than phonetics. Treat the sample as a starting point as you will need to fill in blanks and it is highly recommended to be changed to what you are familiar with.

---

## Two modes

| Mode | Chunk example | Digits per chunk |
|---|---|---|
| **2-2-2 (Century)** | 14 · 15 · 92 | 6 |
| **3-2-3 (Millennium)** | 141 · 59 · 265 | 8 |

The action list is shared between both modes. The app can auto-switch between modes by digit position (configurable in Settings → PAO Ranges). You can start with 2-2-2 and add 3-2-3 later.

---

## Getting started

Open the app for the first time and the **setup wizard** walks you through loading your PAO list, optionally linking Anki images, and configuring appearance and cloud sync. You can revisit any of this later via **Settings**.

A sample spreadsheet is included at [`samples/sample-pao-system.xlsx`](./samples/sample-pao-system.xlsx). For setting up Anki images, see [Setting up Anki](./docs/SETTING_UP_ANKI.md).

---

## Features

### Typing practice

The main screen shows the digits of pi you type seperated into chunks. If a mistake is made, it will highlight the incorrect digit with a different colour. Mistakes lock the input until corrected (configurable). You can use hints by revealing the number, word or image associated with the current chunk.

When you complete a chunk, it is automatically rated **Good** in the SRS deck if it was already in the deck and you hadn't completed it earlier that day. This keeps your review schedule up to date just by practising normally.

### Audio feedback

As you type correct digits, a rising tone plays for each chunk, cycling through a musical scale. You can change the scale and adjust volume in **Settings → Audio**.

### Spaced repetition (SRS)

The built-in SRS is modelled closely on Anki's algorithm. Each chunk of digits is a card. Cards enter the deck in two ways:

- **Automatically** when you type through a chunk (rated Good)
- **Manually** by pressing `A` (Again) or `H` (Hard) on a chunk, or by enabling auto-mistake mode in Settings (any mistyped chunk is immediately added as Again)

During a review session (`R`), a card is shown with the P/A/O terms and numbers. Your goal is to recall the PAO image that appears after (within your mind palace). Once revealed, you self-rate:

| Rating | Effect |
|---|---|
| **Again** | Card returns to learning steps, due today |
| **Hard** | Interval × 1.2, ease factor −0.15 |
| **Good** | Interval × ease factor |
| **Easy** | Interval × ease factor × 1.3, ease factor +0.15 |

New cards go through short learning steps (default: 1 min, 10 min) before graduating to spaced intervals. Lapsed cards go through a shorter relearning step before returning to review. The next interval for each rating is shown on the buttons before you choose.

### Everest mode

Everest (`E`) is a streak-based recall drill. A random chunk is selected from within your chosen digit range, and you are shown the chunk's digits. Your task is to type the digits of the chunk immediately **before** it and the chunk immediately **after** it from memory.

- A correct answer increments your streak; a wrong answer resets it to zero and adds the incorrectly-recalled chunks to the SRS deck as Again
- After submitting, the correct digits and PAO labels for all three chunks are revealed, so you can review what you missed
- **Raw mode** hides the chunk number and pi position during the question
- **Easy mode** shows the P/O images for the middle chunk as a hint while you answer
- High scores are tracked separately per mode (normal / raw / easy / raw+easy) and per digit range

### Stats

The stats screen (`S`) shows:

- **Summary figures** — total digits typed, current streak, longest streak, best day, daily average, and days-learned percentage (days with any activity divided by days since you started)
- **Yearly activity heatmap** — one square per day, coloured by digits typed and/or SRS reviews completed. Future dates show upcoming scheduled review load. Hover over any square for the exact counts. Switch between years with the arrows
- **Pi coverage map** — one square per chunk across all of pi, coloured by SRS status. Two view modes: *Due* (darker = due sooner) and *Ease* (darker = harder ease factor). Hover any square to see the PAO label, digits, images, and due date. Right-click a square to edit its SRS due date or remove it from the deck. This gives you an at-a-glance picture of how much your SRS deck covers and where the trouble spots are.

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
