
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const flags = {
    'el': '🇬🇷',
    'en': '🇬🇧',
    'es': '🇪🇸',
    'fr': '🇫🇷',
    'hu': '🇭🇺',
    'it': '🇮🇹',
    'jp': '🇯🇵',
    'pl': '🇵🇱',
    'pt': '🇵🇹',
    'ru': '🇷🇺',
    'zh': '🇨🇳',
}

String.prototype.shorthand = function(){
    const original = this;
    console.log(original);
    switch (original){
        case 'grams': return 'g';
        default: return original;
    }
}