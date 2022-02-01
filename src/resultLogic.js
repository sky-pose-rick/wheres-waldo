import {
  getFirestore, collection, getDocs, query, limit, doc, getDoc, where, addDoc, setDoc,
} from 'firebase/firestore';

let db;

// call outside result component
function initializeResultDB() {
  db = getFirestore();
}

function makeScoreString(score) {
  const seconds = Math.floor(score / 1000);
  const minutes = Math.floor(seconds / 60);
  const timeString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  return timeString;
}

function makeResultManager(score, sessionKey, sessionDoc, highScoreRef) {
  const submitScore = async (username) => {
    // don't care if highscore doc gets rejected
    // cheaters get what they deserve
    await setDoc(sessionDoc, {
      redeemed: true,
    }, { merge: true });

    // firestore rules need to be able to locate the session
    // will need to attach a session to highscore entries
    await addDoc(highScoreRef, {
      session: sessionKey,
      score,
      name: username,
    });
  };

  return { submitScore };
}

async function loadResources(sessionKey) {
  if (!db) {
    console.error('DB not loaded');
    return {
      resultManager: {},
      resultStats: {
        isInvalid: true,
      },
    };
  }

  // get the session
  const sessionDoc = doc(db, 'sessions', sessionKey);
  const sessionData = await getDoc(sessionDoc);
  const {
    start, stop, level, redeemed,
  } = sessionData.data();

  if (redeemed) {
    return {
      resultManager: {},
      resultStats: {
        isInvalid: false,
        isDupe: true,
      },
    };
  }

  const score = stop - start;
  const scoreString = makeScoreString(score);

  // get the level's name and highscore table
  const levelDoc = doc(db, 'levels', level);
  const levelData = await (getDoc(levelDoc));
  const levelName = levelData.data().name;

  //  query for any 20 scores better than this one, iterate to determine if rank is 20 or better
  const highScoreColl = collection(db, 'levels', level, 'highscores');
  const highscoreQuery = query(highScoreColl, where('score', '<', score), limit(20));
  const highscoreSnapshot = await getDocs(highscoreQuery);
  let ranking = 1;
  highscoreSnapshot.forEach(() => {
    ranking += 1;
  });

  const resultManager = makeResultManager(score, sessionKey, sessionDoc, highScoreColl);
  const resultStats = {
    score,
    scoreString,
    ranking,
    levelName,
    isInvalid: false,
    isDupe: false,
  };
  return { resultManager, resultStats };
}

export default { initializeResultDB, loadResources };
