import api from '../api';
import CommitteesActions from '../actions/committees';

export default {
  getCommittees: {
    remote() {
      return api.Committees.all({ /* active: new Date() */ }, true);
    },
    success: CommitteesActions.getCommitteesSuccess,
    error: CommitteesActions.getCommitteesFailed,
  },
};
