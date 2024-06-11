import './style.css';

class Carousel {
  private currentSlide: number = 0;
  private images: HTMLImageElement[];
  private totalSlides: number;
  private imageContainer: HTMLDivElement;
  private indicatorDots: HTMLSpanElement[];
  private intervalID : number | null=null;

  constructor(carouselElement: HTMLElement, prevButtonElement: HTMLElement, nextButtonElement: HTMLElement) {
    this.imageContainer = carouselElement.querySelector('.carousel_images') as HTMLDivElement;
    this.images = Array.from(this.imageContainer.querySelectorAll('img'));
    this.totalSlides = this.images.length;

    // Create indicator dots
    this.indicatorDots = [];
    const indicatorContainer = document.createElement('div');
    indicatorContainer.classList.add('indicator-container');
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      indicatorContainer.appendChild(dot);
      this.indicatorDots.push(dot);
      dot.addEventListener('click', () => this.goToSlide(i));
    }
    carouselElement.appendChild(indicatorContainer);

    this.showSlide(this.currentSlide);

    const prevButton = prevButtonElement as HTMLButtonElement;
    prevButton.addEventListener('click', () => {
      this.moveSlide('prev')});

    const nextButton = nextButtonElement as HTMLButtonElement;
    nextButton.addEventListener('click', () => this.moveSlide('next'));

    this.startAutoplay();
  }

 
  private showSlide(index: number): void {
    this.images.forEach((image, i)=>{
      const newPosition = (i - index) * 100;
      image.style.left = `${newPosition}%`;
    })
    this.indicatorDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  private moveSlide(direction: 'prev' | 'next'): void {
    this.stopAutoplay();
    if (direction === 'prev') {
      this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    } else if (direction === 'next') {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    }
    this.showSlide(this.currentSlide);
    this.startAutoplay();
  }

  private goToSlide(index: number): void {
    this.stopAutoplay();
    if (index !== this.currentSlide) {
      this.currentSlide = index;
      this.showSlide(this.currentSlide);
    }
    this.startAutoplay();
  }

  private startAutoplay(): void {
    this.intervalID = setInterval(() => this.moveSlide('next'), 5000);
  }
  private stopAutoplay(): void{
    if (this.intervalID !== null){

      clearInterval(this.intervalID);
    }
  }
}

const carouselElement = document.getElementById('carousel');
const prevButtonElement = document.getElementById('prev');
const nextButtonElement = document.getElementById('next');

if (carouselElement && prevButtonElement && nextButtonElement) {
  new Carousel(carouselElement, prevButtonElement, nextButtonElement);
} else {
  console.error('Elements not found or are not HTMLElements');
}
