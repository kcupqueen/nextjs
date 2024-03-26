'use server';
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('db/articles.db', (err: { message: any; }) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the articles database.');
});

export async function fetchArticles(): Promise<any[]> {
    const a =  new Promise<any[]>((resolve, reject) => {
        db.all('SELECT * FROM article', [], (err: any, rows: any[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
    const rows = await a;
    console.log(`rows`, rows)
    return rows;
}