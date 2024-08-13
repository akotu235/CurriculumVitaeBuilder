#!/usr/bin/env node

const puppeteer = require('puppeteer');
const {PDFDocument} = require('pdf-lib');
const {exec} = require('child_process');
const os = require('os');
const path = require('path');
const url = require('url');
const http = require('http');
const fs = require('fs-extra');


const port = 8888;
const templateFile = 'index.html'

const mimeTypes = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'ico': 'image/x-icon',
    'pdf': 'application/pdf'
};


function startServer() {
    return new Promise((resolve, reject) => {
        const server = http.createServer((req, res) => {
            const parsedUrl = url.parse(req.url, true);
            const pathname = parsedUrl.pathname;
            let filePath = path.join(__dirname, pathname === '/' ? templateFile : pathname);

            const extname = path.extname(filePath).slice(1).toLowerCase();
            const contentType = mimeTypes[extname] || 'text/plain';

            fs.stat(filePath, (err, stat) => {
                if (err || !stat.isFile()) {
                    res.writeHead(404, {'Content-Type': 'text/plain'});
                    res.end('404 Not Found');
                    return;
                }
                fs.readFile(filePath, (err, content) => {
                    if (err) {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('500 Internal Server Error');
                        return;
                    }
                    res.writeHead(200, {'Content-Type': contentType});
                    res.end(content);
                });
            });
        });

        server.listen(port, () => {
            resolve(server);
        });

        server.on('error', (err) => {
            reject(err);
        });
    });
}


function getFilePath(version, outputName) {
    let filePath = path.join(__dirname, '/../../out/');
    if (version === 'main') {
        return filePath + outputName + '.pdf';
    } else {
        return filePath + version + '/' + outputName + '.pdf';
    }
}


function createDirectoryIfNotExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdir(dirPath, {recursive: true}, (err) => {
            if (err) {
                console.error('Błąd podczas tworzenia katalogu:', err);
            }
        });
    }
}


function getVersionsNames() {
    return new Promise((resolve, reject) => {
        const contentsPath = path.join(__dirname, 'contents');
        fs.readdir(contentsPath, {withFileTypes: true}, (err, files) => {
            if (err) {
                return reject(err);
            }

            const folderNames = files
                .filter(file => file.isDirectory() && !file.name.startsWith('.'))
                .map(folder => folder.name);

            resolve(folderNames);
        });
    });
}


function getLanguagesVersions(version) {
    return new Promise((resolve, reject) => {
        const versionPath = path.join(__dirname, 'contents/' + version + '/texts');
        fs.readdir(versionPath, {withFileTypes: true}, (err, files) => {
            if (err) {
                return reject(err);
            }

            const folderNames = files
                .filter(file => file.isDirectory())
                .map(folder => folder.name);

            resolve(folderNames);
        });
    });
}


async function printCVs(version) {
    const languages = await getLanguagesVersions(version);
    for (const lang of languages) {
        await printCV(lang, version);
    }
}

async function printCV(lang, version) {
    const language = lang.toUpperCase();

    const name = fs.readFileSync('contents/' + version + '/texts/' + lang + '/name.txt', 'utf8')

    const outputName = name.replace(/ /g, '_') + '_CV_' + language;

    console.log(`Generating: ${outputName}.pdf (${version})`);

    createDirectoryIfNotExists(path.join(__dirname, '/../../out'));

    if (version !== 'main') {
        const dirPath = path.join(__dirname, '/../../out/' + version)
        createDirectoryIfNotExists(dirPath);
    }

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.goto(`http://localhost:${port}/${templateFile}?lang=${lang}&version=${version}`, {waitUntil: 'networkidle2'});

    await page.pdf({
        path: getFilePath(version, outputName),
        format: 'A4',
        margin: {
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px'
        },
        printBackground: true,
        landscape: false
    });

    await browser.close();

    await addMetaData(outputName, lang, name, version);
}


async function addMetaData(outputName, lang, name, version) {
    let filePath = getFilePath(version, outputName);

    await waitForFile(filePath);

    const existingPdfBytes = fs.readFileSync(filePath);

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.setTitle('Curriculum Vitae');
    pdfDoc.setSubject(`Curriculum Vitae of ${name}`);
    pdfDoc.setAuthor(name);
    pdfDoc.setKeywords(['CV', name]);
    pdfDoc.setLanguage(lang);
    pdfDoc.setCreator('CV Builder by Andrzej Kotulski (https://github.com/akotu235/CurriculumVitaeBuilder)');
    pdfDoc.setProducer('puppeteer & pdf-lib');
    pdfDoc.setCreationDate(new Date());
    pdfDoc.setModificationDate(new Date());

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(filePath, pdfBytes);
}


async function waitForFile(filePath, timeout = 30000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
        try {
            fs.accessSync(filePath, fs.constants.R_OK);
            return;
        } catch (err) {
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
    throw new Error(`Plik ${filePath} nie stał się dostępny w czasie ${timeout} ms.`);
}


function openDirectory(directoryPath) {
    const absolutePath = path.resolve(directoryPath);
    const platform = os.platform();

    let command;

    switch (platform) {
        case 'win32':
            command = `start "" "${absolutePath}"`;
            break;
        case 'darwin':
            command = `open "${absolutePath}"`;
            break;
        case 'linux':
            command = `xdg-open "${absolutePath}"`;
            break;
        default:
            console.error(`System operacyjny ${platform} nie jest obsługiwany.`);
            return;
    }

    exec(command, (error) => {
        if (error) {
            console.error(`Błąd: ${error.message}`);
        }
    });
}


(async () => {
    try {
        const sourceDir = path.join(__dirname, "..", "..", "contents");
        const targetDir = path.join(__dirname, 'contents');
        await fs.emptyDir(targetDir);
        await fs.copy(sourceDir, targetDir)
            .catch(err => console.error('Błąd podczas kopiowania plików:', err));

        const server = await startServer();
        const versionsNames = await getVersionsNames();
        for (const version of versionsNames) {
            await printCVs(version);
        }
        openDirectory(path.join(__dirname, '/../../out/'));
        server.close();
    } catch (error) {
        console.error('Error:', error);
    }
})();