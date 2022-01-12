import {
  getDocs, getDoc, addDoc, setDoc, getFirestore,
} from 'firebase/firestore';
import { getDownloadURL } from 'firebase/storage';

import gameLogic from './gameLogic';

jest.mock('firebase/firestore');

jest.mock('firebase/storage');

describe('tests without db', () => {
  async function setUp() {
    const chars = {
      'char-1': {
        x: 20,
        width: 5,
        y: 40,
        height: 5,
        name: 'mike',
      },
      'char-2': {
        x: 20,
        width: 5,
        y: 10,
        height: 5,
      },
    };

    const imageData = {
      src: 'fake.png',
      width: 400,
      height: 400,
      scale: 0.5,
    };

    const makeDoc = (key, obj) => {
      const id = key;
      const data = () => ({ ...obj });

      return { id, data };
    };

    // collection.mockReturnValue(42);
    getDoc.mockResolvedValue(makeDoc('image', imageData));
    getDocs.mockResolvedValue([makeDoc('char-1', chars['char-1']), makeDoc('char-2', chars['char-2'])]);
    getDownloadURL.mockResolvedValue('fake.png');
    getFirestore.mockReturnValue('fake db');

    gameLogic.initializeGameDB('fake app');
    const resources = await gameLogic.loadResources('my-key');
    return Promise.resolve(resources);
  }

  it('successful targeting', async () => {
    const { gameManager } = await setUp();

    const result = await gameManager.checkTarget('char-1', { x: 11, y: 22 });
    expect(result).toBe(true);
  });

  it('missed target', async () => {
    const { gameManager } = await setUp();

    const result = await gameManager.checkTarget('char-2', { x: 11, y: 22 });
    expect(result).toBe(false);
  });

  it('find all targets', async () => {
    const { gameManager } = await setUp();

    await gameManager.checkTarget('char-1', { x: 11, y: 22 });
    const firstStatus = await gameManager.isGameOver();
    await gameManager.checkTarget('char-2', { x: 11, y: 6 });
    const secondStatus = await gameManager.isGameOver();

    expect(firstStatus).toBe(false);
    expect(secondStatus).toBe(true);
  });

  it('has the image and characters', async () => {
    const { imageData, characters } = await setUp();
    expect(imageData.imageSrc).toEqual('fake.png');
    expect(characters['char-1'].label).toEqual('mike');
  });
});

// do not undo the mock, it resets the mock before tests are run
// jest.unmock('firebase/firestore');

// not worth running an emulator for a single database read
/* describe('use firestore emulator', () => {
  it.todo('make emu tests');
}); */
