interface InfoText {
	label: string;
	text: string;
}

function InfoText({ label, text }: InfoText) {
	return (
		<div className='flex h-full w-full'>
			<p className='mr-1 italic font-extralight'>{label}:</p>
			<p className='font-medium underline'>{text}</p>
		</div>
	);
}

export default InfoText;
