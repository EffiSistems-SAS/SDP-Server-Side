const formatString = (input) => {
    let texto = input.replaceAll('+',' ');
    texto = texto.replaceAll('á','?');
    texto = texto.replaceAll('é','?');
    texto = texto.replaceAll('í','?');
    texto = texto.replaceAll('ó','?');
    texto = texto.replaceAll('ú','?');
    return texto;
}

module.exports = {
    formatString
}