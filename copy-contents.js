#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, 'contents');
const targetDir = path.join(__dirname, '..', '..', 'contents');

async function copyContents() {
    try {
        const targetExists = await fs.pathExists(targetDir);
        if (targetExists) {
            return;
        }
        await fs.copy(sourceDir, targetDir);
    } catch (err) {
        console.error('Błąd podczas kopiowania katalogu:', err);
    }
}

copyContents();
