import React from 'react';

export default (props) => {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements,
  } = props;

  function handleSubmit(e) {
    e.preventDefault();
    submit();
  }

  function handleCancel(e) {
    e.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="grid-100 pad-bottom">
          <button className="button" type="submit">{submitButtonText}</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
/**
 * 
 * @param {array} errors - Array of validation errors
 * @returns if validation errors exist returns UL list containing errors 
 */
function ErrorDisplay({ errors }) {
  let errorDisplay = null;

  if (errors.length) {
    errorDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors:</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, index) => <li key={index}>{error}</li>)}
          </ul>
        </div>
      </div>
    );
  }

  return ErrorDisplay;
}