export default {
  name: 'session-card',
  components: {},
  props: {
    title: String,
    description: String,
    dummy: Boolean,
    withHover: Boolean,
    editable: Boolean,
    onEdit: Function,
    onDelete: Function,
  },
  data () {
    return {
      containerClass: `session-card ${this.dummy ? 'session-card__dummy' : ''}`,
    }
  },
}


