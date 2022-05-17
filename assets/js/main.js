/*-------------- Define Global Variables -------------- */

const productsContainer = document.querySelector('.product_text_image');
const companiesContainer = document.querySelector(".companies_companies");
const personsContainer = document.querySelector('.persons_persons');
const booksContainer = document.querySelector('.books_books');

/*--------------  loader Variables -------------- */

const loaderCompanies = document.querySelector('.loader_companies');
const loaderPersons = document.querySelector(".loader_persons");
const loaderBooks = document.querySelector(".loader_books");

/*--------------  Array  Variable -------------- */

let persons = [];

/*--------------  Fetch Api Variables -------------- */

const productsApi = "https://fakerapi.it/api/v1/products?_quantity=1&_taxes=12&_categories_type=uuid";
const companiesApi = "https://fakerapi.it/api/v1/companies?";
const personsApi = "https://fakerapi.it/api/v1/persons?_quantity=20&_gender=male&_birthday_start=2005-01-01";
const booksApi = "https://fakerapi.it/api/v1/books?";

/*--------------------- End Global Variables ------------------ */



// class RanderProducts rander fetch api and building structure productsContainer

class RanderProducts {

    //  fetch api request

    constructor() {}
    static fetchFromAPI() {
        fetch(productsApi)
            .then((response) => response.json())
            .then((data) => RanderProducts.randerProductsData(data));
    }

    static randerProductsData(data) {
        let product = data.data[0];

        // building structure productsContainer

        productsContainer.innerHTML = `
       
         <div class="product_text">
         <div class="product_name">
             <h3 class="product_name_full"> ${product.name} </h3>

         </div>
         <div class="product_price">

             <span> price: ${product.price}</span>
         </div>

         <div class="product_discription button">
             <p>
                 ${product.description}
             </p>
             <button>Get Start</button>
         </div>
        

     </div>
     <div class="product_image">
         <img src="${product.image}"alt=" product photo">
     </div>  
   
         `;
    }
}


// fuction randerCompanies buliding companiesContainer

function randerCompanies(companies) {
    // companies repated
    companies.forEach(company => {
        // bulidyng companiesContainer
        companiesContainer.innerHTML += `
      
       <div class="card">
       <img src="${company.image}" alt="company photo">

       <div class="card_content">
           <h3>Name:${company.name}</h3>
           <span><i class="fa-solid fa-envelope"></i>
           ${company.email}</span>
           <span>
               <i class="fas fa-phone"></i>
               ${company.phone}</span>
           <span class="card_website">Website: <a href="#">  ${company.website}</a></span>
           <span class="card_address">country: ${company.country}</span>


       </div>
  </div>
   `;
    })
}

//function getCompanies fetch api 

function getCompanies() {
    fetch(companiesApi)
        .then(res => res.json())
        .then(data => {
            randerCompanies(data.data)
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {

            loaderCompanies.style.display = "none";

        })
}




//function randerPersons buliding  personsContainer

function randerPersons(persons) {
    personsContainer.innerHTML = "";
    console.log(personsContainer);
    // persons repated
    persons.forEach(person => {
        // buliding structure personsContainer
        personsContainer.innerHTML += `
       <div class="person ">
           <div class="loader"></div>
           <div class="person_head">
               <div class="person_image">
                   <img src="${person.image}" alt="user photo" />
               </div>
           </div>
   
   
   
           <div class="person_name">
   
               <span class="person_name_full">${person.firstname}${person.lastname}</span>
   
           </div>
           <div class="person_type_data">
               <span>gender:${person.gender}</span>
               <span>birthday:${person.birthday}</span>
           </div>
           <div class="person_media">
               <span> 
       <a href="facebook.com"><i class="fa-brands fa-facebook face"></i></a>  
       <a href="linkedin"><i class="fa-brands fa-linkedin linked"></i></a>  
       <a href="google.com"> <i class="fa-brands fa-google goolge"></i></a> 
       </span>
           </div>
   
   
           <div class="person_contact_info">
               <span>
       <i class="fa-solid fa-envelope"></i>
       ${person.email}
       </span>
               <span>
       <i class="fas fa-phone"></i>
       ${person.phone}
       </span>
   
   
           </div>
   
           <div class="person_website">
               <span> 
       website:
       <a href="#">${person.website}</a>
       </span>
           </div>
   
       </div>
       `;
        console.log(person)
    })
}




//show data fetch api persons

function getPersons() {


    fetch(personsApi)
        .then(res => res.json())
        .then(data => {
            persons = data.data;
            randerPersons(persons)
        })
        .catch(error => {
            console.log(error);

        })
        .finally(() => {

            loaderPersons.style.display = "none";




        })

}

// fuction  preventDefault make not reloade



// function randerBooks buliding structure booksContainer and repated book

function randerBooks(books) {
    console.log(books);
    books.forEach(book => {
        booksContainer.innerHTML += `
       <div class="book ">

       <img class="book_img " src="${book.image} " alt="book photo ">

       <div class="book__overlay image__overlay_blue ">

           <div class="book_title ">
               <h3>Book :${book.title} </h3>
               <h4>Author:${book.author}</h4>

           </div>
           <div class="book_description ">
               <p>${book.description} </p>

               <span>publisher:${book.publisher}</span>
               <span>publisher:${book.published}</span>
           </div>


       </div>
   </div>
   `;
    })
}

// function data show books away fetch api

function getBooks() {
    fetch(booksApi)
        .then(res => res.json())
        .then(data => {
            randerBooks(data.data)
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {

            loaderBooks.style.display = "none";

        })

}




// function showData to make await functions implemnted

async function showData() {
    await RanderProducts.fetchFromAPI();
    await getCompanies()
    await getPersons()
    await getBooks()


}


function preventDefault(event) {
    event.preventDefault();

}
// function searchPersons to make filter person
function searchPersons(event) {

    const searchInput = event.target;
    console.log(searchInput.value)
    const matchedPersons = persons.filter(person => person.firstname.includes(searchInput.value))
    randerPersons(matchedPersons)

    console.log(matchedPersons);
}

showData()