#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Wprowadź nazwę nowej wersji CV: ', async (versionName) => {
    const sourceDir = path.join(process.cwd(), 'contents', 'main');
    const targetDir = path.join(process.cwd(), 'contents', versionName);

    try {
        const targetExists = await fs.pathExists(targetDir);
        if (targetExists) {
            console.log(`Wersja o nazwie "${versionName}" już istnieje.`);
            return;
        }

        await fs.copy(sourceDir, targetDir);
    } catch (err) {
        console.error('Błąd podczas kopiowania katalogu:', err);
    } finally {
        rl.close();
    }
});