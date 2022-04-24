import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/note'; 

describe('class tests', () => {
    let notas = new Note()
    
    it('Note is created', () => {
        expect(notas).to.not.equal(null);
    });

    it('AddFile is used', () => {
        expect(notas.addFile("hola" , "Nota para decir hola", "green", "Carlos")).to.be.equal(null);
    });
    
    it('ModifyFile is used', () => {
        notas.addFile("adios" , "Nota para decir adios", "orange", "Carlos")
        expect(notas.modifyFile("esta nota es para decir adios", "adios", "Carlos")).to.be.equal(null);
    });
    
    it('ModifyFile is used', () => {
        expect(notas.removeFile("Carlos","adios")).to.be.equal(null);
    });

    it('ListFiles is used', () => {
        expect(notas.listFiles("Carlos")).to.be.equal(null);
    });

})