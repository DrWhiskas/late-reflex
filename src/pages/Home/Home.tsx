import React, { useState } from 'react';
import Reflex from '../../components/Reflex/Reflex';
import './Home.css';

import {Modal} from 'modal-kayvon'

export default function Home() {

	 const [isModalOpen, setIsmodalOpen] = useState(false);

		function openModal() {
			setIsmodalOpen(true);
		}

		function closeModal() {
			setIsmodalOpen(false);
		}

    
	return (
		<section className="home">
			<Reflex />

			<button onClick={openModal}> Open </button>
			{isModalOpen && (
				<Modal closeModal={closeModal} messageModal="Congratulations!" />
			)}
		</section>
	);
		}
