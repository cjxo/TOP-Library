class Book {
    constructor(author, title, pageCount, hasRead) {
        this.author = author;
        this.title = title;
        this.pageCount = pageCount;
        this.hasRead = hasRead;
    }

    toggleHasRead() {
        this.hasRead = !this.hasRead;
    }
}

const myLibrary = [];
const contentDiv = document.querySelector(".content");

const form = document.querySelector("form");
const dialog = document.querySelector("dialog");

const authorName = document.getElementById("author-name");
const bookTitle = document.getElementById("book-title");

const pageCount = document.getElementById("page-count");
const pageCountError = document.querySelector("#page-count + .error");

const hasRead = document.getElementById("read");
const cancelButton = document.querySelector(".cancel-button");
let isCancelled = false;

function resetAddButton() {
    const temp = contentDiv.querySelector(".content > button");
    if (temp !== null) {
        temp.remove();
    }

    const buttonAdd = document.createElement("button");
    buttonAdd.setAttribute("class", "add-card");
    
    const imgSvg = document.createElement("img");
    imgSvg.setAttribute("src", "./assets/svg/plus-box-outline.svg");
    imgSvg.setAttribute("alt", "add-icon");
    buttonAdd.appendChild(imgSvg);

    contentDiv.appendChild(buttonAdd);

    buttonAdd.addEventListener("click", event => {
        dialog.showModal();
    });

    contentDiv.appendChild(buttonAdd);
}

function addBookToLibrary(author, title, pageCount, hasRead) {
    const divCard = document.createElement("div");

    const buttonRemoveBook = document.createElement("button");
    buttonRemoveBook.setAttribute("class", "delete-card-button");
    const imgForbuttonRemoveBook = document.createElement("img");
    imgForbuttonRemoveBook.setAttribute("src", "./assets/svg/trash-can-outline.svg");
    imgForbuttonRemoveBook.setAttribute("alt", "trash-icon");
    buttonRemoveBook.appendChild(imgForbuttonRemoveBook);

    buttonRemoveBook.addEventListener("click", event => {
        const isEqualToBook = book => {
            let result = (book.author === author) &&
                         (book.title === title) &&
                         (book.pageCount === pageCount) &&
                         (book.hasRead === hasRead);
            return result;
        };

        const indexToRemove = myLibrary.find(isEqualToBook);
        myLibrary.splice(indexToRemove, 1);
        
        divCard.remove();
    })

    divCard.setAttribute("class", "card");
    const divTitle = document.createElement("div");
    divTitle.textContent = `Title: ${title}`;

    const divAuthor = document.createElement("div");
    divAuthor.textContent = `Author: ${author}`;

    const divPages = document.createElement("div");
    divPages.textContent = `Pages: ${pageCount}`;
       
    const divHasRead = document.createElement("div");
    divHasRead.setAttribute("class", "has-read");

    const labelRead = document.createElement("label");
    labelRead.textContent = "Has Read?:";
    labelRead.setAttribute("for", "book-read");

    const inputHasRead = document.createElement("input");
    inputHasRead.setAttribute("type", "checkbox");
    inputHasRead.setAttribute("id", "book-read");
    inputHasRead.checked = hasRead;

    divHasRead.append(labelRead, inputHasRead);

    divCard.append(buttonRemoveBook, divTitle, divAuthor, divPages, divHasRead);
    contentDiv.append(divCard);

    document.querySelector("form").reset();

    resetAddButton();

    const newBook = new Book(author, title, pageCount, hasRead);
    myLibrary.push(newBook);

    inputHasRead.addEventListener("click", () => {
        newBook.toggleHasRead();
    });
}

function showError(errorFor, errorDiv) {
    if (errorFor.validity.valueMissing) {
        errorDiv.textContent = "You need to add a value to this field.";
    } else if (errorFor.validity.typeMismatch) {
        errorDiv.textContent = "You need to enter a number to this field.";
    }
}

function formIsValid() {
    return bookTitle.validity.valid && authorName.validity.valid && pageCount.validity.valid;
}

[bookTitle, authorName, pageCount].forEach(errorFor => {
    errorFor.addEventListener("input", event => {
        const errorDiv = document.querySelector("#" + errorFor.getAttribute("id") + " + .error");
        if (errorFor.validity.valid) {
            errorDiv.textContent = "";
            errorDiv.setAttribute("class", "error");
        } else {
            showError(errorFor, errorDiv);
            errorDiv.setAttribute("class", "error active");
        }
    });
});

dialog.addEventListener("cancel", event => {
    document.querySelector("form").reset();
});

cancelButton.addEventListener("click", event => {
    document.querySelector("form").reset();
    dialog.close();
});

form.addEventListener("submit", event => {
    if (formIsValid()) {
        dialog.close();
        addBookToLibrary(authorName.value, bookTitle.value, pageCount.value, hasRead.checked);
        document.querySelector("form").reset();
    }
    event.preventDefault();
});

addBookToLibrary("J.K. Rowling", "Harry Potter and the Chamber of Secrets", 251, false);