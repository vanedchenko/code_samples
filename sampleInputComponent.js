const FormInputField = ({
  title,
  value,
  onTextChange,
  ...params
}) => (
  <View>
    <Text style={styles.titleText}>
      {title}
    </Text>
    <TextInput
      value={value}
      onTextChange={onTextChange}
      {...params}
    />
  </View>
);

FormInputField.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  onTextChange: PropTypes.func,
};

FormInputField.defaultProps = {
  value: '',
  title: '',
  onTextChange: () => {},
};