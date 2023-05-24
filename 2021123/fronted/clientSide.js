class Book {
  constructor(title, author, genre, price) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.price = price;
  }
}

  //πρεπει να περιμενω το form και το sform να μην ειναι null στο  αρχειο DOM
  window.onload = function () {
  const form = document.getElementById("formb");
  if (form !== null) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const titlei = document.getElementById("title").value;
      const authori = document.getElementById("author").value;
      const genrei = document.getElementById("genre").value;
      const pricei = parseFloat(document.getElementById("price").value);

      // Έλεγχος για έγκυρη τιμή της τιμής (price)
      if (isNaN(pricei) || titlei === "" || authori === "" || genrei === "" || pricei === "") {
        alert("Παρακαλώ εισάγετε μία έγκυρη τιμή για την τιμή");
        return;
      }

      // Δημιουργία αντικειμένου Book
      const book = new Book(titlei, authori, genrei, pricei);

      // Αποστολή των δεδομένων στον server (backend)
      fetch("http://127.0.0.1:5500/2021123/fronted/books/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
      })
        .then(response => response.text())
        .then(data => {
          console.log(data);
          })
        .catch(error => {
          console.error("Σφάλμα:", error);
        });
    });
  }

  const sform = document.getElementById("searchform");
  if (sform !== null) {
    sform.addEventListener('submit', function (event) {
      event.preventDefault();

      const keyword = document.getElementById('search').value;

      fetch("http://127.0.0.1:5500/2021123/fronted/books/{keyword}", {
        method: "GET"
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Η αίτηση απέτυχε');
          }
        })
        .then(data => {
          console.log(data);
          })
        .catch(error => {
          console.error("Σφάλμα:", error);
        });
    });
  }
};