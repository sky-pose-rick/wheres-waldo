function checkTarget(levelKey, targetKey, x, y) {
  return Promise.resolve(false);
}

function loadResources(levelKey) {
  return Promise.resolve({});
}

export default { checkTarget, loadResources };
