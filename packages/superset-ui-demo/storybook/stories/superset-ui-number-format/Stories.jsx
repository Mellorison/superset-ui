/* eslint-disable no-magic-numbers, jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */

import React from 'react';
import { formatNumber } from '@superset-ui/number-format';

const propTypes = {};
const defaultProps = {};

class NumberFormatValidator extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formatString: '.3~s',
      testValues: [
        987654321,
        12345.6789,
        3000,
        70.00002,
        1,
        0,
        -1,
        -70.00002,
        -3000,
        -12345.6789,
        -987654321,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        NaN,
        null,
        undefined,
      ],
    };

    this.handleFormatChange = this.handleFormatChange.bind(this);
  }

  handleFormatChange(event) {
    this.setState({
      formatString: event.target.value,
    });
  }

  render() {
    const { formatString, testValues } = this.state;

    return (
      <div className="container">
        <div className="row" style={{ margin: '20px' }}>
          <div className="col-sm" />
          <div className="col-sm-6">
            <div className="form-inline">
              <div className="form-group">
                <label>Enter D3 format string:&nbsp;&nbsp;</label>
                <input
                  id="formatString"
                  className="form-control form-control-lg"
                  type="text"
                  value={formatString}
                  onChange={this.handleFormatChange}
                />
              </div>
            </div>
          </div>
          <div className="col-sm" />
        </div>
        <div className="row">
          <div className="col-sm">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>Raw value</th>
                  <th>Formatted output</th>
                </tr>
              </thead>
              <tbody>
                {testValues.map(v => (
                  <tr key={v}>
                    <td>
                      <code>{`${v}`}</code>
                    </td>
                    <td>
                      <code>&quot;{formatNumber(formatString, v)}&quot;</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

NumberFormatValidator.propTypes = propTypes;
NumberFormatValidator.defaultProps = defaultProps;

export default [
  {
    renderStory: () => <NumberFormatValidator />,
    storyName: 'Validator',
    storyPath: '@superset-ui/number-format',
  },
];
