const express = require('express');
const adminModel = require('./models/adminSchema');
const db = require('./configs/database');
const BookModel = require('./models/bookSchema');
const app = express();
const port = 8089;

let bookData = []

let loginAdmin = {
    email: "bhavini@123",
    password: "bhavini@123"
}


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    BookModel.find({})
      .then((allBooks) => {
        const bestSeller = allBooks.filter(book => book.bestSeller === true);
        
        const newCollection = allBooks.filter(book => book.newCollection === true);
        
        res.render("index", { bestSeller, newCollection });
      })
      .catch((err) => {
        console.error(err);
        res.send("Error fetching books");
      });
  });
  

  app.get("/login", (req, res) => {
    res.render("login", { error: null }); 
  });
  

  app.get("/book", (req, res) => {
    return res.render("book"); 
  });
  

  app.get("/logout", (req, res) => {
    res.redirect("/login"); 
  });
  

  app.get('/book/edit/:id', (req, res) => {
    const { id } = req.params;
    BookModel.findById(id)
      .then((book) => {
        return res.render('edit', { book }); 
      })
      .catch((err) => {
        console.log(err.message);
        return res.render('edit', { book: [] }); 
      });
  });
  

  app.post('/book/edit', (req, res) => {
    const { id, bookname, author, price, imageUrl, bestSeller, newCollection } = req.body;

    BookModel.findByIdAndUpdate(id, {
        bookname,
        author,
        price,
        imageUrl,
        bestSeller: bestSeller ? "Yes" : "No",
        newCollection: newCollection ? "Yes" : "No"
    })
    .then(() => {
        return res.redirect('/data'); 
    })
    .catch((err) => {
        console.log(err.message);
        return res.redirect('/data'); 
    });
});

  

  app.get("/data", (req, res) => {
    BookModel.find({})
      .then((books) => {
        res.render("data", { books }); 
      })
      .catch((err) => {
        console.log(err.message);
        res.render("data", { books: [] }); 
      });
});

  

  app.get('/book/delete/:id', (req, res) => {
    const { id } = req.params;
  
    BookModel.findByIdAndDelete(id)
      .then(() => {
        return res.redirect(req.get("Referrer") || '/data'); 
      })
      .catch((err) => {
        console.log(err.message);
        return res.redirect(req.get("Referrer") || '/data'); 
      });
  });
  

  app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if ( email === loginAdmin.email && password === loginAdmin.password) {
      return res.render("book"); 
    } else {
      res.render("login"); 
    }
  });
  

  app.post("/addbook", (req, res) => {

    req.body.bestSeller = req.body.bestSeller ? true : false;
    req.body.newCollection = req.body.newCollection ? true : false;

    BookModel.create(req.body)
        .then((data) => {
            res.redirect("book");
        })
        .catch((err) => {
            console.log("Error adding book:", err.message);
            res.render("book");
        });
});


app.listen(port, (err) => {
    if (!err) {

        console.log("Server stared on");
        console.log("http://localhost:" + port);
    }
})