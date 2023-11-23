// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc, setDoc, query, where, orderBy, serverTimestamp, updateDoc, getDoc } from "firebase/firestore"
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, getAuth, signOut, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import state from './store/index';
import { ChangePassword, Notify, UpdateUserDisplayName } from "./hooks/AxiosHandler";
import { formatForm } from "./hooks/Functions";
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
export const categoryRef = collection(dataBase, 'Categorias')

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
const clientsQuery = query(clientRef, orderBy("clientName", "asc"));
const categoryQuery = query(categoryRef, orderBy("name", "asc"));

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
})

onSnapshot(clientsQuery, (snap) => {
  state.Clients = [];

  snap.docs.forEach((doc) => {
    const result = doc.data();
    const id = doc.id;
    const final = { result, id };
    state.Clients.push(final);
  })
});

onSnapshot(categoryQuery, (snap) => {
  state.Category = [];

  snap.docs.forEach((doc) => {
    const result = doc.data();
    const id = doc.id;
    const final = { result, id };
    console.log("final: ", final);
    state.Category.push(final);
  });
});

export async function addDocuments(data, setLoading, event, file) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // Referência para o armazenamento
      const storage = getStorage();
      const storageReference = storageRef(storage, `files/${file.name}`);

      // Upload do arquivo para o armazenamento
      await uploadBytes(storageReference, file);
      const downloadURL = await getDownloadURL(storageReference);

      // // Adicionar dados ao Firestore
      const newData = { ...data, Edital: downloadURL, CreatedAT: serverTimestamp() };
      const docRef = await addDoc(collection(getFirestore(), 'Solicitações'), newData);
      await Notify(data.Title, data.Category)
      console.log("Documento adicionado com ID:", docRef.id, "e dados:", newData);
      state.message = "Licitação adicionada com sucesso!";
      event.target.reset();
      console.log(newData)
    }
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

  setLoading(true)
  try {
    // Adicionar o cliente ao Firestore
    const docRef = await addDoc(clientRef, clientData);
    console.log("Cliente adicionado com ID:", docRef.id);
    event.target.reset()
    state.message = "Empresa adicionada com sucesso!"
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
  state.message = "Empresa atualizada com sucesso!"
}

export function deleteClients(id, onClose) {
  const docRef = doc(dataBase, 'Clientes', id)
  deleteDoc(docRef)
    .then(() => {
      onClose()
      state.message = "Empresa excluida com sucesso!"
    })
    .catch(err => state.message = err.message)
}
// -------------- CATEGORIA ------------- //
export async function addCategory(data, setLoading, event) {
  event.preventDefault();
  setLoading(true)
  try {
    // Converter FormData em um objeto JavaScript
    const categoryObject = {};
    data.forEach((value, key) => {
      categoryObject[key] = value;
    });

    // Adicionar o categoria ao Firestore
    const docRef = await addDoc(categoryRef, categoryObject);
    console.log("Categoria adicionada com ID:", docRef.id);
    event.target.reset()
    state.message = "Categoria adicionada com sucesso!"
  } catch (error) {
    console.error("Erro ao adicionar o cliente:", error);
    throw error;
  } finally {
    setLoading(false);
  }
}
export async function editCategory(event, id, setLoading, conclusion) {
  event.preventDefault()
  setLoading(true)
  const docRef = doc(dataBase, 'Categorias', id)
  const formData = new FormData(event.target);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  updateDoc(docRef, data)
  setLoading(false)
  conclusion()
  state.message = "Categoria atualizada com sucesso!"
}

export function deleteCategory(id, onClose, name) {
  const docRef = doc(dataBase, 'Categorias', id)
  deleteDoc(docRef)
    .then(() => {
      onClose()
      state.message = "Categoria excluida com sucesso!"
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
          state.message = "Licitação deletada com sucesso!"
        })
        .catch(err => {
          console.log(err.message)
        })
    })
}

// Update Documents 
export function updateDocument(e, id, conclusion) {
  const data = formatForm(e, "client")
  const docRef = doc(dataBase, 'Solicitações', id)
  const formData = new FormData(e.target);
  updateDoc(docRef, data)
  conclusion()
  state.message = "Licitação atualizada com sucesso!"
}


// Create a User
export async function createUserFirebase(event, setLoading) {
  const form = formatForm(event);
  setLoading(true);
  event.target.reset();

  const { email, password, userName, permission, Name, CategoryId } = form;
  const auth = getAuth();

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const userID = cred.user.uid;

    await updateProfile(cred.user, { displayName: userName });

    const userDocRef = doc(userRef, userID);
    const userObject = {
      permission,
      CreatedAT: serverTimestamp(),
      category: Name || "",
      categoryId: CategoryId || "",
    };

    await setDoc(userDocRef, userObject);

    setLoading(false);
    state.message = "Usuário criado com sucesso!";
  } catch (error) {
    console.error('Erro ao adicionar o documento:', error);
    console.log(error.message);
  }
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
export function logOut() {
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
      const result = name.data()

      setInfo({
        id: userId,
        email: userEmail,
        permission: result.permission,
        data: result.CreatedAT,
        category: result.category,
        categoryId: result.categoryId
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
  updateDoc(docRef, { permission: data.permission, category: data.category, categoryId: data.categoryId, })
  close()
}

export function verifyUser(user) {
  const userReference = doc(dataBase, 'Usuários', user.uid);
  return getDoc(userReference)
    .then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        if (userData && userData.permission === 'Usuario') {
          return false; // Usuário tem permissão "Usuario"
        } else {
          return false
        }
      } else {
        return false; // Usuário não encontrado
      }
    })
    .catch((error) => {
      console.error("Erro ao verificar usuário:", error);
      return false; // Tratamento de erro, retorne falso por padrão
    });
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



