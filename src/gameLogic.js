import {
  getFirestore, collection, doc, getDoc, getDocs,
} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

let db;
let storage;

// call outside game component
function initializeGameDB() {
  db = getFirestore();
  storage = getStorage();
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
  const imagePromises = [];
  const imageObj = {};

  // probably could do a concurrent access, but leave it sequential
  const imageDoc = doc(db, 'levels', levelKey);
  const imageData = await getDoc(imageDoc);
  const {
    srcWidth, srcHeight, scale, src,
  } = imageData.data();
  imageObj.srcWidth = srcWidth;
  imageObj.srcHeight = srcHeight;
  imageObj.scale = scale;

  imagePromises[0] = getDownloadURL(ref(storage, src));
  imagePromises[0].then((url) => { imageObj.imageSrc = url; });

  const querySnapshot = await getDocs(collection(imageDoc, 'characters'));
  let count = 0;
  querySnapshot.forEach((entry) => {
    const { id } = entry;
    const {
      x, y, width, height, name,
    } = entry.data();
    myCharacters[id] = {
      xMin: x * scale,
      yMin: y * scale,
      xMax: (x + width) * scale,
      yMax: (y + height) * scale,
      index: count,
    };
    uiCharacters[id] = { label: name };
    imagePromises[count] = getDownloadURL(ref(storage, entry.data().src));
    imagePromises[count].then((url) => { uiCharacters[id].src = url; });
    count += 1;
  });

  await Promise.all(imagePromises);

  return Promise.resolve({
    characters: uiCharacters,
    gameManager: gameManager(myCharacters, count),
    imageData: imageObj,
  });
}

export default { initializeGameDB, loadResources };
