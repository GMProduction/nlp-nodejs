import {
    penjualan,
    penjualan_data,
    penjualan_cetak
} from '../../controller/laporan';

module.exports = function (route) {
    route.get('/laporan-penjualan', penjualan)
    route.get('/laporan-penjualan/data', penjualan_data)
    route.get('/laporan-penjualan/cetak', penjualan_cetak)
}