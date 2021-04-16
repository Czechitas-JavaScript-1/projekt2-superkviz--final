const otazky = [{
		otazka: 'Co je ikonická hračka z 80. let?',
		obrazek: 'moncicak.jpg',
		odpovedi: [
			'Kočičák',
			'Mončičák',
			'Opičák'
		],
		spravna: 1
	},
	{
		otazka: 'Jaké je Matějovo nejoblíbenější ovoce?',
		obrazek: 'ovoce.jpg',
		odpovedi: [
			'Kokos',
			'Melounek',
			'Jahoda',
			'Ani jedna z možností'
		],
		spravna: 2
	},
	{
		otazka: 'Pro úspěšné absolvování kurzu je potřeba...',
		obrazek: 'pivo.jpg',
		odpovedi: [
			'Umět JavaScript',
			'Chodit po kurzu do hospody',
		],
		spravna: 0
	}
];

const poradi = document.querySelector('#poradi');
const otazka = document.querySelector('#otazka');
const obrazek = document.querySelector('#obrazek');
const moznosti = document.querySelector('#moznosti');

let aktualniOtazka = 0;
let mojeOdpovedi = [];

zobrazOtazku();

function zobrazOtazku() {
	poradi.textContent = 'Otázka ' + (aktualniOtazka + 1) + ' / ' + otazky.length;
	otazka.textContent = otazky[aktualniOtazka].otazka;
	obrazek.src = 'obrazky/' + otazky[aktualniOtazka].obrazek;


	let odpovedi = otazky[aktualniOtazka].odpovedi;

	let seznam = document.createElement('ul');
	seznam.id = 'odpovedi';

	for (let i = 0; i < odpovedi.length; i++) {
		let polozka = document.createElement('li');
		polozka.dataset.odpoved = i;
		polozka.textContent = odpovedi[i];
		polozka.onclick = klikNaOdpoved;
		seznam.appendChild(polozka);
	}

	document.querySelector('#odpovedi').remove();
	moznosti.appendChild(seznam);
}


function klikNaOdpoved() {

	let odpoved = event.target.dataset.odpoved;

	mojeOdpovedi.push(odpoved);

	aktualniOtazka = aktualniOtazka + 1;

	if (aktualniOtazka === otazky.length) {
		zobrazVyhodnoceni();
	} else {
		zobrazOtazku();
	}

}

function zobrazVyhodnoceni() {
	// skryjeme div s otazkami
	document.querySelector('.kviz').style.display = 'none';
	// a objevime div s vyhodnocenim
	document.querySelector('.vysledek').style.display = 'block';
	// najdeme si div, do ktereho budeme vypisovat text
	const hodnoceni = document.querySelector('#hodnoceni');
	// vypiseme pole - to je jen prechodne, takhle to delat nebudeme
	console.log(mojeOdpovedi);

	let pocetSpravnych = 0;

	for (let i = 0; i < otazky.length; i++) {
		let nadpis = document.createElement('h3');
		nadpis.textContent = (i + 1) + '. ' + otazky[i].otazka;
		hodnoceni.appendChild(nadpis);

		let moje = document.createElement('p');
		moje.textContent = 'Tvoje odpověď: ' + otazky[i].odpovedi[mojeOdpovedi[i]];
		hodnoceni.appendChild(moje);

		let spravne = document.createElement('p');
		if (mojeOdpovedi[i] === otazky[i].spravna) {
			pocetSpravnych++;
			spravne.textContent = 'To je SPRÁVNĚ.';
		} else {
			spravne.textContent = 'Správná odpověď: ' + otazky[i].odpovedi[otazky[i].spravna];
		}
		hodnoceni.appendChild(spravne);
	}

	let procenta = document.createElement('h2');
	procenta.textContent += 'Správně ' + pocetSpravnych + ' ze ' + otazky.length + ' otázek. Úspěšnost ' + Math.round(pocetSpravnych / otazky.length * 100) + ' %.';
	hodnoceni.appendChild(procenta);
}