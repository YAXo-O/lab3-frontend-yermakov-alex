import ErrorCard from '@/components/components/ErrorCard/';
import SessionCard from '@/components/components/SessionCard/';
import SessionEditorPopup from '@/components/components/SessionEditorPopup/';
import SessionConsumer from '@/components/pages/session/session-consumers/';
import SessionEvent from '@/components/pages/session/session-events/';

import "@/styles/controls.scss";

export default {
  name: 'Session',
  components: {
    ErrorCard,
    SessionCard,
    SessionEditorPopup,
    SessionConsumer,
    SessionEvent,
  },
  data() {
    return {
      showSessionEditor: false,
    };
  },
  created() {
    this.$store.dispatch('RETRIEVE_SESSION', this.$route.params.id);
  },
  computed: {
    session() {
      return this.$store.getters.SESSION;
    },
    consumers() {
      return this.$store.getters.CONSUMERS;
    }
  },

  methods: {
    toSessions() {
      this.$router.push('/')
    },
    editSession() {
      this.showSessionEditor = true;
    },
    deleteSession() {
      this.$bvModal.msgBoxConfirm('Are you sure you want to delete session? All events and consumers will be lost!')
        .then(() => {
          this.$store.dispatch('DELETE_SESSION', this.session.item.id);
          this.$router.push('/');
        });
    },
  }
}


