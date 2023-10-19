// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc, setDoc, query, where, orderBy, serverTimestamp, updateDoc, getDoc } from "firebase/firestore"
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

import { getMessaging, getToken, } from "firebase/messaging"
import { createUserWithEmailAndPassword, getAuth, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import state from './store/index';
import { ChangePassword } from "./hooks/AxiosHandler";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3hXNHt1a63EDJuHubzLB45qN93cycm60",
  authDomain: "solicita-43d7e.firebaseapp.com",
  projectId: "solicita-43d7e",
  storageBucket: "solicita-43d7e.appspot.com",
  messagingSenderId: "737658132352",
  appId: "1:737658132352:web:d869d0309d44e800b19365"
};


// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);


// Database
const dataBase = getFirestore()
const storage = getStorage();

// Collection ref
export const collRef = collection(dataBase, 'Solicitações')
export const userRef = collection(dataBase, 'Usuários')
export const clientRef = collection(dataBase, 'Clientes')

// Collection of Data
getDocs(collRef)
  .then((snap) => {
    let licit = []

    snap.docs.forEach((doc) => {
      licit.push({ ...doc.data(), id: doc.id })
    })

  })
  .catch(err => {
    console.log(err.message)
  })


// Queries
const q = query(collRef, orderBy("ListName", "asc"))

// Real Time collection of Data
onSnapshot(q, (snap) => {
  state.aveliableTasks = []

  snap.docs.forEach((doc) => {
    const result = doc.data()
    const id = doc.id
    const final = { result, id }
    console.log(result)
    state.aveliableTasks.push(final)
  })
  console.log("fetch")
})


const clientsQuery = query(clientRef, orderBy("clientName", "asc"));

onSnapshot(clientsQuery, (snap) => {
  state.Clients = [];

  snap.docs.forEach((doc) => {
    const result = doc.data();
    const id = doc.id;
    const final = { result, id };
    console.log("final: ", final);
    state.Clients.push(final);
  });
  console.log("Clientes:", state.Clients);
});


// Adding documents
export async function addDocuments(data, setLoading, file) {
  try {
    const storageReference = storageRef(storage, `files/${file.name}`);
    await uploadBytes(storageReference, file);
    const downloadURL = await getDownloadURL(storageReference);

    const newData = { ...data, Edital: downloadURL, CreatedAT: serverTimestamp() };
    const docRef = await addDoc(collRef, newData);

    // Obtenha o ID do documento recém-adicionado
    const docId = docRef.id;

    // Obtenha os dados do documento recém-adicionado
    const addedData = await getDoc(docRef).then((doc) => doc.data());

    console.log("Documento adicionado com ID:", docId, "e dados:", addedData);
    state.message = "Licitação adicionada com sucesso!"
  } catch (error) {
    console.error("Erro ao adicionar o documento:", error);
    throw error;
  } finally {
    setLoading(false);
  }
}

export async function addClients(clientData, setLoading, event) {
  event.preventDefault();
  setLoading(true)
  try {
    // Converter FormData em um objeto JavaScript
    const clientObject = {};
    clientData.forEach((value, key) => {
      clientObject[key] = value;
    });

    // Adicionar o cliente ao Firestore
    const docRef = await addDoc(clientRef, clientObject);
    console.log("Cliente adicionado com ID:", docRef.id);
    event.target.reset()
    state.message = "Cliente adicionado com sucesso!"
  } catch (error) {
    console.error("Erro ao adicionar o cliente:", error);
    throw error;
  } finally {
    setLoading(false);
  }
}

// Deleting documents
export function deleteDocuments(e, onClose) {
  const docRef = doc(dataBase, 'Solicitações', e)
  deleteDoc(docRef)
    .then(() => {
      getDocs(collRef)
        .then((snap) => {
          let licit = []

          snap.docs.forEach((doc) => {
            licit.push({ ...doc.data(), id: doc.id })
          })
          onClose()
        })
        .catch(err => {
          console.log(err.message)
        })
    })
  state.message = "Licitação deletada com sucesso!"
}

// Update Documents 
export function updateDocument(e, id, conclusion) {
  e.preventDefault()
  const docRef = doc(dataBase, 'Solicitações', id)
  const formData = new FormData(e.target);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  updateDoc(docRef, data)
  conclusion()
  state.message = "Licitação atualizada com sucesso!"
}


// Create a User
export function createUserFirebase(email, password, user, setLoading) {
  createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
    .then((cred) => {
      const userID = cred.user.uid
      const User = {
        User: user,
        CreatedAT: serverTimestamp()
      }
      const myDocRef = doc(userRef, userID)

      setDoc(myDocRef, User)
        .then(() => {
          setLoading(false)
          state.message = "Usuario criado com sucesso!"
        })
        .catch((error) => {
          console.error('Erro ao adicionar o documento:', error);
        })
    })
    .catch((err) => {
      console.log(err.message)
    })
}

// Login
export function LogUser(email, password, setLoading) {
  signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
    .then((cred) => {
      GetUserOnLogin(cred.user.uid)
    })
    .catch((err) => console.log(err.message))
    .finally(() => { state.logged = true; setLoading(false) })
}

// Logout
export function logOut() {
  signOut(FIREBASE_AUTH)
    .then(() => {

    })
    .catch((err) => console.log(err.message))
}

// Get the User
export const getUser = (userId, email, stateFunction, setModal) => {
  const userName = doc(dataBase, "Usuários", userId)
  getDoc(userName)
    .then((name) => {
      const user = name.data().User
      const data = name.data().CreatedAT
      stateFunction({
        id: userId,
        email: email,
        user: user,
        data: data
      })
    })
    .then(() => setModal(true))
    .catch(err => console.log(err))
}

export const GetUserOnLogin = (userId) => {
  const userName = doc(dataBase, "Usuários", userId)
  getDoc(userName)
    .then((name) => {
      const user = name.data().User
      state.user = user
    })
    .catch(err => console.log(err))
}

// Update the User
export function updateUser(e, userId) {
  e.preventDefault()
  const docRef = doc(dataBase, 'Usuários', userId)
  const form = e.target
  const user = form[0].value
  const password = form[1].value
  const formContent = {
    User: user
  }
  ChangePassword(userId, password)
  updateDoc(docRef, formContent)
  state.message = "Usuario editado com sucesso!"
}