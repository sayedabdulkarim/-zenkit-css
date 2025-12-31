// ========================================
// ZenKit - Tooltip Component
// ========================================

class Tooltip {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.element) return;

    this.options = {
      placement: 'top',
      trigger: 'hover focus',
      title: '',
      delay: { show: 0, hide: 0 },
      html: false,
      container: 'body',
      animation: true,
      customClass: '',
      boundary: 'clippingParents',
      fallbackPlacements: ['top', 'right', 'bottom', 'left'],
      offset: [0, 6],
      sanitize: true,
      ...options
    };

    // Get title from data attribute or options
    this.title = this.element.getAttribute('title') ||
                 this.element.dataset.title ||
                 this.options.title;

    // Remove native title to prevent default tooltip
    if (this.element.hasAttribute('title')) {
      this.element.dataset.originalTitle = this.element.getAttribute('title');
      this.element.removeAttribute('title');
    }

    this.tooltip = null;
    this.isShown = false;
    this.showTimeout = null;
    this.hideTimeout = null;
    this.enabled = true;

    this.init();
  }

  init() {
    const triggers = this.options.trigger.split(' ');

    triggers.forEach(trigger => {
      switch (trigger) {
        case 'hover':
          this.element.addEventListener('mouseenter', () => this.scheduleShow());
          this.element.addEventListener('mouseleave', () => this.scheduleHide());
          break;
        case 'focus':
          this.element.addEventListener('focus', () => this.scheduleShow());
          this.element.addEventListener('blur', () => this.scheduleHide());
          break;
        case 'click':
          this.element.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggle();
          });
          break;
      }
    });
  }

  createTooltip() {
    const tooltip = document.createElement('div');
    tooltip.className = `tooltip tooltip-${this.options.placement}`;
    if (this.options.animation) {
      tooltip.classList.add('fade');
    }
    if (this.options.customClass) {
      tooltip.classList.add(...this.options.customClass.split(' '));
    }
    tooltip.setAttribute('role', 'tooltip');

    const arrow = document.createElement('div');
    arrow.className = 'tooltip-arrow';

    const inner = document.createElement('div');
    inner.className = 'tooltip-inner';
    if (this.options.html) {
      inner.innerHTML = this.title;
    } else {
      inner.textContent = this.title;
    }

    tooltip.appendChild(arrow);
    tooltip.appendChild(inner);

    return tooltip;
  }

  show() {
    if (this.isShown || !this.title || !this.enabled) return;

    const showEvent = new CustomEvent('show.zk.tooltip');
    this.element.dispatchEvent(showEvent);
    if (showEvent.defaultPrevented) return;

    this.tooltip = this.createTooltip();
    const container = document.querySelector(this.options.container) || document.body;
    container.appendChild(this.tooltip);

    // Fire inserted event after template added to DOM
    this.element.dispatchEvent(new CustomEvent('inserted.zk.tooltip'));

    this.updatePosition();

    requestAnimationFrame(() => {
      this.tooltip.classList.add('show');
      this.isShown = true;
      this.element.dispatchEvent(new CustomEvent('shown.zk.tooltip'));
    });
  }

  hide() {
    if (!this.isShown || !this.tooltip) return;

    const hideEvent = new CustomEvent('hide.zk.tooltip');
    this.element.dispatchEvent(hideEvent);
    if (hideEvent.defaultPrevented) return;

    this.tooltip.classList.remove('show');

    const complete = () => {
      if (this.tooltip && this.tooltip.parentNode) {
        this.tooltip.parentNode.removeChild(this.tooltip);
      }
      this.tooltip = null;
      this.isShown = false;
      this.element.dispatchEvent(new CustomEvent('hidden.zk.tooltip'));
    };

    if (this.options.animation) {
      this.tooltip.addEventListener('transitionend', complete, { once: true });
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

  scheduleShow() {
    this.clearTimeouts();
    const delay = typeof this.options.delay === 'object' ? this.options.delay.show : this.options.delay;
    this.showTimeout = setTimeout(() => this.show(), delay);
  }

  scheduleHide() {
    this.clearTimeouts();
    const delay = typeof this.options.delay === 'object' ? this.options.delay.hide : this.options.delay;
    this.hideTimeout = setTimeout(() => this.hide(), delay);
  }

  clearTimeouts() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  updatePosition() {
    if (!this.tooltip) return;

    const rect = this.element.getBoundingClientRect();
    const tooltipRect = this.tooltip.getBoundingClientRect();
    const arrow = this.tooltip.querySelector('.tooltip-arrow');

    let top, left;
    const spacing = 8;

    switch (this.options.placement) {
      case 'top':
        top = rect.top - tooltipRect.height - spacing;
        left = rect.left + (rect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = rect.bottom + spacing;
        left = rect.left + (rect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = rect.top + (rect.height - tooltipRect.height) / 2;
        left = rect.left - tooltipRect.width - spacing;
        break;
      case 'right':
        top = rect.top + (rect.height - tooltipRect.height) / 2;
        left = rect.right + spacing;
        break;
    }

    // Adjust for scroll
    top += window.scrollY;
    left += window.scrollX;

    // Keep within viewport
    if (left < 0) left = spacing;
    if (left + tooltipRect.width > window.innerWidth) {
      left = window.innerWidth - tooltipRect.width - spacing;
    }

    this.tooltip.style.top = `${top}px`;
    this.tooltip.style.left = `${left}px`;

    // Position arrow
    if (arrow) {
      const arrowLeft = rect.left + rect.width / 2 - left - window.scrollX;
      if (this.options.placement === 'top' || this.options.placement === 'bottom') {
        arrow.style.left = `${arrowLeft}px`;
      }
    }
  }

  dispose() {
    this.clearTimeouts();
    this.hide();

    // Restore original title
    if (this.element.dataset.originalTitle) {
      this.element.setAttribute('title', this.element.dataset.originalTitle);
      delete this.element.dataset.originalTitle;
    }

    Tooltip.instances.delete(this.element);
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

  setContent(content) {
    this.title = content;
    if (this.tooltip) {
      const inner = this.tooltip.querySelector('.tooltip-inner');
      if (inner) {
        if (this.options.html) {
          inner.innerHTML = content;
        } else {
          inner.textContent = content;
        }
      }
    }
  }

  update() {
    if (this.isShown) {
      this.updatePosition();
    }
  }

  // Static methods
  static instances = new WeakMap();

  static getInstance(element) {
    return Tooltip.instances.get(element);
  }

  static getOrCreateInstance(element, options) {
    return Tooltip.getInstance(element) || new Tooltip(element, options);
  }

  static init(selector = '[data-toggle="tooltip"], [data-tooltip]') {
    document.querySelectorAll(selector).forEach(el => {
      const instance = new Tooltip(el, {
        placement: el.dataset.placement || 'top',
        title: el.dataset.tooltip || el.getAttribute('title')
      });
      Tooltip.instances.set(el, instance);
    });
  }
}

export default Tooltip;
