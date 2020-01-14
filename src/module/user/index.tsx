import * as React from 'react'
import Search from './search'
import List from './list'

interface IState {
    searchData: Object
}

class Index extends React.Component<any, IState> {
    readonly state: Readonly<IState> = {
        searchData: {}
    }

    private mounted: boolean = false

    componentWillMount() {
        this.mounted = true
    }

    componentDidMount() {}

    componentWillUnmount() {
        this.mounted = false
    }

    onSearchChange = (data: object): void => {
        if (this.mounted) {
            this.setState({ searchData: data })
        }
    }

    render() {
        return (
            <div>
                <Search onSearchChange={this.onSearchChange} />
                <List searchData={this.state.searchData} />
            </div>
        )
    }
}

export default Index
