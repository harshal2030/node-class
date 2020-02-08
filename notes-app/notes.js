const fs = require('fs');
const chalk = require('chalk');

const getNotes = function(title) {
    const notes = loadNotes();
    const noteToDisplay = notes.find(note => note.title === title);

    if (noteToDisplay === undefined) {
        console.log(chalk.red.inverse('No note found'));
    } else {
        console.log(chalk.bold.white.inverse(title));
        console.log(noteToDisplay.body);
    }
}

const addNotes = function(title, body) {
    const notes = loadNotes();
    const duplicateNotes = notes.find(function(note) {
        return note.title === title;
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added'))
    } else {
        console.log(chalk.red.inverse('Note title taken'));
    }
}

const removeNotes = function(title) {
    const notes = loadNotes();
    const notesToSave = notes.filter(function(note){
        return note.title !== title
    });

    if (notesToSave.length === notes.length) {
        console.log(chalk.red.inverse('No such Note found!'));
    } else {
        saveNotes(notesToSave);
        console.log(chalk.green.inverse('removed sucessfully'));
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const listNotes = function () {
    notes = loadNotes();
    console.log(chalk.white.inverse("Your notes"))
    notes.forEach(note => {
        console.log(note.title);
    });
}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    getNotes: getNotes
}