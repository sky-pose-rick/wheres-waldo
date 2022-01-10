import {
  getDocs, getDoc,
} from 'firebase/firestore';
import gameLogic from './gameLogic';

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
}));

describe('tests without db', () => {
  async function setUp() {
    const chars = {
      'char-1': {
        xMin: 20,
        xMax: 25,
        yMin: 40,
        yMax: 45,
        name: 'mike',
      },
      'char-2': {
        xMin: 20,
        xMax: 25,
        yMin: 10,
        yMax: 15,
      },
    };

    const makeDoc = (key, obj) => {
      const id = key;
      const data = () => ({ ...obj });

      return { id, data };
    };

    // collection.mockReturnValue(42);
    getDoc.mockResolvedValue(makeDoc('image', { src: 'fake.png' }));
    getDocs.mockResolvedValue([makeDoc('char-1', chars['char-1']), makeDoc('char-2', chars['char-2'])]);

    const resources = await gameLogic.loadResources('my-key');
    return Promise.resolve(resources);
  }

  it('successful targeting', async () => {
    const { gameManager } = await setUp();

    const result = await gameManager.checkTarget('char-1', { x: 22, y: 44 });
    expect(result).toBe(true);
  });

  it('missed target', async () => {
    const { gameManager } = await setUp();

    const result = await gameManager.checkTarget('char-2', { x: 22, y: 44 });
    expect(result).toBe(false);
  });

  it('find all targets', async () => {
    const { gameManager } = await setUp();

    await gameManager.checkTarget('char-1', { x: 22, y: 44 });
    const firstStatus = await gameManager.isGameOver();
    await gameManager.checkTarget('char-2', { x: 22, y: 10 });
    const secondStatus = await gameManager.isGameOver();

    expect(firstStatus).toBe(false);
    expect(secondStatus).toBe(true);
  });

  it('has the image and characters', async () => {
    const { imageSrc, characters } = await setUp();
    expect(imageSrc).toEqual('fake.png');
    expect(characters['char-1'].label).toEqual('mike');
  });
});

// do not undo the mock, it resets the mock before tests are run
// jest.unmock('firebase/firestore');

// not worth running an emulator for a single database read
/* describe('use firestore emulator', () => {
  it.todo('make emu tests');
}); */
