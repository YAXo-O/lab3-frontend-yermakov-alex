import {get} from '@/utils/request';

import SessionEditorPopup from '@/components/components/SessionEditorPopup';
import SessionCard from '@/components/components/SessionCard/';
import ErrorCard from '@/components/components/ErrorCard/';

export default {
  name: 'main-window',
  components: {
    ErrorCard,
    SessionCard,
    SessionEditorPopup,
  },
  created() {
    this.$store.dispatch('RETRIEVE_SESSIONS', 0);
  },
  computed: {
    sessions() {
      return this.$store.getters.SESSIONS;
    }
  },
  data() {
    return {
      displaySessionPopup: false,
      page: 0,
    };
  },
  methods: {
    sessionDetails(sessionId) {
      this.$router.push(`/${sessionId}`);
    },
    newSession() {
      this.displaySessionPopup = true;
    },
  }
};
