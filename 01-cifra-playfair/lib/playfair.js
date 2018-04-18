/**
 * @author Leo Jaimesson Sousa da Silva
 * @version 1.0.0
 */

(function (root, factory) {
    'use strict';

    if (typeof exports === 'object') {
        exports = module.exports = factory();
    } else {
        root.playfair = factory();
    }
})(this, function () {
    'use strict';

    const ROW = 5,
        COL = 5,
        ENCRYPT = 1,
        DECRYPT = -1,
        ALPHABET_DEFAULT = "ABCDEFGHIJLMNOPQRSTUVWXYZ";

    /**
     * @description
     * Alfabeto default para execução do algoritmo.
    */
    let Alphabet = ALPHABET_DEFAULT;

    function normalizeText(text) {
        return text
            .normalize('NFD')
						.replace(/[^a-z]/ig, "")
        		.replace(/[\u0300-\u036f]/g, "");
    }

    function normalizeKey(key) {
        let normalizedKey = "";
        for (let char of key) {
            if (normalizedKey.indexOf(char) === -1) {
                normalizedKey += char;
            }
        }
        return normalizedKey;
    }

    /**
     * @description
     * Este método retorna um vetor com a mensagem quebrada em digrafos.
     * @example
     * input: carros
     * output: [ "ca", "rx", "ro", "sx" ]
     * @return {[]}
     */
    function buildVectorDigraphs(message) {
        let digraphs = [],
            digraph = "";
        while (message) {
            digraph += message[0];
            message = message.substring(1, message.length);
            if (digraph.length > 1) {
                if (digraph[0] === digraph[1]) {
                    if (digraph[0] !== "X") {
                        digraphs.push(digraph[0] + "X");
                    } else {
                        digraphs.push(digraph[0] + "Z");
                    }
                    message = digraph[0] + message;
                } else {
                    digraphs.push(digraph);
                }
                digraph = "";
            }
        }
        if (digraph != "") {
            if (digraph[0] !== "X") {
                digraphs.push(digraph[0] + "X");
            } else {
                digraphs.push(digraph[0] + "Z");
            }
        }
        return digraphs;
    }

    function buildGrade(key, alphabet) {
        let grade = [],
            normalizedKey = normalizeKey(key);

        for (let i = 0; i < ROW; i++) {
            let row = [];
            for (let j = 0; j < COL; j++) {
                if (normalizedKey) {
                    row.push(normalizedKey[0]);
                    normalizedKey = normalizedKey.substring(1, normalizedKey.length);
                } else {
                    while (key.indexOf(alphabet[0]) !== -1) {
                        alphabet = alphabet.substring(1, alphabet.length);
                    }
                    row.push(alphabet[0]);
                    alphabet = alphabet.substring(1, alphabet.length);
                }
            }
            grade.push(row);
        }
        return grade;
    }

    /**
     * @description
     * Este método retorna um objeto {linha,coluna} com a posição de um determinado caractere dentro da grade.
     * @returns { {row, col} || {} }
     */
    function getIndexOf(char, grade) {
        for (let i = 0; i < ROW; i++) {
            if (grade[i].indexOf(char) != -1) {
                return {
                    row: i,
                    col: grade[i].indexOf(char)
                };
            }
        }
        return {};
    }

    function crypt(message, key, operation) {
        let grade = buildGrade(key.toUpperCase(), Alphabet),
            vectorDigraphs = buildVectorDigraphs(normalizeText(message.toUpperCase()));

        return vectorDigraphs.map(function (value, index, array) {
            let firstChar = getIndexOf(value[0], grade);
            let secondChar = getIndexOf(value[1], grade);
            if (firstChar.col === secondChar.col) {
                return (grade[(firstChar.row + operation + 5) % 5][firstChar.col] + grade[(secondChar.row + operation + 5) % 5][secondChar.col]);
            } else if (firstChar.row === secondChar.row) {
                return (grade[firstChar.row][(firstChar.col + operation + 5) % 5] + grade[secondChar.row][(secondChar.col + operation + 5) % 5]);
            } else {
                return (grade[firstChar.row][secondChar.col] + grade[secondChar.row][firstChar.col]);
            }
        });
    };

    function playfair(alphabet) {
        Alphabet = alphabet.toUpperCase();
        return playfair;
    }

    playfair.encrypt = function (message, key) {
        return crypt(message, key, ENCRYPT);
    }

    playfair.decrypt = function (message, key) {
        return crypt(message, key, DECRYPT);
    }

    return playfair;
});
