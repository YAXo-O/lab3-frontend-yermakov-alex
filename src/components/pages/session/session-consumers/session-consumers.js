import ConsumerServices from '@/requests/ConsumerServices/';

export default {
  name: 'SessionConsumers',
  components: {},
  props: [],
  data () {
    return {
      consumerFields: ['firstName', 'lastName', 'actions'],
      currentConsumer: { firstName: '', lastName: '' },
      consumerValidation: { firstName: null, lastName: null },
      showConsumerEditor: true,
      consumersPage: 1,
    }
  },
  computed: {
    session() {
      return this.$store.getters.SESSION;
    },
    consumers() {
      return this.$store.getters.CONSUMERS;
    }
  },
  watch: {
    consumersPage: function (oldVal, newVal) {
      if (oldVal === null) return;

      this.retrieveConsumers();
    }
  },
  methods: {
    retrieveConsumers() {
      this.$store.dispatch('RETRIEVE_CONSUMERS', {
        sessionId: this.session.item.id,
        page: this.consumersPage - 1,
      });
    },
    submitConsumer(ev) {
      this.consumerValidation.firstName = !!this.currentConsumer.firstName;
      this.consumerValidation.lastName = !!this.currentConsumer.lastName;

      this.showConsumerEditor = false;
      this.$nextTick(() => {
        this.showConsumerEditor = true;
      });

      if (this.consumerValidation.firstName && this.consumerValidation.lastName) {
        if (this.currentConsumer.id) {
          this.$store.dispatch('UPDATE_CONSUMER', this.currentConsumer);
          this.$bvModal.hide('consumer-editor');
        } else {
          ConsumerServices.createConsumer(this.currentConsumer.firstName, this.currentConsumer.lastName, this.session.item.id)
            .then(() => {
              this.retrieveConsumers();
              this.$bvModal.hide('consumer-editor');
            });
        }
      }
    },
    resetConsumer() {
      this.currentConsumer = {
        firstName: '',
        lastName: '',
      };
      this.consumerValidation = { firstName: null, lastName: null};
    },
    consumerEditor(consumer = { firstName: '', lastName: '', id: undefined}) {
      Object.assign(this.currentConsumer, consumer);
      this.consumerValidation = {};
      this.$bvModal.show('consumer-editor');
    },
    deleteConsumer(id) {
      this.$store.dispatch('DELETE_CONSUMER', id);
    },
  }
}


