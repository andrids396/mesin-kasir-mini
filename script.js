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
const tombolSelaiMenambahMenu = document.querySelector("#btn-selesai-tambah-menu-baru");
const tombolOpsiNamaToko = document.querySelector(".btn-opsi-nama-toko");
const wadahGantiNama = document.querySelector(".wadah-ganti-nama");
const inputNamaTokoBaru = document.querySelector("#input-nama-toko-baru");
const tombolGantiNama = document.querySelector("#btn-ganti-nama");
const namaToko = document.querySelector(".nama-toko");

// === 2. Inisiasi ===
// 1. Varibel Dibutuhkan
let keranjang = []; // menyimpan menu pesanan
let total = 0; // inisiasi awal total belanja
let admin = false;

let dataDaftarMenu = localStorage.getItem("fileDaftarMenu");
let daftarMenu = dataDaftarMenu ? JSON.parse(dataDaftarMenu): [];

// 2. Membuat Tombol Pesan Menu dan Listenernya
function renderDaftarMenu() {
    wadahDaftarMenu.innerHTML = "";
    daftarMenu.forEach(elemen => {
        // 

        // 1. membuat tombol pesanan
        const tombolPesan = document.createElement("button");
        tombolPesan.classList.add("tombol-pesan");
        if (admin){ // jika mode adminlakukan
            tombolPesan.style.cursor = "auto"; // ubah jenis kursor saat melewati tombol pesan
            tombolPesan.style.setProperty("--warna-hover-tombol-pesan", "#e0e0e0"); // warna hover disamakan saat tdk hover
        }

        let idenTitasMenu = document.createElement("div");
        idenTitasMenu.classList.add("identitas-menu")
        idenTitasMenu.innerHTML = `${elemen.nama} <br> Rp ${elemen.harga.toLocaleString("id-ID")}`;

        // opsi hapus menu
        const opsiHapusMenu = document.createElement("button");
        opsiHapusMenu.classList.add("opsi-hapus-menu");
        opsiHapusMenu.innerHTML = "&#8942;"
        opsiHapusMenu.style.display = admin ? "flex": "none";

        // membuat tombolhapus daftar menu
        const tombolHapus = document.createElement("button");
        tombolHapus.classList.add("btn-hapus-menu");
        tombolHapus.innerHTML = "X";
        tombolHapus.style.display = "none"; // jika admin true munculkan tombol hapus, jika tidak hilangkan tombol hapus

        tombolPesan.appendChild(opsiHapusMenu);
        tombolPesan.appendChild(tombolHapus);
        tombolPesan.appendChild(idenTitasMenu);
        wadahDaftarMenu.appendChild(tombolPesan); // menempelkan btn menu ke div wadah menu
    
        // 2. listener tombol pesanan
        tombolPesan.addEventListener("click", () => {
            if (admin){ // saat mode admin jangan lakukan pengisian keranjang belanja
                return
            }
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

        // listener tombol hapus menu
        tombolHapus.addEventListener("click", () => {
            daftarMenu = daftarMenu.filter(item => item !== elemen);
            localStorage.setItem("fileDaftarMenu", JSON.stringify(daftarMenu));
            renderDaftarMenu();
        })

        // listener opsi hapus menu
        opsiHapusMenu.addEventListener("click", () => {
            tombolHapus.style.display = "flex";
            opsiHapusMenu.style.display = "none";
        })
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

// 2. kembalian
tombolKembalian.addEventListener("click", () => {
    let banyakInputUang = Number(inputUang.value.replace(/[^0-9]/g, ''));
    if (total === 0){
        teksKembalian.innerHTML = "Keranjang masih kosong!!"
        teksKembalian.style.color = "orange";
        return
    }else if(inputUang.value === ""){
        teksKembalian.innerHTML = "Input uang kosong!!"
        teksKembalian.style.color = "red";
        return
    }else if(banyakInputUang < total){
        teksKembalian.innerHTML = "Uang Kurang!!"
        teksKembalian.style.color = "#f700ea";
        return
    }
    let kembalian = banyakInputUang - total;
    teksKembalian.innerHTML = `Kembalian = Rp ${kembalian.toLocaleString("id-ID")}`;
    teksKembalian.style.color = "#32bd25";
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

    admin = !admin; // saat tombol menu diklik mode admin diberlakukan, bila diklik lagi dimatikan
    renderDaftarMenu();
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
    // wadahNamaHargaTambahMenu.style.display = "none"; //menghilangka form tambah menu baru

    // menyimpan daftarMenu ke localstorage
    let dataStringDaftarMenu = JSON.stringify(daftarMenu);
    localStorage.setItem("fileDaftarMenu", dataStringDaftarMenu);

    renderDaftarMenu();

})

// selesai menambahkan menu baru
tombolSelaiMenambahMenu.addEventListener("click", () => {
    wadahNamaHargaTambahMenu.style.display = "none";
    admin = !admin
    renderDaftarMenu();
})

// ganti nama toko
tombolOpsiNamaToko.addEventListener("click", () => {
    if (wadahGantiNama.style.display === "none" || wadahGantiNama.style.display === ""){
        wadahGantiNama.style.display = "flex";
    }else{
        wadahGantiNama.style.display = "none";
    }
})

tombolGantiNama.addEventListener("click", () => {
    if (inputNamaTokoBaru.value === ""){
        return;
    }
    namaToko.innerHTML = inputNamaTokoBaru.value;
    wadahGantiNama.style.display = "none";
    inputNamaTokoBaru.value = "";
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

renderDaftarMenu();