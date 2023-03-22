import { getDatabase, ref, set, onValue, update, push, remove } from "firebase/database";

const databaseService = {
    // writeData(url, data) {
    //     const db = getDatabase();
    //     set(ref(db, url), data);
    // },
    writeData(url,data){
        const db = getDatabase();
        const Ref = ref(db, url);
        const newPostRef = push(Ref);
        set(newPostRef, data);
    },
    removeData(url){
        const db = getDatabase();
        remove(ref(db,url));
    },
    readData(url, callback) {
        const db = getDatabase();
        const itemRef = ref(db, url);
        onValue(itemRef, (snapshot) => {
            console.log(snapshot.val());
            const data = snapshot.val();
            callback(data);
        });
    },
    updateData(dbNode, data) {
        const db = getDatabase();
        return new Promise(resolve => {
            const updates = {};
            for(const key in data) {
                updates[dbNode + "/" + key] = data[key];
            }
            update(ref(db), updates)
            .then(success => {
                resolve({data: success});
            }).catch(error => {
                console.log(error);
                resolve({error});
            })
        });
    }
};

export default databaseService;