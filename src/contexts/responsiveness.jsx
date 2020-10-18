import React from 'react';

export const getCurrentView = () => {
  if (!('innerWidth' in window)) {
    throw new Error('innerWidth can not be found in window object');
  }

  return window.innerWidth <= 430
    ? 'mobile'
    : window.innerWidth <= 800
      ? 'tablet'
      : window.innerWidth <= 1200
        ? 'desktop'
        : 'laptop';
};

const Context = React.createContext();

export class ResponsivenessProvider extends React.Component {
    state={
      currentView: getCurrentView()
    }

    onResize= () => {
      const view = getCurrentView();
      this.setState({ currentView: view });
    }

    componentDidMount() {
      window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.onResize);
    }

    render() {
      const { currentView } = this.state;
      return (
          <Context.Provider value={{
            currentView,
            isMobile: currentView === 'mobile',
            isTablet: currentView === 'tablet',
            isDesktop: currentView === 'desktop',
            isLaptop: currentView === 'laptop'
          }} >
              {this.props.children}
          </Context.Provider>
      );
    }
}

export const ResponsivenessConsumer = Context.Consumer;
