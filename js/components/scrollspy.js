// ========================================
// ZenKit - ScrollSpy Component
// ========================================

class ScrollSpy {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.element) return;

    this.options = {
      target: null,
      offset: 10,
      method: 'auto',
      rootMargin: '0px 0px -25%',
      smoothScroll: false,
      threshold: [0.1, 0.5, 1],
      ...options
    };

    this.targetElement = this.options.target ?
      document.querySelector(this.options.target) : null;

    this.scrollElement = this.getScrollElement();
    this.offsets = [];
    this.targets = [];
    this.activeTarget = null;
    this.observer = null;

    this.init();
  }

  init() {
    this.refresh();

    if ('IntersectionObserver' in window) {
      this.initObserver();
    } else {
      this.scrollElement.addEventListener('scroll', () => this.process());
    }

    // Enable smooth scroll for nav links if option is set
    if (this.options.smoothScroll && this.targetElement) {
      this.targetElement.querySelectorAll('.nav-link, .list-group-item, a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        });
      });
    }
  }

  getScrollElement() {
    if (this.element.tagName === 'BODY') {
      return window;
    }
    return this.element;
  }

  refresh() {
    this.offsets = [];
    this.targets = [];

    if (!this.targetElement) return;

    const links = this.targetElement.querySelectorAll('.nav-link, .list-group-item, a');

    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const offsetTop = rect.top + (this.scrollElement === window ? window.pageYOffset : this.element.scrollTop);

      this.offsets.push(offsetTop);
      this.targets.push({ link, target, href });
    });

    // Sort by offset
    const combined = this.offsets.map((offset, i) => ({ offset, ...this.targets[i] }));
    combined.sort((a, b) => a.offset - b.offset);

    this.offsets = combined.map(item => item.offset);
    this.targets = combined.map(item => ({ link: item.link, target: item.target, href: item.href }));
  }

  initObserver() {
    const options = {
      root: this.element === document.body ? null : this.element,
      rootMargin: this.options.rootMargin,
      threshold: this.options.threshold
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = '#' + entry.target.id;
          const target = this.targets.find(t => t.href === id);
          if (target) {
            this.activate(target);
          }
        }
      });
    }, options);

    this.targets.forEach(({ target }) => {
      if (target) {
        this.observer.observe(target);
      }
    });
  }

  process() {
    const scrollPos = this.scrollElement === window ?
      window.pageYOffset : this.element.scrollTop;

    const scrollHeight = this.scrollElement === window ?
      document.documentElement.scrollHeight : this.element.scrollHeight;

    const maxScroll = scrollHeight - (this.scrollElement === window ?
      window.innerHeight : this.element.clientHeight);

    // Check if at bottom
    if (scrollPos >= maxScroll) {
      const last = this.targets[this.targets.length - 1];
      if (last && this.activeTarget !== last.href) {
        this.activate(last);
      }
      return;
    }

    // Check if scrolled past all sections
    if (scrollPos < this.offsets[0]) {
      if (this.activeTarget !== null) {
        this.clear();
      }
      return;
    }

    // Find active section
    for (let i = this.offsets.length - 1; i >= 0; i--) {
      if (scrollPos >= this.offsets[i] - this.options.offset) {
        if (this.activeTarget !== this.targets[i].href) {
          this.activate(this.targets[i]);
        }
        return;
      }
    }
  }

  activate(target) {
    this.activeTarget = target.href;
    this.clear();

    target.link.classList.add('active');

    // Also activate parent nav items
    let parent = target.link.parentElement;
    while (parent) {
      if (parent.classList.contains('nav') || parent.classList.contains('list-group')) {
        break;
      }
      if (parent.classList.contains('nav-item') || parent.classList.contains('dropdown')) {
        const parentLink = parent.querySelector('.nav-link, .dropdown-toggle');
        if (parentLink) {
          parentLink.classList.add('active');
        }
      }
      parent = parent.parentElement;
    }

    this.element.dispatchEvent(new CustomEvent('activate.zk.scrollspy', {
      detail: { relatedTarget: target.target }
    }));
  }

  clear() {
    if (!this.targetElement) return;

    this.targetElement.querySelectorAll('.active').forEach(el => {
      el.classList.remove('active');
    });
  }

  dispose() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.clear();
  }

  // Static methods
  static instances = new WeakMap();

  static getInstance(element) {
    return ScrollSpy.instances.get(element);
  }

  static getOrCreateInstance(element, options) {
    return ScrollSpy.getInstance(element) || new ScrollSpy(element, options);
  }

  static init(selector = '[data-spy="scroll"]') {
    document.querySelectorAll(selector).forEach(el => {
      const instance = new ScrollSpy(el, {
        target: el.dataset.target,
        offset: el.dataset.offset ? parseInt(el.dataset.offset) : 10,
        rootMargin: el.dataset.rootMargin || '0px 0px -25%',
        smoothScroll: el.dataset.smoothScroll === 'true'
      });
      ScrollSpy.instances.set(el, instance);
    });
  }
}

export default ScrollSpy;
