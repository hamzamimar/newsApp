import React from 'react';
import { Provider } from 'react-redux';
import Router from './app/router';
import store from './app/redux/store';
import { useEffect } from 'react';
import { db } from './app/constants';

export default function App() {
    useEffect(()=>{
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS fav (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, author TEXT, description TEXT, url TEXT, subtext TEXT, image TEXT, urlToImage TEXT)'
            );
        }, (error) => {
            console.log('Error while creating table:', error);
        }, () => {
            console.log('Table created successfully!');
        });
    }, []);

    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
}
