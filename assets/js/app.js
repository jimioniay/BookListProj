class Book {
    constructor(author, title, isbn) {
        this.author = author;
        this.title = title;
        this.isbn = isbn;
    }
}

class UI {
    
   displayBook(book){
       const bookList = document.querySelector("#book-list");
       const tr = document.createElement("tr");
       let innerHTML = `
                            <th scope="row"></th>
                            <td>${book.author}</td>
                            <td>${book.title}</td>
                            <td>${book.isbn}</td>
       `;
       tr.innerHTML =innerHTML;
       bookList.appendChild(tr);
       return {
           message: `${book.title} has been added succesfully`,
           status: "success"
       };

   }

    displayMessage(message, status){
    const prompt = document.querySelector("#prompt p");
    if (status == "success"){
        prompt.classList.remove("d-none");
        prompt.classList.remove("border-danger","text-danger");
        prompt.classList.add("border-success","text-success");
        prompt.textContent = message;
    }
    else {
        prompt.classList.remove("d-none");
        prompt.classList.remove("border-success","text-success");
        prompt.classList.add("border-danger","text-danger");
        prompt.textContent = message;
    }
    setTimeout(() => {
        prompt.classList.add("d-none");
    }, 2000)
   }
}

document.querySelector("form").addEventListener("submit", submitForm = (e) => {
        //Fetch the Elements from the DOM
        const author = document.querySelector("#author").value;
        const title = document.querySelector("#book-title").value;
        const isbn = document.querySelector("#isbn").value;

        //Instantiate an instance of the Book object by invoking the constructor
        const book = new Book(author, title, isbn);
        console.log(book);

        //Instantiate the UI
        const ui= new UI();
        let resp = (ui.displayBook(book));
        ui.displayMessage(resp.message,resp.status);

        //Prvent default submit on form
        e.preventDefault(); 
});


// const fnEventListener = () => {
//     document.querySelector("form").addEventListener("submit", submitForm);
// }

// const submitForm = (e) => {
//     console.log("got here");
//     e.preventDefault();
// }

// fnEventListener();