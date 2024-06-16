import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import ButtonComponent from '../../../components/button-component';
import BaseLinkComponent from '../../../components/base-link-component';
import BaseImageComponent from '../../../components/base-image-component';
import Router from '../../../services/router';
import isCustomerAuthorized from '../../../utils/is-customer-authorized';
import { subscribeToAuthorizationChangeEvent } from '../../../utils/authorization-event';
import PromoCodeModule from '../../../modules/promo-code-module';
import image1 from '../../../assets/images/1.jpg';
import image2 from '../../../assets/images/2.jpg';
import image3 from '../../../assets/images/3.jpg';
import image4 from '../../../assets/images/4.jpg';
import bird from '../../../assets/bird.svg';

export default class MainSection extends BaseComponent {
  private promoCodeModules: PromoCodeModule[];

  private currentModuleIndex: number;

  private dotsContainer: BaseComponent;

  private startX: number;

  private startY: number;

  private carouselInterval: number | undefined;

  constructor() {
    super('section', 'main_page');
    this.promoCodeModules = [];
    this.currentModuleIndex = 0;
    this.dotsContainer = new BaseComponent('div', 'dots_container');
    this.startX = 0;
    this.startY = 0;
    this.carouselInterval = undefined;
    this.subscribeToAuthorizationChanges();
    this.renderMainSection();
  }

  renderMainSection() {
    this.node.innerHTML = '';
    const wrapper = new BaseComponent('div', 'main_page__wrapper');
    this.node.appendChild(wrapper.node);

    const title = new BaseTextComponent('h1', 'main_page__title', 'Explore the world with our toys');
    wrapper.node.appendChild(title.node);

    const promoCodeComponent1 = new PromoCodeModule({
      images: [image1, image2, image3],
      promoText: 'Use code <span class="highlight">CALM20</span> for 20% off!',
    });
    const promoCodeComponent2 = new PromoCodeModule({
      images: [image4],
      promoText:
        'Only in June: 15% discount on toys in the "Science" category using promo code <span class="highlight">SCIENCE15</span>',
    });

    this.promoCodeModules.push(promoCodeComponent1, promoCodeComponent2);

    const carouselContainer = new BaseComponent('div', 'carousel_container');
    carouselContainer.node.append(promoCodeComponent1.node, promoCodeComponent2.node);
    wrapper.node.appendChild(carouselContainer.node);

    this.renderDots(wrapper.node);

    if (isCustomerAuthorized()) {
      const userName = localStorage.getItem('userName') || 'User';
      const welcomeText = new BaseTextComponent('p', 'welcome_text', `Hello, ${userName}! Have a nice shopping!`);
      wrapper.node.appendChild(welcomeText.node);
    } else {
      const signupLink = new BaseLinkComponent(
        Router.pages.registration,
        'main_page__signup',
        'Do not have an account yet?',
      );
      wrapper.node.appendChild(signupLink.node);

      const logoImg = new BaseImageComponent('logo_img', bird, 'logo');
      wrapper.node.appendChild(logoImg.node);

      const signupButton = new ButtonComponent('main_page__btn', () => {}, 'Create an account', false);
      signupButton.node.classList.add('button');
      signupLink.node.appendChild(signupButton.node);

      const loginText = new BaseTextComponent('p', 'main_page__login', 'Already have an account? Log in');
      wrapper.node.appendChild(loginText.node);

      const loginLink = new BaseLinkComponent('#login', '', 'here');
      loginText.node.appendChild(loginLink.node);
    }

    this.startCarousel();
    this.addSwipeListeners(carouselContainer.node);
  }

  renderDots(parentNode: HTMLElement) {
    this.dotsContainer.node.innerHTML = '';
    this.promoCodeModules.forEach((_, index) => {
      const dotContainer = new BaseComponent('div', 'dot_container');

      const dot = new BaseComponent('span', 'dot');

      dotContainer.node.appendChild(dot.node);

      dotContainer.node.addEventListener('click', () => this.showModule(index));

      this.dotsContainer.node.appendChild(dotContainer.node);
    });
    parentNode.appendChild(this.dotsContainer.node);
    this.updateDots();
  }

  updateDots() {
    const dots = this.dotsContainer.node.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      if (index === this.currentModuleIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  showModule(index: number) {
    this.promoCodeModules[this.currentModuleIndex].node.classList.remove('visible');
    this.currentModuleIndex = index;
    this.promoCodeModules[this.currentModuleIndex].node.classList.add('visible');
    this.updateDots();
    this.resetCarouselInterval();
  }

  startCarousel() {
    this.carouselInterval = window.setInterval(() => {
      const nextIndex = (this.currentModuleIndex + 1) % this.promoCodeModules.length;
      this.showModule(nextIndex);
    }, 5000);
  }

  resetCarouselInterval() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
    this.startCarousel();
  }

  addSwipeListeners(element: HTMLElement) {
    element.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
    element.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
    element.addEventListener('touchend', this.handleTouchEnd.bind(this), false);
  }

  handleTouchStart(event: TouchEvent) {
    const firstTouch = event.touches[0];
    this.startX = firstTouch.clientX;
    this.startY = firstTouch.clientY;
  }

  handleTouchMove(event: TouchEvent) {
    if (!this.startX || !this.startY) {
      return;
    }

    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;

    const diffX = this.startX - currentX;
    const diffY = this.startY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        this.showNextModule();
      } else {
        this.showPreviousModule();
      }
    }

    this.startX = 0;
    this.startY = 0;
  }

  handleTouchEnd() {
    this.startX = 0;
    this.startY = 0;
  }

  showNextModule() {
    const nextIndex = (this.currentModuleIndex + 1) % this.promoCodeModules.length;
    this.showModule(nextIndex);
  }

  showPreviousModule() {
    const prevIndex = (this.currentModuleIndex - 1 + this.promoCodeModules.length) % this.promoCodeModules.length;
    this.showModule(prevIndex);
  }

  subscribeToAuthorizationChanges() {
    subscribeToAuthorizationChangeEvent(() => {
      this.renderMainSection();
    });
  }
}
