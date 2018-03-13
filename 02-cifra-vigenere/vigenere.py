CHAR_A = ord('A')
SIZE_ALPHABET = 26

def normalizeKey(message, key):
    keyNormalized = ""
    for char in message:
        keyNormalized += key[0]
        key = key[1:] + key[0]
    return keyNormalized

def encrypt(message, key):
    result = ""
    for index in range(len(message)):
        result += chr((ord(message[index]) + ord(key[index]) - (CHAR_A * 2)) % SIZE_ALPHABET + CHAR_A)
    return result

def decrypt(message, key):
    result = ""
    for index in range(len(message)):
        result += chr(((ord(message[index]) - ord(key[index])) + SIZE_ALPHABET) % SIZE_ALPHABET + CHAR_A)
    return result

message = raw_input("message:")
key = raw_input("key:")

keyNormalized = normalizeKey(message, key)

print decrypt(message, keyNormalized)