const notes = require('./notes');
const yargs = require('yargs');

//add command
yargs.command({
    command: 'add',
    describe: 'Adds a new note.',
    builder: {
        title: {
            describe: 'Title of the Note',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Description of the Note',
            demandOption: true,
            type: 'string',
        }
    },
    handler: function (argv) {
        notes.addNotes(argv.title, argv.body);
    }
})

//remove command
yargs.command({
    command: 'remove',
    describe: 'Removes a note.',
    builder: {
        title: {
            describe: 'Title of note to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.removeNotes(argv.title);
    }
})

//list command
yargs.command({
    command: 'ls',
    describe: 'List all notes.',
    handler: function () {
        notes.listNotes();
    }
})

//read command
yargs.command({
    command: 'read',
    describe: 'Read all notes',
    builder: {
        title: {
            describe: 'Title of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.getNotes(argv.title);
    }
})

yargs.parse()