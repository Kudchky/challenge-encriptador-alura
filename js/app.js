const inputText = document.getElementById("textArea");
const indication = document.getElementById("indication");
const result = document.getElementById("result");

const vowels = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat",
};

const encrypt = (text) => {
    let newText = "";
    for (let letter of text) {
        if (Object.hasOwn(vowels, letter)) {
            newText += vowels[letter];
        } else {
            newText += letter;
        }
    }

    return newText;
};

const decrypt = (text) => {
    let newText = "";
    for (let i = 0; i < text.length; i++) {
        let letter = text[i];
        if (Object.hasOwn(vowels, letter)) {
            if (
                vowels[letter] === text.substring(i, i + vowels[letter].length)
            ) {
                newText += letter;
                text =
                    text.slice(0, i) +
                    letter +
                    text.slice(i + vowels[letter].length);
            } else {
                newText += letter;
            }
        } else {
            newText += letter;
        }
    }
    return newText;
};

const warning = (
    message = "Only lowercase letters and no accents",
    color = false
) => {
    if (!color) {
        indication.innerHTML = `<img src="./assets/exclamation.png" style="opacity: 0"/>
                                <p>${message}</p>`;
    } else {
        indication.innerHTML = `<img src="../assets/warning.png"/>
                                <p style="opacity: 0.7; color: var(--red)">${message}</p>`;
    }
};

const resultNoFound = () => {
    result.innerHTML = `<img src="./assets/doll.png" alt="" />
                        <h3 class="message__title">No message was found</h3>
                        <p class="message__text">Enter the text you want to encrypt or decrypt</p`;
};

const resultEncrDecr = (resultEnDe) => {
    result.innerHTML = `<p id="result-copy" class="text-result">${resultEnDe}</p>
                        <button class="button button__copy" onclick="copy()">Copy</button>`;
};

const validateTextArea = () => {
    const regex = /^[a-z\s]*$/;

    if (!regex.test(inputText.value)) {
        warning("Only lowercase letters and no accents!", true);
        setTimeout(() => {
            inputText.value = inputText.value.replace(/[^a-z\s]/g, "");
        }, 300);
    } else {
        warning();
    }
};

const startEncrypting = () => {
    const regex = /[aeiou]/;
    if (inputText.value === "") {
        warning("Enter text to ENCRYPT, do not leave this field empty!", true);
    } else if (!regex.test(inputText.value))
        warning("Enter at least one vowel!", true);
    else {
        let resultEncrypt = encrypt(inputText.value);
        warning();
        resultEncrDecr(resultEncrypt);
    }
};

const startDecrypting = () => {
    if (inputText.value === "") {
        warning("Enter text to DECRYPT, do not leave this field empty!", true);
    } else {
        let resultDecrypt = decrypt(inputText.value);
        if (inputText.value === resultDecrypt) {
            warning("No encrypted messages were found!", true);
            resultNoFound();
        } else {
            warning();
            resultEncrDecr(resultDecrypt);
        }
    }
};

const reset = () => {
    inputText.value = "";
    warning();
    resultNoFound();
};

const copy = () => {
    inputText.value = "";
    inputText.value = document.getElementById("result-copy").textContent;
};
