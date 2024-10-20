const popup = document.getElementById("popup");
const closePopup = document.getElementById("close-popup");

// Function to open the popup
function openPopup(imageSrc, title, description, iconSrcArray, tags, signatureText) {
    document.getElementById("popup-image").src = imageSrc;
    document.getElementById("popup-title").innerText = title;
    document.getElementById("popup-description").innerText = description;

    // Menampilkan tags
    const popupTagsContainer = document.getElementById("popup-tags");
    // Debugging: Cek isi tags
    console.log(tags); // Tambahkan ini untuk melihat apa yang ada di tags
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

// Add event listener to each project card
const projectCards = document.querySelectorAll('.project-card, .project-card-smaller, .project-card-bigger');
projectCards.forEach(card => {
    card.addEventListener('click', function() {
        const img = this.querySelector('img').src;
        const title = this.querySelector('h3').innerText;
        const details = this.querySelector('p').innerText;
        const icons = this.querySelectorAll('.icon-container-project img');
        const iconSrcArray = Array.from(icons).map(icon => icon.src);
        const tags = this.dataset.tags ? this.dataset.tags.split(',') : []; // Mengambil tags dari data attribute
        
        // Menambahkan teks tanda tangan
        const signatureText = "Tanda Tangan"; // Anda bisa mengganti ini dengan teks yang sesuai

        openPopup(img, title, details, iconSrcArray, tags, signatureText); // Panggil fungsi dengan tanda tangan
    });
});

// Event listener to close the popup when the close button is clicked
closePopup.onclick = function() {
    popup.classList.remove("popup-active"); // Remove class to hide popup
    popup.classList.add("popup-closing"); // Add closing class
    setTimeout(() => {
        popup.classList.remove("popup-closing"); // Remove closing class after animation
        popup.style.display = "none"; // Hide popup after animation
    }, 500); // Adjust with transition time
}

// Event listener untuk menutup popup saat area luar diklik
window.onclick = function(event) {
    if (event.target === popup) {
        closePopup.onclick(); // Panggil fungsi closePopup
    }
}

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