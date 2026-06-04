// === 1. Menangkap Elemen Html ===
const wadahDaftarMenu = document.querySelector("#wadah-daftar-menu");
const kertasStruk = document.querySelector("#kertas-struk");
const teksTotal = document.querySelector("#teks-total");
const inputUang = document.querySelector("#input-uang");
const tombolKembalian = document.querySelector("#btn-kembalian");
const teksKembalian = document.querySelector("#teks-kembalian");
const tombolReset = document.querySelector("#reset");
const tombolTambahMenu = document.querySelector("#btn-tambah-menu");
const wadahNamaHargaTambahMenu = document.querySelector(".wadah-nama-harga-tambah-menu");
const inputNamaMenuBaru = document.querySelector("#input-nama-menu-baru");
const inputHargaMenuBaru = document.querySelector("#input-harga-menu-baru");
const tombolTambahMenuBaru = document.querySelector("#btn-tambah-menu-baru");

// === 2. Inisiasi ===
// 1. Varibel Dibutuhkan
let keranjang = []; // menyimpan menu pesanan
let total = 0; // inisiasi awal total belanja

// 2. Menu
const daftarMenu = [
    {nama: "Kopi Susu", harga: 10000},
    {nama: "Kopi Hitam", harga: 15000},
    {nama: "Teh Manis", harga: 5000},
    {nama: "Indomie Goreng", harga: 20000},
    {nama: "Indomie Kuah", harga: 20000}
];

// 2. Membuat Tombol Pesan Menu dan Listenernya
renderDaftarMenu();
function renderDaftarMenu() {
    wadahDaftarMenu.innerHTML = "";
    daftarMenu.forEach(elemen => {
        // 1. membuat tombol pesanan
        const tombolPesan = document.createElement("button");
        tombolPesan.classList.add("tombol-pesan");
        tombolPesan.innerHTML = `${elemen.nama} <br> Rp ${elemen.harga.toLocaleString("id-ID")}`;
    
        wadahDaftarMenu.appendChild(tombolPesan); // menempelkan btn menu ke div wadah menu
    
        // 2. listener tombol pesanan
        tombolPesan.addEventListener("click", () => {
            // cek sudah ada menu dipesan untuk menambah banyaknya
            const sudahDipesan = keranjang.find(item => item.nama === elemen.nama);
            if (sudahDipesan) {
                sudahDipesan.banyak += 1;
            }else{
                keranjang.push({nama: elemen.nama, harga: elemen.harga, banyak: 1, opsiBuka: false});
            }
                    
            // matematika, menambah total belanja
            total += elemen.harga;
    
            // update layar
            randerLayar();
        });
    })
}

// === 3. Even ===
// 1. mengubah format tampilan uang input uang
inputUang.addEventListener("input", () => {
    // setelah formatnya dirubah kan ada titiknya, nah ketika masuk kesini lagi harus dibersihkan lagi
    let cleanValue = inputUang.value.replace(/[^0-9]/g, '');

    // cek jika input tidak kosong, setelah dihapus semua
    if (cleanValue !== ""){
        inputUang.value = Number(cleanValue).toLocaleString("id-ID");
    }else{
        inputUang.value = "";
    }
});
// inputUang.addEventListener("input", function() {
//     // 1. Ambil value input dan bersihkan dari karakter selain angka (regex)
//     // Ini penting agar titik sebelumnya hilang sebelum diproses ulang
//     let cleanValue = this.value.replace(/[^0-9]/g, '');

//     // 2. Cek apakah input tidak kosong
//     if (cleanValue !== "") {
//         // 3. Ubah string menjadi integer, lalu format ke standar Indonesia (titik sebagai pemisah ribuan)
//         this.value = parseInt(cleanValue, 10).toLocaleString("id-ID");
//     } else {
//         // Jika input dihapus sampai habis, kembalikan value menjadi kosong
//         this.value = "";
//     }
// });

// 2. kembalian
tombolKembalian.addEventListener("click", () => {
    if (total === 0){
        teksKembalian.innerHTML = "Keranjang masih kosong!!"
        teksKembalian.style.color = "orange";
        return
    }
    if (inputUang.value === ""){
        teksKembalian.innerHTML = "Input uang tidak benar!!"
        teksKembalian.style.color = "red";
        return
    }
    let banyakInputUang = Number(inputUang.value.replace(/[^0-9]/g, ''));
    let kembalian = banyakInputUang - total;
    teksKembalian.innerHTML = `Kembalian = Rp ${kembalian.toLocaleString("id-ID")}`;
    teksKembalian.style.color = "black";
})

// 3. reset untuk pelanggan selanjutnya
tombolReset.addEventListener("click", () => {
    keranjang = [];
    total = 0;
    teksKembalian.innerHTML = "Kembalian = Rp 0";
    teksKembalian.style.color = "black"
    inputUang.value = "";

    randerLayar();
})

// 4. Tambah menu baru
// kontrol form inpur harga menu baru
inputHargaMenuBaru.addEventListener("input", () => {
    let angkaBersih = inputHargaMenuBaru.value.replace(/[^0-9]/g, '');
    if (angkaBersih !== ""){
        inputHargaMenuBaru.value = Number(angkaBersih).toLocaleString("id-ID");
    }else{
        inputHargaMenuBaru.value = "";
    }
})

// menampilkan tabel nama dan harga menu baru
tombolTambahMenu.addEventListener("click", () => {
    if (wadahNamaHargaTambahMenu.style.display === "none" || wadahNamaHargaTambahMenu.style.display === ""){
        wadahNamaHargaTambahMenu.style.display = "flex";
    }else{
        wadahNamaHargaTambahMenu.style.display = "none";
    }
})

// menambahkan menu baru ke daftar menu
tombolTambahMenuBaru.addEventListener("click", () => {
    if (inputNamaMenuBaru.value === "" || inputHargaMenuBaru.value === ""){
        return;
    }

    let namaMenu = inputNamaMenuBaru.value; // menangkap input nama menu baru
    let hargaMenu = Number(inputHargaMenuBaru.value.replace(/[^0-9]/g, '')) // menangkap inpur harga menu baru
    daftarMenu.push({nama: namaMenu, harga: hargaMenu}); // menambahkan ke array daftar meny
    inputNamaMenuBaru.value = ""; // menghapus value input nama baru
    inputHargaMenuBaru.value = ""; // menghapus value input harga baru
    wadahNamaHargaTambahMenu.style.display = "none"; //menghilangka form tambah menu baru
    renderDaftarMenu();
})


// === 4. Tampilan ===
function randerLayar(){
    kertasStruk.innerHTML = "" // menghapus tampilan sebelumnya

    // kertas struk
    keranjang.forEach(elemen => {
        const pesanan = document.createElement("div");
        pesanan.classList.add("pesanan");
        pesanan.innerHTML = `
        ${elemen.nama} ${elemen.banyak} x Rp ${elemen.harga.toLocaleString("id-ID")} = Rp ${(elemen.banyak * elemen.harga).toLocaleString("id-ID")}`

        // tombol titik tiga opsi
        const opsi = document.createElement("button");
        opsi.classList.add("btn-opsi");
        opsi.innerHTML = "&#8942;" // membuat titik tiga

        // listener tombol opsi
        opsi.addEventListener("click", () => {
            elemen.opsiBuka = !elemen.opsiBuka;
            randerLayar();
        })
        
        // wadah tombol hapus dan -1
        const wadahTombolHapusKurangi = document.createElement("div");
        wadahTombolHapusKurangi.classList.add("wadah-tombol-hapus-kurangi");

        // logika membuka opsi
        if (elemen.opsiBuka){
            wadahTombolHapusKurangi.style.display = "block";
        }else{
            wadahTombolHapusKurangi.style.display = "none"
        }
        



        // membuat tombol hapus
        const hapus = document.createElement("button");
        hapus.classList.add("btn-hapus");
        hapus.innerHTML = "Hapus";

        // listener untuk tombol hapus
        hapus.addEventListener("click", () => {
            total -= elemen.banyak * elemen.harga;
            keranjang = keranjang.filter(item => item !== elemen);
            randerLayar();
        })

        // membuat tombol -1
        const kurangiSatu = document.createElement("button");
        kurangiSatu.classList.add("btn-kurangi-satu");
        kurangiSatu.innerHTML = "-1";

        // listener tombol kurangi satu
        kurangiSatu.addEventListener("click", () => {
            total -= elemen.harga;
            elemen.banyak -= 1;
            if (elemen.banyak === 0){
                keranjang = keranjang.filter(item => item !== elemen);
            }

            randerLayar();
        })

        // menempelkan tombol hapus dan kurangi ke wadahnya
        wadahTombolHapusKurangi.appendChild(hapus);
        wadahTombolHapusKurangi.appendChild(kurangiSatu);

        // menempelkan btn titik 3 ke div pesanan
        pesanan.appendChild(opsi);
        // menemelkan wadah tombol hapus dan kurangi ke div pesanan
        pesanan.appendChild(wadahTombolHapusKurangi);
        // menempelkan div pesanan pada div struk
        kertasStruk.appendChild(pesanan);
    })

    // total belanja
    teksTotal.innerHTML = `Total Belanja = Rp ${total.toLocaleString("id-ID")}`;
}