ALPHABET = "ABCDEFGHIJKLMNOPQRTSUVWXYZ"

def createMatrix():
    mat = []
    for i in range(26):
        mat.append([])
        for j in range(26):
            mat[i].append(ALPHABET[(i + j) % 26])
    return mat

print createMatrix()
