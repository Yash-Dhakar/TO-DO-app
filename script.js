const addButton = document.querySelector('#add');

// function which to used to save the data in the form of an array
const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = []; // initialize the array
    console.log(textAreaData);
    // print the array
    textAreaData.forEach((note) => {
        return notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));

}

const addNewNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i> </button>
        <button class="delete"> <i class="fas fa-trash-alt"></i> </button>
    </div>
    <div class="main ${text ? "": "hidden" }"> </div>
    <textarea class="${text ? "hidden": "" }"></textarea> `;

    note.insertAdjacentHTML('afterbegin', htmlData); // for adding html into javascript
    // console.log(note);

    // getting the refernences
    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    // deleting the node
    delButton.addEventListener('click', () => {
        note.remove();
        updateLSData();
    });

    // toggle using edit button
    textArea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        // console.log(value);
        mainDiv.innerHTML = value;
        updateLSData();
    });

    document.body.appendChild(note); // print the js html code to screen
}

// getting data back from local storage
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach((note) => addNewNote(note));
}

addButton.addEventListener('click', () => addNewNote() );