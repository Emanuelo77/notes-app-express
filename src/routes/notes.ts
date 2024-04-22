import { Request, Response, Router } from 'express'
import { getNotes, getNoteById, addNote, updateNote, deleteNoteById } from '../services/data'
import { Note } from '../types/notes'
import { hasAuthentiction } from '../middelware/auth'


export const notesRouter = Router()
/**
 * @route POST /Notes - Endpoint to add a new note.
 * @middelware hasAuthentication - The method requaiert authentication.
 * @description Creates a new note with the given title, content, and usr from the reqest body.
 * @param {Request} req - The request object contaning title, content and user.
 * @param {Respone} res -The response object.
 * @return {void}  Responds with a HTTP 204 No Content status upon successful addition of the note.
 */

notesRouter.post('/', hasAuthentiction, (req: Request, res: Response) => {

  const title: string = req.body.title
  const content: string = req.body.content
  const user: string = req.body.user

  addNote(title, content, user)

  res.status(204).send()
})
/**
 * @route GET /Notes - Endpoint for retrieving notes.
 * @middelware hasAuthentication - The method requaiert authentication.
 * @description Retrieves notes for the authenticated user.
 * @param {Request} req - The request object containing information about the HTTP request, such as headers, query parameters, and request body.
 * @param {Response} res - The response object representing the HTTP response that will be sent back to the client. It contains methods for setting the status code, headers, and sending the response body.
 * @return {void} - Specifies that the function does not return any value. It indicates that the function is expected to perform some actions or operations but does not produce any output or result.

 */

notesRouter.get('/', hasAuthentiction, (req: Request, res: Response) => {
  const user = req.headers.authorization!

  const notes: Note[] = getNotes().filter(note => note.user === user)

  res.status(200).send(notes)
})

/**
 * @route GET /notes/:id - Endpoint to retrieve a specific note by ID associated with the authenticated user.
 * @middleware hasAuthentication - The method requires authentication.
 * @description Retrieves a note by its ID belonging to the authenticated user.
 * @param {Request} req - The request object containing the note ID as a parameter.
 * @param {Response} res - The response object.
 * @return {void} Responds with a HTTP 200 OK status and the requested note if found, or a HTTP 404 Not
*/
/**
 * @route PUT /notes/:id - Endpoint to update a note by ID.
 * @middleware hasAuthentication - Requires authentication for access.
 * @description Updates a note with the specified ID, replacing its title, content, and user.
 * @param {Request} req - The request object containing the updated note details in the request body 
 * and the note ID in the route parameters.
 * @param {Response} res - The response object.
 * @returns {void} Responds with an HTTP 204 No Content status upon successful
**/

notesRouter.put('/:id', hasAuthentiction, (req: Request, res: Response) => { 


 
  const title: string = req.body.title
  const content: string = req.body.content
  const user: string = req.body.user
  const id: number = parseInt(req.params.id)
  const oldNote: Note | undefined = getNoteById(id)

  if (oldNote === undefined) {
    res.status(404).send(`Die Notiz mit ID ${id} wurde nicht gefunden.`)
    return
  }

  updateNote(id, title, content, user)

  res.status(204).send()
})

/**
 * @route PATCH /notes/:id - Endpoint to partially update a note by its ID.
 * @middleware hasAuthentication - Requires authentication for access.
 * @description Partially updates a note with the specified ID, allowing modifications to its title, content, or user.
 * @param {Request} req - The request object containing the updated note details in the request body 
 * and the note ID in the route parameters.
 * @param {Response} res - The response object.
 * @returns {void} Responds with an HTTP
**/
notesRouter.patch('/:id', hasAuthentiction, (req: Request, res: Response) => {

  const id: number = parseInt(req.params.id)
  const oldNote: Note | undefined = getNoteById(id)

  if (oldNote === undefined) {
    res.status(404).send(`Die Notiz mit ID ${id} wurde nicht gefunden.`)
    return
  }

  const title: string = req.body.title ?? oldNote.title
  const content: string = req.body.content ?? oldNote.content
  const user: string = req.body.user ?? oldNote.user

  updateNote(id, title, content, user)

  res.status(204).send()
 })
/**
 * @route PATCH /notes/:id - Endpoint to partially update a note by its ID.
 * @middleware hasAuthentication - Requires authentication for access.
 * @description Partially updates a note with the specified ID, allowing modifications to its title, content, or user.
 * @param {Request} req - The request object containing the updated note details in the request body 
 * and the note ID in the route parameters.
 * @param {Response} res - The response object.
 * @returns {void} Responds with an HTTP
**/

notesRouter.delete('/:id', hasAuthentiction, (req: Request, res: Response) => { 

  const id: number = parseInt(req.params.id)
  const oldNote: Note | undefined = getNoteById(id)

  if (oldNote === undefined) {
    res.status(404).send(`Die Notiz mit ID ${id} wurde nicht gefunden.`)
    return
  }

  deleteNoteById(id)

  res.status(204).send()
})