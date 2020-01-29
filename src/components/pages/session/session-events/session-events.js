import * as moment from 'moment';

export default {
  name: 'SessionEvent',
  components: {},
  props: [],
  data () {
    return {
      selectInvestor: false,
      investorsFields: ['firstName', 'lastName'],
      investorsPage: 1,
      investor: null,
      title: '',
      titleValidation: null,
      eventsFields: ['title', 'created'],
      page: 1,
    }
  },
  computed: {
    session() {
      return this.$store.getters.SESSION;
    },
    investors() {
      return this.$store.getters.INVESTORS;
    },
    events() {
      return this.$store.getters.EVENTS;
    }
  },
  watch: {
    page: function (oldValue, newValue) {
      if (oldValue === null) return;

      this.retrieveEvents();
    },
    investorsPage: function (oldValue, newValue) {
      if (oldValue === null) return;

      this.retrieveInvestors();
    }
  },
  methods: {
    pickEvent(event) {
      this.$router.push(`/event/${event.id}`);
    },
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    },
    retrieveEvents() {
      this.$store.dispatch('RETRIEVE_EVENTS', {
        sessionId: this.session.item.id,
        page: this.page - 1,
      });
    },
    retrieveInvestors() {
      this.$store.dispatch('RETRIEVE_INVESTORS', {
        sessionId: this.session.item.id,
        page: this.investorsPage - 1,
      });
    },
    resetEvent() {
      this.selectInvestor = false;
      this.investorsPage = 1;
      this.investor = null;
      this.title = '';
      this.titleValidation = null;
    },
    addEvent() {
      this.selectInvestor = true;
      this.retrieveInvestors();
    },
    pickInvestor(investor) {
      this.investor = investor;
    },
    createEvent() {
      this.titleValidation = !!this.title;

      if (this.titleValidation) {
        this.$store.dispatch('CREATE_EVENT', {
          investorId: this.investor.id,
          title: this.title,
          sessionId: this.session.item.id,
          page: this.page - 1,
        });
        this.resetEvent();
      }
    },
  }
}


