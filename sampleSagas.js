function* loginUser({ payload }) {
  try {
    yield put(setApiAction({ api: 'login', apiState: true }));
    const response = yield call(post, LOGIN_ENDPOINT, payload);

    if (response.success) {
      yield put(setAccessToken(response.token));
      yield put(StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Main' })],
      }));
    } else if (response.message) {
      alert(response.message);
    }
  } catch (error) {
    console.log({ loginUserError: error });
  } finally {
    yield put(setApiAction({ api: 'login', apiState: false }));
  }
}
  
function* registerUser({ payload }) {
  try {
    yield put(setApiAction({ api: 'register', apiState: true }));
    const { success, token } = yield call(post, REGISTER_ENDPOINT, payload);

    if (success) {
      yield put(setAccessToken(token));
      yield put(StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Main' })],
      }));
    } else {
      alert(`${payload.username} already registered!`);
    }
  } catch (error) {
    console.log({ registerUserError: error });
  } finally {
    yield put(setApiAction({ api: 'register', apiState: false }));
  }
}

export default function* userSagas() {
  yield all([
    takeLatest(login, loginUser),
    takeLatest(register, registerUser),
  ]);
}