import * as fs from 'node:fs'
import { Note } from '../types/notes'

/**
 * The type  to extract the raw data structure of notes data, containing an array of notes,
 * to extract the notes from the JSON object.
 *  */
type NotesRaw = {
  notes: Note[]
}

/**
 * Reads all note from the JSON file and returns them as an array of Note objects.
 * @returns {Note[]} Array of notes retieved from the file.
  */
export function getNotes(): Note[] {
  const notesRaw = fs.readFileSync('data/notes.json', 'utf8')
  const notizen = JSON.parse(notesRaw) as NotesRaw
  const array = notizen.notes
  return array
}
/**
 * Retrieves a singel note by its ID.
 * @param {number} id -The unque identifier of the note be retrieved. 
 * @returns {Note | undefined} The note retrieved, or undefined if no note with the specified ID was found.
 */
export function getNoteById(id: number): Note | undefined {
  const notes = getNotes() 
  const note = notes.find(note => note.id === id)
  return note
}
/**
 * Writes notes to a file in JSON format.
 * @param { Note []} oldNotes - An array of notes to be written to the file.
 */
export function writeNotesToFile(oldNotes: Note[]): void { 
  const newNotes: NotesRaw = { notes: oldNotes }
  fs.writeFileSync('data/notes.json', JSON.stringify(newNotes))
}


/**
 * Adds a new note with the given title, content, and user to the list of notes.
 *  then writes the updated list to a JSON file.
 * @param {string} title title The title of the new note.
 * @param {string} content content The content of the new note.
 * @param {string} user user The user adding the note.
 */

export function addNote(title: string, content: string, user: string): void {
  const oldNotes = getNotes()
  const id = oldNotes.length + 1
  const newNote: Note = new Note(id, title, content, user)
  oldNotes.push(newNote)
  writeNotesToFile(oldNotes)
}
/**
 * Updates an existing note with the specified ID by replacing its title, content, and user,
 * @param {number} id The ID of the note to update.
 * @param {string} title title The new title of the note.
 * @param {string} content content The new content of the note.
 * @param {string} user The user updating the note.
 */

export function updateNote(id: number, title: string, content: string, user: string): void {
  const oldNotes = getNotes()
  const filteredNotes = oldNotes.filter(note => note.id !== id)
  const newNote: Note = new Note(id, title, content, user)
  filteredNotes.push(newNote)
  writeNotesToFile(filteredNotes)
}
/**
 * Deletes the note with the specified ID from the list of notes,
 * then writes the updated list to a JSON file.
 * @param {number} id  The ID of the note to delete.
 */
export function deleteNoteById(id: number): void {
  const oldNotes = getNotes()
  const filteredNotes = oldNotes.filter(note => note.id !== id)
  writeNotesToFile(filteredNotes)
}