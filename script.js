
(function () {
  "use strict";

  // Daftar teks yang akan diketik
  var texts = ["Web Developer", "Web Designer", "Front End Developer"];
  var textIndex = 0; // Indeks teks saat ini
  var charIndex = 0; // Indeks karakter saat ini
  var isTyping = true; // Status sedang mengetik atau menghapus
  var typingDelay = 150; // Kecepatan pengetikan (dalam milidetik)
  var displayTime = 2000; // Waktu tampil untuk teks setelah pengetikan (dalam milidetik)
  var eraseDelay = 50; // Kecepatan penghapusan (dalam milidetik)

  // Fungsi untuk menampilkan teks seolah-olah diketik dan dihapus
  function typeText() {
    var currentText = texts[textIndex];

    if (isTyping) {
      if (charIndex < currentText.length) {
        // Jika sedang mengetik, tambahkan karakter saat ini
        document.querySelector(".typed-text").textContent += currentText.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingDelay);
      } else {
        // Jika semua karakter telah ditampilkan, ubah status ke selesai mengetik
        isTyping = false;
        setTimeout(typeText, displayTime); // Tampilkan teks selama displayTime sebelum penghapusan
      }
    } else {
      if (charIndex > 0) {
        // Jika sedang menghapus, hapus satu karakter
        var currentTextContent = document.querySelector(".typed-text").textContent;
        document.querySelector(".typed-text").textContent = currentTextContent.slice(0, -1);
        charIndex--;
        setTimeout(typeText, eraseDelay);
      } else {
        // Jika semua teks telah dihapus, lanjutkan ke teks berikutnya
        isTyping = true;
        textIndex = (textIndex + 1) % texts.length;
        charIndex = 0;
        setTimeout(typeText, typingDelay);
      }
    }
  }

  // Panggil fMessageungsi pertama kali untuk memulai pengetikan
  typeText();
})()


// Click Scroll

// Mengambil semua link menu yang memiliki href yang dimulai dengan '#'
const menuLinks = document.querySelectorAll('nav ul li a[href^="#"]');

// Menambahkan event listener ke setiap link menu
menuLinks.forEach((link) => {
    link.addEventListener('click', smoothScroll);
});

// Menambahkan event listener untuk mengawasi perubahan posisi scroll
window.addEventListener('scroll', toggleActiveClass);

// Fungsi untuk membuat efek scroll halus
function smoothScroll(e) {
    e.preventDefault();

    // Mengambil target dari link yang diklik
    const targetId = this.getAttribute('href').substring(1);

    // Mengambil elemen target dengan ID yang sesuai
    const targetElement = document.getElementById(targetId);

    if (!targetElement) return;

    // Menghitung posisi scroll target element
    const targetPosition = targetElement.getBoundingClientRect().top;

    // Menghitung posisi scroll saat ini
    const startScroll = window.scrollY;

    // Animasi scroll
    const startTime = performance.now();
    const duration = 500; // Durasi animasi dalam milidetik

    function scroll(time) {
        const elapsedTime = time - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const newPosition = startScroll + (targetPosition * progress);

        window.scrollTo(0, newPosition);

        if (progress < 1) {
            requestAnimationFrame(scroll);
        }
    }

    requestAnimationFrame(scroll);
}

// Fungsi untuk mengaktifkan atau menonaktifkan kelas pada menu navigasi
function toggleActiveClass() {
    const scrollPosition = window.scrollY;

    // Menggunakan loop untuk memeriksa setiap link menu
    menuLinks.forEach((link) => {
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (!targetElement) return;

        // Menghitung posisi scroll target element
        const targetPosition = targetElement.getBoundingClientRect().top;
        const targetHeight = targetElement.offsetHeight;

        // Memeriksa apakah posisi scroll saat ini berada di dalam section
        if (scrollPosition >= targetPosition && scrollPosition < targetPosition + targetHeight) {
            // Menghapus kelas "active" dari semua link menu
            menuLinks.forEach((link) => {
                link.classList.remove('active');
            });

            // Menambahkan kelas "active" pada link menu yang sesuai
            link.classList.add('active');
        }
    });
}



