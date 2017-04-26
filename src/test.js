setInterval(() => {
    console.log("Hello");
}, 3000);

//arret du script avec ctrl-C
process.on('SIGINT', () => {
    process.exit("samerlap");
});

process.on('exit', code => {
    console.log(`#####Connection closed : ${code} #####`);
})