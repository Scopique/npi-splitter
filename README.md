# npi-splitter

### Splits the monthly replacement NPI list into chunks

## Setup

1. install node/npm from https://nodejs.org/en.
2. At the top of this screen, click the green `<> CODE` button
3. Choose `DOWNLOAD ZIP` at the bottom and save somewhere you'll remember.
4. Go to where you downloaded the ZIP file an unZIP it to a directory of your choice.
5. In that unZIPPED directory, create a sub-directory called 'output'.
7. In the address bar of the directory window (`This PC > Local Disc (C:)` or something similar), click and type POWERSHELL.
8. Verify that the path in the Powershell window matches the location where you unZIPPED the downloaded files.  
9. In the Powershell window, type `npm install`

> [!note]
> It's best to copy your source NPI file into the unZIPPED directory. This will make things a LOT easier when
> you have to supply the name of the file to read from. 

In the Powershell window, enter `node index.js -f <Path to the NPI file> -d output -r`

### Command line options

**Usage:** `node index.js -[flag] [value]`

-f, --file [file] : Path to NPI file

-d, --dest [destination] : Path to destionation folder

-i, --index [index] : 0-based column index to split on

-l, --limit [num] : Only process N rows

-s, --skip [num] : Skip the first N rows

-r, --run : Run the full script to generate files

