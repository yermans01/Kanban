import Board from './components/Board';

function App() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">
                Kanban Board
                <Board />
            </h1>
        </div>
    );
}

export default App;
