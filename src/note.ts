import * as fs from 'fs'
const chalk = require('chalk')
const path = require('path')

export class Note{
    /**
     * constructor de la clase Note, al ser una clase que trabaja con ficheros el constructor esta vacio
     */
    constructor(){}

    /**
     * este metodo crea una nota
     * @param title titulo de la nota
     * @param body mensaje
     * @param color color de la nota
     * @param autor creador de la nota
     */
    addNote(title:string,body:string,color:string,autor:string){
        let pathToAdd = path.join('notes',autor)
        fs.mkdirSync(pathToAdd,{recursive:true})
        title = title + '.json'
        pathToAdd = path.join(pathToAdd, title)
        let inf = {
            body: body,
            color: color
        };
        let data = JSON.stringify(inf)
        fs.writeFile(pathToAdd,data,(err) =>{
            if(err){
                console.log(chalk.default.red('Error al crear el fichero'))
                return
            }
            throw err
            
        })
        console.log(chalk.default.green("Nota creada con exito"))
    }   

    /**
     * este metodo modifica una nota existente
     * @param body nuevo mensaje de la nota
     * @param color nuevo color
     * @param title titulo de la nota a modificar
     * @param autor autor de la nota
     */
    modifyNote(body:string,color:string,title:string,autor:string){
        title = title + '.json'
        let pathToMod = path.join('notes',autor, title)
        let inf = {
            body: body,
            color: color
        }
        let data = JSON.stringify(inf)
        fs.writeFile(pathToMod,data,(err) =>{
            if(err){
                console.log(chalk.default.red('Error al modificar el fichero'))
                return
            }
            throw err
            
        })
        console.log(chalk.default.green("Nota modificada con exito"))
    }

    /**
     * este metodo borra una nota
     * @param autor autor de la nota a borrar
     * @param title titulo de la nota que se quiere borrar
     */
    removeNote(autor:string,title:string){
        title = title + '.json'
        let pathToRm = path.join('notes',autor, title)
        fs.unlink(pathToRm,(err)=>{
            if(err) throw err
            console.log(chalk.default.red('El fichero ha sido borrado con exito'))
        })
    }

    /**
     * este metodo lista todas los notas de un autor
     * @param autor autor de las notas
     */
    listNotes(autor:string){
        let pathToList = path.join('notes',autor)
        const notes = fs.readdirSync(pathToList,{withFileTypes:false})
        notes.forEach(note => {
            console.log(chalk.default.note['color'](note['title']))
        });
    }

    /**
     * este metodo muestra una nota
     * @param autor autor de la nota a mostrar
     * @param title titulo de la nota a mostrar
     */
    showNote(autor:string, title:string){
        title = title + '.json'
        let pathToShow = path.join('notes',autor,title)
        const note = fs.readFileSync(pathToShow)
        console.log(chalk.default.note['color'].inverse(note['body']))
    }
}