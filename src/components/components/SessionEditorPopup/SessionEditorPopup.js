
export default {
  name: 'session-editor-popup',
  components: {},
  props: {
    display: Boolean,
    sessionId: String,
    onHidden: Function,
  },
  data() {
    return {
      title: '',
      description: '',
      validation: {
        title: null,
      },
    };
  },
  methods: {
    onShown() {
      if (this.sessionId) {
        const {title, description} = this.$store.getters.SESSION.item;
        this.title = title;
        this.description = description;
      }
    },
    submitEditor() {
      this.validation.title = !!this.title;

      if (this.sessionId) {
        this.$store.dispatch('UPDATE_SESSION', {
          id: this.sessionId,
          title: this.title,
          description: this.description,
        });
      } else {
        this.$store.dispatch('CREATE_SESSION', {
          title: this.title,
          description: this.description
        });
      }

      this.$bvModal.hide('session-editor-popup');
    },
    _onHidden() {
      this.resetEditor();
      this.onHidden();
    },
    resetEditor() {
      this.title = this.description = '';
      this.validation.title = null;
    }
  }
}


