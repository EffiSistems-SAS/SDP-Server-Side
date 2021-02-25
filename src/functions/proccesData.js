const formatString = (input) => {
    //let texto = input.replace(/'+'/, " ");
    let texto = input;
    texto = texto.replace(/'á'/, "?");
    texto = texto.replace(/'é'/, "?");
    texto = texto.replace(/'í'/, "?");
    texto = texto.replace(/'ó'/, "?");
    texto = texto.replace(/'ú'/, "?");
    texto = texto.replace(/'Á'/, "?");
    texto = texto.replace(/'É'/, "?");
    texto = texto.replace(/'Í'/, "?");
    texto = texto.replace(/'Ó'/, "?");
    texto = texto.replace(/'Ú'/, "?");
    return texto;
}

module.exports = {
    formatString
}