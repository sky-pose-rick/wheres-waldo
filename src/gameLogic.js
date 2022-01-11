import {
  getFirestore, collection, doc, getDoc, getDocs,
} from 'firebase/firestore';

let db;

// call outside game component
function initializeGameDB() {
  db = getFirestore();
}

function isHit(character, mouse) {
  const { x, y } = mouse;
  return (character.xMin <= x
    && character.xMax >= x
    && character.yMin <= y
    && character.yMax >= y);
}

function checkGameOver(founds) {
  return founds.every((value) => value);
}

function gameManager(characters, size) {
  const founds = [];
  for (let i = 0; i < size; i += 1) {
    founds[i] = false;
  }

  // game assumes these are async operations
  const isGameOver = () => Promise.resolve(checkGameOver(founds));

  const checkTarget = (targetKey, mouse) => {
    const character = characters[targetKey];
    const result = isHit(character, mouse);
    if (result) {
      founds[character.index] = true;
      // either check for end of game here or in the component
    }
    return Promise.resolve(result);
  };

  return { isGameOver, checkTarget };
}

async function loadResources(levelKey) {
  const myCharacters = {};
  const uiCharacters = {};

  // probably could do a concurrent access, but leave it sequential
  const imageDoc = doc(db, 'levels', levelKey);
  const imageData = await getDoc(imageDoc);

  const querySnapshot = await getDocs(collection(imageDoc, 'data'));
  let count = 0;
  querySnapshot.forEach((entry) => {
    const { id } = entry;
    const {
      xMin, yMin, xMax, yMax, src, name,
    } = entry.data();
    myCharacters[id] = {
      xMin, yMin, xMax, yMax, index: count,
    };
    uiCharacters[id] = { src, label: name };
    count += 1;
  });

  return Promise.resolve({
    imageSrc: imageData.data().src,
    characters: uiCharacters,
    gameManager: gameManager(myCharacters, count),
  });
}

export default { initializeGameDB, loadResources };
