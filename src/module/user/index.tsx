import * as React from 'react'
import Search from './search'
import List from './list'

interface IState {
    searchData: Record<string, any>
}

class Index extends React.Component<any, IState> {
    readonly state: Readonly<IState> = {
        searchData: {}
    }

    onSearchChange = (data: any): any => {
        this.setState({ searchData: data })
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
