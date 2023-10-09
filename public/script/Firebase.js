import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getDatabase, ref, onValue, set, get, child } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut as logOff } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { Profile, profile, setProfile } from "./profile.js";

const firebaseConfig = {
    apiKey: "AIzaSyC38rcaCJHYb5vq792yWXBWniHT0axmgR8",
    authDomain: "hurklo-menu-creator.firebaseapp.com",
    databaseURL: "https://hurklo-menu-creator-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "hurklo-menu-creator",
    storageBucket: "hurklo-menu-creator.appspot.com",
    messagingSenderId: "152396923144",
    appId: "1:152396923144:web:c48f7300cb0fe6ef6d2cbd",
    measurementId: "G-NLKF8B6VY0"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);

export function readDB(path, callback) {
    onValue(ref(database, path), (snapshot) => {
        callback(snapshot.val());
    });
}

export function readOnceDB(path, callback) {
    onValue(ref(database, path), (snapshot) => {
        callback(snapshot.val() || {});
    }, {
        onlyOnce: true
    });
}

export function readDBKeys(path, callback) {
    onValue(ref(database, path), (snapshot) => {
        if (snapshot.exists()) {
            callback(Object.keys(snapshot.val()));
        }
    });
}

export function writeDB(path, value) {
    return new Promise((resolve, reject) => {
        set(ref(database, path), value)
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password);
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        setProfile(user.uid);
    } else {
        setProfile(undefined);
        const signInMenu = document.getElementById('authentication');
        signInMenu.classList.add('active');
    }
});

// writeDB('ingredients/ING000217', {
//     "locales": {
//         "de": "Kopfsalat",
//         "el": "μαρούλι",
//         "en": "lettuce",
//         "es": "lechuga",
//         "fr": "laitue",
//         "hu": "fejes saláta",
//         "it": "lattuga",
//         "jp": "レタス",
//         "pl": "sałata",
//         "pt": "alface",
//         "ru": "салат",
//         "zh": "生菜"
//     },
//     "name": "lettuce",
//     "tags": ["vegetables", "ingredient"]

// });

export function signOut(success, failure) {
    logOff(auth).then(() => {
        success();
    }).catch((error) => {
        failure(error);
    });
}

signOut(() => {
    console.log('success');
}, () => {
    console.log('failure');
})