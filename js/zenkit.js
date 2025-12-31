// ========================================
// ZenKit JavaScript Bundle
// A minimal, modern JavaScript library for UI components
// ========================================

import Accordion from './components/accordion.js';
import Collapse from './components/collapse.js';
import Tab from './components/tabs.js';
import Dropdown from './components/dropdown.js';
import Modal from './components/modal.js';
import Offcanvas from './components/offcanvas.js';
import Toast from './components/toast.js';
import Tooltip from './components/tooltip.js';
import Popover from './components/popover.js';
import Carousel from './components/carousel.js';
import ScrollSpy from './components/scrollspy.js';

// Export all components
export {
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
  ScrollSpy
};

// Auto-initialize on DOM ready
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

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}

// Export default object with all components
export default {
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
