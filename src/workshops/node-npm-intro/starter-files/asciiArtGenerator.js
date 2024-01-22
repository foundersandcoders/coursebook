const figlet = require('figlet');
const fs = require('fs');

function createAsciiArt(text) {
    return new Promise((resolve, reject) => {
        figlet(text, (err, data) => {
            if (err) {
                reject('Something went wrong...');
            } else {
                resolve(data);
            }
        });
    });
}

async function main() {
    try {
        const text = "Hello World"; // You can change this text
        const asciiArt = await createAsciiArt(text);
        fs.writeFileSync('asciiArt.txt', asciiArt);
        console.log('ASCII Art has been written to asciiArt.txt');
    } catch (error) {
        console.error(error);
    }
}

main();
