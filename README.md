# No More Polls (NMP)

**Version:** 2.0  
**Description:** Blocks YouTube live chat polls & voting banners. Keep your chat clean and distraction-free.

## Features

- Removes YouTube live chat polls instantly.
- Blocks voting banners and poll-related UI elements.
- Toggle extension on/off via popup.
- Works automatically in the background while watching live streams.

## Installation

1. Clone this repository:
git clone https://github.com/Zzemar/nomorepolls.git
cd nomorepolls

2. Open Chrome and go to chrome://extensions/.
3. Enable Developer mode (top right).
4. Click Load unpacked and select the nomorepolls folder.
5. Make sure nmp.png is in the folder for the extension icon.

## Usage

- Click the extension icon on YouTube.
- Toggle Block Polls on/off via the checkbox in the popup.
- The script runs automatically and removes poll elements.

## Development

- content.js → main script that removes polls.
- popup.js → handles the toggle switch and storage.
- popup.html → extension popup UI.
- manifest.json → Chrome extension configuration.
- nmp.png → icon for toolbar and store.

## Contributing

- Feel free to open issues or submit pull requests.
- Make sure your code follows the current style and structure.

## License

MIT License