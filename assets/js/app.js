AOS.init({
  duration: "600",
  // once: true,
});
// console.log("app.js");
$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: false,
    autoPlay: true,
    autoplayTimeout: 3000,
    margin: 10,
    responsiveClass: true,
    nav: true,
    navText: ["&lt;", "&gt;"],
    responsive: {
      0: {
        items: 1.5,
        loop: true,
      },
      520: {
        items: 2.5,
        loop: true,
      },
      768: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  });
});

// $(".like-btn").on("click", function () {
//   $(this).toggleClass("is-active");
// });
// $(".minus-btn").on("click", function (e) {
//   e.preventDefault();
//   var $this = $(this);
//   var $input = $this.closest("div").find("input");
//   var value = parseInt($input.val());

//   if (value > 1) {
//     value = value - 1;
//   } else {
//     value = 0;
//   }

//   $input.val(value);
// });

// $(".plus-btn").on("click", function (e) {
//   e.preventDefault();
//   var $this = $(this);
//   var $input = $this.closest("div").find("input");
//   var value = parseInt($input.val());

//   if (value < 100) {
//     value = value + 1;
//   } else {
//     value = 100;
//   }

//   $input.val(value);
// });
