const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json'); // We can use application default credentials or mock

initializeApp({
  // Use ADC or whatever is configured
});

async function main() {
  const db = getFirestore();
  const books = await db.collection('books').get();
  books.forEach(doc => console.log(doc.id, doc.data()));
}
main();
