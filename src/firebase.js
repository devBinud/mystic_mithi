import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, doc, updateDoc, deleteDoc, getDoc, getDocs, where } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Web App Firebase configuration for cureo-web (Project: cureo-60551)
const firebaseConfig = {
  apiKey: "AIzaSyBhlsKVndoSMoJ6PQj4ELYYvmP9Ixgo8n0",
  authDomain: "cureo-60551.firebaseapp.com",
  projectId: "cureo-60551",
  storageBucket: "cureo-60551.firebasestorage.app",
  messagingSenderId: "896457709046",
  appId: "1:896457709046:web:59323bfbadbdda518a23d7",
  measurementId: "G-EHGKX9YEMN"
};

let db = null;
let auth = null;
let isFirebaseConfigured = false;

try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  isFirebaseConfigured = true;
} catch (e) {
  console.warn("Firebase initialization notice:", e);
}

export { db, auth, isFirebaseConfigured };

// Save appointment dynamically to Cloud Firestore
export async function saveAppointmentToFirebase(appointmentData) {
  if (!db) return null;
  const customId = appointmentData.id || `CUREO-${Math.floor(1000 + Math.random() * 9000)}`;
  try {
    const docRef = await addDoc(collection(db, "appointments"), {
      id: customId,
      patientName: appointmentData.patientName || 'Anonymous',
      phone: appointmentData.phone || 'N/A',
      age: appointmentData.age || 'N/A',
      gender: appointmentData.gender || 'Not Specified',
      location: appointmentData.location || 'N/A',
      concern: appointmentData.concern || 'General Consultation',
      mode: appointmentData.mode || 'In-Person Consultation',
      preferredDate: appointmentData.preferredDate || 'Earliest Available',
      timeSlot: appointmentData.timeSlot || 'Morning',
      notes: appointmentData.notes || '',
      status: 'Pending',
      createdAtTimestamp: serverTimestamp(),
      createdAt: new Date().toLocaleString('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    });
    return customId;
  } catch (err) {
    console.error("Error saving appointment to Firestore:", err);
    return customId;
  }
}

// Update appointment status in Firestore
export async function updateAppointmentStatusInFirebase(item, newStatus) {
  if (!db || !item) return;
  try {
    const searchId = typeof item === 'object' ? item.id : item;
    const docId = typeof item === 'object' ? item.firestoreDocId : (typeof item === 'string' ? item : null);

    if (docId) {
      const docRef = doc(db, "appointments", docId);
      await updateDoc(docRef, { status: newStatus }).catch(() => {});
    }

    if (searchId) {
      const directRef = doc(db, "appointments", searchId);
      await updateDoc(directRef, { status: newStatus }).catch(() => {});
    }

    if (searchId) {
      const q = query(collection(db, "appointments"), where("id", "==", searchId));
      const querySnap = await getDocs(q);
      const updatePromises = [];
      querySnap.forEach((d) => {
        updatePromises.push(updateDoc(doc(db, "appointments", d.id), { status: newStatus }));
      });
      await Promise.all(updatePromises);
    }
  } catch (err) {
    console.error("Error updating appointment status in Firestore:", err);
  }
}

// Delete appointment from Firestore
export async function deleteAppointmentFromFirebase(item) {
  if (!db || !item) return;
  try {
    const searchId = typeof item === 'object' ? item.id : item;
    const docId = typeof item === 'object' ? item.firestoreDocId : (typeof item === 'string' ? item : null);

    if (docId) {
      const docRef = doc(db, "appointments", docId);
      await deleteDoc(docRef).catch(() => {});
    }

    if (searchId) {
      const directRef = doc(db, "appointments", searchId);
      await deleteDoc(directRef).catch(() => {});
    }

    if (searchId) {
      const q = query(collection(db, "appointments"), where("id", "==", searchId));
      const querySnap = await getDocs(q);
      const deletePromises = [];
      querySnap.forEach((d) => {
        deletePromises.push(deleteDoc(doc(db, "appointments", d.id)));
      });
      await Promise.all(deletePromises);
    }
  } catch (err) {
    console.error("Error deleting appointment from Firestore:", err);
  }
}

// Realtime listener for Admin Dashboard
export function subscribeToAppointments(callback) {
  if (!db) return () => {};
  try {
    const q = query(collection(db, "appointments"), orderBy("createdAtTimestamp", "desc"));
    return onSnapshot(q, (snapshot) => {
      const liveList = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: data.id || `CUREO-${doc.id.slice(0, 5).toUpperCase()}`,
          firestoreDocId: doc.id,
          ...data
        };
      });
      callback(liveList);
    }, (error) => {
      console.warn("Firestore subscription fallback to local collection:", error);
    });
  } catch (e) {
    console.warn("Firestore snapshot error:", e);
    return () => {};
  }
}

// Firebase Auth Admin Login helper
export async function loginWithFirebase(usernameOrEmail, password) {
  if (!auth) return null;
  const email = usernameOrEmail.includes('@') ? usernameOrEmail.trim() : `${usernameOrEmail.trim().toLowerCase()}@cureoclinic.com`;
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: res.user };
  } catch (err) {
    console.warn("Firebase Auth sign-in error:", err.code, err.message);
    return { success: false, code: err.code, message: err.message };
  }
}

export async function logoutFirebase() {
  if (auth) {
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Firebase logout error:", e);
    }
  }
}
