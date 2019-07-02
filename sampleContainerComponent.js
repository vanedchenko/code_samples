@connect(state => ({
    token: state.user.token,
    products: state.products,
    apiAction: state.api.product,
}), {
    loginAction: login,
    registerAction: register,
    postReviewAction: postReview,
    getReviewListAction: getReviewList,
    getProductListAction: getProductList,
    addProductToCartAction: addProductToCart,
})
class MainScreenContainer extends Component {
  static navigationOptions = ({ navigation: { openDrawer } }) => {
    return ({
      title: 'Products',
      headerStyle: {
        backgroundColor: 'rgb(29, 57, 86)',
      },
      headerRight: (<HeaderButton icon={HAMBURGER_IMAGE} onPress={openDrawer} />),
      headerTintColor: 'white',
    });
  };

  static propTypes = {
    token: PropTypes.oneOfType([
      PropTypes.string,
      null,
    ]),
    apiAction: PropTypes.bool.isRequired,
    products: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
    getProductListAction: PropTypes.func.isRequired,
    addProductToCartAction: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { getProductListAction } = this.props;
    getProductListAction();
  }

  onLongPressProduct = (product) => {
    const {
      addProductToCartAction,
      token,
    } = this.props;
    if (token) {
      addProductToCartAction({
        ...product,
        quantity: 1,
      });
    } else {
      alert(loginToAdd);
    }
  }

  onPressProduct = (data) => {
    const { navigation: { navigate } } = this.props;
    navigate('Details', { details: { type: 'product', data } });
  }

  onPressReviews = (product) => {
    const { navigation: { navigate } } = this.props;
    navigate('Reviews', { product });
  }

  render() {
    const {
      products,
      apiAction,
    } = this.props;

    return (
      <MainScreen
        products={products}
        apiAction={apiAction}
        onPressProduct={this.onPressProduct}
        onPressReviews={this.onPressReviews}
        onLongPressProduct={this.onLongPressProduct}
      />
    );
  }
}