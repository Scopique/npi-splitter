# npi-splitter

splits the monthly replacement npi list into chunks

The basic workflow is:

1. install node/npm.
2. `npm install`
3. start running scripts in the format `npm run split <flags>`
4. first, see what the index of the column is you want to split on by running `npm run split -f <path_to_file>`. It should print out all the column headers that have the word "taxonomy" in them. Grab the index of the one you want to split by
5. then run `npm run split -f <path_to_file> -d <path_to_destination_folder> -r`. the -r actually runs it.

There are other debugging flags, like -l to limit or -s to skip. But on my macbook it only took like 5-10 minutes to run through so i don't think it's the kind of thing you'll need to run overnight and therefore have risk of it dying and need to start halfway through. It does append if you get into trouble though.
