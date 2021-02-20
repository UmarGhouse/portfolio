// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "personal-portfolio-302010.firebaseapp.com",
  projectId: "personal-portfolio-302010",
  storageBucket: "personal-portfolio-302010.appspot.com",
  messagingSenderId: "1091747991533",
  appId: "1:1091747991533:web:e5a6ca1c796fc7cbbb61e4",
  measurementId: "G-95VQVZVDPT"
};

const settings = { 
  firebaseConfig, 
  baseURL: process.env.NODE_ENV !== 'development'
  ? 'https://www.umarghouse.com'
  : 'http://localhost:3000'
}

export default settings