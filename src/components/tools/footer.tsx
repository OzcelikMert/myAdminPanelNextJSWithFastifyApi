import React, { Component } from 'react';

class ComponentToolFooter extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="d-sm-flex justify-content-center py-2">
          <span className="text-center text-sm-left d-block d-sm-inline-block">
            Copyright © {new Date().getFullYear()}{' '}
            <a
              href="https://www.ozceliksoftware.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ozcelik Software{' '}
            </a>
          </span>
        </div>
      </footer>
    );
  }
}

export default ComponentToolFooter;
