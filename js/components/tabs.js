// ========================================
// ZenKit - Tabs Component
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
    if (this.element.classList.contains('active') || this.element.classList.contains('disabled')) {
      return;
    }

    const target = this.getTarget();
    if (!target) return;

    const listElement = this.element.closest('.nav, .list-group');
    const previous = listElement ?
      listElement.querySelector('.active[data-toggle="tab"], .active[data-toggle="pill"], .active[data-toggle="list"]') :
      null;

    const hideEvent = new CustomEvent('hide.zk.tab', {
      detail: { relatedTarget: this.element }
    });
    const showEvent = new CustomEvent('show.zk.tab', {
      detail: { relatedTarget: previous }
    });

    if (previous) {
      previous.dispatchEvent(hideEvent);
    }
    this.element.dispatchEvent(showEvent);

    if (hideEvent.defaultPrevented || showEvent.defaultPrevented) {
      return;
    }

    this.activate(this.element, listElement);
    this.activate(target, target.parentNode);

    const hiddenEvent = new CustomEvent('hidden.zk.tab', {
      detail: { relatedTarget: this.element }
    });
    const shownEvent = new CustomEvent('shown.zk.tab', {
      detail: { relatedTarget: previous }
    });

    if (previous) {
      previous.dispatchEvent(hiddenEvent);
    }
    this.element.dispatchEvent(shownEvent);
  }

  getTarget() {
    let target = this.element.dataset.target || this.element.getAttribute('href');
    if (target && target !== '#') {
      return document.querySelector(target);
    }
    return null;
  }

  activate(element, container) {
    if (!container) return;

    const activeElements = container.querySelectorAll('.active');
    activeElements.forEach(active => {
      active.classList.remove('active', 'show');
      if (active.getAttribute('role') === 'tab') {
        active.setAttribute('aria-selected', 'false');
      }
    });

    element.classList.add('active');
    if (element.getAttribute('role') === 'tab') {
      element.setAttribute('aria-selected', 'true');
    }

    // Handle fade
    if (element.classList.contains('fade')) {
      requestAnimationFrame(() => {
        element.classList.add('show');
      });
    }
  }

  // Static method to initialize all tabs
  static init(selector = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]') {
    document.querySelectorAll(selector).forEach(el => new Tab(el));
  }
}

export default Tab;
