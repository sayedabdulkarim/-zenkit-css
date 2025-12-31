// ========================================
// ZenKit - Popover Component
// ========================================

class Popover {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.element) return;

    this.options = {
      placement: 'top',
      trigger: 'click',
      title: '',
      content: '',
      html: false,
      container: 'body',
      animation: true,
      customClass: '',
      boundary: 'clippingParents',
      fallbackPlacements: ['top', 'right', 'bottom', 'left'],
      offset: [0, 8],
      sanitize: true,
      ...options
    };

    // Get content from data attributes or options
    this.title = this.element.dataset.title || this.options.title;
    this.content = this.element.dataset.content || this.options.content;

    this.popover = null;
    this.isShown = false;
    this.enabled = true;

    this.init();
  }

  init() {
    const triggers = this.options.trigger.split(' ');

    triggers.forEach(trigger => {
      switch (trigger) {
        case 'hover':
          this.element.addEventListener('mouseenter', () => this.show());
          this.element.addEventListener('mouseleave', () => this.hide());
          break;
        case 'focus':
          this.element.addEventListener('focus', () => this.show());
          this.element.addEventListener('blur', () => this.hide());
          break;
        case 'click':
          this.element.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggle();
          });
          break;
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (this.isShown && !this.element.contains(e.target) &&
          this.popover && !this.popover.contains(e.target)) {
        this.hide();
      }
    });
  }

  createPopover() {
    const popover = document.createElement('div');
    popover.className = `popover popover-${this.options.placement}`;
    if (this.options.animation) {
      popover.classList.add('fade');
    }
    if (this.options.customClass) {
      popover.classList.add(...this.options.customClass.split(' '));
    }
    popover.setAttribute('role', 'tooltip');

    const arrow = document.createElement('div');
    arrow.className = 'popover-arrow';
    popover.appendChild(arrow);

    if (this.title) {
      const header = document.createElement('h3');
      header.className = 'popover-header';
      if (this.options.html) {
        header.innerHTML = this.title;
      } else {
        header.textContent = this.title;
      }
      popover.appendChild(header);
    }

    if (this.content) {
      const body = document.createElement('div');
      body.className = 'popover-body';
      if (this.options.html) {
        body.innerHTML = this.content;
      } else {
        body.textContent = this.content;
      }
      popover.appendChild(body);
    }

    return popover;
  }

  show() {
    if (this.isShown || !this.enabled) return;

    const showEvent = new CustomEvent('show.zk.popover');
    this.element.dispatchEvent(showEvent);
    if (showEvent.defaultPrevented) return;

    this.popover = this.createPopover();
    const container = document.querySelector(this.options.container) || document.body;
    container.appendChild(this.popover);

    // Fire inserted event after template added to DOM
    this.element.dispatchEvent(new CustomEvent('inserted.zk.popover'));

    this.updatePosition();

    requestAnimationFrame(() => {
      this.popover.classList.add('show');
      this.isShown = true;
      this.element.dispatchEvent(new CustomEvent('shown.zk.popover'));
    });
  }

  hide() {
    if (!this.isShown || !this.popover) return;

    const hideEvent = new CustomEvent('hide.zk.popover');
    this.element.dispatchEvent(hideEvent);
    if (hideEvent.defaultPrevented) return;

    this.popover.classList.remove('show');

    const complete = () => {
      if (this.popover && this.popover.parentNode) {
        this.popover.parentNode.removeChild(this.popover);
      }
      this.popover = null;
      this.isShown = false;
      this.element.dispatchEvent(new CustomEvent('hidden.zk.popover'));
    };

    if (this.options.animation) {
      this.popover.addEventListener('transitionend', complete, { once: true });
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

  updatePosition() {
    if (!this.popover) return;

    const rect = this.element.getBoundingClientRect();
    const popoverRect = this.popover.getBoundingClientRect();
    const arrow = this.popover.querySelector('.popover-arrow');

    let top, left;
    const spacing = 12;

    switch (this.options.placement) {
      case 'top':
        top = rect.top - popoverRect.height - spacing;
        left = rect.left + (rect.width - popoverRect.width) / 2;
        break;
      case 'bottom':
        top = rect.bottom + spacing;
        left = rect.left + (rect.width - popoverRect.width) / 2;
        break;
      case 'left':
        top = rect.top + (rect.height - popoverRect.height) / 2;
        left = rect.left - popoverRect.width - spacing;
        break;
      case 'right':
        top = rect.top + (rect.height - popoverRect.height) / 2;
        left = rect.right + spacing;
        break;
    }

    // Adjust for scroll
    top += window.scrollY;
    left += window.scrollX;

    // Keep within viewport
    if (left < 0) left = spacing;
    if (left + popoverRect.width > window.innerWidth) {
      left = window.innerWidth - popoverRect.width - spacing;
    }
    if (top < window.scrollY) {
      // Flip to bottom if not enough space on top
      top = rect.bottom + spacing + window.scrollY;
    }

    this.popover.style.top = `${top}px`;
    this.popover.style.left = `${left}px`;

    // Position arrow
    if (arrow) {
      const arrowLeft = rect.left + rect.width / 2 - left - window.scrollX;
      if (this.options.placement === 'top' || this.options.placement === 'bottom') {
        arrow.style.left = `${arrowLeft}px`;
      }
    }
  }

  setContent(content) {
    this.content = content;
    if (this.popover) {
      const body = this.popover.querySelector('.popover-body');
      if (body) {
        if (this.options.html) {
          body.innerHTML = content;
        } else {
          body.textContent = content;
        }
      }
    }
  }

  dispose() {
    this.hide();
    Popover.instances.delete(this.element);
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  toggleEnabled() {
    this.enabled = !this.enabled;
  }

  update() {
    if (this.isShown) {
      this.updatePosition();
    }
  }

  // Static methods
  static instances = new WeakMap();

  static getInstance(element) {
    return Popover.instances.get(element);
  }

  static getOrCreateInstance(element, options) {
    return Popover.getInstance(element) || new Popover(element, options);
  }

  static init(selector = '[data-toggle="popover"]') {
    document.querySelectorAll(selector).forEach(el => {
      const instance = new Popover(el, {
        placement: el.dataset.placement || 'top',
        title: el.dataset.title,
        content: el.dataset.content,
        trigger: el.dataset.trigger || 'click'
      });
      Popover.instances.set(el, instance);
    });
  }
}

export default Popover;
