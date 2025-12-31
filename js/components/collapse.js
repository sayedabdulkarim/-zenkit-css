// ========================================
// ZenKit - Collapse Component
// ========================================

class Collapse {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.element) return;

    this.options = {
      toggle: true,
      parent: null,
      ...options
    };

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

    if (this.options.toggle) {
      // Already handled by trigger elements
    }
  }

  toggle() {
    if (this.element.classList.contains('show')) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    if (this.isTransitioning || this.element.classList.contains('show')) return;

    // Close siblings if parent is set
    if (this.options.parent) {
      const parent = document.querySelector(this.options.parent);
      if (parent) {
        const siblings = parent.querySelectorAll('.collapse.show');
        siblings.forEach(sibling => {
          if (sibling !== this.element) {
            const collapseInstance = Collapse.getInstance(sibling);
            if (collapseInstance) collapseInstance.hide();
          }
        });
      }
    }

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
      this.element.dispatchEvent(new CustomEvent('shown.zk.collapse'));
    };

    this.element.addEventListener('transitionend', complete);
    this.element.dispatchEvent(new CustomEvent('show.zk.collapse'));
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
      this.element.dispatchEvent(new CustomEvent('hidden.zk.collapse'));
    };

    this.element.addEventListener('transitionend', complete);
    this.element.dispatchEvent(new CustomEvent('hide.zk.collapse'));
  }

  updateTriggers(isOpen) {
    this.triggerElements.forEach(trigger => {
      trigger.classList.toggle('collapsed', !isOpen);
      trigger.setAttribute('aria-expanded', isOpen);
    });
  }

  // Store instance on element
  static instances = new WeakMap();

  static getInstance(element) {
    return Collapse.instances.get(element);
  }

  static getOrCreateInstance(element, options) {
    return Collapse.getInstance(element) || new Collapse(element, options);
  }

  // Static method to initialize all collapses
  static init(selector = '[data-toggle="collapse"]') {
    document.querySelectorAll(selector).forEach(trigger => {
      const target = trigger.dataset.target || trigger.getAttribute('href');
      const element = document.querySelector(target);
      if (element && !Collapse.getInstance(element)) {
        const instance = new Collapse(element, { toggle: false });
        Collapse.instances.set(element, instance);
      }
    });
  }
}

export default Collapse;
