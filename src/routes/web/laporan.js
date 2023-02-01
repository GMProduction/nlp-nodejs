import {
    penjualan,
    penjualan_data,
    penjualan_cetak,
    barangTerjual,
    barangTerjualData,
    barangTerjualCetak
} from '../../controller/laporan';

module.exports = function (route) {
    route.get('/laporan-penjualan', penjualan)
    route.get('/laporan-penjualan/data', penjualan_data)
    route.get('/laporan-penjualan/cetak', penjualan_cetak)
    route.get('/laporan-barang-terjual', barangTerjual)
    route.get('/laporan-barang-terjual/data', barangTerjualData)
    route.get('/laporan-barang-terjual/cetak', barangTerjualCetak)
}