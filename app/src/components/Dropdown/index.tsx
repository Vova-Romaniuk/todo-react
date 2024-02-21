import { useState, useEffect } from "react";
import { apiClient } from "../../apiClient";
import InfoText from "../InfoText";
import { formatDateTime } from "../../helpers/date";
import Spinner from "../Spinner";
import { Race } from "@/models/race";

interface DropdownProps {
	name: string;
	year: string;
	setRace: (e) => void;
	raceId?: string;
}

function Dropdown({ name, year, setRace, raceId }: DropdownProps) {
	const [isActiveDropdown, setIsActiveDropdown] = useState<boolean>(false);
	const [races, setRaces] = useState<Race[]>([]);
	const [imagesRace, setImageRaces] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const handleToggleDropdown = () => {
		setIsActiveDropdown(!isActiveDropdown);
	};

	// const fetchImageDataForRace = async (title) => {
	// 	try {
	// 		const additionalResponse = await apiClient.get(
	// 			``
	// 		);
	// 		const additionalData = additionalResponse.data.items[0].link;

	// 		return additionalData;
	// 	} catch (error) {

	// 		return null;
	// 	}
	// };

	const handleClick = (race) => {
		setRace({
			raceName: race.raceName,
			date: `${race.date}T${race.time}`,
			raceId: `${race.season}-${race.Circuit.circuitId}`,
		});
		handleToggleDropdown();
	};

	const fetchRaces = async () => {
		try {
			setIsLoading(true);

			const response = await apiClient.get(
				`${import.meta.env.VITE_API_URL}${year}.json`
			);
			const { data } = response;

			setRaces(data.MRData.RaceTable.Races);
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	};

	// useEffect(() => {
	// 	const fetchImagesData = async () => {
	// 		try {
	// 			const fetchPromises = races.map(async (race) => {
	// 				return await fetchImageDataForRace (
	// 					race.Circuit.circuitName
	// 				);
	// 			});

	// 			const imagesDataArray = await Promise.all(fetchPromises);

	// 			setImageRaces(imagesDataArray);
	// 		} catch (error) {
	// 			console.error("Помилка при отриманні даних", error);
	// 		}
	// 	};

	// 	if (races.length > 0) {
	// 		fetchImagesData();
	// 	}
	// }, [races]);

	useEffect(() => {
		if (+year >= 1950 && +year <= 2023) fetchRaces();
	}, [year]);

	return (
		<div className='w-fit relative'>
			<div
				onClick={handleToggleDropdown}
				id='toggle-dropdown'
				className='flex text-textColor items-center bg-backgroundItem cursor-pointer w-80 text-xl border-[1px] border-textColor px-2 py-2 justify-between rounded-md'>
				<span className='mr-3 block'>{name}</span>
				{isActiveDropdown ? (
					<i className='fa-solid fa-angle-up animate-bounce'></i>
				) : (
					<i className='fa-solid fa-angle-down animate-bounce'></i>
				)}
			</div>
			{isActiveDropdown && (
				<div
					id='items-dropdown'
					className='absolute w-full top-14 right-0 flex overflow-y-auto h-72 rounded-md border-[1px] border-textColor'>
					{isLoading ? (
						<Spinner />
					) : (
						<div className='h-fit w-full flex flex-col'>
							{races.map((item, index) => (
								<div
									key={index}
									onClick={() => handleClick(item)}
									className={`h-24 cursor-pointer w-full border-b-[1px] hover:!bg-[#0d0d0d] bg-backgroundItem border-textColor flex justify-between items-center p-2 !text-xs text-textColor flex-col ${
										raceId ===
											`${item.season}-${item.Circuit.circuitId}` &&
										"!bg-[#0d0d0d]"
									} `}>
									<div className='h-5/6 w-full flex justify-between'>
										<div className='flex flex-col justify-evenly'>
											<InfoText
												label='Location'
												text={
													item.Circuit.Location
														.locality
												}
											/>
											<InfoText
												label='Country'
												text={
													item.Circuit.Location
														.country
												}
											/>
											<InfoText
												label='Date'
												text={formatDateTime(
													`${item.date}T${item.time}`
												)}
											/>
										</div>
										<div className='h-full w-24 overflow-hidden'>
											<img
												className='object-cover h-full w-full'
												src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAABxVBMVEX///8AAAASwAAWAAAAAB//AP8AFh8AvADr+epPy0r4/fcAAA0wxSiq46g9xzZYzVOS3I8AABEVFR4AAAr/4P8AuQDZ8tjD7MHt+ezOzs+/v8Df3+AAEhzI7cYAAAVo0GRbW1/09PSgoKINDRjQ8M6AgIPl5ebj9uKpqavJycpAQEW1tbf/2/8NDx6Tk5UVAAgjIytwcHO5ubovLzYVCxNjY2ekDhOA2HxQUFT/iv+aghQqKjEFo9ALh6wUHyqGDxYSR1yd35pyERi9Cw/70wCHh4oQWnQAsuPkBggMgaUIlsCNeBXXBwp+ahhvXxirkBG05rK/oQ9JExsPYXx9EBf/oP/KCw5lVxlRExupjRH7AAA5FBw6MxygDhMTO00UJzT/ff8fFB0sFBxkERnJqQ3rxgUqJh0OcZH/uf//Qv//y///W///7f/uBQVKPxtVSRpmAAAzAAZ7g6cwk6kyLBxy0m84LwNEOQAeGQNXSgApIwE8MkI5iDkMKRYJiQgAeAATLlAPUngSmAATPxcAYhf/w///mf9jWGcFGBJbu1gIVBhfYBf/bv//r/8sADKPAJNgEmQychGvCbKbEU6hNBMPORt5AHwSWggyAAAZzklEQVR4nO1diX/aWnbWRVhgMItEkNjEJkAsMYsBi8Q4NnEwsbPh2HESZ2znJfbze1nmdRl3Zt60M+1M3+ubaTLttJ3+vT1XLEYgQI4B41/9/byySXyce+53zj33iCCuMWFUEcp7L/skrgjSKOswo9Bln8bVAHInit5o+rJP42oAucNeTyp32adxNZDMFxEjeC77NK4GYggx5lzIG7t2W1oQzzIMAuTjl30m049QUmAoDAEtxS77ZKYdSzRF7Syure0zQFfiss9muhFG1N29tZW3dxf3VigGLVz2+Uw1GOGrPYry+XwU9XAN2BrXvJhDKHjV55AYohb3YfzlGcRQaw+BrfGEPiXkB584lpeeDPhAhEgg6uFTXx7+i2O2dinBPI7PP4bS6ZT7KrtE1s5il/XRR8sC3g1s7S5SdHIMh3Kj3EI1hlJjeOkJgeVMRNRM7VGoERpitj7epdA4Yh9UzOVK6ApLkwgHvkR4dZ9qeXUPYpi9Vz4UHv2xUgjRKB3zXlkfz0UIwuy7u0a1nXoaUU/3wMmPwbfE0llGgDgheUXFCccSIUTt71Nn6aygg9q5D2yNfrx4lgRGDxBQ8ipal4kTCS+i1u766LMblwRqcY0SmBG/oVAJCXr9o62jB3o9jdyjffFJwFg3EguIuv+GLp3dGEIC9XB/1FOiF9F6/ZN7W4+fP7n3WH8V4wQRJsO0HyZDc7TjVnlKfEuh4giP5AazenzvJR6FeuZ4Sz8WpzhesDAZ5mjfRwopcjMp5Ptq7xWFqiM7kBcx+ifHX4O7cjBoXr91pB+HUxwvsHLI+148pLo+5yqeEpkRCghBwATNo6wHx+2MfmtLL4xD+Y4TWDkgameR6v6Yg37q7keYEkfEVs6vv42Nqa189ceP9OiKZRpBOeAweoVC3ffkaWoFC4iRrPl40fzP7+nP0hluND9/b164WqtvJs4IJ07tvpXDaAVCjEDtj4qtIq0//vl8R1gYRvoHR3rzlVpQcnEuIg7KgaF7J74YCIgVPBKjKk88H2Jo/nEXNUlBf/zd/JVSW1g5VB3UR8qvYj9NtnwXD6pzZtmwOgddY2AK2Yu+9ASBlUOQ/grCaLXEScwsUDt4Tgxe7CghNP/dsd6htNCoQ791Wz8alzgZRHiCYHxvdyn18RASBOru3hvKf7FJPu3XHz2f7/bmIFLvfT1/hcQWLyuHlUWqz7wUytLUi72nlDl7kXkLzf/suNeZLyD9oyN9Z5g15QDlgMPoHZ+jzwNCeTOo079xCBdwxXGk3wJR1ZPXL8EU+Vg/ttWRUcPEi4RHTsD3H2dJRP3t322TwpfL0yxoKjULgjnya/DxtMpTphFYOeAEPDVI8AQR4ytvkAwqfZlxJZD+JXhylbA5Dfc80Y8wAB0rxEYCHsLoQWYTRQy5XC5kBJQPf4HrKoEj1wuqK2AM3PWz+TEtvI0aLI/fy9OH1GDHAYEvuV5bJ4EuFDyvi/GCH9/Sq6/pJND88+OrElDjnAOtSMCrI+xnMsxy7eQOWaARfT7nFQVBCtajfmfRrD+6KgE1F2kl4Ac9KraEBEFgyDsntc11Ely9/xxLfw1BqhYgNO9lYIxehYDaVBebYbQw6GHZZDBfzCMkZMiD5drGHaArqPkYEDEfgT7ox8bVCahdnNhMwAcHPMqL3HFvIr8QX0KOAklu15YzBQdOUriLyeETWXY+C7qhf346f1UCahGUQ9oPk6Fj0Jt2I3ci7c4tAG1RMK8CeVI7yJhL4J0BzJBDuBu6oT8XOKA+7jNZThXYuoko0kx3Ar4bZsQIdHMgeZJIIA9rqwWUWgov5OKlId6+SNP35gdS0Qyox7AAPlo0E/C73Qn4LnixCbUf4c77C3dqBYZB7mAonh7sbUKosPr3hcGfBQ6omZ4we+rA860wekjo7/F0vpUcypyAojdXU6V4cLBFxBG5CVY4kIhUI6AOajzpy0IrAe8bqBx6kRfIGslkETKjfgF4EyU6UyOHzXU4afpcNR6aImDlkADl8KI3AT8YHkQurxay7lI+OmTwoML6MjmMBgiofwFia9hccbloJuA/MvQ5ZU4IxuFJRoOX8SJyY70w1G6rSP9k2gNqsS4n4PdUE/ADwcgGMzz+BRPcPDAPD/1wQP2L6U6aNhLwb+5T567RyBdWNZGVQmS5oEGeJ5AeB9TTnDRtJuDX5AR8ZXYopPYzsxrJgsmwTJo1LKUFaTmgnuLCGj5yVsfmcuqGwsm3nokK2xtafBa2rIyWwA8C6iwOqC/0fsYKnm3WsfnBfxk6aTEYDPgb/+q8lWs+MYYyG9vD/bbss8qHmhQUBNS3t7pXy6YIuOgPJ+BfYV9h7KTFamIjNleElUQxoEaWW5aaGvSGW9YYmjTBkiCvw05r0rSZgG/UsSnJEp1shZdMkrGiall4dDFmDZVumjWGXCry3RQnTUXeRORaCXglWS6ryc6bbHMBtmJQISvtBwU/MFPRglBY3SS1LXblzPqjB1ObNMXKIelrJuCNLSclOyqLJTAn6So2S6XhvHT464ysqAMmOU15ghxNDg93GgghYX56k6aYLL9vp5GANxoMkshKdpGFL1FiWbskRiwsW+fmImJdJ0o2i6FNVs7MAFlacssLjUBa0/nEpzlp2kjAN+vYgKxKxUBYOLvVSThPRbuNAIuqWJzGCucU7RFTgDsjq2i+U9YyuLypBASHm6TGCGGak6Yc20zA47IfTJZFR1jqdquBcEqiNEvMzTXI4p1GO1/nuW7LGqogcziTypC1Q0FbIDPFSVOcgE8h6v5Xsg4Cn3XKsgEYfzYn75wF2RBgI85TycDp6qxl1qJjTxU+qzbcZ6WQmWEcDDYtjdUf05s0xdsF0o5WAh7PhrJzD/DcrBSxOC3g4CWOm9XxdZvs3duzoccd9oN0GDrLF5lYMhH2M+TmekEjAVObNMVL92cJ+DPpMOuqmHRcxWiaFet1yarTcbyhQzq45WUKWcEPSVPlHO6qO5k1MzgJrS2110iaalFwEwZOwC+169jaZJ0aZw0mp8UiVjixzlWsOpfd2aGzQqiUK+YE5rBGCsJgC0igYrCYD4dRZr1Matx9IidNp9DHKxPwLbJAQIhSXRStrMFlqYiibdYVqXRYlge5w1GvwJAbGySdH8xWGGwQhECSJjc2SW11vODjfzaNlab1iJyA32ks3bcD6ZYubYrURlCtICuRTiMHTHKrJE0PCeXcmE1Qm+TyJllAjAbjivqn0cebQDngjeQvGnVsWlI0BpyiQYim0VICNEFtnRQ0RSduxJAntUN4dDY+1Hc7wMdnp83HuzijnICnmgl4+5y1Cz03nOLHec0IZWNEFRWY2gkMLi3O2A22dVDbkEuWiguDeWhWmk6XjzfWXY2N5H3ldaXP7W557OXAXDY3MwUHoyGr4qXNeNX/hMElS6gUH6RRsY9/PD9dC2NsHdexUU/7JuBN9sEvUAW2tmsHGotNi0jIZBolSwWwzWT/4Yt1/COwXg0vOjHgBLzg21952y/fNows8PW46gEPxZIGD5PI4pKl1eXa5jYjj8doP/OqwiT6Dw+majdBBIfRr3bWnvb1pYFhLxFbQgVcbFowO7QIo9QSgsFIrm6Uy3g8OlC/FVoHenz76Jeq8aQ0NxSSytMuCrkC/tVdCifg1WGyWeoAEPp9kZOLTVdhKGpaIHVDaG0uZMjDjdrmAaZLfTB6EDp6tIVU4klWy7IKq+VUzoVGAn5/bW3QYp3IAiKBAUdfgLF1R6771th7IBGlkQOPx3L5oO+zSuj7460HKjkgVsuyyujJcvG4jm1/d0XDqt6g8RhKgnFtlO9kaM07JdxpBtEF8qC8WSiodyyIIbT16Dbq3U2gICtAsOypKcLiOGO8ZBlhdOXoxd2nGmRlxTXo3ir4+VUQqMw5dtrBeAT3tS3LWrWEaxoG4q+f9I5tJVkRnJm0iJJoGbNlNRLwa2/2NQiawWSB5KQLTHkZ4pms9mKFWA4GMCMPYDW2GPTyV49+3TNRK8kyBgg7Z5qdlYySYaxk4ZwDerO4NrBfAETCpdhQsnAnkFY8c461GS8ewMs4wlYZvwlQD0dHqDtlxnYuqxjsdqvVppNs9tP2sgr+MXqy5KX7u7s7gyrg0zh1BcpiGFmYVRzPYMkVPMc5pDHHOHuj8nkV0a/9tx91k88aDOChpApeVjGKdpE9tYgcJ4oWVseKvNUkSRXDGMiSE/ArL976BmS8USLhSVXTGsgivIyjIEc/ZvocuSgcM24sk2pZ9xBCDx48QV0iEMiqSzpTnbfglQI7awkQToOzbnea7HWnaKnDrzGQZZIT8IvUyoCINYTc1bgnHtVCFjYFHP1gyXUO6e0Ftja3M2oqLY6+Pzp61DVpYLIqNhfO4GKyIpKNsM4aMFlSRGeq1DnWMgay8NJ91bG4v+gY8NaypWgyCh5FE1nAvZA5rJ1DcmF4EV79UR2IefSro63HSmkBZJ1ynFWCb4PFaatztgBncZ7a4J8KL9mkOX52DD6rkYDfWXwxaKnUi8wC/mgrAzR8B2J5Ofo5j+TCBlRYLZNq9u1F6PbRA2VAzbYcuZ2NWOusxRmRrBVLhNXZIhF7a1ll5GRh5ZD1PdzdGZTujqXNDJPP/uYfq2GPptZz0bbk0l46FKTJ8mpBzbSi6JfIf1uR02hLB0PAVGGdrJ012Xi2YtcZ7MbxSQeuDv4bwug3/VOSniRe9wOR/U+//Z08LcKoTKfcA6VUoim5ztFmJIQKB2X1KhPw8U+Ov+88wxZZBpj+TmWyLHyDrECdM4yNLJyAX1l72Fc5xJJ4lw55sLr+zxC8/pYkM0CbWSZNSObA8aubWlNyMYz2vHDUTJYPCmaVe1Kg479HKHh2S5ssOyvaOJaz4ioMCyvOzbJsYFyW1UjAP91f6beRPIWp2i7XNpeX/wVO4Pebyxvbq4eFQmF9+/BOATWQDYKpJbpMLQ1DcX2T1C5PY42aSzV3UIKDOIQOD8h2LKvoupZVxjYMXXURhKSP6reRPC2nXjYOSUDmLzrdHw5Xt0+Wy7VtcvlkY3kdfpwcrhcKyC+TxpRy6XiiZWpeef/FOQoeS0KhT7VXDJmV2/PFy0jR4L1zUTO11mcjeVjOrzOk4G/akNlcKGSAuEJmYxOMbJU8Wd1cXd7cPDw5gTtgfDYemC9Ww/FolsFkpWMpjWl0XNJ8KOSJajbffTaN7fn+M+Irs7YuWLv+n+23dPDFwG1vFZ1cFcBLV2UcuwjphDcWcy+Eo8G8zIaDRuTh6p2N1ZM7yydAFnmyQW6frB8wsgnilCmS0wmbpICfoK3NSKOclw5iO+029OzQ7fkj56YHgzeS0wJZ7u16EfIm4ulcsmlrNHnIwEhc3ibXgbVyrby5fLK+egeTdrBZLjBCPp1PJ4OazsaM92swKJzz9PQSTgyrNB26UnBx8HxPJ9czBM1ywCb0EwkxdyodDWabrAny+CQzB+vbG5i0Ml7BYZDDnYwtpLSV/JXoQwinhVK8muvx88UhlabjJ8tkiTQr4FWqrrGmrqmnApQIeT3harFhan4zXcjIrGHPRqNwNZxyxzWSlTMXynj7Yjod7fnwQrjfnb7/CvX4yTLOSnIdm9pG8hhiMrXDofVEHYDxmUrnSkzDq4HXQkEvfBZ+5NAo5OV6XkY21V4tO6TSdALDkCAaG8lVEvBLjTzAl2x1wFNBFUIj2QoW4K1rXIOXLQulFopFtelmcKXpZMhS6eSKEUXyXDaK2n3Nncxln9U3+G5WmvZZoZ4MWWqdXLFqKBzWMgxKTXLrHxq8e7FZhaQebU6GLCRXwCs4CcVk93FQkC/uJCRBYi4MDpxHAhClywO3u/oHVCGNnaxQOO0melvQ5CBwSULocYhntUxTYmIkS7loOhwOxzuQwlhYWPA0kTiDuwPeDsS6EJIRC+MZZWA988KA7fnjJktu01Ck8a77zr3zuSUhm5QrsbHE3ABdLkvMRrrB0Qp8xgBGnlEGVQWW+m/PHzdZTDSeiwNZXTILReNuT1FOzJB3DtZPsMRssLZ6yLQk1CiQUYJkNjcgOhp0xs3t+WrdhcZMVgi5g2l3UOjq5xBCUbfbE8wFsVjCcbPMj8wahDOasNmL5S5s4O9OwGdS2x4qgdON7fkqPn7cloXCHrAtB7WjDA2T+WQ2CXImdqbLgTXzmTBvWUUBBmYBJoEW7mAcNnGgxGoX1ruwvb1+QBaGt6oU+vU0HTdZUdzpg04KeNt9h86K4TxoR1ZJlpjFpND0LH6/39EFszpomm7/XRgOmEaSQ6dcD9I/PlbrSDn22RDYysdkBa88+kK8aWgui6ljQSfmTSzEw+l0uioj2kauiWIDwSZKZ0hi5OFrCZAFYEsUAB3+PRnVEln162k6AZ0VwvKTWtvp0/iW1/Ecx0VYVjS6tC2DjR3NnqY9Pn4yohRUKd6KorpsaOSNohjBhHFcneP4SIQVWdFl7IRLCZPyv2FoH0rzh9HHx0+IrBxN7VFD2giYXEaRbbBWx19422ED+DfPt/5o/DoD33En13wkr3wIV+fr8IKnmt8so+rjJ0SWZ8A47IWaeXQZV8vyXE2zM3ZB7AGMcws3/Nit81Xz8RMiC8YhDqWnbJfMAAQbPl45HUyKLNwn+M2Ud63qhGqbrUmR5YVYenFIu7+pAvbxL7t8/KTIIvICdvHTtaVoIFR0/MTIiiNq965mFz8FwD6+K1czMbKw1Hqo2qP0mxlVfJjUifUD1vHKXM3kyMrhLXR4MnZ3BbK31Mm6OakT64emj+/Ix0+OrIR8+QqE91sqU+DTSpbcSvFl567gyZEF4/AuviB5KRcsKjLMQNY3N2+8/vDu8w83br7+cPPWh5sfvp0GsrCPf/mvfzjzs3jb5GQQEnCTIwa5w9WY0CkhgKzPN15/unnrxrsfvnn94ZtPxMyPn6eCLPDxv9fp/vRvzX+NtokdGbTDGr6Mu9sTivu7yPr2E/Hs5uuZmz++fn3j9bfE+3c/TgVZROknXIP12z9KMsZfQ9NC0IEvYSgkl5CA6PYw/OHz52/ez8zcevZp5tPMzKdnn7999vn9rWe3psJnYR8PlvUH/W8mfNgovjimDwah13Hm4D+8f3cTvBUw8+ONG+8+3wTjgv/evXs3HQ4eUPX/6d8fTLrzQ1i+7KpPziSfSYdP8k95Nnz/bubmp2c/vH72YSY08+H9KMjyErEYcdEeiGa93N2HCEWTwQn1YfEghtp723ON+9fyT5msT+9m3n0Gmm4S7z98vvUlllX1JBQvH0NEMBq7aMjQ6O6DwlnwHpOJbL3A1f0Vqqfv8a3GT9myfpx59u2z159nvsUz4ReQVfSG091XnkukLt6DAF/1aJ5B+QRyByeRNMGX1d5dpHprUzrIurAojcejSssKJd3RdOLCV3JPO/RH3wFbnpQnPImeuVmBWtylVFo3Nsh6NprY0E14Q51HCKUJTyJ0wYYNKXwZ6uOv5/35eK5YnECvjKS5cSXfXl/bIIu4oYZLj6MBKfBUev3Rlt6RXsLlzeP3WXFEvd2jVLul3Rr7wS+CBlVP7j3QMygEs2FxArNhUmD2vvIJpVS7eKhZQLSw8MnTCfU6ImUlkXpBUagXFz3rWIuq23q9MLkEL/KtLFIMI68L/0lR/vPn/xhfadFA4FoABy0IAi3XT2RbWMpjJJN5fLJA1ct7LzFV+ck0rM4hFBSonV0Kw6d36nQ/+agmfvpP8OI/UWOET/8lmJ+fb/zRompCVyYNInCLDEOt7X0E7D2HqPQv8p8y/gvI+u+P99t4qIJdBdb6YLEX+4D/uS3jgQKPevG4jecY3333/PGDJ8cNqrKTuh5BDC140guIZpoftA/I+uu80rIY5ivAG4xXGE/beKHA2zbu4m8ZOwqsdKNFFsZLBZ4osKXE0dHR1tbLRz/HVC1N7tINXuTOpd0oR6Nm1dBPv/9rR7UQ+vP/Ohx0X+D6F8F3PrQ+lSa+aBi2RiMjJCd6lQtUSgfTdIxYaFUP/bGngkiuIWrVEXWUEgU7yojkUqI2ZFeMnbJcTiRDJtcPGN0cAH5fy7VDRggPPmynhh5Hby5NUBEXIaX8UEoTIoxF6GS728XS1aaSi8i1PxLRUwY0pUDRsCeuqQv96GFy1nme4+18uzqIrytqhlqVQu3CIvlG/qzoCD89wke6wUc6b5T/ZLWgMrigJoaQO+oVLqkVoISrfoySUVkEBBCbX63/u9FggQUKGl+tWxRk8U1w8Ffzdo4/g6Kiq/Ep2IYk1FEuXE1f7sXfL81n9WCYI8D7zNQaAU4Q00PWULhzQy49OXZcIbIuH9dknQPXZJ0D12SdA9dknQPXZJ0D12T1h6Ubtu4bJlbwNPUIGLqh67nl2taamFV0IT5rHNt589A+8P9f0EmWwRLhdHWes9YjFcM1Wb1QkOWaq9Rd1jpHSIrWZtdkNaEgy6Sz140ca7BaxGvLUsFsR39+J89G5iKGyCzL2hstBuWOg9dktQBkWSwS/q5ULAF7peK0V6SK3RIIWOsWg2Q3gPe6JqsJIIuYFSWTFLCxFishSRYuYJNMAUvFZKvXXUYrcU1WG0CWyVmvmOp2J3fqJOoWTnIa5lzOSoVwBniXxJmuyWoDWxYrWgm27gSaTGxk1iWe6oxOGImiy+YyGMVrstpoO/hTadYgSQad5Jy1SqenBputKeevHXwbLelgsFuIOmc3VkwVTiLskiFAXEuHbrTJqrBzrM1JWOymukTwFoPTdU1WN9qilOB5uzHC16U6ESD4usFO1A3XZClxpuDn5gxzVuyl4PfcnA5/X5OlhFU3FIZrspqoOHvSV91wXmf/WuhpetKDqa+muQD+D+D8psPYE9lWAAAAAElFTkSuQmCC'
												alt=''
											/>
										</div>
									</div>
									<div className='flex w-full h-1/6'>
										<InfoText
											label='Race name'
											text={item.raceName}
										/>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default Dropdown;
