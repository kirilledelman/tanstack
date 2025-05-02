import { createContext, useEffect, useState } from "react";
import ModalDialog from "./ModalDialog.jsx";

export const AppContext = createContext({
	theme: 'dark', toggleTheme:()=>{},
	showModal:()=>{},
});

export default function AppContextProvider({ children }){
	const [theme, setTheme] = useState(localStorage.getItem('theme')||'dark');
	const [modalOpen, setModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('');

	// toggles and returns new theme
	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
		return newTheme;
	};

	// apply theme
	useEffect(() => {
		const dbc = document.body.classList;
		dbc.remove('light', 'dark');
		dbc.add(theme);
	},[theme]);

	// modal
	function showModal(opts) {
		if ( !opts || opts === false ) {
			setModalOpen(false);
			setModalContent("");
		} else {
			setModalOpen(true);
			setModalContent(opts.content);
		}
	}

	return (
		<AppContext.Provider value={{ theme, toggleTheme, showModal }}>
			{children}
			<ModalDialog open={modalOpen} closeFn={()=>showModal(false)}>{modalContent}</ModalDialog>
		</AppContext.Provider>
	);
};