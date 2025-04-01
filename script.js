document.addEventListener("DOMContentLoaded", function () {
    // Zoom Effect for menu.html
    if (window.location.pathname.includes("menu.html")) {
        let menuImages = document.querySelectorAll(".menu-container img");

        menuImages.forEach(img => {
            img.addEventListener("mouseenter", function () {
                img.style.transition = "transform 0.3s ease-in-out, z-index 0s";
                img.style.transform = "scale(2)";
                img.style.zIndex = "10"; // Puts the zoomed image on top
            });

            img.addEventListener("mouseleave", function () {
                setTimeout(() => {
                    img.style.zIndex = "1"; // Resets stacking order with a delay
                }, 300);
                img.style.transform = "scale(1)";
            });
        });
    }

    // Centering the comment form & handling character count
    if (window.location.pathname.includes("comments.html")) {
        let commentBox = document.getElementById("comment");
        let charCount = document.getElementById("charCount");

        if (commentBox && charCount) {
            commentBox.addEventListener("focus", function () {
                if (charCount.textContent === "Maksimumi 100 karaktere") {
                    charCount.textContent = "";
                }
            });

            commentBox.addEventListener("input", function () {
                let remaining = 100 - commentBox.value.length;
                charCount.textContent = `Mbeten ${remaining} karaktere`;
            });

            commentBox.addEventListener("blur", function () {
                if (commentBox.value.length === 0) {
                    charCount.textContent = "Maksimumi 100 karaktere";
                }
            });
        }
    }

    // Star Rating Selection for comments.html
    if (window.location.pathname.includes("comments.html")) {
        let stars = document.querySelectorAll(".star-rating input");

        stars.forEach(star => {
            star.addEventListener("change", function () {
                let selectedValue = document.querySelector(".star-rating input:checked").value;
                console.log(`User selected ${selectedValue} stars`);
            });
        });
    }

    // Carousel Logic
    let carouselImages = document.querySelectorAll(".carousel img");
    let currentImageIndex = 2; // Start from the active image

    function updateCarousel() {
        carouselImages.forEach((img, index) => {
            img.classList.remove("far-prev-img", "prev-img", "active-img", "next-img", "far-next-img");

            let farPrevIndex = (currentImageIndex - 2 + carouselImages.length) % carouselImages.length;
            let prevIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
            let nextIndex = (currentImageIndex + 1) % carouselImages.length;
            let farNextIndex = (currentImageIndex + 2) % carouselImages.length;

            if (index === farPrevIndex) {
                img.classList.add("far-prev-img");
            } else if (index === prevIndex) {
                img.classList.add("prev-img");
            } else if (index === currentImageIndex) {
                img.classList.add("active-img");
            } else if (index === nextIndex) {
                img.classList.add("next-img");
            } else if (index === farNextIndex) {
                img.classList.add("far-next-img");
            } else {
                img.style.opacity = "0"; // Hide other images
            }
        });
    }

    function nextSlide() {
        currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
        updateCarousel();
    }

    function prevSlide() {
        currentImageIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
        updateCarousel();
    }

    updateCarousel(); // Call once at the beginning
    setInterval(nextSlide, 3000); // Auto-change every 3 seconds

    // Reservation Form Logic
    if (window.location.pathname.includes("reservation.html")) {
        let dateInput = document.getElementById("date");
        let today = new Date().toISOString().split("T")[0];
        if (dateInput) dateInput.setAttribute("min", today);

        let timeDropdown = document.getElementById("time");
        if (timeDropdown) {
            for (let hour = 11; hour <= 23; hour++) {
                ["00", "30"].forEach(min => {
                    let option = document.createElement("option");
                    option.value = `${hour}:${min}`;
                    option.textContent = `${hour}:${min}`;
                    timeDropdown.appendChild(option);
                });
            }
        }
    }

    // Handling Comment Form Submission
    if (window.location.pathname.includes("comments.html")) {
        let commentForm = document.getElementById("commentForm");
        if (commentForm) {
            commentForm.addEventListener("submit", function (event) {
                event.preventDefault(); // Prevent page refresh
                alert("Komenti u dërgua me sukses!"); // Confirmation message

                fetch(commentForm.action, {
                    method: commentForm.method,
                    body: new FormData(commentForm)
                }).then(response => {
                    window.location.href = "index.html"; // Redirect to home.html after successful submission
                }).catch(error => console.error('Gabim gjatë dërgimit:', error));
            });
        }
    }

    // Hover Video Effect
    let video = document.getElementById("hoverVideo");
    if (video) {
        video.addEventListener("mouseenter", function () {
            video.play();
            video.style.transform = "scale(1.2)";
        });

        video.addEventListener("mouseleave", function () {
            video.style.transform = "scale(1)"; // Keep playing but return to normal size
        });
    }

    // Admin Login Logic
    let loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let email = document.getElementById("adminEmail").value;
            let password = document.getElementById("adminPassword").value;

            if (email === "restorantzojarande@gmail.com" && password === "Admin1234!") {
                alert("Hyrja u krye me sukses!");
                window.open("history.html", "_blank");
            } else {
                alert("Email ose fjalëkalim i pasaktë!");
            }
        });
    }

    
});
