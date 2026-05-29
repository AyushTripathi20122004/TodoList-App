// stop form submittion reloade
const form=document.querySelector('#form')
form.addEventListener("submit",(event)=>{
    event.preventDefault()
})



let NoteCreatePage=document.querySelector('.NotesCreate')
let CreateButton=document.querySelector('.CreateButton')

CreateButton.addEventListener('click',()=>{
    NoteCreatePage.style.display='flex'
    CreateButton.style.display="none"
})

let PageCancel=document.querySelector('.PageCancel')
PageCancel.addEventListener('click',()=>{
    NoteCreatePage.style.display='none';
    CreateButton.style.display="block"
})

let NotesCollector = document.querySelector('.NotesCollector');
let notes=[];

function SubmitForm() {

    let Title = document.querySelector('#Title').value;
    let text = document.querySelector('#Text').value;

    const note={
        title:Title,
        text:text
    }
    notes.push(note);

    // save in localstorage

    localStorage.setItem('notes',JSON.stringify(notes));

    DisplayNotes();
    Title.innerHTML="";
    text.innerHTML="";
    
    CreateButton.style.display="block"
    NoteCreatePage.style.display='none';
}

// when we reload the website the cards did'nt disaprears
window.addEventListener('DOMContentLoaded',()=>{
    const storedNotes=JSON.parse(localStorage.getItem('notes'));
    if(storedNotes){
        notes=storedNotes
        DisplayNotes();
    }
})

// creat card and insert in notesCollector section
function DisplayNotes(){
    NotesCollector.innerHTML="";
    notes.forEach((note,index)=>{
        const div = document.createElement('div');
        div.classList.add('card');

        div.innerHTML = `
        <div class="h-[15rem] w-[20rem] relative p-6 bg-black/5 flex flex-col gap-2 rounded-xl border border-black/10">
            <div class="flex justify-end w-full absolute top-[4px] right-[4px]">
                <button class="notesCancel">
                    <i class="bi bi-x-circle text-xl text-gray-500 font-semibold"></i>
                </button>
            </div> 
            <h1 class="text-2xl uppercase font-semibold text-transparent bg-clip-text bg-gradient-to-br from-red-700 to-blue-700">
                ${note.title}
            </h1>
            <p class="text-s font-medium">
                ${note.text}
            </p>
        </div>
    `;

    
    // delete button
        const notesCancel = div.querySelector('.notesCancel');

        notesCancel.addEventListener('click', () => {

            notes.splice(index, 1);

            localStorage.setItem('notes', JSON.stringify(notes));

            DisplayNotes();

        });

    NotesCollector.appendChild(div);

    })
    
}


