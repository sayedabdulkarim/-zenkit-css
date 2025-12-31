// ========================================
// ZenKit - Offcanvas Component
// ========================================

class Offcanvas {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.element) return;

    this.options = {
      backdrop: true,
      keyboard: true,
      scroll: false,
      ...options
    };

    this.backdrop = null;
    this.isShown = false;
    this.isTransitioning = false;

    this.init();
  }

  init() {
    // Setup triggers
    document.querySelectorAll(`[data-toggle="offcanvas"][data-target="#${this.element.id}"]`).forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });
    });

    // Also support href attribute
    document.querySelectorAll(`[data-toggle="offcanvas"][href="#${this.element.id}"]`).forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });
    });

    // Close button
    this.element.querySelectorAll('[data-dismiss="offcanvas"]').forEach(btn => {
      btn.addEventListener('click', () => this.hide());
    });

    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.options.keyboard && this.isShown) {
        this.hide();
      }
    });
  }

  show() {
    if (this.isShown || this.isTransitioning) return;

    const showEvent = new CustomEvent('show.zk.offcanvas');
    this.element.dispatchEvent(showEvent);
    if (showEvent.defaultPrevented) return;

    this.isShown = true;
    this.isTransitioning = true;

    if (this.options.backdrop) {
      this.showBackdrop();
    }

    if (!this.options.scroll) {
      document.body.style.overflow = 'hidden';
    }

    this.element.classList.add('showing');

    requestAnimationFrame(() => {
      this.element.classList.add('show');

      const complete = () => {
        this.element.classList.remove('showing');
        this.isTransitioning = false;

        // Focus management
        const autofocus = this.element.querySelector('[autofocus]');
        if (autofocus) {
          autofocus.focus();
        }

        this.element.dispatchEvent(new CustomEvent('shown.zk.offcanvas'));
      };

      this.element.addEventListener('transitionend', complete, { once: true });
    });
  }

  hide() {
    if (!this.isShown || this.isTransitioning) return;

    const hideEvent = new CustomEvent('hide.zk.offcanvas');
    this.element.dispatchEvent(hideEvent);
    if (hideEvent.defaultPrevented) return;

    this.isTransitioning = true;
    this.element.classList.add('hiding');
    this.element.classList.remove('show');

    const complete = () => {
      this.element.classList.remove('hiding');
      this.isShown = false;
      this.isTransitioning = false;

      if (!this.options.scroll) {
        document.body.style.overflow = '';
      }

      this.hideBackdrop();
      this.element.dispatchEvent(new CustomEvent('hidden.zk.offcanvas'));
    };

    this.element.addEventListener('transitionend', complete, { once: true });
  }

  toggle() {
    if (this.isShown) {
      this.hide();
    } else {
      this.show();
    }
  }

  showBackdrop() {
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'offcanvas-backdrop fade';
    document.body.appendChild(this.backdrop);

    requestAnimationFrame(() => {
      this.backdrop.classList.add('show');
    });

    this.backdrop.addEventListener('click', () => {
      if (this.options.backdrop === true) {
        this.hide();
      } else if (this.options.backdrop === 'static') {
        this.element.dispatchEvent(new CustomEvent('hidePrevented.zk.offcanvas'));
      }
    });
  }

  hideBackdrop() {
    if (!this.backdrop) return;

    this.backdrop.classList.remove('show');

    const complete = () => {
      if (this.backdrop && this.backdrop.parentNode) {
        this.backdrop.parentNode.removeChild(this.backdrop);
      }
      this.backdrop = null;
    };

    this.backdrop.addEventListener('transitionend', complete, { once: true });
  }

  // Static methods
  static instances = new WeakMap();

  static getInstance(element) {
    return Offcanvas.instances.get(element);
  }

  static getOrCreateInstance(element, options) {
    return Offcanvas.getInstance(element) || new Offcanvas(element, options);
  }

  static init(selector = '.offcanvas') {
    document.querySelectorAll(selector).forEach(el => {
      const instance = new Offcanvas(el);
      Offcanvas.instances.set(el, instance);
    });
  }
}

export default Offcanvas;
