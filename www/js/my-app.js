
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    { path: '/index/', url: 'index.html', },
    { path: '/about/', url: 'about.html', },
    { path: '/registro/', url: 'registro.html', },
  ]
  // ... other parameters
});

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
  // Do something here when page loaded and initialized
  console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="about"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
})

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  $$("#lButton").on('click', fnLogin);
})


$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  $$("#rButton").on('click', fnRegistro);

})

var db = firebase.firestore();
var cUsuarios = db.collection("Usuarios");

function fnLogin() {
  var emailDelUser = $$("#lEmail").val();
  var passDelUser = $$("#lPass").val();

  firebase.auth().signInWithEmailAndPassword(emailDelUser, passDelUser)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;

      console.log("Bienvenid@!!! " + emailDelUser);

      var idUsuarios = emailDelUser;
      
      var docRef = cUsuarios.doc(idUsuarios);

      docRef.get().then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());

          console.log(doc.data().nombre);
          console.log(doc.data().rol);

          
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });



    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.error(errorCode);
      console.error(errorMessage);
    });

}

function fnRegistro() {

  var emailDelUser = $$("#rEmail").val();
  var passDelUser = $$("#rPass").val();

  firebase.auth().createUserWithEmailAndPassword(emailDelUser, passDelUser)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("Bienvenid@!!! " + emailDelUser);
      // ...
      // mainView.router.navigate('/siguientePantallaDeUsuarioOK/');

      var idUsuarios = emailDelUser;

      nombre = $$("#rName").val();

      datos = {
        nombre: nombre,
        rol: "usuario"
      }

      cUsuarios.doc(idUsuarios).set(datos);

    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.error(errorCode);
      console.error(errorMessage);

      if (errorCode == "auth/email-already-in-use") {
        console.error("el mail ya esta usado");
      }


    });
}