import {
  getFirestore, collection, getDocs, query, orderBy, limit,
} from 'firebase/firestore';

let db;

// call outside result component
function initializeResultDB() {
  db = getFirestore();
}

async function loadResources() {
  if (!db) { console.error('DB not loaded'); }

  const resultManager = {};
  const resultStats = {};
  return { resultManager, resultStats };
}

export default { initializeResultDB, loadResources };
