"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./style.css");
var Carousel = /** @class */ (function () {
    function Carousel(carouselElement, prevButtonElement, nextButtonElement) {
        var _this = this;
        this.currentSlide = 0;
        this.imageContainer = carouselElement.querySelector(".carousel_images");
        this.images = Array.from(this.imageContainer.querySelectorAll('img'));
        this.totalSlides = this.images.length;
        this.indicatorDots = [];
        var indicatorContainer = document.createElement("div");
        indicatorContainer.classList.add("indicator-container"); //add class name
        var _loop_1 = function (i) {
            var dot = document.createElement("span");
            dot.classList.add("dot");
            indicatorContainer.appendChild(dot);
            this_1.indicatorDots.push(dot);
            dot.addEventListener("click", function () { return _this.goToSlide(i); });
        };
        var this_1 = this;
        for (var i = 0; i < this.totalSlides; i++) {
            _loop_1(i);
        }
        carouselElement.appendChild(indicatorContainer);
        this.showSlide(this.currentSlide);
        var prevButton = prevButtonElement;
        prevButton.addEventListener("click", function () { return _this.moveSlide("prev"); });
        var nextButton = nextButtonElement;
        nextButton.addEventListener("click", function () { return _this.moveSlide("next"); });
        this.startAutoplay();
    }
    Carousel.prototype.showSlide = function (index) {
        this.images.forEach(function (img, i) {
            if (i === index) {
                img.style.left = "0";
                // } else if (i === (index - 1 + this.totalSlides) % this.totalSlides) {
                //   img.style.left = "-100%";
            }
            else {
                img.style.left = "100%";
            }
        });
        this.indicatorDots.forEach(function (dot, i) {
            dot.classList.toggle("active", i === index); //add active class to
        });
    };
    Carousel.prototype.moveSlide = function (direction) {
        if (direction === "prev") {
            this.currentSlide =
                (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        }
        else if (direction === "next") {
            this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        }
        this.showSlide(this.currentSlide);
    };
    Carousel.prototype.goToSlide = function (index) {
        this.currentSlide = index;
        this.showSlide(this.currentSlide);
    };
    Carousel.prototype.startAutoplay = function () {
        var _this = this;
        setInterval(function () { return _this.moveSlide("next"); }, 5000);
    };
    return Carousel;
}());
var carouselElement = document.getElementById("carousel");
var prevButtonElement = document.getElementById("prev");
var nextButtonElement = document.getElementById("next");
if (carouselElement && prevButtonElement && nextButtonElement) {
    new Carousel(carouselElement, prevButtonElement, nextButtonElement);
}
else {
    console.error("elements not found or is not an HTMLElement");
}
