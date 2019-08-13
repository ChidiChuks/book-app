import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to this API.'
}));

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});

export default app;

const expiryDateFormatIsValid = (field) => {

    const pattern = /^([1-9]|0[1-9]|1[012])\/\d{2}$/;
    const test = pattern.test(field.value) ? true : false;
    return test;

};
const detectCardType = (first4Digits) => {
    const isVisa = first4Digits.join('').startsWith('4');
    const isMaster = first4Digits.join('').startsWith('5');
    const card = document.querySelector('div[data-credit-card]');
    const cardImage = document.querySelector('img[data-card-type]');
    const { visa, mastercard } = supportedCards;
    const imgsrc = isVisa ? visa : mastercard;
    if (isVisa) {
        card.classList.remove('is-mastercard');
        card.classList.add('is-visa');
        cardImage.src = supportedCards.visa;
        return 'is-visa';
    } else if (isMaster) {
        card.classList.remove('is-visa');
        card.classList.add('is-mastercard');
        cardImage.src = supportedCards.mastercard;
        return 'is-mastercard';
    } else {
        card.classList.remove('is-visa');
        card.classList.remove('is-mastercard');
    }
};
const validateCardExpiryDate = () => {
    const target = document.querySelector('[data-cc-info] input:nth-child(2)');
    const valid = expiryDateFormatIsValid(target);
    const expiryMonth = target.value.split('/')[0];
    const expiryYear = `20${target.value.split('/')[1]}`;
    const userDate = new Date(`${expiryMonth}-01-${expiryYear}`);
    const result = valid && userDate >= new Date() ? true : false;
    flagIfInvalid(target, result);
    return result;
};
const validateCardHolderName = () => {
    const field = document.querySelectorAll('[data-cc-info]>input')[0];
    const { value } = field;
    const regExp = /^[A-Za-z]{3,}\s[A-Za-z]{3,}$/;
    const isNameValid = regExp.test(value);
    flagIfInvalid(field, isNameValid);
    return isNameValid;
};
const validateWithLuhn = (digits) => {
    let isOtherDigit = false;
    if (digits.length != 16) {
        return false;
    }
    if (!(/^\d+$/.test(digits.join('')))) {
        return false;
    }
    const stepOneArr = [];
    for (i = digits.length - 1; i >= 0; i--) {
        if (isOtherDigit == false) {
            stepOneArr.unshift(digits[i]);
        } else {
            let newOtherDigit = digits[i] * 2;
            if (newOtherDigit > 9) {
                newOtherDigit = newOtherDigit - 9;
            }
            stepOneArr.unshift(newOtherDigit);
        }
        isOtherDigit = !isOtherDigit;
    }
    const sum = stepOneArr.reduce((accumulator, currentVal) => {
        return accumulator + currentVal
    }, 0);
    if (sum % 10 == 0) {
        return true;
    } else {
        return false;
    }
}
const validateCardNumber = () => {
    const cardNumbers = appState.cardDigits.flat();
    const cardValid = validateWithLuhn(cardNumbers);
    const field = document.querySelector('[data-cc-digits]');
    if (cardValid) {
        field.classList.remove("is-invalid");
    } else {
        field.classList.add("is-invalid");
    }
};
const validatePayment = () => {
    validateCardNumber();
    validateCardHolderName();
    validateCardExpiryDate();
};
const typeAhead = (event, fieldIndex, fields) => {};
const enableSmartTyping = () => {
    const allfields = Array.from(document.querySelectorAll('input'));
    allfields.forEach((field, index, fields) => {
        field.addEventListener('keydown', (event) => {
            smartInput(event, index, fields);
        });
    });
};
const smartCursor = (event, fieldIndex, fields) => {};
const acceptCardNumbers = (event, fieldIndex) => {};
const smartInput = (event, fieldIndex, fields) => {
    if (fieldIndex <= 3) {
        let field = fields[fieldIndex];
        if (event.key !== 'Backspace' && event.which !== 37 && event.which !== 9 && event.which !== 39) {
            event.preventDefault();
        }
        if (appState.cardDigits[fieldIndex] == undefined) {
            appState.cardDigits[fieldIndex] = [];
        }
        if (/^\d{1}$/.test(event.key)) {
            field.value = field.value + String(event.key);
            appState.cardDigits[fieldIndex][field.value.length - 1] = Number(event.key);

        }
        if (event.key === 'Backspace') {
            appState.cardDigits[fieldIndex][field.value.length - 1] = undefined;
        }
        if (fieldIndex < 3) {
            (() => {
                setTimeout(() => {
                    field.value = "#".repeat(field.value.length);
                    if (fieldIndex === 0 && field.value.length >= 4) {
                        const first4Digits = appState.cardDigits[0];
                        detectCardType(first4Digits);
                    }
                }, 500);
            })();
        }
    }
};
const uiCanInteract = () => {
    const creditCardField1 = document.querySelector('[data-cc-digits] input:nth-child(1)');
    creditCardField1.focus();
    const payButton = document.querySelector('button[data-pay-btn]');
    payButton.addEventListener('click', validatePayment);
    billHype();
    enableSmartTyping();
};

const displayCartTotal = ({ results }) => {
    const [data] = results;
    const { itemsInCart, buyerCountry } = data;
    appState.items = itemsInCart;
    appState.country = buyerCountry;
    appState.bill = itemsInCart.reduce((total, item) => {
        return total + (item.price * item.qty)
    }, 0);
    appState.billFormatted = formatAsMoney(appState.bill, appState.country);
    document.querySelector("[data-bill]").textContent = appState.billFormatted;

    appState.cardDigits = [];
    uiCanInteract();
};