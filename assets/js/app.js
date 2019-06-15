
class Book {
    constructor(author, title, isbn, id) {
        this.id = this.getID();
        this.author = author;
        this.title = title;
        this.isbn = isbn;
    }

    localStorageKey = "books";

    getID() {
        let max = 0;
        if (localStorage.getItem(this.localStorageKey) === null) {
            return max = 1;
        }
        else {
            const arr = JSON.parse(localStorage.getItem(this.localStorageKey));
            for(let i=0; i <arr.length; i++){
                let tempMax = arr[i].id ;
                if (tempMax > max ){
                    max = tempMax;
                }
                else {
                    max = max;
                }
            }
        }
        return max + 1;
    }
}

class UI extends Book {
    localStorageKey = "books";
    displayBook(book) {
        this.addToLocalStorage(book);
        this.renderBooks();
        return {
            message: `${book.title} has been added succesfully`,
            status: "success"
        };
    }

    renderBooks() {
        document.querySelector("#book-list").innerHTML = "";
        let data = this.fetchFromLocalStorage();
        let id = 1;
        data.forEach(item => {
            console.log("inside renderBooks(), item: " + item);
            const bookList = document.querySelector("#book-list");
            const tr = document.createElement("tr");
            let innerHTML = `
                                <th scope="row">${id}</th>
                                <td class= "d-none">${item.id}</td>
                                <td>${item.author}</td>
                                <td>${item.title}</td>
                                <td>${item.isbn}</td>
                                <td class= "ml-4 pl-5"><a class=""><i class="fa fa-trash"></td>
           `;
            tr.innerHTML = innerHTML;
            bookList.appendChild(tr);
            id++;
        });

        if (!(document.querySelector("#author").value === null || document.querySelector("#author").value === "")) {
            document.querySelector("#author").value = "";
        }
        if (!(document.querySelector("#book-title").value === null || document.querySelector("#book-title").value === "")) {
            document.querySelector("#book-title").value = "";
        }
        if (!(document.querySelector("#isbn").value === null || document.querySelector("#isbn").value === "")) {
            document.querySelector("#isbn").value = "";
        }
    }
    displayMessage(message, status) {
        const prompt = document.querySelector("#prompt p");
        if (status == "success") {
            prompt.classList.remove("d-none");
            prompt.classList.remove("border-danger", "text-danger");
            prompt.classList.add("border-success", "text-success");
            prompt.textContent = message;
        }
        else {
            prompt.classList.remove("d-none");
            prompt.classList.remove("border-success", "text-success");
            prompt.classList.add("border-danger", "text-danger");
            prompt.textContent = message;
        }
        setTimeout(() => {
            prompt.classList.add("d-none");
        }, 2000);
    }
    // clearInputFields() {
    //     const emptyString = "";
    //     document.querySelector("#author") = emptyString;
    //     document.querySelector("#isbn") = emptyString;
    //     document.querySelector("#book-title") = emptyString;
    // }

    fetchFromLocalStorage(key = this.localStorageKey) {
        let lsData;
        console.log("key: " + key);
        if (localStorage.getItem(key) === null) {
            lsData = [];
        }
        else {
            lsData = JSON.parse(localStorage.getItem(key));
        }
        return lsData;
    }

    addToLocalStorage(addData) {
        let data = this.fetchFromLocalStorage(this.localStorageKey);
        data.push(addData);
        localStorage.setItem(this.localStorageKey, (JSON.stringify(data)));
    }

    deleteFromLocalStorage(id) {
        console.log("inside deleteFromLS...");
        let data = this.fetchFromLocalStorage(this.localStorageKey);
        data.forEach((item, index) => {
            console.log(parseInt(id) + "    --> " + item.id)
            if (parseInt(id) === item.id) {
                console.log(`
                            id: ${id}
                            item: ${item}
                            item.id ${item.id}
                            index: ${index}
                `);
                if(confirm(`Are you sure you want to delete ${item.title} by ${item.author} ? `)){
                    data.splice(index, 1);
                }
                console.log(data);
                localStorage.setItem(this.localStorageKey, JSON.stringify(data));
                this.renderBooks();
            }
            else {
                console.log("why am i here???????!");
            }
        });
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const ui = new UI();
    ui.renderBooks();
});


document.querySelector("form").addEventListener("submit", submitForm = (e) => {
    //Fetch the Elements from the DOM
    const author = document.querySelector("#author").value;
    const title = document.querySelector("#book-title").value;
    const isbn = document.querySelector("#isbn").value;

    //Instantiate an instance of the Book object by invoking the constructor
    const book = new Book(author, title, isbn);
    console.log(book);

    //Instantiate the UI
    const ui = new UI();
    if (author === "" || title === "" || isbn === "") {
        let message = "Please input all fields";
        let status = "failed";
        ui.displayMessage(message, status);
    }
    else {
        let resp = (ui.displayBook(book));
        ui.displayMessage(resp.message, resp.status);
        // book.clearInputFields();
    }

    //Prvent default submit on form
    e.preventDefault();
});

document.querySelector("#book-list").addEventListener("click", deleteBook = (e) => {
    if (e.target.className === "fa fa-trash") {
        let targetID = e.target.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.textContent;
        const ui = new UI();
        ui.deleteFromLocalStorage(targetID);
    }
});