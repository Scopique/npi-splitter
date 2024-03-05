# npi-splitter

splits the monthly replacement npi list into chunks

The basic workflow is:

1. install node/npm.
2. `npm install`
3. start running scripts in the format `node index.js <flags>`
4. first, see what the index of the column is you want to split on by running `nodex. index.js -f <path_to_file>`. It should print out all the column headers that have the word "taxonomy" in them. Grab the index of the one you want to split by
5. then run `node index.js -f <path_to_file> -d <path_to_destination_folder> -i <index number of the column to split by> -r`. the -r actually runs it.
