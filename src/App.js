import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Button, CssBaseline, FormControlLabel, Grid, RadioGroup, Radio, Typography, withStyles, } from 'material-ui';

import CustomModal from './CustomModal';

const styles = theme => ({
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 200,
    background: theme.palette.common.black,
    color: theme.palette.common.white,
    borderRadius: 6,
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  code: {
    padding: '0.2em 0.4em',
    margin: 0,
    fontSize: '85%',
    backgroundColor: theme.palette.grey[300],
    borderRadius: 3,
  }
});

const propTypes = {
  classes: PropTypes.shape({
    body: PropTypes.string.isRequired,
    buttonWrapper: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
};

class App extends Component {
  static propTypes = propTypes;

  constructor(props) {
    super(props);

    this.body = React.createRef();
  }

  state = {
    open: false,
    anchorRect: null,
    childRect: null,
    position: 'top',
  };

  componentDidUpdate(prevProps, prevState) {
    const { open, } = this.state;

    if (open === prevState.open) {
      return null;
    }

    const anchorRect = this.button.getBoundingClientRect();
    const childRect = this.body.current.getBoundingClientRect();
    this.setState({ anchorRect, childRect });
  }

  handleChange = event => {
    this.setState({ position: event.target.value });
  };

  toggleModal = () => {
    const { open, } = this.state;
    this.setState({ open: !open });
  };

  renderRadioGroup() {
    const { position, } = this.state;

    return (
      <RadioGroup
        aria-label="position"
        name="position"
        value={position}
        onChange={this.handleChange}
      >
        <FormControlLabel value="top" control={<Radio />} label="top" />
        <FormControlLabel value="topStart" control={<Radio />} label="topStart" />
        <FormControlLabel value="topEnd" control={<Radio />} label="topEnd" />
        <FormControlLabel value="bottom" control={<Radio />} label="bottom" />
        <FormControlLabel value="bottomStart" control={<Radio />} label="bottomStart" />
        <FormControlLabel value="bottomEnd" control={<Radio />} label="bottomEnd" />
      </RadioGroup>
    )
  }

  renderButton() {
    const { classes, } = this.props;

    return (
      <div className={classes.buttonWrapper}>
        <Button
          variant="raised"
          color="primary"
          buttonRef={el => this.button = el}
          onClick={this.toggleModal}
        >
          Open Modal
        </Button>
      </div>
    );
  }

  renderChildren() {
    const { classes, } = this.props;

    return (
      <div ref={this.body} className={classes.body}>
        <Typography color="inherit">Modal Body</Typography>
      </div>
    );
  }

  renderModal() {
    const { open, anchorRect, childRect, position, } = this.state;

    return (
      <CustomModal
        open={open}
        position={position}
        anchorRect={anchorRect}
        childRect={childRect}
        modalProps={{
          keepMounted: true,
          BackdropProps: { invisible: true, },
          onClose: this.toggleModal,
        }}
      >
        {this.renderChildren()}
      </CustomModal>
    )
  }

  render() {
    const { classes: { code, }, } = this.props;

    return (
      <Grid container>
        <CssBaseline />
        <Grid item xs={12}>
          <Typography gutterBottom variant="title" align="center">
            How to Create a Material UI Custom Modal
          </Typography>
          <Typography gutterBottom variant="body2">
            The Problem:
          </Typography>
          <Typography gutterBottom>
            Material UI provides a fantastic <span className={code}>Popover</span> component
            which handles all positioning. The <span className={code}>Popover</span> is extremely
            opinionated from a style and behavior standpoint. In order to create highly customized
            modals, you may need to use the <span className={code}>Modal</span> component and build
            your own positioning.
          </Typography>
          <Typography gutterBottom variant="body2">
            The Solution:
          </Typography>
          <Typography gutterBottom>
            Using <span className={code}>componentDidUpdate</span> to calculate the bounds of the
            anchor component and the modal children. Once complete, you can pass
            the <span className={code}>anchorRect</span> and <span className={code}>childRect</span> props
            into your custom modal.
          </Typography>
          <Typography gutterBottom>
            Please remember that this repo is just a demonstration of how it's done.
            Your <span className={code}>CustomModal</span> will likely be much different. This
            example is provided to give you a starting point and the positioning methods.
          </Typography>
          {this.renderRadioGroup()}
          {this.renderButton()}
          {this.renderModal()}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
