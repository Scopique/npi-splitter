# npi-splitter

### Splits the monthly replacement NPI list into chunks

## Setup

1. install node/npm from https://nodejs.org/en.
2. At the top of this screen, click the green `<> CODE` button
3. Choose `DOWNLOAD ZIP` at the bottom and save somewhere you'll remember.
4. Go to where you downloaded the ZIP file an unZIP it to a directory of your choice.
5. In the address bar of the directory window (`This PC > Local Disc (C:)` or something similar), click and type POWERSHELL.
6. Verify that the path in the Powershell window matches the location where you unZIPPED the downloaded files.  
7. In the Powershell window, type `npm install`

## Get the index of the desired column

To find the column that will supply the data for the generated files...

1. In the Powershell window, type `node index.js -f <Path to the NPI file>`.
2. You should see a list of column names from the NPI file with the word 'Taxonomy' in them:

> maybe its index 47: Healthcare Provider Taxonomy Code_1

3. Find the column you want to extract by and note the number.
4. In the Powershell window, enter `node index.js -f <Path to the NPI file> -d <Output directory for created files> -i <Index of the column> -r`

### Command line options

**Usage:** `node index.js -[flag] [value]`

-f, --file [file] : Path to NPI file

-d, --dest [destination] : Path to destionation folder

-i, --index [index] : 0-based column index to split on

-l, --limit [num] : Only process N rows

-s, --skip [num] : Skip the first N rows

-r, --run : Run the full script to generate files

