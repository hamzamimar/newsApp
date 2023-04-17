import * as SQLite from 'expo-sqlite';
export const db = SQLite.openDatabase('news.db');



  export function executeSql(query, params = []) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS fav (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, author TEXT, description TEXT, url TEXT, subtext TEXT, image TEXT)'
        );
        });
      db.transaction(tx => {
        tx.executeSql(
          query,
          params,
          (_, { rows }) => {
            resolve(rows);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }
  
export const NAME = 'news';
export const PAGESIZE = 20;

//Redux Action Types
export const HEADLINES_AVAILABLE = `${NAME}/HEADLINES_AVAILABLE`;
export const CATEGORY_HEADLINES_AVAILABLE = `${NAME}/CATEGORY_HEADLINES_AVAILABLE`;

//API URL
export const API_URL = 'https://newsapi.org/v2';
// export const API_KEY = '?apiKey=82a26d489ff642968133859b08feea56';
export const API_KEY = '?apiKey=fe95679257a34063ad385a947832fceb';
export const API_PARAMS = `&pageSize=${PAGESIZE}`;

//API End Points
export const HEADLINES = `${API_URL}/top-headlines${API_KEY}${API_PARAMS}`;
export const SEARCH = `${API_URL}/everything${API_KEY}${API_PARAMS}&sortBy=relevancy`;

//CATEGORIES
export const CATEGORIES = ["Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology"];