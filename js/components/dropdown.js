// ========================================
// ZenKit - Dropdown Component
// ========================================

class Dropdown {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.element) return;

    this.options = {
      offset: [0, 2],
      autoClose: true,
      ...options
    };

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

    // Keyboard navigation
    this.element.addEventListener('keydown', (e) => this.handleKeydown(e));
    if (this.menu) {
      this.menu.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    // Close on click outside
    document.addEventListener('click', (e) => this.handleClickOutside(e));
  }

  toggle() {
    if (this.isOpen) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    if (this.isOpen || !this.menu) return;

    // Close other dropdowns
    Dropdown.closeAll();

    const showEvent = new CustomEvent('show.zk.dropdown');
    this.element.dispatchEvent(showEvent);
    if (showEvent.defaultPrevented) return;

    this.menu.classList.add('show');
    this.menu.setAttribute('data-show', '');
    this.element.setAttribute('aria-expanded', 'true');
    this.isOpen = true;

    // Position the dropdown
    this.updatePosition();

    this.element.dispatchEvent(new CustomEvent('shown.zk.dropdown'));
  }

  hide() {
    if (!this.isOpen || !this.menu) return;

    const hideEvent = new CustomEvent('hide.zk.dropdown');
    this.element.dispatchEvent(hideEvent);
    if (hideEvent.defaultPrevented) return;

    this.menu.classList.remove('show');
    this.menu.removeAttribute('data-show');
    this.element.setAttribute('aria-expanded', 'false');
    this.isOpen = false;

    this.element.dispatchEvent(new CustomEvent('hidden.zk.dropdown'));
  }

  updatePosition() {
    if (!this.menu) return;

    const parent = this.element.closest('.dropdown, .dropup, .dropend, .dropstart');
    if (!parent) return;

    // Reset position
    this.menu.style.top = '';
    this.menu.style.left = '';
    this.menu.style.right = '';
    this.menu.style.bottom = '';

    const rect = this.element.getBoundingClientRect();
    const menuRect = this.menu.getBoundingClientRect();

    if (parent.classList.contains('dropup')) {
      this.menu.style.bottom = '100%';
      this.menu.style.top = 'auto';
    } else if (parent.classList.contains('dropend')) {
      this.menu.style.left = '100%';
      this.menu.style.top = '0';
    } else if (parent.classList.contains('dropstart')) {
      this.menu.style.right = '100%';
      this.menu.style.left = 'auto';
      this.menu.style.top = '0';
    } else {
      // Default dropdown
      this.menu.style.top = '100%';
    }

    // Check if menu goes off screen and adjust
    const updatedRect = this.menu.getBoundingClientRect();
    if (updatedRect.right > window.innerWidth) {
      this.menu.style.right = '0';
      this.menu.style.left = 'auto';
    }
    if (updatedRect.bottom > window.innerHeight && !parent.classList.contains('dropup')) {
      this.menu.style.bottom = '100%';
      this.menu.style.top = 'auto';
    }
  }

  handleKeydown(event) {
    const key = event.key;
    const isInput = /input|textarea/i.test(event.target.tagName);

    if (!['ArrowUp', 'ArrowDown', 'Escape', 'Enter', ' '].includes(key)) {
      return;
    }

    if (isInput && !['Escape', 'ArrowUp', 'ArrowDown'].includes(key)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (key === 'Escape') {
      this.hide();
      this.element.focus();
      return;
    }

    if (!this.isOpen && (key === 'ArrowUp' || key === 'ArrowDown')) {
      this.show();
      return;
    }

    const items = [...this.menu.querySelectorAll('.dropdown-item:not(.disabled):not(:disabled)')];
    if (!items.length) return;

    let index = items.indexOf(document.activeElement);

    if (key === 'ArrowUp') {
      index = index > 0 ? index - 1 : items.length - 1;
    } else if (key === 'ArrowDown') {
      index = index < items.length - 1 ? index + 1 : 0;
    } else if (key === 'Enter' || key === ' ') {
      if (index >= 0) {
        items[index].click();
      }
      return;
    }

    items[index].focus();
  }

  handleClickOutside(event) {
    if (!this.isOpen) return;
    if (this.element.contains(event.target) || this.menu.contains(event.target)) return;

    if (this.options.autoClose === true || this.options.autoClose === 'outside') {
      this.hide();
    }
  }

  // Static methods
  static instances = new WeakMap();

  static getInstance(element) {
    return Dropdown.instances.get(element);
  }

  static getOrCreateInstance(element, options) {
    return Dropdown.getInstance(element) || new Dropdown(element, options);
  }

  update() {
    if (this.isOpen) {
      this.updatePosition();
    }
  }

  dispose() {
    this.hide();
    Dropdown.instances.delete(this.element);
  }

  static closeAll() {
    document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
      menu.classList.remove('show');
      menu.removeAttribute('data-show');
      const toggle = menu.previousElementSibling;
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        const instance = Dropdown.getInstance(toggle);
        if (instance) instance.isOpen = false;
      }
    });
  }

  // Static method to initialize all dropdowns
  static init(selector = '[data-toggle="dropdown"], .dropdown-toggle') {
    document.querySelectorAll(selector).forEach(el => {
      const instance = new Dropdown(el);
      Dropdown.instances.set(el, instance);
    });
  }
}

export default Dropdown;
