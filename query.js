require('dotenv').config({ path: '.env.local' });
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, where } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function main() {
    console.log("Fetching books...");
    const snap = await getDocs(collection(db, 'books'));
    let found = false;
    snap.forEach(doc => {
        if (doc.data().title === 'Fred heads' || doc.data().title === 'Fred Heads' || doc.data().title?.toLowerCase().includes('fred')) {
            console.log(doc.id, doc.data());
            found = true;
        }
    });
    if (!found) {
        console.log("No book found with title containing 'fred'");
        console.log("Total books:", snap.size);
    }
    process.exit(0);
}

main().catch(console.error);
