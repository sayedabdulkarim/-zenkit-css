// ========================================
// ZenKit - Carousel Component
// ========================================

class Carousel {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.element) return;

    this.options = {
      interval: 5000,
      keyboard: true,
      pause: 'hover',
      ride: false,
      wrap: true,
      touch: true,
      ...options
    };

    this.inner = this.element.querySelector('.carousel-inner');
    this.items = this.element.querySelectorAll('.carousel-item');
    this.indicators = this.element.querySelectorAll('.carousel-indicators [data-slide-to]');

    this.activeIndex = 0;
    this.isSliding = false;
    this.interval = null;
    this.touchStartX = 0;
    this.touchStartY = 0;

    this.init();
  }

  init() {
    // Find initial active index
    this.items.forEach((item, index) => {
      if (item.classList.contains('active')) {
        this.activeIndex = index;
      }
    });

    // Controls
    const prevBtn = this.element.querySelector('.carousel-control-prev');
    const nextBtn = this.element.querySelector('.carousel-control-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.prev();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.next();
      });
    }

    // Indicators
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', (e) => {
        e.preventDefault();
        this.goTo(index);
      });
    });

    // Keyboard
    if (this.options.keyboard) {
      this.element.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    // Pause on hover
    if (this.options.pause === 'hover') {
      this.element.addEventListener('mouseenter', () => this.pause());
      this.element.addEventListener('mouseleave', () => this.cycle());
    }

    // Touch support
    if (this.options.touch) {
      this.element.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
      this.element.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
    }

    // Auto-play
    if (this.options.ride === 'carousel' || this.options.ride === true) {
      this.cycle();
    }
  }

  next() {
    if (!this.isSliding) {
      this.slide('next');
    }
  }

  prev() {
    if (!this.isSliding) {
      this.slide('prev');
    }
  }

  goTo(index) {
    if (this.isSliding || index === this.activeIndex) return;

    const direction = index > this.activeIndex ? 'next' : 'prev';
    this.slide(direction, index);
  }

  slide(direction, targetIndex = null) {
    const activeItem = this.items[this.activeIndex];
    let nextIndex;

    if (targetIndex !== null) {
      nextIndex = targetIndex;
    } else if (direction === 'next') {
      nextIndex = this.activeIndex + 1;
      if (nextIndex >= this.items.length) {
        if (!this.options.wrap) return;
        nextIndex = 0;
      }
    } else {
      nextIndex = this.activeIndex - 1;
      if (nextIndex < 0) {
        if (!this.options.wrap) return;
        nextIndex = this.items.length - 1;
      }
    }

    const nextItem = this.items[nextIndex];
    if (!nextItem) return;

    const slideEvent = new CustomEvent('slide.zk.carousel', {
      detail: { from: this.activeIndex, to: nextIndex, direction }
    });
    this.element.dispatchEvent(slideEvent);
    if (slideEvent.defaultPrevented) return;

    this.isSliding = true;

    // Add positioning classes
    const directionalClass = direction === 'next' ? 'carousel-item-start' : 'carousel-item-end';
    const orderClass = direction === 'next' ? 'carousel-item-next' : 'carousel-item-prev';

    nextItem.classList.add(orderClass);

    // Force reflow
    nextItem.offsetHeight;

    activeItem.classList.add(directionalClass);
    nextItem.classList.add(directionalClass);

    const complete = () => {
      nextItem.classList.remove(directionalClass, orderClass);
      nextItem.classList.add('active');

      activeItem.classList.remove('active', directionalClass, orderClass);

      this.isSliding = false;
      this.activeIndex = nextIndex;
      this.updateIndicators();

      this.element.dispatchEvent(new CustomEvent('slid.zk.carousel', {
        detail: { from: this.activeIndex, to: nextIndex, direction }
      }));
    };

    activeItem.addEventListener('transitionend', complete, { once: true });

    // Fallback timeout
    setTimeout(() => {
      if (this.isSliding) {
        complete();
      }
    }, 600);
  }

  updateIndicators() {
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.activeIndex);
    });
  }

  cycle() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    if (this.options.interval) {
      this.interval = setInterval(() => this.next(), this.options.interval);
    }
  }

  pause() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  handleKeydown(event) {
    if (/input|textarea/i.test(event.target.tagName)) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.prev();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.next();
        break;
    }
  }

  handleTouchStart(event) {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  handleTouchEnd(event) {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const deltaX = touchEndX - this.touchStartX;
    const deltaY = touchEndY - this.touchStartY;

    // Only handle horizontal swipes
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        this.prev();
      } else {
        this.next();
      }
    }
  }

  dispose() {
    this.pause();
    Carousel.instances.delete(this.element);
  }

  nextWhenVisible() {
    // Only cycle to next when the page is visible
    if (!document.hidden && this.element.offsetWidth > 0 && this.element.offsetHeight > 0) {
      this.next();
    }
  }

  to(index) {
    // Alias for goTo for Bootstrap compatibility
    this.goTo(index);
  }

  // Static methods
  static instances = new WeakMap();

  static getInstance(element) {
    return Carousel.instances.get(element);
  }

  static getOrCreateInstance(element, options) {
    return Carousel.getInstance(element) || new Carousel(element, options);
  }

  static init(selector = '.carousel') {
    document.querySelectorAll(selector).forEach(el => {
      const options = {
        interval: el.dataset.interval ? parseInt(el.dataset.interval) : 5000,
        keyboard: el.dataset.keyboard !== 'false',
        pause: el.dataset.pause || 'hover',
        ride: el.dataset.ride || false,
        wrap: el.dataset.wrap !== 'false',
        touch: el.dataset.touch !== 'false'
      };
      const instance = new Carousel(el, options);
      Carousel.instances.set(el, instance);
    });
  }
}

export default Carousel;
