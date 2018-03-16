#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import unicodedata
import re

UNICODE_A = ord('A')
UNICODE_Z = ord('Z')
SIZE_ALPHABET = 26
PATH_DECRYPTED_LOG = "tmp/decrypted.log"
READ = "r"
WRITE = "w"

def normalizeKey(message, key):
    keyNormalized = ""
    for char in message:
        if(char == " "):
            keyNormalized += " "
        elif (char == ","):
            keyNormalized += ","
        else:
            keyNormalized += key[0]
            key = key[1:] + key[0]
    return keyNormalized

def normalizeText(text, codif='utf-8'):
    return unicodedata.normalize('NFKD', text.decode(codif)).encode('ASCII','ignore').upper()

def encrypt(message, key):
    result = ""
    for index in range(len(message)):
        if ord(message[index]) >= UNICODE_A and ord(message[index]) <= UNICODE_Z: 
            result += chr((ord(message[index]) + ord(key[index]) - (UNICODE_A * 2)) % SIZE_ALPHABET + UNICODE_A)
        else:
            result += message[index]
    return result

def decrypt(message, key):
    result = ""
    for index in range(len(message)):
        if ord(message[index]) >= UNICODE_A and ord(message[index]) <= UNICODE_Z: 
            result += chr(((ord(message[index]) - ord(key[index])) + SIZE_ALPHABET) % SIZE_ALPHABET + UNICODE_A)
        else:
            result += message[index]
    return result

def main():
    params = sys.argv[1:]
    message = open(params[0], READ).readlines()
    keys = open(params[1], READ)
    result = open(PATH_DECRYPTED_LOG, WRITE)
    for l in keys:
        result.write(l + decrypt(normalizeText(message[0]), normalizeKey(normalizeText(message[0]), normalizeText(l.replace('\n', '').replace('-','')))))
        result.write("\n\n")
if __name__ == '__main__':
    main()