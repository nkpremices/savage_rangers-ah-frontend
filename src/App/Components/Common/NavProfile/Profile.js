/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash';
import PropTypes from 'prop-types';
import io from '../../../../Helpers/Notifications/socket.io';
import actions from '../../../../Redux/Actions/notifications';
import defaultData from '../../../../configs/urls';
import Triangle from '../Triangle';
import IoNotification from '../../Notifications/IoNotification';

const {
  show, hide, get, markAsRead
} = actions;

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
      profile: {},
      notifications: [],
      notificationsBubble: '',
      isSnoozed: false
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const { get: getNotifications } = this.props;
    io.on('blockArticle', (data) => {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.profile.id === data.inAppNotification.userId && !this.state.isSnoozed) {
        toast.success(<IoNotification
          message={`${data.inAppNotification.message}`}
          link={`${data.inAppNotification.url}`}
          id={`${data.inAppNotification.id}`}
          markAsRead={this.markIoNotificationAsRead}
        />,
        { className: 'io-container', closeButton: false });
        getNotifications(token);
      }
    });
    io.on('unblockArticle', (data) => {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.profile.id === data.inAppNotification.userId && !this.state.isSnoozed) {
        toast.success(<IoNotification
          message={`${data.inAppNotification.message}`}
          link={`${data.inAppNotification.url}`}
          id={`${data.inAppNotification.id}`}
          markAsRead={this.markIoNotificationAsRead}
        />,
        { className: 'io-container', closeButton: false });
        getNotifications(token);
      }
    });
    io.on('blockComment', (data) => {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.profile.id === data.inAppNotification.userId && !this.state.isSnoozed) {
        toast.success(<IoNotification
          message={`${data.inAppNotification.message}`}
          link={`${data.inAppNotification.url}`}
          id={`${data.inAppNotification.id}`}
          markAsRead={this.markIoNotificationAsRead}
        />,
        { className: 'io-container', closeButton: false });
        getNotifications(token);
      }
    });
    io.on('unblockComment', (data) => {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.profile.id === data.inAppNotification.userId && !this.state.isSnoozed) {
        toast.success(<IoNotification
          message={`${data.inAppNotification.message}`}
          link={`${data.inAppNotification.url}`}
          id={`${data.inAppNotification.id}`}
          markAsRead={this.markIoNotificationAsRead}
        />,
        { className: 'io-container', closeButton: false });
        getNotifications(token);
      }
    });
    io.on('reportArticle', (data) => {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.profile.id === data.inAppNotification.userId && !this.state.isSnoozed) {
        toast.success(<IoNotification
          message={`${data.inAppNotification.message}`}
          link={`${data.inAppNotification.url}`}
          id={`${data.inAppNotification.id}`}
          markAsRead={this.markIoNotificationAsRead}
        />,
        { className: 'io-container', closeButton: false });
        getNotifications(token);
      }
    });
    io.on('reportComment', (data) => {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.profile.id === data.inAppNotification.userId && !this.state.isSnoozed) {
        toast.success(<IoNotification
          message={`${data.inAppNotification.message}`}
          link={`${data.inAppNotification.url}`}
          id={`${data.inAppNotification.id}`}
          markAsRead={this.markIoNotificationAsRead}
        />,
        { className: 'io-container', closeButton: false });
        getNotifications(token);
      }
    });
  }

  componentWillReceiveProps({
    isShown, profile, configs, data
  }) {
    this.setState({ isShown });
    if (!_.isEmpty({ profile }) && !_.isEmpty(configs)) {
      this.setState({ profile, isSnoozed: configs.config.isSnoozed });
    } else this.setState({ profile: {} });
    if (data && !_.isEmpty(data.filter(item => item.type === 'inApp'))) {
      const notifications = data.filter(item => item.type === 'inApp');
      this.setState({ notifications });
      document.getElementsByClassName('notify-bubble')[0].style.display = 'block';
      if (notifications.length < 10) {
        this.setState({ notificationsBubble: `${notifications.length}` });
      } else this.setState({ notificationsBubble: '9+' });
    } else document.getElementsByClassName('notify-bubble')[0].style.display = 'none';
  }

  showNotifications = () => {
    const { state } = this;
    const { show: showNotifications, hide: hideNotifications } = this.props;
    if (state.isShown) {
      return hideNotifications();
    }
    return showNotifications();
  };

  markIoNotificationAsRead = (id) => {
    const { markAsRead: markNotificationAsRead, get: getNotifications } = this.props;
    const token = localStorage.getItem('token');

    markNotificationAsRead(token, id).then(getNotifications(token));
  };

  render() {
    const { state } = this;
    return (
      <React.Fragment>
        <ToastContainer autoClose={false} />
        <ul className="navbar-nav">
          <li className="dropdown notify-container" id="notify-container">
            <img
              src={
                state.profile
                && state.profile.profileImage
                && state.profile.profileImage.substr(0, 4) === 'http'
                  ? state.profile.profileImage
                  : defaultData.defaultUserProfileImage
              }
              alt=""
              width="50"
              height="50"
              className={
                !_.isEmpty(state.notifications)
                  ? 'rounded-circle profile-img-notify'
                  : 'rounded-circle profile-img'
              }
              id="nav-profile-img"
              onClick={this.showNotifications}
            />
            <Triangle direction="up" />
            <span className="notify-bubble">{state.notificationsBubble}</span>
          </li>
          <li className="nav-item dropdown nav-item-custom">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {state.profile ? state.profile.username : 'username'}
            </a>
            <div
              className="dropdown-menu dropdown-menu-custom"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a className="dropdown-item dropdown-item-custom" href="#">
                Action
              </a>
              <a className="dropdown-item dropdown-item-custom" href="#">
                Another action
              </a>
              <a className="dropdown-item dropdown-item-custom" href="#">
                Something else here
              </a>
            </div>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

Profile.propTypes = {
  isShown: PropTypes.bool,
  show: PropTypes.func,
  get: PropTypes.func,
  hide: PropTypes.func,
  data: PropTypes.array,
  configs: PropTypes.object,
  profile: PropTypes.object,
  markAsRead: PropTypes.func
};

export const mapStateToProps = state => ({
  isShown: state.notifications.isShown,
  data: state.notifications.data.data,
  configs: state.notifications.configs,
  profile: state.notifications.profile.profile
});

export default connect(mapStateToProps,
  {
    show,
    hide,
    get,
    markAsRead
  })(Profile);