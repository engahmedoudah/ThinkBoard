const NoteModel = require("../models/noteModel");

exports.getNotes = () => NoteModel.find();
exports.getNote = (id) => NoteModel.findById(id);
exports.createNote = (data) => NoteModel.create(data);
exports.updateNote = (id, data) => NoteModel.findByIdAndUpdate(id, data, { new: true });
exports.deleteNote = (id) => NoteModel.findByIdAndDelete(id);
