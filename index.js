const app = new Vue({
  el: "#app",
  data: {
    items: [],
    drag: {
      origin: null,
      target: null,
      allowDrop: false,
    },
    colors: ['#172426', '#9FA6A0', '#D4D9CC', '#0D0D0D', '#0D0D0D']
  },
  mounted() {
    this.items = "One,Two,Three,Four".split(",").map((name) => ({ name }));
  },
  computed: {
    dropAreaClass() {
      if (this.drag.origin === null) return [];
      return ["droppable"];
    },
  },
  methods: {
    canDropHere(index) {
      const { origin, target } = this.drag;
      return target === index && target !== origin;
    },
    dragStart(index) {
      this.drag.origin = index;
    },
    dragEnd() {
      if (this.drag.target === null) {
        this.drag.origin = null;
        return;
      }

      const itemCopy = this.items.splice(this.drag.origin, 1)[0];

      this.items.splice(this.drag.target, 0, itemCopy);

      this.drag.origin = null;
      this.drag.target = null;
    },
    dragLeave() {
      this.drag.target = null;
    },
    dragOver(newIndex, event) {
      event.preventDefault();
      this.drag.target = newIndex;
    },
  },
});
