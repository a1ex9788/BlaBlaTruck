
function filterCapacity(packages, tamanyoFilter) {
    let filteredPackagesTamanyo = [];
    if (packages != null && packages.length > 0) {
        for (let i = 0; i < packages.length; i++) {
            if (packages[i].Alto <= tamanyoFilter.altura &&
                packages[i].Ancho <= tamanyoFilter.anchura &&
                packages[i].Largo <= tamanyoFilter.largo) {

                filteredPackagesTamanyo.push(packages[i]);
            }
        }
        return(filteredPackagesTamanyo);

    };
}
module.exports = filterCapacity
