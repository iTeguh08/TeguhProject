document.addEventListener("DOMContentLoaded", function() {
    const descriptionElement = document.querySelector(".description span");
    const texts = ["Halo saya seorang pelajar", "Halo saya seorang `Coder`"];
    let index = 0; // Indeks untuk teks saat ini
    let charIndex = 0; // Indeks untuk karakter saat ini
    let phase = "type"; // Fase awal
    const cursorElement = document.createElement("span");
    cursorElement.classList.add("cursor");
    cursorElement.textContent = ""; // Set cursor character
    descriptionElement.appendChild(cursorElement);

    function animateText() {
        const currentText = texts[index];

        if (phase === "type") {
            // Menambah karakter satu per satu untuk efek ketik
            if (charIndex < currentText.length) {
                descriptionElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            } else {
                // Jika selesai mengetik, pindah ke fase "wait"
                phase = "wait";
                cursorElement.style.visibility = "hidden"; // Sembunyikan kursor saat menunggu
                setTimeout(() => {
                    phase = "delete"; // Pindah ke fase delete setelah jeda
                    cursorElement.style.visibility = "visible"; // Tampilkan kursor saat menghapus
                }, 2400); // Jeda 1 detik sebelum mulai menghapus
            }
        } else if (phase === "delete") {
            // Menghapus karakter satu per satu untuk efek hapus
            if (charIndex > 0) {
                charIndex--;
                descriptionElement.textContent = currentText.substring(0, charIndex);
            } else {
                // Jika teks sudah habis, beralih ke teks berikutnya
                index = (index + 1) % texts.length; // Pindah ke teks berikutnya
                charIndex = 0; // Setel ulang charIndex untuk fase ketik
                phase = "wait"; // Pindah ke fase "wait" setelah menghapus
                cursorElement.style.visibility = "hidden"; // Sembunyikan kursor saat menunggu

                // Jeda sebelum mulai mengetik lagi
                setTimeout(() => {
                    phase = "type"; // Kembali ke fase ketik
                    cursorElement.style.visibility = "visible"; // Tampilkan kursor saat mengetik
                }, 1000); // Jeda 1 detik sebelum mulai mengetik lagi
            }
        }
        // Selalu append the cursor after updating the text
        descriptionElement.appendChild(cursorElement);
    }

    // Jalankan animasi dengan interval stabil
    setInterval(animateText, 70); // Interval animasi tetap
});

const menuIcon = document.getElementById('menu-icon');
const closeMenu = document.getElementById('close-menu');
const navMenu = document.getElementById('nav-menu');

// Tambahkan event listener untuk ikon menu
menuIcon.addEventListener('click', () => {
    // Tampilkan menu
    navMenu.classList.remove('hidden');
    // Delay untuk memastikan class hidden dihapus sebelum visible ditambahkan
    setTimeout(() => {
        navMenu.classList.add('visible'); // Tambahkan kelas visible untuk animasi
    }, 10); // Delay singkat agar transisi 'in' bisa terlihat

    // Sembunyikan ikon menu dan tampilkan ikon tutup
    menuIcon.classList.add('hidden'); // Sembunyikan ikon menu
    closeMenu.classList.remove('hidden'); // Tampilkan ikon tutup
});

// Tambahkan event listener untuk ikon tutup
closeMenu.addEventListener('click', () => {
    // Sembunyikan menu
    navMenu.classList.remove('visible'); // Hapus kelas visible untuk animasi keluar
    setTimeout(() => {
        navMenu.classList.add('hidden'); // Sembunyikan menu setelah animasi selesai
    }, 300); // Waktu sama dengan durasi transisi

    closeMenu.classList.add('hidden'); // Sembunyikan ikon tutup
    menuIcon.classList.remove('hidden'); // Tampilkan ikon menu
});

// Jika Anda tidak ingin menu menghilang saat tautan diklik, hapus bagian ini:
const links = navMenu.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('click', () => {
        // Sembunyikan menu setelah tautan diklik
        navMenu.classList.remove('visible'); // Hapus kelas visible untuk animasi keluar
        setTimeout(() => {
            navMenu.classList.add('hidden'); // Sembunyikan menu setelah animasi selesai
        }, 300); // Waktu sama dengan durasi transisi

        closeMenu.classList.add('hidden'); // Sembunyikan ikon tutup
        menuIcon.classList.remove('hidden'); // Tampilkan ikon menu
    });
});


window.addEventListener('load', function() {
    const nameElement = document.querySelector('.left-content .name');
    const titleElement = document.querySelector('.left-content .title');
    const buttonElement = document.querySelector('.button-wrapper .button'); // Ensure this selector matches your button

    // Add fade-in effect after a short delay
    setTimeout(() => {
        nameElement.style.opacity = '1'; // Fade in for the name
    }, 600); // Matches the delay of the slide-in animation for the name

    setTimeout(() => {
        titleElement.style.opacity = '1'; // Fade in for the title
    }, 900); // Matches the delay of the slide-in animation for the title

    setTimeout(() => {
        buttonElement.style.opacity = '1'; // Fade in for the button
    }, 1200); // Adjust this delay as needed for the button
});

function isMobile() {
    return window.innerWidth <= 768; // Tentukan breakpoint untuk mobile, misalnya 768px
}

document.querySelectorAll(".project-card, .project-card-smaller, .project-card-bigger").forEach((card) => {
    card.addEventListener("click", function (event) {
        event.stopPropagation(); // Mencegah klik pada card memicu event di luar card
        
        // Hapus efek dari semua card
        document.querySelectorAll(".project-card, .project-card-smaller, .project-card-bigger").forEach((c) => {
            c.classList.remove("ring-1", "ring-blue-500", "bg-blue-500", "bg-opacity-[5px]", "scale-[1.03]"); // Hapus semua efek
            c.classList.add("hover:scale-[1.03]"); // Tambahkan hover hanya untuk semua kartu
        });

        // Tambahkan efek ring pada card yang diklik
        this.classList.add("ring-1", "ring-blue-500", "bg-blue-500", "bg-opacity-[5px]");
        
        // Sesuaikan efek scale berdasarkan perangkat
        if (isMobile()) {
            this.classList.add("scale-[1.03]"); // Scale-up untuk mobile
        } else {
            // Hentikan efek scale pada desktop untuk card aktif
            this.classList.remove("hover:scale-[1.03]");
        }

        // Set card yang aktif
        activeCard = this;
    });
});

const popup = document.getElementById("popup");
const closePopup = document.getElementById("close-popup");
let activeCard = null; // Menyimpan card yang saat ini aktif

// Function to open the popup
function openPopup(imageSrc, title, description, iconSrcArray, tags, signatureText) {
    document.getElementById("popup-image").src = imageSrc;
    document.getElementById("popup-title").innerText = title;
    document.getElementById("popup-description").innerText = description;

    // Menampilkan tags
    const popupTagsContainer = document.getElementById("popup-tags");
    popupTagsContainer.innerText = 'Tags: ' + (tags.length > 0 ? tags.join(', ') : 'No Tags');

    // Menampilkan ikon
    const popupIconContainer = document.querySelector('.popup-content .icon-container');
    popupIconContainer.innerHTML = ''; // Kosongkan kontainer ikon sebelumnya
    iconSrcArray.forEach(iconSrc => {
        const iconImg = document.createElement('img');
        iconImg.src = iconSrc;
        iconImg.alt = title;
        iconImg.className = 'tech-icon-project';
        popupIconContainer.appendChild(iconImg);
    });

    // Menampilkan tanda tangan
    const popupSignature = document.getElementById("popup-signature");
    popupSignature.innerText = signatureText; // Menampilkan teks tanda tangan

    popup.style.display = "flex";
    setTimeout(() => {
        popup.classList.add("popup-active");
    }, 10);
}

// Add event listener to each project card's popup icon
const projectCards = document.querySelectorAll('.project-card, .project-card-smaller, .project-card-bigger');

projectCards.forEach(card => {
    const popupIcon = card.querySelector('.popupIcon');

    if (popupIcon) {
        popupIcon.addEventListener('click', function(event) {
            event.stopPropagation(); // Mencegah event bubbling
            
            // Jika ada card yang aktif dan itu bukan card yang sama
            if (activeCard && activeCard !== card) {
                // Hapus efek dari card yang sebelumnya aktif
                activeCard.classList.remove('ring-1', 'ring-blue-500', 'bg-blue-500', 'bg-opacity-[5px]');
            }

            // Tambahkan efek pada card yang diklik
            card.classList.add('ring-1', 'ring-blue-500', 'bg-blue-500', 'bg-opacity-[5px]');
            activeCard = card; // Set card yang aktif

            const img = card.querySelector('.image-container img').src; // Ambil gambar dari card
            const title = card.querySelector('h3').innerText; // Ambil judul dari card
            const details = card.querySelector('p').innerText; // Ambil deskripsi dari card
            const icons = card.querySelectorAll('.icon-container-project img'); // Ambil ikon
            const iconSrcArray = Array.from(icons).map(icon => icon.src);
            const tags = card.dataset.tags ? card.dataset.tags.split(',') : []; // Mengambil tags dari data attribute
            const signatureText = "Tanda Tangan"; // Anda bisa mengganti ini dengan teks yang sesuai

            openPopup(img, title, details, iconSrcArray, tags, signatureText);
        });
    }
});

// Event listener to close the popup when the close button is clicked
closePopup.onclick = function() {
    popup.classList.remove("popup-active"); // Remove class to hide popup
    popup.classList.add("popup-closing"); // Add closing class
    setTimeout(() => {
        popup.classList.remove("popup-closing"); // Remove closing class after animation
        popup.style.display = "none"; // Hide popup after animation
        // Hapus efek ring dari card yang aktif
        if (activeCard) {
            activeCard.classList.remove('ring-1', 'ring-blue-500', 'bg-blue-500', 'bg-opacity-[5px]');
            activeCard = null; // Reset activeCard
        }
    }, 500); // Adjust with transition time
}

// Event listener untuk menutup popup saat area luar diklik
window.onclick = function(event) {
    if (event.target === popup) {
        // Hapus efek ring dari card yang aktif
        if (activeCard) {
            activeCard.classList.remove('ring-1', 'ring-blue-500', 'bg-blue-500', 'bg-opacity-[5px]');
            activeCard = null; // Reset activeCard
        }
        closePopup.onclick(); // Panggil fungsi closePopup
    }
}

// Event listener untuk menghapus efek ring saat card lain diklik
projectCards.forEach(card => {
    card.addEventListener('click', function(event) {
        // Jika card yang di klik bukan card yang aktif
        if (activeCard && activeCard !== card) {
            // Hapus efek dari card yang sebelumnya aktif
            activeCard.classList.remove('ring-1', 'ring-blue-500', 'bg-blue-500', 'bg-opacity-[5px]');
        }

        // Tambahkan efek ke card yang baru diklik
        activeCard = card; // Set card yang aktif
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

// window.addEventListener('scroll', function() {
//     const educationPhoto = document.getElementById('bg-photo-about');
//     const photoPosition = educationPhoto.getBoundingClientRect().top;
//     const screenPosition = window.innerHeight / 1.5;
  
//     if (photoPosition < screenPosition) {
//       educationPhoto.classList.add('visible');
//     } else {
//       educationPhoto.classList.remove('visible');
//     }
// });

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

// window.addEventListener('scroll', function() {
//     const educationPhoto = document.getElementById('bg-photo-educ');
//     const photoPosition = educationPhoto.getBoundingClientRect().top;
//     const screenPosition = window.innerHeight / 1.5;
  
//     if (photoPosition < screenPosition) {
//       educationPhoto.classList.add('visible');
//     } else {
//       educationPhoto.classList.remove('visible');
//     }
// });

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

    console.log('Current Section:', currentSection); // Debugging

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
            console.log('Active Link:', link); // Debugging
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

// Function to scroll to the top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll effect
    });
}

// Function to toggle the visibility of the floating button
function toggleButtonVisibility() {
    const button = document.getElementById('floatingButton');
    const homeSection = document.getElementById('home');
    const homeSectionHeight = homeSection.offsetHeight;

    if (window.scrollY > homeSectionHeight) {
        button.classList.add('show'); // Show button with transition
    } else {
        button.classList.remove('show'); // Hide button with transition
    }
}

// Fungsi untuk mengecek apakah elemen berada di viewport
// Fungsi untuk memeriksa apakah elemen berada di viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < window.innerHeight && // Memastikan bagian atas elemen terlihat
        rect.bottom > 0 // Memastikan bagian bawah elemen terlihat
    );
}

// Mengatur event scroll untuk mendeteksi elemen
function checkVisibility() {
    const projectSection = document.querySelector('.project-container');

    // Memeriksa apakah project-container dalam viewport
    if (isElementInViewport(projectSection)) {
        projectSection.classList.add('visible'); // Menambahkan kelas visible
    } else {
        projectSection.classList.remove('visible'); // Menghapus kelas visible saat keluar dari viewport
    }
}

// Event listener untuk scroll
window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

// Mendapatkan semua kartu
const cards = document.querySelectorAll('.project-card, .project-card-smaller, .project-card-bigger');

// Ubah ini untuk mempercepat munculnya kartu
const triggerBottom = (window.innerHeight / 6) * 5; // Muncul lebih awal saat digulir

function checkCards() {
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;

        // Tambahkan kelas 'show' jika card berada di atas triggerBottom
        if (cardTop < triggerBottom) {
            card.classList.add('show'); // Menampilkan card
            card.classList.remove('hide'); // Menghapus kelas hide
        } else {
            card.classList.remove('show'); // Menghilangkan card
            card.classList.add('hide'); // Menambahkan kelas hide
        }
    });
}

// Event listener untuk scroll dan load
window.addEventListener('scroll', checkCards);
window.addEventListener('load', checkCards);


document.addEventListener('DOMContentLoaded', function () {
    const projectSection = document.getElementById('project');
    const iconSkills = document.getElementById('icon-skills'); // Ambil elemen icon-skills

    function checkVisibility() {
        const rectProject = projectSection.getBoundingClientRect();
        const rectIconSkills = iconSkills.getBoundingClientRect(); // Ambil posisi icon-skills
        const windowHeight = window.innerHeight;

        // Cek apakah bagian project berada dalam viewport
        if (rectProject.top <= windowHeight && rectProject.bottom >= 0) {
            projectSection.classList.add('visible');
        }

        // Cek apakah bagian icon-skills berada dalam viewport
        if (rectIconSkills.top <= windowHeight && rectIconSkills.bottom >= 0) {
            iconSkills.classList.add('visible'); // Tambahkan kelas visible
        } else {
            iconSkills.classList.remove('visible'); // Hapus kelas visible saat keluar dari viewport
        }
    }

    // Tambahkan event listener untuk scroll
    window.addEventListener('scroll', checkVisibility);
    
    // Panggil fungsi untuk cek saat halaman pertama kali dimuat
    checkVisibility();
});