const mongoose = require('mongoose');

require ('../models/Note');

const Note = mongoose.model('Note');

module.exports.setUpConnection = function setUpConnection() {
  mongoose.connect('mongodb://localhost/myNotes')
}

module.exports.listNotes = function listNotes(){
  return Note.find();
}

module.exports.createNote = function createNote(data){
  const note = new Note({
    title: data.title,
    text: data.text,
    color: data.color,
    createdAt: new Date()
  });
  return note.save();
}

module.exports.deleteNote = function deleteNote(id) {
  return Note.findById(id).remove();
}