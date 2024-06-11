import "./style.css";

class Carousel {
  private currentSlide: number = 0;
  private images: HTMLImageElement[];
  private totalSlides: number;
  private imageContainer: HTMLDivElement;
  private indicatorDots: HTMLSpanElement[];

  constructor(
    carouselElement: HTMLElement,
    prevButtonElement: HTMLElement,
    nextButtonElement: HTMLElement
  ) {
    this.imageContainer = carouselElement.querySelector(
      ".carousel_images"
    ) as HTMLDivElement;
    this.images = Array.from(this.imageContainer.querySelectorAll('img'));
    this.totalSlides = this.images.length;

    this.indicatorDots = [];
    const indicatorContainer = document.createElement("div");
    indicatorContainer.classList.add("indicator-container"); //add class name
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      indicatorContainer.appendChild(dot);
      this.indicatorDots.push(dot);
      dot.addEventListener("click", () => this.goToSlide(i));
    }
    carouselElement.appendChild(indicatorContainer);

    this.showSlide(this.currentSlide);

    const prevButton = prevButtonElement as HTMLButtonElement;
    prevButton.addEventListener("click", () => this.moveSlide("prev"));

    const nextButton = nextButtonElement as HTMLButtonElement;
    nextButton.addEventListener("click", () => this.moveSlide("next"));

    this.startAutoplay();
  }

  private showSlide(index: number): void {
    this.images.forEach((img, i) => {
      if (i === index) {
        img.style.left = "0";
        // } else if (i === (index - 1 + this.totalSlides) % this.totalSlides) {
        //   img.style.left = "-100%";
      } else {
        img.style.left = "100%";
      }
    });
    this.indicatorDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index); //add active class to
    });
  }

  private moveSlide(direction: "prev" | "next"): void {
    if (direction === "prev") {
      this.currentSlide =
        (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    } else if (direction === "next") {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    }
    this.showSlide(this.currentSlide);
  }
  private goToSlide(index: number): void {
    this.currentSlide = index;
    this.showSlide(this.currentSlide);
  }

  private startAutoplay(): void {
    setInterval(() => this.moveSlide("next"), 5000);
  }
}

const carouselElement = document.getElementById("carousel");
const prevButtonElement = document.getElementById("prev");
const nextButtonElement = document.getElementById("next");
if (carouselElement && prevButtonElement && nextButtonElement) {
  new Carousel(carouselElement, prevButtonElement, nextButtonElement);
} else {
  console.error("elements not found or is not an HTMLElement");
}
