// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc, setDoc, query, where, orderBy, serverTimestamp, updateDoc, getDoc } from "firebase/firestore"
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

import { getMessaging, getToken, } from "firebase/messaging"
import { createUserWithEmailAndPassword, getAuth, signOut, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import state from './store/index';
import { ChangePassword, UpdateUserDisplayName } from "./hooks/AxiosHandler";
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
export async function addDocuments(data, setLoading, event, file) {
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
    event.target.reset()
  } catch (error) {
    console.error("Erro ao adicionar o documento:", error);
    throw error;
  } finally {
    setLoading(false);
  }
}

export async function editDocuments(data, setLoading, event, file) {
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
    event.target.reset()
  } catch (error) {
    console.error("Erro ao adicionar o documento:", error);
    throw error;
  } finally {
    setLoading(false);
  }
}

// -------------- CLIENTES --------------
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

export async function editClient(event, id, setLoading, conclusion) {
  event.preventDefault()
  setLoading(true)
  const docRef = doc(dataBase, 'Clientes', id)
  const formData = new FormData(event.target);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  updateDoc(docRef, data)
  setLoading(false)
  conclusion()
  state.message = "Cliente Atualizado com sucesso!"
}

export function deleteClients(id, onClose) {
  const docRef = doc(dataBase, 'Clientes', id)
  deleteDoc(docRef)
    .then(() => {
      onClose()
      state.message = "Cliente deletado com sucesso!"
    })
    .catch(err => state.message = err.message)
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
export function createUserFirebase(event, setLoading) {
  event.preventDefault();
  setLoading(true);
  const formData = new FormData(event.target);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  event.target.reset();

  const auth = getAuth();

  createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((cred) => {
      const userID = cred.user.uid;
      const userDisplayName = data.userName; // Define o displayName a partir dos dados do formulário

      // Configura o displayName do usuário
      updateProfile(cred.user, { displayName: userDisplayName })
        .then(() => {
          const userDocRef = doc(userRef, userID);
          const userObject = {
            permission: data.permission,
            CreatedAT: serverTimestamp(),
          };

          setDoc(userDocRef, userObject)
            .then(() => {
              setLoading(false);
              state.message = "Usuário criado com sucesso!";
            })
            .catch((error) => {
              console.error('Erro ao adicionar o documento:', error);
            });
        })
        .catch((error) => {
          console.error('Erro ao atualizar o displayName:', error);
        });
    })
    .catch((err) => {
      console.log(err.message);
    });
}

// Login
export function LogUser(email, password, setLoading) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((cred) => {
        resolve(cred); // Resolva a promessa com o valor de cred
        GetUserOnLogin(cred)
      })
      .catch((err) => {
        console.log(err.message);
        reject(err); // Rejeite a promessa com o erro
      })
  });
}

// Logout
export function logOut(navigate) {
  signOut(FIREBASE_AUTH)
    .then(() => {
      // Logout bem-sucedido
      console.log("Usuário deslogado com sucesso.");
    })
    .catch((err) => {
      // Erro durante o logout
      console.error("Erro durante o logout: ", err.message);
    });
}


// --------------- Usuários --------------
// Get the User
export const getUser = (account, setInfo, setLoading, setModal) => {
  const userId = account.uid
  const userEmail = account.email
  const userName = doc(dataBase, "Usuários", userId)
  getDoc(userName)
    .then((name) => {
      const permission = name.data().permission
      const data = name.data().CreatedAT
      setInfo({
        id: userId,
        email: userEmail,
        permission: permission,
        data: data
      })
      setLoading(false)
    })
    .then(() => setModal(true))
    .catch(err => console.log(err))
}

// Update the User
export function editUser(e, userId, setLoading, close) {
  e.preventDefault()
  const docRef = doc(dataBase, 'Usuários', userId)
  const formData = new FormData(e.target);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  if (data.password) {
    ChangePassword(userId, data.password,)
  }
  UpdateUserDisplayName(userId, data.user, setLoading)
  updateDoc(docRef, { permission: data.permission })
  close()
}



export const GetUserOnLogin = (userId) => {
  const userName = doc(dataBase, "Usuários", userId)
  getDoc(userName)
    .then((name) => {
      const user = name.data().User
      state.user = userName
    })
    .catch(err => console.log(err))
}



