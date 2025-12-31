// ========================================
// ZenKit - Modal Component
// ========================================

class Modal {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.element) return;

    this.options = {
      backdrop: true,
      keyboard: true,
      focus: true,
      ...options
    };

    this.dialog = this.element.querySelector('.modal-dialog');
    this.backdrop = null;
    this.isShown = false;
    this.isTransitioning = false;
    this.scrollbarWidth = 0;

    this.init();
  }

  init() {
    // Setup triggers
    document.querySelectorAll(`[data-toggle="modal"][data-target="#${this.element.id}"]`).forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.show();
      });
    });

    // Close button
    this.element.querySelectorAll('[data-dismiss="modal"]').forEach(btn => {
      btn.addEventListener('click', () => this.hide());
    });

    // Backdrop click
    this.element.addEventListener('click', (e) => {
      if (e.target === this.element && this.options.backdrop === true) {
        this.hide();
      }
    });

    // Keyboard
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.options.keyboard && this.isShown) {
        this.hide();
      }
    });
  }

  show() {
    if (this.isShown || this.isTransitioning) return;

    const showEvent = new CustomEvent('show.zk.modal');
    this.element.dispatchEvent(showEvent);
    if (showEvent.defaultPrevented) return;

    this.isShown = true;
    this.isTransitioning = true;

    this.scrollbarWidth = this.getScrollbarWidth();
    this.hideScrollbar();

    if (this.options.backdrop) {
      this.showBackdrop();
    }

    this.element.style.display = 'block';
    this.element.removeAttribute('aria-hidden');
    this.element.setAttribute('aria-modal', 'true');
    this.element.setAttribute('role', 'dialog');

    requestAnimationFrame(() => {
      this.element.classList.add('show');

      const complete = () => {
        this.isTransitioning = false;
        if (this.options.focus) {
          const autofocus = this.element.querySelector('[autofocus]');
          if (autofocus) {
            autofocus.focus();
          } else {
            this.dialog.focus();
          }
        }
        this.element.dispatchEvent(new CustomEvent('shown.zk.modal'));
      };

      if (this.element.classList.contains('fade')) {
        this.element.addEventListener('transitionend', complete, { once: true });
      } else {
        complete();
      }
    });
  }

  hide() {
    if (!this.isShown || this.isTransitioning) return;

    const hideEvent = new CustomEvent('hide.zk.modal');
    this.element.dispatchEvent(hideEvent);
    if (hideEvent.defaultPrevented) return;

    this.isShown = false;
    this.isTransitioning = true;

    this.element.classList.remove('show');

    const complete = () => {
      this.element.style.display = 'none';
      this.element.setAttribute('aria-hidden', 'true');
      this.element.removeAttribute('aria-modal');
      this.element.removeAttribute('role');
      this.isTransitioning = false;

      this.hideBackdrop();
      this.resetScrollbar();

      this.element.dispatchEvent(new CustomEvent('hidden.zk.modal'));
    };

    if (this.element.classList.contains('fade')) {
      this.element.addEventListener('transitionend', complete, { once: true });
    } else {
      complete();
    }
  }

  toggle() {
    if (this.isShown) {
      this.hide();
    } else {
      this.show();
    }
  }

  handleUpdate() {
    // Readjust modal position if height changes while open
    if (this.isShown && this.dialog) {
      const isOverflowing = this.element.scrollHeight > document.documentElement.clientHeight;
      this.element.style.paddingLeft = !isOverflowing ? `${this.scrollbarWidth}px` : '';
      this.element.style.paddingRight = isOverflowing ? `${this.scrollbarWidth}px` : '';
    }
  }

  dispose() {
    this.hide();
    Modal.instances.delete(this.element);
  }

  showBackdrop() {
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'modal-backdrop';
    if (this.element.classList.contains('fade')) {
      this.backdrop.classList.add('fade');
    }
    document.body.appendChild(this.backdrop);

    requestAnimationFrame(() => {
      this.backdrop.classList.add('show');
    });

    if (this.options.backdrop === 'static') {
      this.backdrop.addEventListener('click', () => {
        this.element.classList.add('modal-static');
        setTimeout(() => this.element.classList.remove('modal-static'), 300);
        this.element.dispatchEvent(new CustomEvent('hidePrevented.zk.modal'));
      });
    }
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

    if (this.backdrop.classList.contains('fade')) {
      this.backdrop.addEventListener('transitionend', complete, { once: true });
    } else {
      complete();
    }
  }

  getScrollbarWidth() {
    const scrollDiv = document.createElement('div');
    scrollDiv.style.cssText = 'width:100px;height:100px;overflow:scroll;position:absolute;top:-9999px;';
    document.body.appendChild(scrollDiv);
    const width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return width;
  }

  hideScrollbar() {
    const hasScrollbar = document.body.scrollHeight > document.documentElement.clientHeight;
    if (hasScrollbar) {
      document.body.style.paddingRight = `${this.scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
  }

  resetScrollbar() {
    document.body.style.paddingRight = '';
    document.body.style.overflow = '';
    document.body.classList.remove('modal-open');
  }

  // Static methods
  static instances = new WeakMap();

  static getInstance(element) {
    return Modal.instances.get(element);
  }

  static getOrCreateInstance(element, options) {
    return Modal.getInstance(element) || new Modal(element, options);
  }

  static init(selector = '.modal') {
    document.querySelectorAll(selector).forEach(el => {
      const instance = new Modal(el);
      Modal.instances.set(el, instance);
    });
  }
}

export default Modal;
