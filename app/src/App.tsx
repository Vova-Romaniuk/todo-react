import { useEffect } from "react";
import TodoPage from "./components/TodoPage";
function App() {
	useEffect(() => {
		const storedData = localStorage.getItem("todoData");
		if (!storedData) {
			localStorage.setItem("todoData", JSON.stringify([]));
		}
	}, []);

	return (
		<div className='w-screen h-fit flex'>
			<TodoPage />
		</div>
	);
}

export default App;
