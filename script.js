const popup = document.getElementById("popup");
const closePopup = document.getElementById("close-popup");

// Fungsi untuk membuka popup
function openPopup(imageSrc, title, description) {
    document.getElementById("popup-image").src = imageSrc;
    document.getElementById("popup-title").innerText = title;
    document.getElementById("popup-description").innerText = description;
    popup.style.display = "flex"; // Tampilkan popup
    setTimeout(() => {
        popup.classList.add("popup-active"); // Tambahkan kelas untuk efek background color
    }, 10); // Delay sedikit untuk memastikan transisi berlaku
}

// Event listener untuk menutup popup saat tombol close diklik
closePopup.onclick = function() {
    popup.classList.remove("popup-active"); // Hapus kelas untuk menyembunyikan popup
    popup.classList.add("popup-closing"); // Tambahkan kelas penutupan
    setTimeout(() => {
        popup.classList.remove("popup-closing"); // Hapus kelas penutupan setelah animasi selesai
        popup.style.display = "none"; // Sembunyikan popup setelah animasi selesai
    }, 500); // Sesuaikan dengan waktu transisi
}

// Event listener untuk menutup popup saat area luar diklik
window.onclick = function(event) {
    if (event.target === popup) {
        closePopup.onclick(); // Panggil fungsi closePopup
    }
}

// Tambahkan event listener ke setiap project card
const projectCards = document.querySelectorAll('.project-card, .project-card-smaller, .project-card-bigger');
projectCards.forEach(card => {
    card.addEventListener('click', function() {
        const img = this.querySelector('img').src;
        const title = this.querySelector('h3').innerText;
        const details = this.querySelector('p').innerText;
        openPopup(img, title, details); // Buka popup dengan gambar dan deskripsi
    });
});

window.addEventListener('scroll', function() {
    const navContainer = document.getElementById('navContainer');
    if (window.scrollY > 10) { // Ubah 10 sesuai kebutuhan
        navContainer.classList.add('scrolled'); // Tambah kelas 'scrolled'
    } else {
        navContainer.classList.remove('scrolled'); // Hapus kelas 'scrolled'
    }
});

window.onscroll = function() {
    var navContainer = document.getElementById("navContainer");
    if (window.pageYOffset > 50) { // Ketika halaman di-scroll lebih dari 50px
        navContainer.classList.add("scrolled");
    } else {
        navContainer.classList.remove("scrolled");
    }
};

window.addEventListener('scroll', function() {
    const aboutMePhoto = document.getElementById('about-me-photo');
    const photoPosition = aboutMePhoto.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.5;
  
    if (photoPosition < screenPosition) {
      aboutMePhoto.classList.add('visible');
    } else {
      aboutMePhoto.classList.remove('visible');
    }
});

window.addEventListener('scroll', function() {
    const educationPhoto = document.getElementById('education-photo');
    const photoPosition = educationPhoto.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.5;
  
    if (photoPosition < screenPosition) {
      educationPhoto.classList.add('visible');
    } else {
      educationPhoto.classList.remove('visible');
    }
});

function setActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-scrolled a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 50; // Atur agar offset sesuai dengan tinggi navbar
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Menangani klik pada tautan navbar
const navLinks = document.querySelectorAll('.nav-scrolled a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Menghapus kelas 'active' dari semua tautan
        navLinks.forEach(nav => nav.classList.remove('active'));
        // Menambahkan kelas 'active' ke tautan yang diklik
        this.classList.add('active');
    });
});

// Tambahkan event listener untuk scroll
window.addEventListener('scroll', setActiveNav);

// Jalankan fungsi saat halaman dimuat agar tautan aktif saat pertama kali dilihat
setActiveNav();