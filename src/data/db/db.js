// eslint-disable-next-line no-undef
const dbPromised = idb.open("football-center", 1, (upgradeDb) => {
  upgradeDb.createObjectStore("matches", {
    keyPath: "id"
  });
});

const saveMatch = (match) => {
  dbPromised
    .then(db => {
      const tx = db.transaction("matches", "readwrite");
      const store = tx.objectStore("matches");
      store.add(match);
      return tx.complate;
    });
};

const deleteMatch = (idMatch) => {
  dbPromised
    .then((db) => {
      const tx = db.transaction("matches", "readwrite");
      const store = tx.objectStore("matches");
      store.delete(idMatch);
      return tx.complete;
    });
};

const allMatch = () => {
  return dbPromised
    .then((db) => {
      let tx = db.transaction("matches", "readonly");
      let store = tx.objectStore("matches");
      return store.getAll();
    })
    .then(res => res);
};

export { saveMatch, deleteMatch, allMatch };