// Copyright © Connor deBoer 2026

import Database from "better-sqlite3";

const db = new Database("ApplicationsSent.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS apps_sent (
        id TEXT PRIMARY KEY,
        company TEXT,
        title TEXT,
        description TEXT,
        sent TEXT DEFAULT CURRENT_TIMESTAMP
    )
`);

export function AlreadySent(id) {
    // select 1 instead of * because we only need to find 1 to know if it's already been sent
    const row = db.prepare('SELECT 1 FROM apps_sent WHERE id = ?').get(id);
    // because we don't care about what data we find, just if we find data, we can use the 'double band/double not' trick 
    // in the example where row has some data in it, the first ! returns false, then the second ! flips it back to true
    // in the example where row is undefined the first ! returns true, then the second ! flips it back to false
    return !!row
}

export const saveSentJobs = db.transaction((jobs) => {
    for (const job of jobs) {
        db.prepare(`
            INSERT OR IGNORE INTO apps_sent (id, company, title)
            VALUES(?, ?, ?)
        `).run(job.id, job.company, job.title);
    }
});