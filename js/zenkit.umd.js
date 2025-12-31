// ========================================
// ZenKit JavaScript Bundle (UMD)
// A minimal, modern JavaScript library for UI components
// ========================================

(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ZenKit = factory());
})(this, (function() {
  'use strict';

  // ========================================
  // Accordion Component
  // ========================================
  class Accordion {
    constructor(element, options = {}) {
      this.element = typeof element === 'string' ? document.querySelector(element) : element;
      if (!this.element) return;

      this.options = { alwaysOpen: false, ...options };
      this.items = this.element.querySelectorAll('.accordion-item');
      this.init();
    }

    init() {
      this.items.forEach(item => {
        const button = item.querySelector('.accordion-button');
        const collapse = item.querySelector('.accordion-collapse');
        if (button && collapse) {
          button.addEventListener('click', (e) => this.toggle(e, item));
        }
      });
    }

    toggle(event, item) {
      event.preventDefault();
      const collapse = item.querySelector('.accordion-collapse');
      const isOpen = collapse.classList.contains('show');

      if (!this.options.alwaysOpen) {
        this.items.forEach(otherItem => {
          if (otherItem !== item) this.close(otherItem);
        });
      }

      isOpen ? this.close(item) : this.open(item);
    }

    open(item) {
      const button = item.querySelector('.accordion-button');
      const collapse = item.querySelector('.accordion-collapse');

      button.classList.remove('collapsed');
      button.setAttribute('aria-expanded', 'true');
      collapse.classList.add('collapsing');
      collapse.style.height = '0px';

      requestAnimationFrame(() => {
        collapse.style.height = collapse.scrollHeight + 'px';
      });

      const transitionEnd = () => {
        collapse.classList.remove('collapsing');
        collapse.classList.add('show', 'collapse');
        collapse.style.height = '';
        collapse.removeEventListener('transitionend', transitionEnd);
      };

      collapse.addEventListener('transitionend', transitionEnd);
    }

    close(item) {
      const button = item.querySelector('.accordion-button');
      const collapse = item.querySelector('.accordion-collapse');

      if (!collapse.classList.contains('show')) return;

      button.classList.add('collapsed');
      button.setAttribute('aria-expanded', 'false');
      collapse.style.height = collapse.scrollHeight + 'px';
      collapse.classList.remove('show');

      requestAnimationFrame(() => {
        collapse.classList.add('collapsing');
        collapse.style.height = '0px';
      });

      const transitionEnd = () => {
        collapse.classList.remove('collapsing');
        collapse.classList.add('collapse');
        collapse.style.height = '';
        collapse.removeEventListener('transitionend', transitionEnd);
      };

      collapse.addEventListener('transitionend', transitionEnd);
    }

    static init(selector = '.accordion') {
      document.querySelectorAll(selector).forEach(el => new Accordion(el));
    }
  }

  // ========================================
  // Collapse Component
  // ========================================
  class Collapse {
    static instances = new WeakMap();

    constructor(element, options = {}) {
      this.element = typeof element === 'string' ? document.querySelector(element) : element;
      if (!this.element) return;

      this.options = { toggle: true, parent: null, ...options };
      this.isTransitioning = false;
      this.triggerElements = document.querySelectorAll(
        `[data-toggle="collapse"][data-target="#${this.element.id}"],` +
        `[data-toggle="collapse"][href="#${this.element.id}"]`
      );

      this.init();
    }

    init() {
      this.triggerElements.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggle();
        });
      });
    }

    toggle() {
      this.element.classList.contains('show') ? this.hide() : this.show();
    }

    show() {
      if (this.isTransitioning || this.element.classList.contains('show')) return;
      this.isTransitioning = true;
      this.element.classList.remove('collapse');
      this.element.classList.add('collapsing');
      this.element.style.height = '0px';
      this.updateTriggers(true);

      requestAnimationFrame(() => {
        this.element.style.height = this.element.scrollHeight + 'px';
      });

      const complete = () => {
        this.isTransitioning = false;
        this.element.classList.remove('collapsing');
        this.element.classList.add('collapse', 'show');
        this.element.style.height = '';
        this.element.removeEventListener('transitionend', complete);
      };

      this.element.addEventListener('transitionend', complete);
    }

    hide() {
      if (this.isTransitioning || !this.element.classList.contains('show')) return;
      this.isTransitioning = true;
      this.element.style.height = this.element.scrollHeight + 'px';
      this.element.classList.remove('show');
      this.updateTriggers(false);

      requestAnimationFrame(() => {
        this.element.classList.add('collapsing');
        this.element.style.height = '0px';
      });

      const complete = () => {
        this.isTransitioning = false;
        this.element.classList.remove('collapsing');
        this.element.classList.add('collapse');
        this.element.style.height = '';
        this.element.removeEventListener('transitionend', complete);
      };

      this.element.addEventListener('transitionend', complete);
    }

    updateTriggers(isOpen) {
      this.triggerElements.forEach(trigger => {
        trigger.classList.toggle('collapsed', !isOpen);
        trigger.setAttribute('aria-expanded', isOpen);
      });
    }

    static init(selector = '[data-toggle="collapse"]') {
      document.querySelectorAll(selector).forEach(trigger => {
        const target = trigger.dataset.target || trigger.getAttribute('href');
        const element = document.querySelector(target);
        if (element && !Collapse.instances.get(element)) {
          const instance = new Collapse(element, { toggle: false });
          Collapse.instances.set(element, instance);
        }
      });
    }
  }

  // ========================================
  // Tab Component
  // ========================================
  class Tab {
    constructor(element) {
      this.element = typeof element === 'string' ? document.querySelector(element) : element;
      if (!this.element) return;
      this.init();
    }

    init() {
      this.element.addEventListener('click', (e) => {
        e.preventDefault();
        this.show();
      });
    }

    show() {
      if (this.element.classList.contains('active') || this.element.classList.contains('disabled')) return;

      const target = this.getTarget();
      if (!target) return;

      const listElement = this.element.closest('.nav, .list-group');
      this.activate(this.element, listElement);
      this.activate(target, target.parentNode);
    }

    getTarget() {
      let target = this.element.dataset.target || this.element.getAttribute('href');
      return target && target !== '#' ? document.querySelector(target) : null;
    }

    activate(element, container) {
      if (!container) return;
      container.querySelectorAll('.active').forEach(active => {
        active.classList.remove('active', 'show');
      });
      element.classList.add('active');
      if (element.classList.contains('fade')) {
        requestAnimationFrame(() => element.classList.add('show'));
      }
    }

    static init(selector = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]') {
      document.querySelectorAll(selector).forEach(el => new Tab(el));
    }
  }

  // ========================================
  // Dropdown Component
  // ========================================
  class Dropdown {
    static instances = new WeakMap();

    constructor(element, options = {}) {
      this.element = typeof element === 'string' ? document.querySelector(element) : element;
      if (!this.element) return;

      this.options = { offset: [0, 2], autoClose: true, ...options };
      this.menu = this.element.nextElementSibling;
      if (!this.menu || !this.menu.classList.contains('dropdown-menu')) {
        this.menu = this.element.parentElement.querySelector('.dropdown-menu');
      }

      this.isOpen = false;
      this.init();
    }

    init() {
      this.element.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      });

      document.addEventListener('click', (e) => this.handleClickOutside(e));
    }

    toggle() {
      this.isOpen ? this.hide() : this.show();
    }

    show() {
      if (this.isOpen || !this.menu) return;
      Dropdown.closeAll();
      this.menu.classList.add('show');
      this.element.setAttribute('aria-expanded', 'true');
      this.isOpen = true;
    }

    hide() {
      if (!this.isOpen || !this.menu) return;
      this.menu.classList.remove('show');
      this.element.setAttribute('aria-expanded', 'false');
      this.isOpen = false;
    }

    handleClickOutside(event) {
      if (!this.isOpen) return;
      if (this.element.contains(event.target) || this.menu.contains(event.target)) return;
      this.hide();
    }

    static closeAll() {
      document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
        menu.classList.remove('show');
        const toggle = menu.previousElementSibling;
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    }

    static init(selector = '[data-toggle="dropdown"], .dropdown-toggle') {
      document.querySelectorAll(selector).forEach(el => {
        const instance = new Dropdown(el);
        Dropdown.instances.set(el, instance);
      });
    }
  }

  // ========================================
  // Modal Component
  // ========================================
  class Modal {
    static instances = new WeakMap();

    constructor(element, options = {}) {
      this.element = typeof element === 'string' ? document.querySelector(element) : element;
      if (!this.element) return;

      this.options = { backdrop: true, keyboard: true, focus: true, ...options };
      this.dialog = this.element.querySelector('.modal-dialog');
      this.backdrop = null;
      this.isShown = false;

      this.init();
    }

    init() {
      document.querySelectorAll(`[data-toggle="modal"][data-target="#${this.element.id}"]`).forEach(trigger => {
        trigger.addEventListener('click', (e) => { e.preventDefault(); this.show(); });
      });

      this.element.querySelectorAll('[data-dismiss="modal"]').forEach(btn => {
        btn.addEventListener('click', () => this.hide());
      });

      this.element.addEventListener('click', (e) => {
        if (e.target === this.element && this.options.backdrop === true) this.hide();
      });

      this.element.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.options.keyboard && this.isShown) this.hide();
      });
    }

    show() {
      if (this.isShown) return;
      this.isShown = true;
      document.body.style.overflow = 'hidden';

      if (this.options.backdrop) this.showBackdrop();

      this.element.style.display = 'block';
      requestAnimationFrame(() => this.element.classList.add('show'));
    }

    hide() {
      if (!this.isShown) return;
      this.isShown = false;
      this.element.classList.remove('show');

      setTimeout(() => {
        this.element.style.display = 'none';
        this.hideBackdrop();
        document.body.style.overflow = '';
      }, 300);
    }

    showBackdrop() {
      this.backdrop = document.createElement('div');
      this.backdrop.className = 'modal-backdrop fade';
      document.body.appendChild(this.backdrop);
      requestAnimationFrame(() => this.backdrop.classList.add('show'));
    }

    hideBackdrop() {
      if (this.backdrop) {
        this.backdrop.classList.remove('show');
        setTimeout(() => { if (this.backdrop) { this.backdrop.remove(); this.backdrop = null; } }, 150);
      }
    }

    static init(selector = '.modal') {
      document.querySelectorAll(selector).forEach(el => {
        const instance = new Modal(el);
        Modal.instances.set(el, instance);
      });
    }
  }

  // ========================================
  // Offcanvas Component
  // ========================================
  class Offcanvas {
    static instances = new WeakMap();

    constructor(element, options = {}) {
      this.element = typeof element === 'string' ? document.querySelector(element) : element;
      if (!this.element) return;

      this.options = { backdrop: true, keyboard: true, scroll: false, ...options };
      this.backdrop = null;
      this.isShown = false;

      this.init();
    }

    init() {
      document.querySelectorAll(`[data-toggle="offcanvas"][data-target="#${this.element.id}"], [data-toggle="offcanvas"][href="#${this.element.id}"]`).forEach(trigger => {
        trigger.addEventListener('click', (e) => { e.preventDefault(); this.toggle(); });
      });

      this.element.querySelectorAll('[data-dismiss="offcanvas"]').forEach(btn => {
        btn.addEventListener('click', () => this.hide());
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.options.keyboard && this.isShown) this.hide();
      });
    }

    toggle() {
      this.isShown ? this.hide() : this.show();
    }

    show() {
      if (this.isShown) return;
      this.isShown = true;
      if (this.options.backdrop) this.showBackdrop();
      if (!this.options.scroll) document.body.style.overflow = 'hidden';

      this.element.classList.add('showing');
      requestAnimationFrame(() => this.element.classList.add('show'));

      setTimeout(() => this.element.classList.remove('showing'), 300);
    }

    hide() {
      if (!this.isShown) return;
      this.element.classList.add('hiding');
      this.element.classList.remove('show');

      setTimeout(() => {
        this.element.classList.remove('hiding');
        this.isShown = false;
        if (!this.options.scroll) document.body.style.overflow = '';
        this.hideBackdrop();
      }, 300);
    }

    showBackdrop() {
      this.backdrop = document.createElement('div');
      this.backdrop.className = 'offcanvas-backdrop fade';
      document.body.appendChild(this.backdrop);
      requestAnimationFrame(() => this.backdrop.classList.add('show'));
      this.backdrop.addEventListener('click', () => this.hide());
    }

    hideBackdrop() {
      if (this.backdrop) {
        this.backdrop.classList.remove('show');
        setTimeout(() => { if (this.backdrop) { this.backdrop.remove(); this.backdrop = null; } }, 150);
      }
    }

    static init(selector = '.offcanvas') {
      document.querySelectorAll(selector).forEach(el => {
        const instance = new Offcanvas(el);
        Offcanvas.instances.set(el, instance);
      });
    }
  }

  // ========================================
  // Toast Component
  // ========================================
  class Toast {
    static instances = new WeakMap();

    constructor(element, options = {}) {
      this.element = typeof element === 'string' ? document.querySelector(element) : element;
      if (!this.element) return;

      this.options = { animation: true, autohide: true, delay: 5000, ...options };
      this.timeout = null;
      this.isShown = false;

      this.init();
    }

    init() {
      const closeBtn = this.element.querySelector('[data-dismiss="toast"]');
      if (closeBtn) closeBtn.addEventListener('click', () => this.hide());

      if (this.element.classList.contains('show')) {
        this.isShown = true;
        if (this.options.autohide) this.scheduleHide();
      }
    }

    show() {
      if (this.isShown) return;
      this.element.classList.remove('hide');
      this.element.classList.add('show');
      this.isShown = true;
      if (this.options.autohide) this.scheduleHide();
    }

    hide() {
      if (!this.isShown) return;
      this.clearTimeout();
      this.element.classList.remove('show');
      this.element.classList.add('hide');
      this.isShown = false;
    }

    scheduleHide() {
      this.clearTimeout();
      this.timeout = setTimeout(() => this.hide(), this.options.delay);
    }

    clearTimeout() {
      if (this.timeout) { clearTimeout(this.timeout); this.timeout = null; }
    }

    static init(selector = '.toast') {
      document.querySelectorAll(selector).forEach(el => {
        const instance = new Toast(el);
        Toast.instances.set(el, instance);
      });
    }

    static create(options = {}) {
      const { title = '', message = '', type = '', autohide = true, delay = 5000, container = '.toast-container' } = options;
      const containerEl = document.querySelector(container) || document.body;
      const toast = document.createElement('div');
      toast.className = `toast ${type ? `toast-${type}` : ''} fade`;

      toast.innerHTML = title
        ? `<div class="toast-header"><strong class="me-auto">${title}</strong><button type="button" class="btn-close" data-dismiss="toast"></button></div><div class="toast-body">${message}</div>`
        : `<div class="toast-body d-flex align-items-center justify-content-between"><span>${message}</span><button type="button" class="btn-close" data-dismiss="toast"></button></div>`;

      containerEl.appendChild(toast);
      const instance = new Toast(toast, { autohide, delay });
      Toast.instances.set(toast, instance);
      instance.show();
      return instance;
    }
  }

  // ========================================
  // Tooltip Component
  // ========================================
  class Tooltip {
    static instances = new WeakMap();

    constructor(element, options = {}) {
      this.element = typeof element === 'string' ? document.querySelector(element) : element;
      if (!this.element) return;

      this.options = { placement: 'top', trigger: 'hover focus', title: '', delay: { show: 0, hide: 0 }, animation: true, ...options };
      this.title = this.element.getAttribute('title') || this.element.dataset.title || this.options.title;

      if (this.element.hasAttribute('title')) {
        this.element.dataset.originalTitle = this.element.getAttribute('title');
        this.element.removeAttribute('title');
      }

      this.tooltip = null;
      this.isShown = false;

      this.init();
    }

    init() {
      const triggers = this.options.trigger.split(' ');
      triggers.forEach(trigger => {
        if (trigger === 'hover') {
          this.element.addEventListener('mouseenter', () => this.show());
          this.element.addEventListener('mouseleave', () => this.hide());
        } else if (trigger === 'focus') {
          this.element.addEventListener('focus', () => this.show());
          this.element.addEventListener('blur', () => this.hide());
        } else if (trigger === 'click') {
          this.element.addEventListener('click', (e) => { e.preventDefault(); this.toggle(); });
        }
      });
    }

    show() {
      if (this.isShown || !this.title) return;

      this.tooltip = document.createElement('div');
      this.tooltip.className = `tooltip tooltip-${this.options.placement} fade`;
      this.tooltip.innerHTML = `<div class="tooltip-arrow"></div><div class="tooltip-inner">${this.title}</div>`;
      document.body.appendChild(this.tooltip);

      this.updatePosition();
      requestAnimationFrame(() => { this.tooltip.classList.add('show'); this.isShown = true; });
    }

    hide() {
      if (!this.isShown || !this.tooltip) return;
      this.tooltip.classList.remove('show');
      setTimeout(() => { if (this.tooltip) { this.tooltip.remove(); this.tooltip = null; } this.isShown = false; }, 150);
    }

    toggle() {
      this.isShown ? this.hide() : this.show();
    }

    updatePosition() {
      if (!this.tooltip) return;
      const rect = this.element.getBoundingClientRect();
      const tooltipRect = this.tooltip.getBoundingClientRect();
      let top, left;
      const spacing = 8;

      switch (this.options.placement) {
        case 'top': top = rect.top - tooltipRect.height - spacing; left = rect.left + (rect.width - tooltipRect.width) / 2; break;
        case 'bottom': top = rect.bottom + spacing; left = rect.left + (rect.width - tooltipRect.width) / 2; break;
        case 'left': top = rect.top + (rect.height - tooltipRect.height) / 2; left = rect.left - tooltipRect.width - spacing; break;
        case 'right': top = rect.top + (rect.height - tooltipRect.height) / 2; left = rect.right + spacing; break;
      }

      this.tooltip.style.top = `${top + window.scrollY}px`;
      this.tooltip.style.left = `${left + window.scrollX}px`;
    }

    static init(selector = '[data-toggle="tooltip"], [data-tooltip]') {
      document.querySelectorAll(selector).forEach(el => {
        const instance = new Tooltip(el, { placement: el.dataset.placement || 'top', title: el.dataset.tooltip || el.getAttribute('title') });
        Tooltip.instances.set(el, instance);
      });
    }
  }

  // ========================================
  // Popover Component
  // ========================================
  class Popover {
    static instances = new WeakMap();

    constructor(element, options = {}) {
      this.element = typeof element === 'string' ? document.querySelector(element) : element;
      if (!this.element) return;

      this.options = { placement: 'top', trigger: 'click', title: '', content: '', animation: true, ...options };
      this.title = this.element.dataset.title || this.options.title;
      this.content = this.element.dataset.content || this.options.content;

      this.popover = null;
      this.isShown = false;

      this.init();
    }

    init() {
      const triggers = this.options.trigger.split(' ');
      triggers.forEach(trigger => {
        if (trigger === 'click') {
          this.element.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); this.toggle(); });
        }
      });

      document.addEventListener('click', (e) => {
        if (this.isShown && !this.element.contains(e.target) && this.popover && !this.popover.contains(e.target)) {
          this.hide();
        }
      });
    }

    show() {
      if (this.isShown) return;

      this.popover = document.createElement('div');
      this.popover.className = `popover popover-${this.options.placement} fade`;

      let html = '<div class="popover-arrow"></div>';
      if (this.title) html += `<h3 class="popover-header">${this.title}</h3>`;
      if (this.content) html += `<div class="popover-body">${this.content}</div>`;
      this.popover.innerHTML = html;

      document.body.appendChild(this.popover);
      this.updatePosition();
      requestAnimationFrame(() => { this.popover.classList.add('show'); this.isShown = true; });
    }

    hide() {
      if (!this.isShown || !this.popover) return;
      this.popover.classList.remove('show');
      setTimeout(() => { if (this.popover) { this.popover.remove(); this.popover = null; } this.isShown = false; }, 150);
    }

    toggle() {
      this.isShown ? this.hide() : this.show();
    }

    updatePosition() {
      if (!this.popover) return;
      const rect = this.element.getBoundingClientRect();
      const popoverRect = this.popover.getBoundingClientRect();
      let top, left;
      const spacing = 12;

      switch (this.options.placement) {
        case 'top': top = rect.top - popoverRect.height - spacing; left = rect.left + (rect.width - popoverRect.width) / 2; break;
        case 'bottom': top = rect.bottom + spacing; left = rect.left + (rect.width - popoverRect.width) / 2; break;
        case 'left': top = rect.top + (rect.height - popoverRect.height) / 2; left = rect.left - popoverRect.width - spacing; break;
        case 'right': top = rect.top + (rect.height - popoverRect.height) / 2; left = rect.right + spacing; break;
      }

      this.popover.style.top = `${top + window.scrollY}px`;
      this.popover.style.left = `${left + window.scrollX}px`;
    }

    static init(selector = '[data-toggle="popover"]') {
      document.querySelectorAll(selector).forEach(el => {
        const instance = new Popover(el, { placement: el.dataset.placement || 'top', title: el.dataset.title, content: el.dataset.content });
        Popover.instances.set(el, instance);
      });
    }
  }

  // ========================================
  // Carousel Component
  // ========================================
  class Carousel {
    static instances = new WeakMap();

    constructor(element, options = {}) {
      this.element = typeof element === 'string' ? document.querySelector(element) : element;
      if (!this.element) return;

      this.options = { interval: 5000, keyboard: true, pause: 'hover', ride: false, wrap: true, touch: true, ...options };
      this.items = this.element.querySelectorAll('.carousel-item');
      this.indicators = this.element.querySelectorAll('.carousel-indicators [data-slide-to]');

      this.activeIndex = 0;
      this.isSliding = false;
      this.interval = null;

      this.init();
    }

    init() {
      this.items.forEach((item, index) => {
        if (item.classList.contains('active')) this.activeIndex = index;
      });

      const prevBtn = this.element.querySelector('.carousel-control-prev');
      const nextBtn = this.element.querySelector('.carousel-control-next');

      if (prevBtn) prevBtn.addEventListener('click', (e) => { e.preventDefault(); this.prev(); });
      if (nextBtn) nextBtn.addEventListener('click', (e) => { e.preventDefault(); this.next(); });

      this.indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => { e.preventDefault(); this.goTo(index); });
      });

      if (this.options.pause === 'hover') {
        this.element.addEventListener('mouseenter', () => this.pause());
        this.element.addEventListener('mouseleave', () => this.cycle());
      }

      if (this.options.ride) this.cycle();
    }

    next() { if (!this.isSliding) this.slide('next'); }
    prev() { if (!this.isSliding) this.slide('prev'); }

    goTo(index) {
      if (this.isSliding || index === this.activeIndex) return;
      this.slide(index > this.activeIndex ? 'next' : 'prev', index);
    }

    slide(direction, targetIndex = null) {
      const activeItem = this.items[this.activeIndex];
      let nextIndex = targetIndex !== null ? targetIndex :
        direction === 'next' ? (this.activeIndex + 1) % this.items.length : (this.activeIndex - 1 + this.items.length) % this.items.length;

      if (!this.options.wrap && (nextIndex < 0 || nextIndex >= this.items.length)) return;

      const nextItem = this.items[nextIndex];
      if (!nextItem) return;

      this.isSliding = true;
      const directionalClass = direction === 'next' ? 'carousel-item-start' : 'carousel-item-end';
      const orderClass = direction === 'next' ? 'carousel-item-next' : 'carousel-item-prev';

      nextItem.classList.add(orderClass);
      nextItem.offsetHeight;
      activeItem.classList.add(directionalClass);
      nextItem.classList.add(directionalClass);

      setTimeout(() => {
        nextItem.classList.remove(directionalClass, orderClass);
        nextItem.classList.add('active');
        activeItem.classList.remove('active', directionalClass, orderClass);
        this.isSliding = false;
        this.activeIndex = nextIndex;
        this.updateIndicators();
      }, 600);
    }

    updateIndicators() {
      this.indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === this.activeIndex);
      });
    }

    cycle() {
      if (this.interval) clearInterval(this.interval);
      if (this.options.interval) this.interval = setInterval(() => this.next(), this.options.interval);
    }

    pause() {
      if (this.interval) { clearInterval(this.interval); this.interval = null; }
    }

    static init(selector = '.carousel') {
      document.querySelectorAll(selector).forEach(el => {
        const instance = new Carousel(el, {
          interval: el.dataset.interval ? parseInt(el.dataset.interval) : 5000,
          ride: el.dataset.ride || false
        });
        Carousel.instances.set(el, instance);
      });
    }
  }

  // ========================================
  // ScrollSpy Component
  // ========================================
  class ScrollSpy {
    static instances = new WeakMap();

    constructor(element, options = {}) {
      this.element = typeof element === 'string' ? document.querySelector(element) : element;
      if (!this.element) return;

      this.options = { target: null, offset: 10, ...options };
      this.targetElement = this.options.target ? document.querySelector(this.options.target) : null;
      this.offsets = [];
      this.targets = [];
      this.activeTarget = null;

      this.init();
    }

    init() {
      this.refresh();
      window.addEventListener('scroll', () => this.process());
    }

    refresh() {
      if (!this.targetElement) return;
      const links = this.targetElement.querySelectorAll('.nav-link, a');

      links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;

        this.offsets.push(target.offsetTop);
        this.targets.push({ link, target, href });
      });
    }

    process() {
      const scrollPos = window.pageYOffset + this.options.offset;

      for (let i = this.offsets.length - 1; i >= 0; i--) {
        if (scrollPos >= this.offsets[i]) {
          if (this.activeTarget !== this.targets[i].href) {
            this.activate(this.targets[i]);
          }
          return;
        }
      }

      if (this.activeTarget !== null) this.clear();
    }

    activate(target) {
      this.activeTarget = target.href;
      this.clear();
      target.link.classList.add('active');
    }

    clear() {
      if (!this.targetElement) return;
      this.targetElement.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
    }

    static init(selector = '[data-spy="scroll"]') {
      document.querySelectorAll(selector).forEach(el => {
        const instance = new ScrollSpy(el, { target: el.dataset.target, offset: parseInt(el.dataset.offset) || 10 });
        ScrollSpy.instances.set(el, instance);
      });
    }
  }

  // ========================================
  // Auto Initialize
  // ========================================
  const initAll = () => {
    Accordion.init();
    Collapse.init();
    Tab.init();
    Dropdown.init();
    Modal.init();
    Offcanvas.init();
    Toast.init();
    Tooltip.init();
    Popover.init();
    Carousel.init();
    ScrollSpy.init();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // ========================================
  // Export
  // ========================================
  return {
    Accordion,
    Collapse,
    Tab,
    Dropdown,
    Modal,
    Offcanvas,
    Toast,
    Tooltip,
    Popover,
    Carousel,
    ScrollSpy,
    init: initAll
  };

}));
