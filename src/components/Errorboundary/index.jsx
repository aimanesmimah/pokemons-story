import React from 'react' ;

export default class ErrorBoundary extends React.Component {
    state= {
        hasError: false,
        error: '' 
    }

    static getDerivedStateFromError(error){
        return {
            hasError: true,
            error: error.message
        }
    }

    componentDidCatch(error,errorInfo){
        console.log("Error info",errorInfo)
    }

    render(){
        if(this.state.hasError){
            return (
                <div>
                    something went wrong, error message: { this.state.error }
                </div>
            )
        }

        return this.props.children
    }
}