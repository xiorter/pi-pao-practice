# Pi PAO Practice 🥧

A browser-based tool for memorising the digits of **pi** using the **PAO (Person-Action-Object)** memory system and spaced repetition.

➡️ **[Try it live →](https://xiorter.github.io/pi-pao-practice/)**

---

## Background

If you're new to memory techniques, two concepts underpin this app:

- **PAO system**: maps groups of digits to vivid Person-Action-Object images you chain into scenes. [What is PAO?](https://artofmemory.com/blog/pao-system/)
- **Mind palace**: a familiar route or place where you "store" those scenes for later recall. [How to build a memory palace.](https://artofmemory.com/blog/how-to-build-a-memory-palace/)

The [sample PAO list](./samples/sample-pao-system.xlsx) included in this repo is loosely based on the [major system](https://artofmemory.com/blog/major-system/) but has plenty of exceptions. For example, 3-digit objects for 000-099 are chemical elements ordered by atomic number, and some entries follow number-shape logic rather than phonetics. Treat the sample as a starting point, you'll need to fill in blanks, and it's a good idea to swap in terms you're actually familiar with.

---

## Two modes

| Mode | Chunk example | Digits per chunk |
|---|---|---|
| **2-2-2 (Century)** | 14 · 15 · 92 | 6 |
| **3-2-3 (Millennium)** | 141 · 59 · 265 | 8 |

The action list is shared between both modes. The app can auto-switch between modes by digit position (configurable in Settings > PAO Ranges). You can start with 2-2-2 and add 3-2-3 later.

---

## Getting started

Open the app for the first time and the **setup wizard** walks you through loading your PAO list, optionally linking Anki images, and configuring appearance and cloud sync. You can revisit any of this later via **Settings**.

A sample spreadsheet is included at [`samples/sample-pao-system.xlsx`](./samples/sample-pao-system.xlsx). For setting up Anki images, see [Setting up Anki](./docs/SETTING_UP_ANKI.md).

---

## Features

### Typing practice

The main screen shows the digits of pi you type, split into chunks. If you make a mistake, it highlights the wrong digit in a different colour, and locks the input until you correct it (configurable). Hints are available too: reveal the number, the word, or the image tied to the current chunk.

Each chunk you type counts as progress toward the study block it belongs to.

### Audio feedback

As you type correct digits, a rising tone plays for each chunk, cycling through a musical scale. Change the scale or adjust volume in **Settings > Audio**.

### Study blocks & spaced repetition

Chunks are grouped into **study blocks**, a configurable number of consecutive chunks (25 by default) that get scheduled and reviewed.

- Each day, one new study block is added by typing forward through new digits past the max learnt. Once every chunk in it has been typed, the block gets scheduled later the same day.
- A checklist lists every block currently due and an "Add new chunks" entry for learning new digits. Click either one and the input loads at that block's starting position, then you just type.
- You can also rate Again, Hard, or Easy manually on any chunk as you go, on top of the automatic Good rating when a chunk is typed without manual rating. The collective rating of the chunks within the study block will determine the scheduling.

### Everest mode

Everest (`E`) is a streak-based recall drill. A random chunk is selected from within your chosen digit range, and you're shown its digits. Your job is to type the digits of the chunk immediately **before** it and the chunk immediately **after** it, from memory.

- A correct answer increments your streak. A wrong answer resets it to zero.
- After you submit, the correct digits and PAO labels for all three chunks are revealed, so you can see what you missed.
- **Raw mode** hides the chunk number and pi position during the question.
- **Easy mode** shows the P/O images for the middle chunk as a hint while you answer.
- High scores are tracked separately per mode (normal / raw / easy / raw+easy) and per digit range.

### Stats

The stats screen (`S`) shows:

- **Summary figures**: total digits typed, current streak, longest streak, best day, daily average, and days-learned percentage (days with any activity divided by days since you started).
- **Daily goal**: no longer something you set yourself. It's worked out automatically as "clear your queue", the combined size of every block currently due plus the next block on your frontier. Hit it and you've cleared everything waiting for you that day.
- **Yearly activity heatmap**: one square per day, coloured by digits typed and scaled against that day's goal. Future dates show projected digit load based on upcoming block due dates. Hover a square for exact counts, or right-click a past day to reset its count. Switch years with the arrows.
- **Pi coverage map**: one square per chunk across all of pi, with rows aligned to study block boundaries. Two view modes: *Due* (darker means more overdue) and *Ease* (darker means a harder ease factor). Hover a square to see its PAO label, digits, images, and due date. Right-click a block's label on the left to edit the due date.

---

## Firebase sync (optional)

To sync progress across devices:

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Cloud Firestore** in test mode
3. Register a web app and copy the config object
4. In **Settings > Cloud Sync**, paste the config and click Connect

The free Spark plan is more than enough.

---

## Running locally

No build step needed. Serve the folder with Python:

```bash
python3 -m http.server 8000
# or
./launch.sh
```

Then open [http://localhost:8000](http://localhost:8000). You do need a local server rather than opening `index.html` directly, otherwise the images won't load.

---

## Resources

- [Art of Memory forum](https://forum.artofmemory.com): the main community for memory techniques.
- [Maya's Millennium PAO](https://forum.artofmemory.com/t/mayas-millenium-pao/32629): the community list the sample data is based on.
- [John Pratt's Atomic Memory system](https://johnpratt.com/atomic/atomic.html): image mnemonics to help remember elements 00-99.

---

## License

[MIT](./LICENSE) © xiorter
