import React from 'react'

export const getCurrentView = () => {
   if (!('innerWidth' in window)) {
      throw new Error('innerWidth can not be found in window object')
      return
   }

   return window.innerWidth <= 430
      ? 'mobile'
      : window.innerWidth <= 800
      ? 'tablet'
      : window.innerWidth <= 1200
      ? 'desktop'
      : 'laptop'
}

const Context = React.createContext()

export class ResponsivenessProvider extends React.Component {
    state={
        current_view: getCurrentView()
    }

    onResize= () => {
        const view = getCurrentView()
        this.setState({ current_view: view })
    }

    componentDidMount(){
        window.addEventListener('resize',this.onResize)
    }

    componentWillUnmount(){
        window.removeEventListener('resize',this.onResize)
    }

    render(){
        const {current_view}= this.state
        return (
            <Context.Provider value={{
                current_view,
                isMobile: current_view === 'mobile',
                isTablet: current_view === 'tablet',
                isDesktop: current_view === 'desktop',
                isLaptop: current_view === 'laptop',
             }} >
                 {this.props.children}
             </Context.Provider>
        )
    }
}

export const ResponsivenessConsumer = Context.Consumer