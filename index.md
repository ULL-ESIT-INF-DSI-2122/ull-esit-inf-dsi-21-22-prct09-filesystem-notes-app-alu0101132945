# Práctica 9 - Aplicación de procesamiento de notas de texto

En esta práctica, tendrá que implementar una aplicación de procesamiento de notas de texto. En concreto, la misma permitirá añadir, modificar, eliminar, listar y leer notas de un usuario concreto. Las notas se almacenarán como ficheros JSON en el sistema de ficheros de la máquina que ejecute la aplicación. Además, solo se podrá interactuar con la aplicación desde la línea de comandos.

Los requisitos que debe cumplir la aplicación de procesamiento de notas de texto son los siguientes:

1. La aplicación de notas deberá permitir que múltiples usuarios interactúen con ella, pero no simultáneamente. Para poder hacer esto se añade un parametro mas a los metodos que guarda el autor de las notas y lo que hace es crearle un subdirectorio dentro de la carpeta notes que guardara sus notas.

2. Una nota estará formada, como mínimo, por un título, un cuerpo y un color (rojo, verde, azul o amarillo). Cuándo se crea una nota el método recibe estos tres parámetros básicos y los incorpora al json de la nota en el directorio.

3. Cada usuario tendrá su propia lista de notas, con la que podrá llevar a cabo las siguientes operaciones:

* Añadir una nota a la lista. Antes de añadir una nota a la lista se debe comprobar si ya existe una nota con el mismo título. En caso de que así fuera, deberá mostrarse un mensaje de error por la consola. En caso contrario, se añadirá la nueva nota a la lista y se mostrará un mensaje informativo por la consola. Este método utilizando el paquete fs de node.js y el paquete path comprueba que la ruta donde se va a crear la nota existe y si no existe(porque es la primera vez que el usuario usa el comando) la crea en el momento. Despúes de esto, se crea el fichero json con el titulo de la nota y se le añade el mensaje(cuerpo) y el color con el que se vera esa nota.

* Modificar una nota de la lista. Antes de modificar una nota, previamente se debe comprobar que exista una nota con el título de la nota a modificar en la lista. Si existe, se procede a su modificación y se emite un mensaje informativo por la consola. En caso contrario, debe mostrarse un mensaje de error por la consola. Este método es similar al de añadir, pero aqui comprueba si existe la nota y si existe cambia el mensaje y el color si así lo desea el usuario.

* Eliminar una nota de la lista. Antes de eliminar una nota, previamente se debe comprobar que exista una nota con el título de la nota a eliminar en la lista. Si existe, se procede a su eliminación y se emite un mensaje informativo por la consola. En caso contrario, debe mostrarse un mensaje de error por la consola. En este metodo una vez comprobado que la nota existe se debe proceder a borrarla del directorio del autor.

* Listar los títulos de las notas de la lista. Los títulos de las notas deben mostrarse por la consola con el color correspondiente de cada una de ellas. Use el paquete chalk para ello. Para esto simplemente se debe leer la informacion del directorio de un usuario indicado(si existe) y despúes indicar los nombres de las notas usando el color de la nota.

* Leer una nota concreta de la lista. Antes de mostrar el título y el cuerpo de la nota que se quiere leer, se debe comprobar que en la lista existe una nota cuyo título sea el de la nota a leer. Si existe, se mostrará el título y cuerpo de la nota por la consola con el color correspondiente de la nota. Para ello, use el paquete `chalk`. En caso contrario, se mostrará un mensaje de error por la consola. En este caso se buscara en la ruta del autor si existe una nota y si existe, mostrar el mensaje en el color indicado por el json.

```typescript
class Note{
    constructor(){}
    
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

    removeNote(autor:string,title:string){
        title = title + '.json'
        let pathToRm = path.join('notes',autor, title)
        fs.unlink(pathToRm,(err)=>{
            if(err) throw err
            console.log(chalk.default.red('El fichero ha sido borrado con exito'))
        })
    }

    listNotes(autor:string){
        let pathToList = path.join('notes',autor)
        const notes = fs.readdirSync(pathToList,{withFileTypes:false})
        notes.forEach(note => {
            console.log(chalk.default.note['color'](note['title']))
        });
    }

    showNote(autor:string, title:string){
        title = title + '.json'
        let pathToShow = path.join('notes',autor,title)
        const note = fs.readFileSync(pathToShow)
        console.log(chalk.default.note['color'].inverse(note['body']))
    }
}
```

4. Un usuario solo puede interactuar con la aplicación de procesamiento de notas de texto a través de la línea de comandos. Los diferentes comandos, opciones de los mismos, así como manejadores asociados a cada uno de ellos deben gestionarse mediante el uso del paquete `yargs`. Para este paso usamos otro fichero llamado _app.ts_ que importa la clase note y lo que hace es utilizando `yargs` para crear los comandos utiliza los metodos indicados arriba para manejar las notas.

```typescript
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
```