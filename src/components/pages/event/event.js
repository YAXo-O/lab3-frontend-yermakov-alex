import "@/styles/controls.scss";

export default {
  name: 'Event',
  components: {},
  props: [],
  data () {
    return {
      consumption: {
        consumerId: null,
        cost: 0,
        description: '',
      },
      validation: {
        consumerId: null,
        cost: null,
        description: null,
      },
      consumptionsFields: ['cost', 'description', 'dateCreated', 'actions'],
      page: 1,
      investorsPage: 1,
      investorsFields: ['firstName', 'lastName'],
    }
  },
  computed: {
    event() {
      return this.$store.getters.EVENT;
    },
    consumptions() {
      return this.$store.getters.CONSUMPTIONS;
    },
    investors() {
      return this.$store.getters.INVESTORS;
    },
  },
  mounted() {
    this.$store.dispatch('RETRIEVE_EVENT', {
      id: this.$route.params.id,
    });
  },
  watch: {
    investorsPage: function (oldValue, newValue) {
      if (oldValue === null) return;

      this.$store.dispatch('RETRIEVE_INVESTORS', {
        sessionId: this.event.item.sessionId,
        page: newValue - 1,
      });
    },
  },
  methods: {
    editConsumption(consumption) {
      if (consumption) {
        Object.assign(this.consumption, consumption);
      } else {
        this.resetConsumption();
      }
      this.$bvModal.show('consumption-editor');
      this.$store.dispatch('RETRIEVE_INVESTORS', {
        sessionId: this.event.item.sessionId,
        page: this.investorsPage - 1,
      });
    },
    deleteConsumption(id) {
      this.$store.dispatch('DELETE_CONSUMPTION', {
        id,
        page: this.page - 1,
        eventId: this.event.item.id,
      });
    },
    resetConsumption() {
      this.consumption = {
        consumerId: null,
        description: '',
        cost: 0,
      };
      this.validation = {
        consumerId: null,
        description: null,
        cost: null,
      };
    },
    submitConsumption() {
      this.validation.consumerId = !!this.consumption.consumerId;
      this.validation.cost = !!this.consumption.cost;
      this.validation.description = !!this.consumption.description;

      if (this.validation.consumerId && this.validation.cost && this.validation.description) {
        if (this.consumption.id) {
          this.$store.dispatch('UPDATE_CONSUMPTION', {
            ...this.consumption,
            eventId: this.event.item.id,
            page: this.page-1,
          });
        } else {
          this.$store.dispatch('CREATE_CONSUMPTION', {
            consumerId: this.consumption.consumerId,
            cost: this.consumption.cost,
            description: this.consumption.description,
            eventId: this.event.item.id,
          });
        }
        this.$bvModal.hide('consumption-editor');
      }
    },
    pickConsumer(item) {
      this.consumption.consumerId = item.id;
    },
    toSession() {
      this.$router.push(`/${this.event.item.id}`)
    }
  }
}
