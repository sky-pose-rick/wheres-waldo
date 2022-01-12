import {
  getFirestore, collection, getDocs, query, orderBy, limit,
} from 'firebase/firestore';

let db;

// call outside home component
function initializeHomeDB() {
  db = getFirestore();
}

async function loadResources() {
  if (!db) { console.error('DB not loaded'); }
  const levelPromises = [];
  // get levels
  const levelCollection = collection(db, 'levels');
  const levelQuery = query(levelCollection, orderBy('order'));
  const levelsSnapshot = await getDocs(levelQuery);
  levelsSnapshot.forEach((levelDoc) => {
    // add to a promise list
    levelPromises.push(new Promise((resolve) => {
      const scoreQuery = query(collection(levelCollection, levelDoc.id, 'highscores'), orderBy('score'), limit(20));
      // get score list then process it
      const scoreArray = [];
      getDocs(scoreQuery).then((scoresSnapshot) => {
        scoresSnapshot.forEach((scoreDoc) => {
          scoreArray.push({
            scoreKey: scoreDoc.id,
            name: scoreDoc.data().name,
            score: scoreDoc.data().score,
          });
        });

        // resolve with the level object
        resolve({
          name: levelDoc.data().name,
          key: levelDoc.id,
          scores: scoreArray,
        });
      });
    }));
  });

  const resources = { levels: await Promise.all(levelPromises) };

  return { resources };
}

export default { initializeHomeDB, loadResources };
