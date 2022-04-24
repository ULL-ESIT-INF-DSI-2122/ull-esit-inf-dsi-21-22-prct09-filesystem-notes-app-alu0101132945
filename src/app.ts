import {Note} from './note'
import * as yargs from 'yargs'

let note = new Note()

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string',
      },
      body:{
        describe: 'Note body',
        demandOption: true,
        type: 'string',
      },
      color:{
        describe: 'Note color',
        demandOption: true,
        type: 'string',
      },
      autor:{
        describe: 'Note autor',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      if (typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string' && typeof argv.autor === 'string') {
        note.addNote(argv.title,argv.body,argv.color,argv.autor)
      }
    },
  });

  yargs.command({
    command: 'modify',
    describe: 'Modify a note',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string',
      },
      body:{
        describe: 'Note body',
        demandOption: true,
        type: 'string',
      },
      color:{
        describe: 'Note color',
        demandOption: true,
        type: 'string',
      },
      autor:{
        describe: 'Note autor',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      if (typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string' && typeof argv.autor === 'string') {
        note.modifyNote(argv.title,argv.body,argv.color,argv.autor)
      }
    },
  });

  yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string',
      },
      autor:{
        describe: 'Note autor',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      if (typeof argv.title === 'string' && typeof argv.autor === 'string') {
        note.removeNote(argv.title,argv.autor)
      }
    },
  });

  yargs.command({
    command: 'list',
    describe: 'List the notes of a certain user',
    builder: {
      autor:{
        describe: 'Note autor',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      if (typeof argv.autor === 'string') {
        note.listNotes(argv.autor)
      }
    },
  });

  yargs.command({
    command: 'show',
    describe: 'Show a note',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string',
      },
      autor:{
        describe: 'Note autor',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      if (typeof argv.title === 'string'  && typeof argv.autor === 'string') {
        note.showNote(argv.title,argv.autor)
      }
    },
  });

  yargs.parse()