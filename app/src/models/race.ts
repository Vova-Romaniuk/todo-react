export interface RaceState {
	raceName: string;
	date: string;
	raceId: string;
}
interface Location {
	lat: string;
	long: string;
	locality: string;
	country: string;
}

interface Circuit {
	circuitId: string;
	url: string;
	circuitName: string;
	Location: Location;
}

interface Practice {
	date: string;
	time: string;
}

export interface Race {
	season: string;
	round: string;
	url: string;
	raceName: string;
	Circuit: Circuit;
	date: string;
	time: string;
	FirstPractice: Practice;
	SecondPractice: Practice;
	ThirdPractice: Practice;
	Qualifying: Practice;
}
