import React, { useEffect, useState } from 'react';
import './Reflex.css';

export default function Reflex() {
	const [startTime, setStartTime] = useState<number | null>(null);
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
	const [isGreen, setIsGreen] = useState<boolean>(false);
	const [result, setResult] = useState<string>('');
	const [instructions, setInstructions] = useState<string>(
		'Click the button to start!'
	);
	useEffect(() => {
		return () => {
			// Clean up timeout when the component is unmounted
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [timeoutId]);

	function startGame() {
		setInstructions('Wait for the box to turn green...');
		const delay = Math.random() * 4000 + 1000; // Delay between 5 - 1s

		const newTimeoutId = setTimeout(() => {
			setIsGreen(true);
			setStartTime(Date.now());
		}, delay);

		setTimeoutId(newTimeoutId);
	}

	function handleClickBox() {
		if (isGreen) {
			if (timeoutId) clearTimeout(timeoutId);
			const reactionTime = Date.now() - (startTime as number);
			setResult(`Your reaction time: ${reactionTime}ms`);
			setIsGreen(false);
			setInstructions('Click the button to start again!');
		} else {
			if (timeoutId) clearTimeout(timeoutId); // Clear the timeout if clicked too early
			setResult('Too soon! Try again.');
			setIsGreen(false);
			setInstructions('Click the button to start again!');
		}
	}
	return (
		<div className="reflex">
			<h1 className="reflex__title">Test Your Reflexes</h1>
			<button className="startButton" onClick={startGame} disabled={isGreen}>
				Start
			</button>
			<div
				className="reactionBox"
				onClick={handleClickBox}
				style={{
					backgroundColor: isGreen ? 'green' : 'grey',
				}}
			></div>
			<p id="result">{result}</p>
			<p id="instructions">{instructions}</p>
		</div>
	);
}
