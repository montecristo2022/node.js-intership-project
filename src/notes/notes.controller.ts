import { Controller, Get, Post, Delete, Patch, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get('stats')
  async getStats() {
    return this.notesService.getStats();
  }

  @Post()
  async createNote(@Body() noteData: CreateNoteDto) {
    return this.notesService.createNote(noteData);
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string) {
    const result = await this.notesService.deleteNote(id);
    if (!result) {
      throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
    }
    return { message: `Deleted note with ID: ${id}` };
  }

  @Patch(':id')
  async updateNote(@Param('id') id: string, @Body() updatedData: UpdateNoteDto) {
    return this.notesService.updateNote(id, updatedData);
  }

  @Get(':id')
  async getNoteById(@Param('id') id: string) {
    const note = await this.notesService.getNoteById(id);
    if (!note) {
      throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
    }
    return note;
  }

  @Get()
  async getAllNotes() {
    return this.notesService.getAllNotes();
  }
}
