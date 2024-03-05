const fs = require("fs");
const _ = require("lodash");
const { program } = require("commander");
const Papa = require("papaparse");
program.version("0.0.1");

program
  .option("-f, --file <file>", "path to NPI file")
  .option("-d, --dest <destination>", "path to destionation folder")
  .option("-i, --index <index>", "0 indexed column number to split on")
  .option("-l, --limit <num>", "only process N rows")
  .option("-s, --skip <num>", "Skip the first N rows")
  .option("-r, --run", "actually run the full script");

program.parse(process.argv);
const options = program.opts();

if (options.run) console.log("we are gonna really run");

var readStream = fs.createReadStream(options.file);
const papaPipe = Papa.parse(Papa.NODE_STREAM_INPUT);
readStream.pipe(papaPipe);

// state variables here
let rowsProcessed = 0;
const streamsByTaxonomy = {};
let headerRow = [];
let colIdx = [];

// This catches any errors that happen while creating the readable stream (usually invalid names)
readStream.on("error", function (err) {
  console.log("error in the lower level read stream");
  res.end(err);
});
papaPipe.on("close", (err) => {
  console.log("Input pipe closed, cleaning up writing streams");
  if (err) {
    console.log("there was error");
    console.log("error was", err);
  }
  // ending all streams if there are any;
  _.forEach(_.values(streamsByTaxonomy), (stream) => {
    stream.end();
    process.stdout.write(".");
  });
  console.log("DONE!");
});

const writeRow = (dataArray, stream) => {
  // console.log("data array", JSON.stringify(dataArray));
  const quoted = [];
  for (var i = 0; i < dataArray.length; i++) {
    quoted.push(`"${dataArray[i]}"`);
  }
  const row = quoted.join(",") + "\n";
  //maybe console.log(`WRITING: ${row}`);
  stream.write(row, "utf8");
};
const getOrCreateStream = (tax) => {
  if (streamsByTaxonomy[tax]) {
    return streamsByTaxonomy[tax];
  } else {
    const path = `${options.dest}/${tax}.csv`;
    const fileExists = fs.existsSync(path);
    const newStream = fs.createWriteStream(path, { flags: "a" });
    streamsByTaxonomy[tax] = newStream;
    if (!fileExists) {
      // it's a new file, write the header
      writeRow(headerRow, newStream);
    } else {
      console.log("file already exists");
    }
    return newStream;
  }
};

papaPipe.on("data", (data) => {
    

  try {
    if (rowsProcessed === 0) {
      // it's the header row
        headerRow = data;
        let i = 0;
        // find possible headers as maybe it changes over time as they add/remove columns  
        _.forEach(data, (h) => {
            if (_.includes(_.toLower(h), "taxonomy")) {
            console.log(`maybe its index ${i}: ${h}`);
            colIdx.push(i);
            }
            i++;
        });
      
    }else{
        colIdx.forEach(idx=>{
            const tax = data[idx];
      
            // core stream writing here
            const writeStream = getOrCreateStream(tax);
            writeRow(data, writeStream);
            if (rowsProcessed % 1000 === 0) {
              console.log(`processed: ${rowsProcessed}`);
            }
        })

    }
    
    rowsProcessed++;
    if (options.limit && rowsProcessed > options.limit) {
      if (options.skip) {
        const total = parseInt(options.skip) + parseInt(options.limit);
        if (rowsProcessed > total) {
          console.log(
            `Stopping after ${
              options.limit + options.skip
            } rows processed or skipped`
          );
          papaPipe.destroy();
        }
      } else if (!options.skip) {
        console.log(`Stopping after ${options.limit} rows processed`);
        papaPipe.destroy();
      }
    }
    if (!options.run && !options.index) {
      // only parse the first row
      console.log("Run is false + index not chosen = bailing");
      papaPipe.destroy();
    } else if (!options.run && options.index) {
      if (rowsProcessed > 0) {
        console.log(`value example: ${data[options.index]}`);
      }
      if (rowsProcessed > 10) {
        papaPipe.destroy();
        console.log(
          "Run is false + index is chosen = showing examples of values of that index"
        );
      }
    }
  } catch (e) {
    console.log("OH GOD ERROR HELP AH MAKE IT STOP");
    console.log("I was on... row: ", rowsProcessed);
    console.log(e);
  }
});
