// ========================================
// ZenKit - Accordion Component
// ========================================

class Accordion {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.element) return;

    this.options = {
      alwaysOpen: false,
      ...options
    };

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
    const button = item.querySelector('.accordion-button');
    const collapse = item.querySelector('.accordion-collapse');
    const isOpen = collapse.classList.contains('show');

    if (!this.options.alwaysOpen) {
      // Close all other items
      this.items.forEach(otherItem => {
        if (otherItem !== item) {
          this.close(otherItem);
        }
      });
    }

    if (isOpen) {
      this.close(item);
    } else {
      this.open(item);
    }
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

      // Dispatch event
      this.element.dispatchEvent(new CustomEvent('shown.zk.accordion', {
        detail: { item }
      }));
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

      // Dispatch event
      this.element.dispatchEvent(new CustomEvent('hidden.zk.accordion', {
        detail: { item }
      }));
    };

    collapse.addEventListener('transitionend', transitionEnd);
  }

  // Static method to initialize all accordions
  static init(selector = '.accordion') {
    document.querySelectorAll(selector).forEach(el => new Accordion(el));
  }
}

export default Accordion;
