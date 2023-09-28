
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

  // Panggil fungsi pertama kali untuk memulai pengetikan
  typeText();
})();