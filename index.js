function Book(author, title, pageCount, hasRead) {
    this.author = author;
    this.title = title;
    this.pageCount = pageCount;
    this.hasRead = hasRead;
}

const myLibrary = [];
const contentDiv = document.querySelector(".content");

const dialog = document.querySelector("dialog");
const authorName = document.getElementById("author-name");
const bookTitle = document.getElementById("book-title");
const pageCount = document.getElementById("page-count");
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
        };

        let indexToRemove = myLibrary.find(isEqualToBook);
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
}

dialog.addEventListener("cancel", event => {
    document.querySelector("form").reset();
    isCancelled = true;
});

cancelButton.addEventListener("click", event => {
    isCancelled = true;
    dialog.close();
})

dialog.addEventListener("close", event => {
    if (isCancelled) {
        isCancelled = false;
    } else {
        addBookToLibrary(authorName.value, bookTitle.value, pageCount.value, hasRead.checked);
    }
})

addBookToLibrary("J.K. Rowling", "Harry Potter and the Chamber of Secrets", 251, false);