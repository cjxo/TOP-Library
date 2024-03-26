function Book(author, title, pageCount, hasRead) {
    this.author = author;
    this.title = title;
    this.pageCount = pageCount;
    this.hasRead = hasRead;
}

const myLibrary = [new Book("J.K. Rowling", "Harry Potter and the Chamber of Secrets", 251, false)];
const contentDiv = document.querySelector(".content");

const dialog = document.querySelector("dialog");
const authorName = document.getElementById("author-name");
const bookTitle = document.getElementById("book-title");
const pageCount = document.getElementById("page-count");
const hasRead = document.getElementById("read");
const cancelButton = document.querySelector(".cancel-button");
let isCancelled = false;

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function resetAddButton() {
    const temp = contentDiv.querySelector("button");
    if (temp !== null) {
        temp.remove();
    }

    const addButton = document.createElement("button");
    addButton.setAttribute("class", "add-card");
    
    const svgImage = document.createElement("img");
    svgImage.setAttribute("src", "./assets/svg/plus-box-outline.svg");
    svgImage.setAttribute("alt", "add-icon");
    addButton.appendChild(svgImage);

    contentDiv.appendChild(addButton);

    addButton.addEventListener("click", event => {
        dialog.showModal();
    });

    contentDiv.appendChild(addButton);
}

function addNewBook() {
    const divCard = document.createElement("div");
    divCard.setAttribute("class", "card");
    const title = document.createElement("div");
    title.textContent = `Title: ${bookTitle.value}`;

    const author = document.createElement("div");
    author.textContent = `Author: ${authorName.value}`;

    const pages = document.createElement("div");
    pages.textContent = `Pages: ${pageCount.value}`;
       
    const hasReadDiv = document.createElement("div");
    hasReadDiv.setAttribute("class", "has-read");

    const readLabel = document.createElement("label");
    readLabel.textContent = "Has Read?:";
    readLabel.setAttribute("for", "book-read");

    const read = document.createElement("input");
    read.setAttribute("type", "checkbox");
    read.setAttribute("id", "book-read");
    read.checked = hasRead.checked;

    hasReadDiv.append(readLabel, read);

    divCard.append(title, author, pages, hasReadDiv);
    contentDiv.append(divCard);

    document.querySelector("form").reset();

    resetAddButton();

    const newBook = new Book(authorName.value, bookTitle.value, pageCount.value, hasRead.checked);
    addBookToLibrary(newBook);
}

dialog.addEventListener("cancel", event => {
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
        addNewBook();
    }
})

resetAddButton();