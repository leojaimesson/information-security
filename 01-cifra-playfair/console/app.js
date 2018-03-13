let readline = require('readline-sync'),
    playfair = require('../lib/playfair');

playfair("ABCDEFGHIJLMNOPQRSTUVWXYZ");

let input = readline
    .question("$[encrypt/decrypt] $key $message:")
    .trim()
    .split(" ")
    .filter((value) => value !== "");

if (input[0].toLowerCase() === "encrypt") {
    console.log(playfair.encrypt(input.slice(2, input.length).join(" "), input[1]).join(" "));
} else {
    console.log(playfair.decrypt(input.slice(2, input.length).join(" "), input[1]).join(" "));
}