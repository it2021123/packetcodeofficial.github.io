const express = require('express');
const sqlite3=require('sqlite3').verbose();
const db=new sqlite3.Database('Books.db');

const app = express();


// Καταχώρηση ενός νέου βιβλίου
app.post('/books', (req, res) => {
  const book = req.body;

  db.run(
    'INSERT INTO BOOKS (author, title, genre, price) VALUES (${book.author},${book.title},${book.genre},${book.price})',
    function (err) {
      if (err) {
        console.error('Σφάλμα κατά την εισαγωγή του βιβλίου:', err);
        res.status(500).json({ error: 'Σφάλμα κατά την εισαγωγή του βιβλίου' });
      } else {
        res.send('Το βιβλίο καταχωρήθηκε με επιτυχία');
      }
    }
  );
});
// Ροή αναζήτησης βιβλίων με βάση τον τίτλο
app.get('/books/:keyword', (req, res) => {
  try {
    const keyword = req.params.keyword;

    db.all(
      'SELECT * FROM BOOKS WHERE title=${keyword} OR author=${keyword} OR genre=${keyword} OR price=${keyword}', 
      (err, rows) => {
        if (err) {
          console.error('Failed to search for books', err);
          res.status(500).send('Failed to search for books');
        } else {
          res.status(200).json(rows);
        }
      }
    );
  } catch (err) {
    console.error('Failed to search for books', err);
    res.status(500).send('Failed to search for books');
    }});
app.listen(5500);
