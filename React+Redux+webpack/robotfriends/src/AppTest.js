class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: robots,
            searchField: '',
        }
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value })
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                return response.json();
            })
            .then(users => {
                this.setState({
                    robots: users,
                })
            })
    }

    render() {
        const filterdRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
        })
        if (this.state.robots.length === 0) {
            return <h1>Loading</h1>
        }
        else {
            return (
                <div>
                    <h1>Robots Friends</h1>
                    <SearchBox onSearchChange={this.onSearchChange} />
                    <CardList robots={filterdRobots} />
                </div>
            )
        }
    }
}