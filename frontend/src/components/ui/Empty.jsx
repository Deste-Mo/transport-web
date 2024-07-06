import PropTypes from 'prop-types';

const Empty = ({ value = "Liste vide", className }) => {
  return (
    <p className={`text-subtitle-1 text-danger mx-auto ${className}`}>
      {value}
    </p>
  );
};

Empty.propTypes = {
  value : PropTypes.string,
  className : PropTypes.string,
}

export default Empty;
