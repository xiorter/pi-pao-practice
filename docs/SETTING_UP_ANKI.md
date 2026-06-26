# Setting up Anki like the author

This guide walks you through setting up an Anki deck the way this app expects: a deck with **Person / Action / Object** fields, an image for each person and each object, and a **Notes in Plain Text** export that links numbers to image filenames.

If you already have an Anki PAO deck set up similarly, you can skip this — the app only needs the exported `.txt` file and the media folder.

---

## 1. Create the deck

In Anki, create a new deck (e.g. `PAO`). Add a **Note Type** with these fields:

| Field | Content |
|---|---|
| `Number` | The chunk key (e.g. `0` for the 2-digit `00`, or `86` for the 3-digit `086`). |
| `Person` | The person term (e.g. `Zeus`). |
| `Action` | The action term (e.g. `Sauce`). Used for 2-digit actions. |
| `Object` | The object term (e.g. `Ketchup`). |
| `PersonImg` | A reference to the person image (Anki handles this via the media folder). |
| `ObjectImg` | A reference to the object image. |

A simple Card Template:
- **Front:** `{{Number}}`
- **Back:** `{{Person}} {{Action}} {{Object}}` + the two images.

---

## 2. Put images in Anki's `collection.media` folder

Anki stores all card media in a single folder called `collection.media`. On desktop you can open it from Anki's menu: **Tools → Check Media → "Open"** (the folder will open in your file manager).

Copy your person/object images into `collection.media`. Anki uses exact filenames — `zeus.jpg` referenced as `<img src="zeus.jpg">` must exist as `zeus.jpg` in the folder. The author uses the person's name (or a short slug) as the filename.

> Tip: the export workflow below references images by filename, so keep the filenames simple and consistent. Avoid spaces; prefer `zeus.jpg`, `ketchup.jpg`, etc.

---

## 3. Build your PAO list

You can use any of the following resources to design your own Person-Action-Object system. A few good starting points:

- **[Joel Tagert — Making Memories: Creating a Major PAO](https://joeltagert.blogspot.com/2014/01/making-memories-creating-major-pao.html)** — a practical walkthrough of building a PAO system from scratch, with examples.
- **[John Pratt's Atomic Memory system](https://johnpratt.com/atomic/atomic.html)** — the classic Major-system-based PAO/memory system this app is built around.
- **[Maya's Millennium PAO (Art of Memory forum)](https://forum.artofmemory.com/t/mayas-millenium-pao/32629)** — a community-built 1000-entry PAO list (the source of the sample data in this app).

A `samples/sample-pao-system.xlsx` file is included in this repo with the author's column layout you can mirror.

---

## 4. Export to Notes in Plain Text

Once your deck is populated, you need the `.txt` file the app reads for image linking:

1. In Anki's main window, click your `PAO` deck.
2. **File → Export.**
3. Choose **"Notes in Plain Text (.txt)"** as the export format.
4. **Uncheck "Include tags"** (not needed).
5. Click **Export** and save the file somewhere you can find it.

You'll get a `.txt` that looks like:

```
#separator:tab
#html:true
00	Zeus	Sauce	"<img src=""zeus.jpg"">"	"<img src=""ketchup.jpg"">"
01	Sid	Seaweed	"<img src=""sid.jpg"">"	"<img src=""seaweed.jpg"">"
...
```

- The leading `#`-lines are headers (ignored by the app).
- Columns are **tab-separated**: `number \t person \t action \t <personImgHtml> \t <objectImgHtml>`.
- The `src` values in the `<img>` tags must match filenames in your `collection.media` folder.

In the app:
- The **3-digit export** (Millennium PAO) covers 3-digit numbers (positions 1–1000 in 3-2-3 mode).
- The **2-digit export** (Century PAO) covers 2-digit numbers (positions 1–100 in 2-2-2 mode).
- Either export can be loaded on its own, or both.

---

## 5. Use the media folder in this app

The app needs access to the images. You have two options:

- **Pick the Anki `collection.media` folder directly** (Chrome/Edge desktop, via the File System Access API).
- **Zip the `collection.media` folder** and upload the `.zip` (any browser, including mobile Safari).

Either way, the filenames in the loaded media must match the `<img src="...">` values from step 4.

That's it — once your `.txt` is loaded and your media folder is reachable, the app links the PAO terms from your Excel/textarea to the images from Anki.
