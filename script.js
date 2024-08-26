const myLibrary = [];

function Book(title, author, pages, isBookRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isBookRead = isBookRead;
}

function addBookToLibrary(...books) {
    myLibrary.push(...books);
}

function displayBooks() {
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = ''; // Clear the table before displaying books
    myLibrary.forEach((book, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><button class="del-button">Delete</button></td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td class="read-cell">${book.isBookRead ? "Yes" : "No"}</td>
            <td><button class="toggle-button">${book.isBookRead ? "No" : "Yes"}</button></td>
        `;
        row.querySelector(".del-button").addEventListener("click", () => deleteBook(index));
        row.querySelector(".toggle-button").addEventListener("click", () => toggleReadStatus(book, row));
        tableBody.appendChild(row);
    });
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    displayBooks(); // Re-display books after deletion
}

function toggleReadStatus(book, row) {
    book.isBookRead = !book.isBookRead;
    row.querySelector(".read-cell").textContent = book.isBookRead ? "Yes" : "No";
    row.querySelector(".toggle-button").textContent = book.isBookRead ? "No" : "Yes";
}

// Add some initial books
addBookToLibrary(
    new Book("To Kill A Mocking Bird", "Harper Lee", 336, true),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false),
    new Book("Pride and Prejudice", "Jane Austen", 279, false)
);

displayBooks();

// Handle form submission
document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newBook = new Book(
        formData.get("title"),
        formData.get("author"),
        formData.get("pages"),
        formData.get("completion-status") === "read"
    );
    addBookToLibrary(newBook);
    displayBooks();
    event.target.reset();

    // Close the modal after submitting the form
    document.querySelector('dialog.modal').close();
});

// Handle form show/hide
document.querySelector('button.add-book').addEventListener('click', () => {
    document.querySelector('dialog.modal').showModal();
});

document.querySelector('button.cancel').addEventListener('click', () => {
    document.querySelector('dialog.modal').close();
});
