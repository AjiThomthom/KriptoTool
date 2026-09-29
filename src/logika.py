from js import document, window
from pyodide.ffi import create_proxy

# LOGIKA INTI
def caesar_cipher(text, shift, mode='encrypt'):
    result = ""
    if mode == 'decrypt':
        shift = -shift
    for char in text:
        if char.isalpha():
            start = ord('A') if char.isupper() else ord('a')
            new_char = chr((ord(char) - start + shift) % 26 + start)
            result += new_char
        else:
            result += char
    return result

def vigenere_cipher(text, keyword, mode='encrypt'):
    result = ""
    keyword = ''.join(filter(str.isalpha, keyword)).upper()
    if not keyword:
        return text
    key_length = len(keyword)
    key_index = 0
    for char in text:
        if char.isalpha():
            start = ord('A') if char.isupper() else ord('a')
            shift = ord(keyword[key_index]) - ord('A')
            if mode == 'decrypt':
                shift = -shift
            new_char = chr((ord(char) - start + shift) % 26 + start)
            result += new_char
            key_index = (key_index + 1) % key_length
        else:
            result += char
    return result

# EVENT HANDLERS
def caesar_encrypt(event=None):
    text = document.getElementById("text-caesar").value
    try:
        shift = int(document.getElementById("shift-caesar").value)
    except ValueError:
        shift = 3
    document.getElementById("output-caesar").value = caesar_cipher(text, shift, mode='encrypt')

def caesar_decrypt(event=None):
    text = document.getElementById("text-caesar").value
    try:
        shift = int(document.getElementById("shift-caesar").value)
    except ValueError:
        shift = 3
    document.getElementById("output-caesar").value = caesar_cipher(text, shift, mode='decrypt')

def vigenere_encrypt(event=None):
    text = document.getElementById("text-vigenere").value
    keyword = document.getElementById("keyword-vigenere").value
    document.getElementById("output-vigenere").value = vigenere_cipher(text, keyword, mode='encrypt')

def vigenere_decrypt(event=None):
    text = document.getElementById("text-vigenere").value
    keyword = document.getElementById("keyword-vigenere").value
    document.getElementById("output-vigenere").value = vigenere_cipher(text, keyword, mode='decrypt')

# SETUP EVENT LISTENERS
def setup_listeners():
    document.getElementById("btn-caesar-encrypt").addEventListener("click", create_proxy(caesar_encrypt))
    document.getElementById("btn-caesar-decrypt").addEventListener("click", create_proxy(caesar_decrypt))
    document.getElementById("btn-vigenere-encrypt").addEventListener("click", create_proxy(vigenere_encrypt))
    document.getElementById("btn-vigenere-decrypt").addEventListener("click", create_proxy(vigenere_decrypt))

if document.readyState == "loading":
    window.addEventListener("DOMContentLoaded", create_proxy(lambda e: setup_listeners()))
else:
    setup_listeners()