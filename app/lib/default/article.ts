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
    debugSize(rows);

    return rows;
}

function debugSize(rows: any[]) {
    // Convert rows to a JSON string
    const rowsString = JSON.stringify(rows);

    // Calculate the size in bytes
    const sizeInBytes = Buffer.byteLength(rowsString, 'utf8');

    // Convert the size to kilobytes
    const sizeInKilobytes = sizeInBytes / 1024;

    console.log(`Data size: ${sizeInKilobytes} KB`);
}