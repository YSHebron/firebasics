// Import the functions you need from the SDKs you need
import initializeApp from "firebase/app";
import getAnalytics from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDv2nmIgp_0jb9Y7BUXqikdRuiZHrmmAo",
  authDomain: "firebasics-400b4.firebaseapp.com",
  projectId: "firebasics-400b4",
  storageBucket: "firebasics-400b4.appspot.com",
  messagingSenderId: "92804578822",
  appId: "1:92804578822:web:a1a932c1de6d3ab6458d87",
  measurementId: "G-QY6ZDM5FNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

document.addEventListener("DOMContentLoaded", event => {
    // const app = firebase.app();
    console.log(app);

    const db = firebase.firestore();
    
    const myPost = db.collection('posts').doc('firstpost');

    // myPost.get()
    //     .then(doc => {
    //         const data = doc.data();
    //         document.write(data.title + `<br>`)
    //         document.write(data.createdAt.toDate())
    //         document.write(`<br>`)
    //     })

    // myPost.onSnapshot(doc => {
    //     const data = doc.data();
    //     document.write(data.title + `<br>`)
    //     document.write(data.createdAt.toDate())
    //     document.write(`<br>`)
    // })

    // myPost.onSnapshot(doc => {
    //     const data = doc.data();
    //     document.querySelector('#title').innerHTML = data.title;
    // })

    const productsRef = db.collection("products");

    // const query = productsRef.where('price', '>', 10);
    const query = productsRef.orderBy('price', 'desc').limit(1);

    query.get()
        .then(products => {
            products.forEach(doc => {
                data = doc.data()
                document.write(`${data.name} at $${data.price} <br>`)
            })
        })

});

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(result => {
        const user = result.user;
        document.write(`Hello ${user.displayName}`);
        console.log(user);
    })
    .catch(console.log);
}

function updatePost(e) {
    const db = firebase.firestore();
    const myPost = db.collection('posts').doc('firstpost');
    myPost.update({title : e.target.value})
}