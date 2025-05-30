import { initializeApp, getApps } from "firebase/app"
import {
  getAuth,
  createUserWithEmailAndPassword as fbCreateUserWithEmailAndPassword,
  updateProfile as fbUpdateProfile,
  type User,
  onAuthStateChanged as fbOnAuthStateChanged,
  signOut as fbSignOut,
} from "firebase/auth"
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCo3vh5I9eM5OjbTsH0NIW0R450-r4dzgs",
  authDomain: "traffic-density-detection.firebaseapp.com",
  projectId: "traffic-density-detection",
  storageBucket: "traffic-density-detection.firebasestorage.app",
  messagingSenderId: "53777835338",
  appId: "1:53777835338:web:2f97fa6e138fc24d180db3",
  measurementId: "G-9PYK728FJ5"
};



// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

// Custom user roles
export type UserRole = "driver" | "authority"

export interface UserData {
  uid: string
  email: string
  displayName: string
  role: UserRole
  authorityId?: string
  createdAt: Date
}

// Create a new user with role
export const createUserWithRole = async (
  email: string,
  password: string,
  displayName: string,
  role: UserRole,
  authorityId?: string,
): Promise<User> => {
  try {
    // If role is authority, verify the authority ID
    if (role === "authority" && authorityId) {
      const isValid = await verifyAuthorityId(authorityId)
      if (!isValid) {
        throw new Error("Invalid Authority ID. Please contact the administrator.")
      }
    }

    const userCredential = await fbCreateUserWithEmailAndPassword(auth, email, password)
    await fbUpdateProfile(userCredential.user, { displayName })

    // Store additional user data in Firestore
    const userData: UserData = {
      uid: userCredential.user.uid,
      email: email,
      displayName: displayName,
      role: role,
      createdAt: new Date(),
    }

    // Add authority ID if provided
    if (role === "authority" && authorityId) {
      userData.authorityId = authorityId
    }

    await setDoc(doc(db, "users", userCredential.user.uid), userData)

    return userCredential.user
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

// Verify authority ID
export const verifyAuthorityId = async (authorityId: string): Promise<boolean> => {
  try {
    // Check if the authority ID exists in the authorityIds collection
    const authIdRef = collection(db, "authorityIds")
    const q = query(authIdRef, where("id", "==", authorityId), where("used", "==", false))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return false
    }

    // Mark the authority ID as used
    const docId = querySnapshot.docs[0].id
    await setDoc(
      doc(db, "authorityIds", docId),
      {
        id: authorityId,
        used: true,
        usedAt: serverTimestamp(),
      },
      { merge: true },
    )

    return true
  } catch (error) {
    console.error("Error verifying authority ID:", error)
    return false
  }
}

// Generate a new authority ID
export const generateAuthorityId = async (): Promise<string> => {
  try {
    // Generate a random ID
    const randomId = Math.random().toString(36).substring(2, 10).toUpperCase()

    // Store it in Firestore
    await addDoc(collection(db, "authorityIds"), {
      id: randomId,
      used: false,
      createdAt: serverTimestamp(),
    })

    return randomId
  } catch (error) {
    console.error("Error generating authority ID:", error)
    throw error
  }
}

// Get all unused authority IDs
export const getUnusedAuthorityIds = async (): Promise<string[]> => {
  try {
    const authIdRef = collection(db, "authorityIds")
    const q = query(authIdRef, where("used", "==", false))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => doc.data().id)
  } catch (error) {
    console.error("Error getting unused authority IDs:", error)
    return []
  }
}

// Get user role
export const getUserRole = async (uid: string): Promise<UserRole | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid))
    if (userDoc.exists()) {
      return userDoc.data().role as UserRole
    }
    return null
  } catch (error) {
    console.error("Error getting user role:", error)
    return null
  }
}

export {
  app,
  auth,
  db,
  storage,
  fbCreateUserWithEmailAndPassword as createUserWithEmailAndPassword,
  fbUpdateProfile as updateProfile,
  fbOnAuthStateChanged as onAuthStateChanged,
  fbSignOut as signOut,
}

