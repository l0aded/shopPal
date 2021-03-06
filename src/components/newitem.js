import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

const axios = require('axios')

require('../css/item.css');

const styles = {
  card: {
    maxWidth: 200,
    height: 375,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

class NewItem extends React.Component<Props> {
	constructor(props) {
    super(props);
    this.state = {
      listId: this.props.listId,
      itemId: 8,
      store: '',
      item: '',
      quantity: '',
      type: '',
    }
    this._handleChange = this._handleChange.bind(this);
    this._submitItem = this._submitItem.bind(this);
    this._clearStates = this._clearStates.bind(this);
    this._generateItemId = this._generateItemId.bind(this);
  }

  componentDidMount() {
    this._generateItemId();
	}

  _handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  _generateItemId() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    this.setState({
      itemId: text
    })
    return text;
  }

  _submitItem(listId, itemId, store, item, qty, type) {
    this._clearStates();
    axios.patch(`/api/item/${listId}`, {
      itemId: itemId,
      store: store,
      item: item,
      quantity: qty,
      type: type,
    })
    .then((data) => {
      // this._clearStates();
      this.props.getList(this.props.listId);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  _clearStates() {
    this.setState({
      store: '',
      item: '',
      quantity: '',
      type: '',
      itemId: this._generateItemId()
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          {/* <CardMedia
            className={classes.media}
            image='https://s3-us-west-1.amazonaws.com/shoppal/juice.jpg'
            // image="https://s3-us-west-1.amazonaws.com/shoppal/addbutton.png"
            title="Add New Item"
          /> */}
          <CardContent>
            <Typography gutterBottom variant="headline" component="h4">
              {/* Header */}
            </Typography>
            <Typography component="p">
              <label><input type="text" name="store" placeholder="Store" value={this.state.store}  onChange={this._handleChange} /></label>
              <label><input type="text" name="item" placeholder="Item" value={this.state.item} onChange={this._handleChange}/></label>
              <label><input type="text" name="quantity" placeholder="Qty" value={this.state.quantity} onChange={this._handleChange}/></label>
              <label><input type="text" name="type" placeholder="Type" value={this.state.type} onChange={this._handleChange}/></label>
              {/* <input type="submit" value="Submit" /> */}
              <Button onClick={() => this._submitItem(this.props.listId, this.state.itemId, this.state.store, this.state.item, this.state.quantity, this.state.type)}
                variant="fab" color="primary" aria-label="add" className={classes.button}>
                <AddIcon />
              </Button>
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Button variant="fab" color="primary" aria-label="add" className={classes.button}>
              <AddIcon />
            </Button> */}
            {/* <Button size="small" color="primary">
              Add to List
            </Button> */}
            {/* <Button size="small" color="primary">
              Learn More
            </Button> */}
          </CardActions>
        </Card>
      </div>
    );
  }
}

NewItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewItem);






//
//
//
//
// import React from 'react';
// import ReactDOM from 'react-dom';
//
//
//
// const Item = ({ item }) => (
//   <div className="item">
//     <div className="item-container">
//       {item.id}{item.store}{item.item}
//     </div>
//   </div>
// )
// module.exports = Item
