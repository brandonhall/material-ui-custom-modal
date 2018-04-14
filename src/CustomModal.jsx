import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Fade, Modal, ModalManager, withStyles, } from 'material-ui';

const styles = () => ({
  modal: {
    position: 'absolute',
    height: 'auto',
    width: 'auto',
  },
  transformCenter: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
});

const propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf([
    'top',
    'topStart',
    'topEnd',
    'bottom',
    'bottomStart',
    'bottomEnd',
  ]).isRequired,
  classes: PropTypes.shape({
    modal: PropTypes.string.isRequired,
    transformCenter: PropTypes.string.isRequired,
  }).isRequired,
  modalProps: PropTypes.shape({
    keepMounted: PropTypes.bool,
    BackdropProps: PropTypes.object,
    onClose: PropTypes.func,
  }).isRequired,
  open: PropTypes.bool,
  containerClass: PropTypes.string,
  offsetTop: PropTypes.number,
  offsetLeft: PropTypes.number,
  childRect: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  anchorRect: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }),
};

const defaultProps = {
  open: false,
  containerClass: '',
  anchorRect: {
    top: 0,
    left: 0,
  },
  childRect: {
    width: 0,
    height: 0,
  },
  offsetTop: 0,
  offsetLeft: 0,
};

const positions = {
  top: ({ anchorRect, childRect, }) => {
    const { width, top, left, } = anchorRect;
    const { height, } = childRect;

    return {
      left: left + (width / 2),
      top: top - height,
    };
  },
  topStart: ({ anchorRect, childRect, }) => {
    const { top, left, } = anchorRect;
    const { height, } = childRect;

    return { left, top: top - height, };
  },
  topEnd: ({ anchorRect, childRect, }) => {
    const { top, left, } = anchorRect;
    const { height, width, } = childRect;

    return {
      left: (left - width) + anchorRect.width,
      top: top - height,
    };
  },
  bottom: ({ anchorRect, }) => {
    const { top, left, height, width, } = anchorRect;

    return {
      left: left + (width / 2),
      top: top + height,
    };
  },
  bottomStart: ({ anchorRect, }) => {
    const { top, left, height, } = anchorRect;

    return { left, top: top + height, };
  },
  bottomEnd: ({ anchorRect, childRect, }) => {
    const { top, left, height, } = anchorRect;
    const { width, } = childRect;

    return {
      left: (left - width) + anchorRect.width,
      top: top + height,
    };
  },
};

class CustomModal extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  static getDerivedStateFromProps(nextProps) {
    const {
      open,
      anchorRect,
      childRect,
      position,
      offsetTop,
      offsetLeft,
    } = nextProps;

    if (!open || !anchorRect || !childRect) {
      return null;
    }

    const positionFunc = positions[position];
    const positionOptions = { anchorRect, childRect, };

    const { top, left, } = positionFunc(positionOptions);
    const modalStyle = {
      top: top + offsetTop,
      left: left + offsetLeft,
    };

    return { modalStyle, };
  }

  state = {
    modalStyle: null,
  };

  getChildren() {
    const {
      classes, containerClass, children, open, position,
    } = this.props;

    const requiresCentering = position === 'top' || position === 'bottom';
    const containerClasses = classNames(containerClass, {
      [classes.transformCenter]: requiresCentering,
    });

    return (
      <Fade in={open}>
        <div className={containerClasses}>
          {children}
        </div>
      </Fade>
    );
  }

  render() {
    const { open, classes, modalProps, } = this.props;
    const { modalStyle, } = this.state;
    const manager = new ModalManager({ handleContainerOverflow: false, });

    return (
      <Modal
        open={open}
        style={modalStyle}
        manager={manager}
        className={classes.modal}
        {...modalProps}
      >
        {this.getChildren()}
      </Modal>
    );
  }
}

export default withStyles(styles)(CustomModal);
