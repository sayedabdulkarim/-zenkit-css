// ========================================
// ZenKit - Toast Component
// ========================================

class Toast {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.element) return;

    this.options = {
      animation: true,
      autohide: true,
      delay: 5000,
      ...options
    };

    this.timeout = null;
    this.isShown = false;

    this.init();
  }

  init() {
    // Close button
    const closeBtn = this.element.querySelector('[data-dismiss="toast"]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hide());
    }

    // Auto show if has show class
    if (this.element.classList.contains('show')) {
      this.isShown = true;
      if (this.options.autohide) {
        this.scheduleHide();
      }
    }
  }

  show() {
    if (this.isShown) return;

    const showEvent = new CustomEvent('show.zk.toast');
    this.element.dispatchEvent(showEvent);
    if (showEvent.defaultPrevented) return;

    if (this.options.animation) {
      this.element.classList.add('fade');
    }

    this.element.classList.remove('hide');
    this.element.classList.add('showing');

    requestAnimationFrame(() => {
      this.element.classList.remove('showing');
      this.element.classList.add('show');
      this.isShown = true;

      if (this.options.autohide) {
        this.scheduleHide();
      }

      this.element.dispatchEvent(new CustomEvent('shown.zk.toast'));
    });
  }

  hide() {
    if (!this.isShown) return;

    const hideEvent = new CustomEvent('hide.zk.toast');
    this.element.dispatchEvent(hideEvent);
    if (hideEvent.defaultPrevented) return;

    this.clearTimeout();
    this.element.classList.add('showing');
    this.element.classList.remove('show');

    const complete = () => {
      this.element.classList.remove('showing');
      this.element.classList.add('hide');
      this.isShown = false;
      this.element.dispatchEvent(new CustomEvent('hidden.zk.toast'));
    };

    if (this.options.animation) {
      this.element.addEventListener('transitionend', complete, { once: true });
    } else {
      complete();
    }
  }

  scheduleHide() {
    this.clearTimeout();
    this.timeout = setTimeout(() => this.hide(), this.options.delay);
  }

  clearTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  dispose() {
    this.clearTimeout();
    if (this.element) {
      this.element.remove();
    }
    Toast.instances.delete(this.element);
  }

  isShownMethod() {
    return this.isShown;
  }

  // Alias for Bootstrap compatibility
  _isShown() {
    return this.isShown;
  }

  // Static methods
  static instances = new WeakMap();

  static getInstance(element) {
    return Toast.instances.get(element);
  }

  static getOrCreateInstance(element, options) {
    return Toast.getInstance(element) || new Toast(element, options);
  }

  static init(selector = '.toast') {
    document.querySelectorAll(selector).forEach(el => {
      const instance = new Toast(el);
      Toast.instances.set(el, instance);
    });
  }

  // Create toast programmatically
  static create(options = {}) {
    const {
      title = '',
      message = '',
      type = '',
      autohide = true,
      delay = 5000,
      container = '.toast-container'
    } = options;

    const containerEl = document.querySelector(container) || document.body;

    const toast = document.createElement('div');
    toast.className = `toast ${type ? `toast-${type}` : ''} fade`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    if (title) {
      toast.innerHTML = `
        <div class="toast-header">
          <strong class="me-auto">${title}</strong>
          <button type="button" class="btn-close" data-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">${message}</div>
      `;
    } else {
      toast.innerHTML = `
        <div class="toast-body d-flex align-items-center justify-content-between">
          <span>${message}</span>
          <button type="button" class="btn-close" data-dismiss="toast" aria-label="Close"></button>
        </div>
      `;
    }

    containerEl.appendChild(toast);

    const instance = new Toast(toast, { autohide, delay });
    Toast.instances.set(toast, instance);
    instance.show();

    return instance;
  }
}

export default Toast;
