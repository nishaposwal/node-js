const yargs = require("yargs");
const notes = require("./notes");

yargs.command({
  command: "add",
  describe: "Adding Notes",
  builder: {
    title: {
      describe: "Notes title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.addNotes(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove notes Notes",
  builder: {
    title: {
      describe: "",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.removeNote(argv.title);
  },
});

yargs.command({
  command: "read",
  describe: "Read the Notes",
  builder : {
    title : {
     describe : "",
     demandOption : true,
     type : "string"
    }
  },
  handler: (argv) => {
   notes.readNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "list notes Notes",
  handler: (argv) => {
   notes.listNotes();
  },
});
yargs.parse();
