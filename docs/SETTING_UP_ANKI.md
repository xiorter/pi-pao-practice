# Setting up Anki for Pi PAO Practice

This guide picks up where the spreadsheet leaves off. By this point you should have personalised [`samples/sample-pao-system.xlsx`](../samples/sample-pao-system.xlsx) with your own PAO terms.

---

## Which system should I build for?

| | Century (2-2-2) | Millennium (3-2-3) |
|---|---|---|
| Deck size | ~300 | ~2100 |
| Digits per chunk | 6 | 8 |
| Effort to set up | Low | High |
| Good for | Beginners, or anyone who wants a working system quickly | Advanced memorisers going for large digit counts |

**Recommendation:** start with Century. You can add Millennium later — the app supports both simultaneously.

---

## Step 1 — Create a note type in Anki

Anki stores cards as *notes* with named fields. You need to create a note type before importing.

1. Open Anki. Click **Tools → Manage Note Types → Add**.
2. Choose **"Add: Basic"** as the starting point and name it `PAO`.
3. Click **Fields** and set up these fields in order (add or rename as needed):

| Field | What goes here |
|---|---|
| `Number` | The digit key (e.g. `00`, `042`) |
| `Person` | The person name |
| `Action` | The action word |
| `Object` | The object word |
| `PersonImg` | Person image — added card by card after import |
| `ObjectImg` | Object image — added card by card after import |

---

## Step 2 — Set up card templates

In the note type editor, click **Cards**. Create three card types:

### Card 1: Person Image → Person + Number

**Front:**
```
{{PersonImg}}
```
**Back:**
```
{{Person}}<br>
{{FrontSide}}
<hr id=answer>
{{Number}}
```

### Card 2: Object Image → Object + Number

**Front:**
```
{{ObjectImg}}
```
**Back:**
```
{{Object}}<br>
{{FrontSide}}
<hr id=answer>
{{Number}}
```

### Card 3: Number → Action

**Front:**
```
{{Number}}
```
**Back:**
```
{{Action}}
<hr id=answer>
{{FrontSide}}
```

> Actions don't have images — a plain text card is enough. The goal is just to keep the action → number association fresh.

---

## Step 3 — Import your PAO list into Anki

The spreadsheet has two dedicated sheets for import: **Century Import** (2-digit) and **Millennium Import** (3-digit). Each has columns in the order Anki expects: `Number`, `Person`, `Action`, `Object`.

Import the sheet(s) you need:

1. Open `sample-pao-system.xlsx` and go to the **Century Import** or **Millennium Import** sheet.
2. **File → Save a Copy → CSV UTF-8 (.csv)**. Save it somewhere accessible.
3. In Anki, click **File → Import** and select the CSV file.
4. In the import dialog:
   - Set **Note Type** to `PAO`
   - Set **Deck** to `Century PAO` or `Millennium PAO` (create the deck first if it doesn't exist)
   - Map each column to its corresponding field: Column 1 → Number, Column 2 → Person, Column 3 → Action, Column 4 → Object
5. Click **Import**.

> If you want both Century and Millennium, repeat the process — save each sheet as a separate CSV and import into its own deck.

---

## Step 4 — Add images to your cards

The `PersonImg` and `ObjectImg` fields arrive blank after import. You fill them in card by card inside Anki:

1. Open the **Card Browser** in Anki (**Browse** button on the main screen).
2. Find the card you want to add an image to.
3. Click into the `PersonImg` or `ObjectImg` field.
4. Either paste an image from your clipboard, or click the image icon in the editor toolbar to upload from your device.

---

## Step 5 — Export the `.txt` file for use in this app

Once your deck has images, export it so the Pi PAO Practice app can link those images to the right digit positions during practice.

1. In Anki, click **File → Export**.
2. Choose **"Notes in Plain Text (.txt)"**.
3. Select your deck (`Century PAO` or `Millennium PAO`).
4. **Uncheck "Include tags"**.
5. Click **Export** and save the file.

The output looks like:

```
#separator:tab
#html:true
00	Zeus	Squeezing	Sauce	<img src="zeus.jpg">	<img src="sauce.jpg">
01	Sid	Sitting	Seaweed	<img src="sid.jpg">	<img src="seaweed.jpg">
```

Load this in the app under **Settings → Anki Images**:
- *Century PAO (.txt)* for the 2-digit export
- *Millennium PAO (.txt)* for the 3-digit export

Cards without images yet will just show no image — that's fine. Re-export and reload as you add more.

---

## Step 6 — Load your media into the app

The app needs access to the actual image files from `collection.media`.

In **Settings → Anki Images**, the app shows you the right option for your browser:
- **Chrome / Edge desktop:** a folder picker lets you point directly to your `collection.media` folder
- **Other browsers (Firefox, Safari, mobile):** zip up your `collection.media` folder and upload the `.zip` instead

The app stores the images locally in IndexedDB, so they persist across reloads without re-uploading.

Once both the `.txt` export and the media are loaded, your images will appear during practice.
