import { useState } from "react";
import TodoPage from "./components/TodoPage";
function App() {
	const [count, setCount] = useState(0);

	return (
		<div className='w-screen h-fit flex'>
			<TodoPage />
		</div>
	);
}

export default App;
